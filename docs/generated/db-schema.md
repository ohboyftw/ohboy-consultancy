---
title: "Database Schema"
status: active
owner: auto-generated
last_verified: "2026-02-12"
created: "2026-02-12"
generated_from: "supabase/migrations/001_booking_system.sql"
tags: [database, schema, supabase, generated]
cross_links:
  - docs/product-specs/booking-system.md
---

# Database Schema

> Auto-generated from migration files. Do not edit manually.

## Tables

### `availability_rules`
Recurring working hours per day of week.

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, auto-generated |
| day_of_week | smallint | NOT NULL, 0-6 (0=Sun, 6=Sat) |
| start_time | time | NOT NULL |
| end_time | time | NOT NULL, must be > start_time |
| is_active | boolean | default true |
| created_at | timestamptz | default now() |

### `bookings`
Client bookings with double-booking prevention.

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, auto-generated |
| date | date | NOT NULL |
| start_time | time | NOT NULL |
| end_time | time | NOT NULL |
| client_name | text | NOT NULL |
| client_email | text | NOT NULL |
| description | text | default '' |
| status | text | default 'confirmed', check in (pending, confirmed, cancelled) |
| timezone | text | NOT NULL, default 'UTC' |
| created_at | timestamptz | default now() |

**Unique constraint**: `(date, start_time)` — prevents double-booking.

### `blocked_slots`
Manual blocks for holidays, personal events, etc.

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, auto-generated |
| date | date | NOT NULL |
| start_time | time | nullable (null = entire day blocked) |
| end_time | time | nullable |
| reason | text | nullable |
| created_at | timestamptz | default now() |

### `contact_submissions`
Contact form submissions.

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, auto-generated |
| name | text | NOT NULL |
| email | text | NOT NULL |
| message | text | NOT NULL |
| created_at | timestamptz | default now() |

## Indexes
- `idx_bookings_date` on bookings(date)
- `idx_bookings_status` on bookings(status)
- `idx_blocked_slots_date` on blocked_slots(date)
- `idx_availability_day` on availability_rules(day_of_week)

## RLS Policies
All tables have Row Level Security enabled. Anonymous inserts are allowed (anon key client).
