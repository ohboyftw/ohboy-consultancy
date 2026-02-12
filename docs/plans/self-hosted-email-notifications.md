---
title: "Self-Hosted Email Notifications"
status: active
owner: aravind
last_verified: "2026-02-12"
created: "2026-02-12"
tags: [email, smtp, nodemailer, notifications]
cross_links:
  - docs/plans/calendar-sync-system.md
  - docs/design-docs/email-system.md
---

# Self-Hosted Email Notifications — Project Plan

## Status: PLANNED (not started)

## Overview

Send booking confirmation and contact form notification emails using own infrastructure — no Resend, SendGrid, Formspree, or any third-party email SaaS.

---

## Architecture Options

### Option A: Supabase Database Webhook → FastAPI → SMTP (Recommended)

```
Supabase (Postgres)
  │
  │  INSERT into bookings / contact_submissions
  │
  ▼
Database Webhook (built-in Supabase feature)
  │
  │  POST payload to your endpoint
  │
  ▼
FastAPI Service (same as calendar sync service)
  │
  │  Renders email template + sends via SMTP
  │
  ▼
Your SMTP Server
  │
  ▼
Recipient inbox
```

**How it works:**
1. In Supabase Dashboard → Database → Webhooks, create two webhooks:
   - `on INSERT into bookings` → `POST https://api.ohboyconsultancy.com/webhooks/new-booking`
   - `on INSERT into contact_submissions` → `POST https://api.ohboyconsultancy.com/webhooks/new-contact`
2. FastAPI receives the payload with the full row data
3. Renders an HTML email from a Jinja2 template
4. Sends via `aiosmtplib` to your own SMTP server
5. Logs the send result

**Pros:** Clean separation, reuses the calendar sync service, easy to debug
**Cons:** Requires the FastAPI service to be running

### Option B: Supabase pg_net Extension → Direct SMTP

```
Supabase (Postgres)
  │
  │  INSERT trigger fires
  │
  ▼
pg_net extension (built into Supabase)
  │
  │  Makes HTTP call from within Postgres
  │
  ▼
Your SMTP relay endpoint
```

**How it works:**
1. Create a Postgres trigger on `bookings` and `contact_submissions`
2. Trigger function uses `net.http_post()` to call your SMTP endpoint
3. All logic lives in SQL + your endpoint

**Pros:** No separate service needed if you already have an SMTP relay
**Cons:** Less flexible templating, harder to debug

### Option C: Supabase Edge Function → Own SMTP

```
Supabase Edge Function (Deno)
  │
  │  Triggered by database webhook
  │
  ▼
Connects to your SMTP server via Deno SMTP library
```

**Pros:** Serverless, no extra infra
**Cons:** Deno SMTP libraries are less mature, Supabase Edge Functions have cold starts

---

## Recommended: Option A (FastAPI + SMTP)

This is the natural choice because:
- The calendar sync service (planned separately) already needs a FastAPI backend
- Same service handles both calendar webhooks and email notifications
- Python has excellent SMTP and email template tooling
- Single deployment covers both concerns

---

## SMTP Server Options (All Self-Hosted)

### 1. Domain Email Provider's SMTP

Most domain registrars / hosting providers include SMTP with your domain. For `ohboyconsultancy.com`:

| Provider | SMTP Server | Port |
|----------|-------------|------|
| Namecheap Private Email | mail.privateemail.com | 587 (TLS) |
| Google Workspace | smtp.gmail.com | 587 (TLS) |
| Zoho Mail | smtp.zoho.com | 587 (TLS) |
| Microsoft 365 | smtp.office365.com | 587 (TLS) |

**Simplest option** — just use whatever SMTP comes with your domain hosting.

### 2. Postfix on Your Own VPS

Run Postfix on your DigitalOcean/Azure VM:
```bash
# Install
apt install postfix

# Configure for relay
# /etc/postfix/main.cf
myhostname = mail.ohboyconsultancy.com
mydomain = ohboyconsultancy.com
```

Set up SPF, DKIM, DMARC DNS records for deliverability.

**More control** but requires DNS config and maintenance.

### 3. Docker Mail Server

Use `docker-mailserver/docker-mailserver` alongside the calendar sync service:
```yaml
# docker-compose.yml
services:
  mailserver:
    image: docker-mailserver/docker-mailserver
    hostname: mail.ohboyconsultancy.com
    ports:
      - "25:25"
      - "587:587"
    volumes:
      - ./docker-data/mail:/var/mail
```

**Self-contained** but needs port 25/587 open on your hosting.

---

## Implementation Plan

### Step 1: Add email endpoints to FastAPI service (~4 hours)

