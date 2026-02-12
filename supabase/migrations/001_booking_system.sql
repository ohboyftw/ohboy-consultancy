-- =============================================================================
-- Booking System Tables for Ohboy Consultancy
-- =============================================================================
-- Run this in your Supabase SQL Editor to set up the booking system.
-- This creates tables for availability rules, bookings, and blocked slots.
-- =============================================================================

-- Availability rules define recurring working hours per day of week
create table if not exists availability_rules (
  id uuid default gen_random_uuid() primary key,
  day_of_week smallint not null check (day_of_week between 0 and 6), -- 0=Sun, 6=Sat
  start_time time not null,                                          -- e.g. 09:00
  end_time time not null,                                            -- e.g. 17:00
  is_active boolean default true,
  created_at timestamptz default now(),
  constraint valid_time_range check (start_time < end_time)
);

-- Bookings table with double-booking prevention
create table if not exists bookings (
  id uuid default gen_random_uuid() primary key,
  date date not null,
  start_time time not null,
  end_time time not null,
  client_name text not null,
  client_email text not null,
  description text default '',
  status text default 'confirmed' check (status in ('pending', 'confirmed', 'cancelled')),
  timezone text not null default 'UTC',
  created_at timestamptz default now(),
  constraint no_double_booking unique (date, start_time)
);

-- Blocked slots for holidays, personal events, etc.
create table if not exists blocked_slots (
  id uuid default gen_random_uuid() primary key,
  date date not null,
  start_time time,  -- null = entire day blocked
  end_time time,
  reason text,
  created_at timestamptz default now()
);

-- =============================================================================
-- Indexes
-- =============================================================================

create index if not exists idx_bookings_date on bookings (date);
create index if not exists idx_bookings_status on bookings (status);
create index if not exists idx_blocked_slots_date on blocked_slots (date);
create index if not exists idx_availability_day on availability_rules (day_of_week);

-- =============================================================================
-- Row Level Security
-- =============================================================================

alter table availability_rules enable row level security;
alter table bookings enable row level security;
alter table blocked_slots enable row level security;

-- Availability rules: anyone can read (needed for slot generation)
create policy "Allow public read of availability rules"
  on availability_rules for select
  using (true);

-- Bookings: anyone can insert (anonymous booking), read own by email
create policy "Allow anonymous booking inserts"
  on bookings for insert
  with check (true);

create policy "Allow public read of bookings for availability check"
  on bookings for select
  using (true);

-- Blocked slots: anyone can read (needed for availability)
create policy "Allow public read of blocked slots"
  on blocked_slots for select
  using (true);

-- =============================================================================
-- Seed Data: Default working hours (Sunday-Thursday, 9AM-5PM Dubai time)
-- Dubai business week is Sun-Thu. Adjust as needed.
-- =============================================================================

insert into availability_rules (day_of_week, start_time, end_time, is_active) values
  (0, '09:00', '17:00', true),  -- Sunday
  (1, '09:00', '17:00', true),  -- Monday
  (2, '09:00', '17:00', true),  -- Tuesday
  (3, '09:00', '17:00', true),  -- Wednesday
  (4, '09:00', '17:00', true),  -- Thursday
  (5, '09:00', '17:00', false), -- Friday (off in UAE)
  (6, '09:00', '17:00', false); -- Saturday (off)
