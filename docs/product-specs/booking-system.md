---
title: "Booking System"
status: active
owner: aravind
last_verified: "2026-02-12"
created: "2026-02-12"
tags: [booking, calendar, wizard, scheduling]
cross_links:
  - docs/design-docs/email-system.md
  - docs/plans/calendar-sync-system.md
  - docs/generated/db-schema.md
---

# Booking System

## Overview
Calendly-like booking wizard at `/book`. Clients pick a date, choose an available 60-minute slot, fill in details, and get confirmation.

## User Flow
1. **Date selection** — Calendar (react-day-picker v9), disables past dates and >60 days out
2. **Time slot selection** — Grid of available 60-min slots, displayed in client's timezone
3. **Details form** — Name, email, description
4. **Confirmation** — Booking details, ICS download, email sent

## API
- `GET /api/availability?date=YYYY-MM-DD` — Returns available TimeSlot[] for a date
- `POST /api/send-confirmation` — Sends booking confirmation emails

## Database Tables
- `availability_rules` — Day-of-week + time window rules
- `bookings` — Client bookings with unique constraint on (date, start_time)
- `blocked_slots` — Manual blocks (vacation, etc.)

## Timezone Handling
- Slots generated as UTC strings in API (pure string/number math)
- Displayed in client's local timezone using native `Intl.DateTimeFormat`
- No date-fns-tz (incompatible with date-fns v4)

## Graceful Degradation
- Without Supabase: hardcoded Sun-Thu 9:00-17:00, local booking object, no persistence
- Without SMTP: booking succeeds, email silently fails (fire-and-forget)

## Seed Data
Sun-Thu 09:00-17:00 active, Fri-Sat off (Dubai business hours).