```python
# app/routers/webhooks.py

from fastapi import APIRouter, Request
from app.services.email import send_booking_confirmation, send_contact_notification

router = APIRouter(prefix="/webhooks")

@router.post("/new-booking")
async def handle_new_booking(request: Request):
    payload = await request.json()
    record = payload["record"]  # Supabase webhook sends the full row

    await send_booking_confirmation(
        client_name=record["client_name"],
        client_email=record["client_email"],
        date=record["date"],
        start_time=record["start_time"],
        end_time=record["end_time"],
        timezone=record["timezone"],
    )

    await send_booking_notification_to_consultant(
        client_name=record["client_name"],
        client_email=record["client_email"],
        date=record["date"],
        description=record.get("description", ""),
    )

    return {"ok": True}

@router.post("/new-contact")
async def handle_new_contact(request: Request):
    payload = await request.json()
    record = payload["record"]

    await send_contact_notification_to_consultant(
        name=record["name"],
        email=record["email"],
        message=record["message"],
    )

    return {"ok": True}
```

### Step 2: Email service with aiosmtplib (~3 hours)

```python
# app/services/email.py

import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from jinja2 import Environment, FileSystemLoader
from app.config import settings

templates = Environment(loader=FileSystemLoader("app/templates/email"))

async def send_email(to: str, subject: str, html_body: str):
    msg = MIMEMultipart("alternative")
    msg["From"] = settings.SMTP_FROM
    msg["To"] = to
    msg["Subject"] = subject
    msg.attach(MIMEText(html_body, "html"))

    await aiosmtplib.send(
        msg,
        hostname=settings.SMTP_HOST,
        port=settings.SMTP_PORT,
        username=settings.SMTP_USER,
        password=settings.SMTP_PASSWORD,
        use_tls=True,
    )

async def send_booking_confirmation(client_name, client_email, date, start_time, end_time, timezone):
    html = templates.get_template("booking_confirmation.html").render(
        client_name=client_name,
        date=date,
        start_time=start_time,
        end_time=end_time,
        timezone=timezone,
    )
    await send_email(client_email, "Discovery Session Confirmed — Ohboy Consultancy", html)
```

### Step 3: HTML email templates (~2 hours)

```
app/templates/email/
├── booking_confirmation.html    # To client: "Your session is booked"
├── booking_notification.html    # To consultant: "New booking from X"
├── contact_notification.html    # To consultant: "New contact from X"
└── base.html                    # Shared email layout
```

### Step 4: Configure Supabase webhooks (~1 hour)

In Supabase Dashboard → Database → Webhooks:

| Name | Table | Event | URL | Headers |
|------|-------|-------|-----|---------|
| new-booking | bookings | INSERT | https://api.ohboyconsultancy.com/webhooks/new-booking | Authorization: Bearer {WEBHOOK_SECRET} |
| new-contact | contact_submissions | INSERT | https://api.ohboyconsultancy.com/webhooks/new-contact | Authorization: Bearer {WEBHOOK_SECRET} |

### Step 5: DNS records for email deliverability (~1 hour)

```
# SPF record
TXT  @  "v=spf1 ip4:{YOUR_SERVER_IP} include:_spf.google.com ~all"

# DKIM record (generate with opendkim-genkey)
TXT  mail._domainkey  "v=DKIM1; k=rsa; p=..."

# DMARC record
TXT  _dmarc  "v=DMARC1; p=quarantine; rua=mailto:dmarc@ohboyconsultancy.com"
```

---

## Environment Variables

```env
# SMTP Configuration
SMTP_HOST=mail.privateemail.com    # or your provider
SMTP_PORT=587
SMTP_USER=bookings@ohboyconsultancy.com
SMTP_PASSWORD=your-smtp-password
SMTP_FROM=Ohboy Consultancy <bookings@ohboyconsultancy.com>

# Webhook security
WEBHOOK_SECRET=a-random-secret-for-validating-supabase-webhooks
```

---

## Email Templates (Content)

### Booking Confirmation (to client)

**Subject:** Discovery Session Confirmed — Ohboy Consultancy

```
Hi {name},

Your Discovery Session has been booked.

Date: {date}
Time: {start_time} – {end_time} ({timezone})
Duration: 60 minutes

I'll send a meeting link closer to the session.
Looking forward to our conversation!

—
Aravind Vijayakumar
Ohboy Consultancy FZ LLC | Dubai, UAE
```

### Booking Notification (to consultant)

**Subject:** New Booking: {client_name}

```
New Discovery Session booked.

Client: {client_name}
Email: {client_email}
Date: {date}
Time: {start_time} – {end_time} ({timezone})
Description: {description}
```

### Contact Form Notification (to consultant)

**Subject:** New Contact: {name}

```
New contact form submission.

Name: {name}
Email: {email}
Message: {message}
Submitted: {created_at}
```

---

## Total Effort: ~11 hours

| Task | Effort |
|------|--------|
| FastAPI webhook endpoints | 4h |
| Email service (aiosmtplib + templates) | 3h |
| HTML email templates | 2h |
| Supabase webhook config | 1h |
| DNS records (SPF/DKIM/DMARC) | 1h |

This naturally fits into the calendar sync service — same FastAPI deployment, same Supabase connection.

---

## Dependencies

- Requires the calendar sync FastAPI service to be deployed first (or at least the FastAPI scaffold)
- Requires SMTP access (check what your domain hosting provider offers)
- Supabase webhook feature requires a Supabase project (already have one)
