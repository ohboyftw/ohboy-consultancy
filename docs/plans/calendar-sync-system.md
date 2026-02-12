# Calendar Sync System — Project Plan

## Status: PLANNED (not started)

## Overview

Separate FastAPI backend service that syncs Google/Microsoft/Apple calendars with the Supabase booking system. The website reads availability from Supabase; the sync service writes calendar data into Supabase.

```
Next.js Website          Calendar Sync Service         Calendar Providers
(ohboyconsultancy.com)   (FastAPI on DO/Azure)
                                                        - Google Calendar
Reads:                   Writes:                        - Microsoft Outlook
- synced_events    <-->  - synced_events          <-->  - Apple Calendar
- availability           - sync_logs
- bookings               - calendar_connections
        |                        |
        +-----> Supabase <-------+
                (Postgres)
```

---

## Phase 1 — MVP: Google Calendar (~44 hours)

### Tasks

| # | Task | Effort |
|---|------|--------|
| 1 | FastAPI project scaffold (pyproject.toml, app structure, config) | 2h |
| 2 | Supabase schema migration (all tables below) | 2h |
| 3 | Google OAuth flow (connect calendar) | 4h |
| 4 | Google Calendar full sync (initial pull of events) | 4h |
| 5 | Google Calendar incremental sync (syncToken) | 3h |
| 6 | Google webhook (watch) setup + auto-renewal | 4h |
| 7 | Polling fallback (APScheduler, every 5 min) | 2h |
| 8 | Token refresh logic | 2h |
| 9 | `get_available_slots` Supabase RPC function | 3h |
| 10 | Create calendar event on booking confirmation | 3h |
| 11 | Simple admin page (connect calendar, view sync status) | 4h |
| 12 | Update website booking UI to use RPC for availability | 6h |
| 13 | ICS download on confirmation (already built) | 0h |
| 14 | Deploy sync service (DigitalOcean/Azure) | 3h |
| 15 | Token encryption (Fernet symmetric) | 2h |

### Deliverables
- Consultant connects Google Calendar via OAuth
- Website visitors see real-time slots that account for Google Calendar events
- Booking a slot creates an event in consultant's Google Calendar
- Polling fallback ensures sync even if webhook fails
- Encrypted token storage

---

## Phase 2 — Microsoft Outlook (~19 hours)

| # | Task | Effort |
|---|------|--------|
| 1 | Azure AD app registration | 1h |
| 2 | Microsoft OAuth flow (Graph API) | 3h |
| 3 | Microsoft Graph API full sync | 3h |
| 4 | Microsoft delta sync (deltaLink) | 3h |
| 5 | Microsoft webhook subscriptions (3-day renewal) | 3h |
| 6 | Event creation via Graph API | 2h |
| 7 | Multi-calendar merging (Google + MS busy times) | 2h |
| 8 | Admin UI update (connect Microsoft) | 2h |

---

## Phase 3 — Apple Calendar + Polish (~22 hours)

| # | Task | Effort |
|---|------|--------|
| 1 | CalDAV integration (`caldav` Python library) | 4h |
| 2 | App-specific password UI + encrypted storage | 2h |
| 3 | CalDAV sync-collection polling (no webhook support) | 3h |
| 4 | Event creation via CalDAV PUT | 2h |
| 5 | Admin UI update (connect Apple) | 2h |
| 6 | Buffer time configuration UI | 1h |
| 7 | Manual date/time blocking UI | 2h |
| 8 | Sync error notifications | 3h |
| 9 | Sync dashboard (logs viewer) | 3h |

---

## Phase 4 — Hardening (~22 hours)

| # | Task | Effort |
|---|------|--------|
| 1 | Rate limiting on booking endpoint | 2h |
| 2 | Self-hosted email confirmation on booking | 3h |
| 3 | Email notification to consultant on booking | 2h |
| 4 | Booking cancellation flow | 3h |
| 5 | Recurring availability exceptions | 3h |
| 6 | Timezone edge case testing (DST transitions) | 2h |
| 7 | Load testing / race condition testing | 3h |
| 8 | Embeddable booking widget option | 4h |

---

## Data Model

### `calendar_connections`

Stores OAuth credentials and connection metadata.

```sql
CREATE TABLE calendar_connections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    provider TEXT NOT NULL CHECK (provider IN ('google', 'microsoft', 'apple')),
    provider_email TEXT,
    calendar_id TEXT NOT NULL,
    calendar_name TEXT,

    -- OAuth tokens (encrypted at rest via Fernet)
    access_token_encrypted TEXT,
    refresh_token_encrypted TEXT,
    token_expires_at TIMESTAMPTZ,

    -- Apple-specific
    app_specific_password_encrypted TEXT,
    caldav_url TEXT,

    -- Sync state
    sync_token TEXT,               -- Google syncToken / MS deltaLink / CalDAV CTag
    last_synced_at TIMESTAMPTZ,
    sync_status TEXT DEFAULT 'pending' CHECK (sync_status IN ('pending', 'syncing', 'synced', 'error')),
    sync_error TEXT,

    -- Webhook state
    webhook_channel_id TEXT,
    webhook_subscription_id TEXT,
    webhook_expiration TIMESTAMPTZ,

    is_active BOOLEAN DEFAULT true,
    is_primary BOOLEAN DEFAULT false,

    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE UNIQUE INDEX idx_cal_conn_unique ON calendar_connections(user_id, provider, calendar_id);
```

