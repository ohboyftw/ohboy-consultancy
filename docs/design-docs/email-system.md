---
title: "Email System"
status: active
owner: aravind
last_verified: "2026-02-12"
created: "2026-02-12"
tags: [email, smtp, nodemailer, design-decision]
cross_links:
  - docs/plans/self-hosted-email-notifications.md
---

# Email System

## Decision
Use **nodemailer** with GoDaddy SMTP (smtpout.secureserver.net:465) for all email notifications. No third-party email SaaS (Resend, SendGrid, Formspree, etc.).

## Context
User explicitly requires no third-party services. Domain email is hosted on GoDaddy with the domain ohboyconsultancy.com.

## Implementation
- **Transport**: `lib/email.ts` — nodemailer transporter with SSL on port 465
- **Booking emails**: `app/api/send-confirmation/route.ts` — sends to client + consultant
- **Contact emails**: `app/api/send-contact/route.ts` — sends to consultant only
- **Pattern**: Fire-and-forget — email failures don't block the user-facing operation

## Alternatives Considered
- **Resend** — rejected (third-party SaaS)
- **SendGrid** — rejected (third-party SaaS)
- **Supabase Edge Functions + Resend** — rejected (third-party + Deno complexity)

## Environment Variables
```
SMTP_USER=aravind@ohboyconsultancy.com
SMTP_PASSWORD=<GoDaddy email password>
```
