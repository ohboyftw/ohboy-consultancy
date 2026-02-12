---
title: "Architecture Overview"
status: active
owner: aravind
last_verified: "2026-02-12"
created: "2026-02-12"
tags: [architecture, overview]
---

# Architecture — Ohboy Consultancy Website

## System Diagram

```
┌─────────────────────────────────────────────┐
│                  Vercel                       │
│                                              │
│  ┌──────────┐  ┌──────────┐  ┌───────────┐ │
│  │ Next.js  │  │ API      │  │ Static    │ │
│  │ Pages    │  │ Routes   │  │ Assets    │ │
│  │          │  │          │  │           │ │
│  │ /        │  │ /api/    │  │ /public/  │ │
│  │ /book    │  │ availab. │  │           │ │
│  │          │  │ send-*   │  │           │ │
│  └──────────┘  └────┬─────┘  └───────────┘ │
│                      │                       │
└──────────────────────┼───────────────────────┘
                       │
          ┌────────────┼────────────┐
          ▼                         ▼
   ┌─────────────┐          ┌─────────────┐
   │  Supabase   │          │  GoDaddy    │
   │  PostgreSQL │          │  SMTP       │
   │             │          │             │
   │ Tables:     │          │ Port: 465   │
   │ bookings    │          │ SSL: true   │
   │ availability│          │             │
   │ blocked     │          └─────────────┘
   │ contacts    │
   └─────────────┘
```

## Layer Responsibilities

### Pages (`app/`)
- `page.tsx` — Main SPA, assembles all section components
- `book/page.tsx` — Booking wizard page
- `layout.tsx` — Root layout (fonts, metadata, JSON-LD)

### API Routes (`app/api/`)
- `availability/route.ts` — GET, generates 60-min time slots for a date
- `send-confirmation/route.ts` — POST, booking confirmation emails
- `send-contact/route.ts` — POST, contact form notification emails

### Components
- `sections/` — Page sections (hero, about, services, portfolio, pricing, contact, footer, navbar)
- `booking/` — Booking wizard components (date-picker, time-slot-grid, booking-form, confirmation-screen, booking-flow)
- `ui/` — Shadcn primitives (button, card, input, textarea, calendar, select, etc.)
- `magicui/` — Animation components (blur-fade, typewriter, number-ticker, particles)

### Libraries (`lib/`)
- `utils.ts` — `cn()` class merging helper
- `supabase.ts` — Supabase client factory (returns null if unconfigured)
- `email.ts` — Nodemailer transporter + email send functions
- `booking-utils.ts` — Timezone conversion (native Intl), ICS generation

### Database (`supabase/`)
- `migrations/001_booking_system.sql` — availability_rules, bookings, blocked_slots tables + seed data

## Data Flow: Booking

```
Client picks date → GET /api/availability?date=YYYY-MM-DD
                    → Query availability_rules (day-of-week match)
                    → Query bookings + blocked_slots (conflict check)
                    → Return available TimeSlot[]

Client picks slot → Fill form → POST to Supabase (bookings table)
                    → Unique constraint prevents double-booking
                    → Fire-and-forget POST /api/send-confirmation
                    → Show confirmation screen
```

## Key Decisions
- **No date-fns-tz** — Native Intl APIs for timezone display (date-fns-tz v3/v4 incompatible)
- **Pure string math for slots** — No Date objects in availability generation (timezone-safe)
- **Fire-and-forget email** — Don't block booking on email delivery
- **Graceful degradation** — Works without Supabase (hardcoded availability, no persistence)
- **No third-party SaaS** — Self-hosted SMTP, own booking system