### `synced_events`

Normalized calendar events from all providers. Queried for availability.

```sql
CREATE TABLE synced_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    connection_id UUID NOT NULL REFERENCES calendar_connections(id) ON DELETE CASCADE,
    provider_event_id TEXT NOT NULL,

    title TEXT,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    is_all_day BOOLEAN DEFAULT false,

    status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'tentative', 'cancelled')),
    transparency TEXT DEFAULT 'opaque' CHECK (transparency IN ('opaque', 'transparent')),

    is_ohboy_booking BOOLEAN DEFAULT false,
    booking_id UUID,

    provider_updated_at TIMESTAMPTZ,
    raw_data JSONB,

    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_synced_events_time ON synced_events(start_time, end_time)
    WHERE status != 'cancelled' AND transparency = 'opaque';
CREATE UNIQUE INDEX idx_synced_events_provider ON synced_events(connection_id, provider_event_id);
```

### `sync_logs`

Audit trail for debugging.

```sql
CREATE TABLE sync_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    connection_id UUID REFERENCES calendar_connections(id) ON DELETE SET NULL,
    operation TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('started', 'completed', 'failed')),
    events_processed INT DEFAULT 0,
    events_created INT DEFAULT 0,
    events_updated INT DEFAULT 0,
    events_deleted INT DEFAULT 0,
    error_message TEXT,
    duration_ms INT,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## Availability Algorithm

```python
def get_available_slots(date, slot_duration=60, buffer=15):
    # 1. Get working hours for this day
    rules = get_availability_rules(day_of_week=date.weekday())
    if not rules:
        return []

    # 2. Generate all possible slots within working hours
    all_slots = generate_time_slots(rules.start, rules.end, slot_duration)

    # 3. Get ALL busy periods from ALL connected calendars
    busy = get_synced_events(date, status='confirmed', transparency='opaque')

    # 4. Add existing bookings
    busy += get_bookings(date, status__in=['pending', 'confirmed'])

    # 5. Add manual blocks
    busy += get_blocked_dates(date)

    # 6. Expand with buffer time
    busy = [(start - buffer, end + buffer) for start, end in busy]

    # 7. Merge overlapping intervals
    merged = merge_intervals(busy)

    # 8. Filter: keep slots that don't overlap any busy period
    return [s for s in all_slots if not overlaps(s, merged)]
```

Implemented as a Supabase RPC (`get_available_slots`) for server-side execution.

---

## Provider API Details

| | Google | Microsoft | Apple |
|--|--------|-----------|-------|
| **Auth** | OAuth 2.0 | OAuth 2.0 | App-specific password |
| **Webhooks** | Yes (7-day expiry) | Yes (3-day expiry) | No |
| **Incremental sync** | syncToken | deltaLink | CTag/sync-collection |
| **API format** | REST/JSON | REST/JSON | CalDAV/XML |
| **Python SDK** | google-api-python-client | msgraph-sdk-python | caldav |
| **MVP priority** | Phase 1 | Phase 2 | Phase 3 |

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | FastAPI (Python 3.12+) |
| HTTP client | httpx (async) |
| Scheduler | APScheduler (MVP), Celery+Redis (scale) |
| DB client | supabase-py (service role) |
| Token encryption | cryptography (Fernet) |
| Hosting | DigitalOcean App Platform or Azure Container Apps |

---

## Project Structure

```
ohboy-calendar-sync/
├── app/
│   ├── main.py                    # FastAPI entry
│   ├── config.py                  # Pydantic Settings
│   ├── dependencies.py            # Supabase client, encryption
│   ├── models/
│   │   ├── calendar.py
│   │   └── booking.py
│   ├── routers/
│   │   ├── auth_google.py
│   │   ├── auth_microsoft.py
│   │   ├── auth_apple.py
│   │   ├── webhooks.py
│   │   └── admin.py
│   ├── services/
│   │   ├── google_calendar.py
│   │   ├── microsoft_calendar.py
│   │   ├── apple_calendar.py
│   │   ├── sync_engine.py
│   │   ├── availability.py
│   │   └── encryption.py
│   ├── tasks/
│   │   ├── scheduler.py
│   │   ├── polling.py
│   │   └── webhook_renewal.py
│   └── tests/
├── sql/
│   ├── 001_create_tables.sql
│   ├── 002_create_rpc.sql
│   └── 003_rls_policies.sql
├── Dockerfile
├── docker-compose.yml
├── pyproject.toml
└── .env.example
```

---

## Conflict Prevention

At booking time:
1. Run a fresh incremental sync for all active connections
2. Re-check availability against synced_events
3. Use Postgres `SELECT ... FOR UPDATE` to prevent concurrent double-bookings
4. Only then confirm the booking and create the calendar event

---

## Security

- Tokens encrypted with Fernet (key from env var), never stored in plain text
- Supabase service role key only on sync service, never in frontend
- Minimal scopes (calendar events read/write only)
- Only store event title + times in synced_events (no attendees, descriptions, etc.)
- Admin pages protected by Supabase Auth
- Webhook payloads validated (Google channel ID, Microsoft clientState)
