# AGENTS.md — Ohboy Consultancy Website

## Quick Start
1. Read this file first
2. Check `docs/plans/` for active plans
3. Read CLAUDE.md for dev commands and brand guidelines
4. Read relevant domain docs below before making changes

## Domain Map

| Domain | Quality | Key Files | Docs |
|--------|---------|-----------|------|
| Core Site | B | `app/page.tsx`, `components/sections/` | CLAUDE.md (Design System) |
| Booking System | B | `app/book/`, `components/booking/`, `app/api/availability/` | [docs/product-specs/booking-system.md](docs/product-specs/booking-system.md) |
| Email | B | `lib/email.ts`, `app/api/send-*` | [docs/design-docs/email-system.md](docs/design-docs/email-system.md) |
| Database | B | `supabase/migrations/`, `lib/supabase.ts` | [docs/generated/db-schema.md](docs/generated/db-schema.md) |
| SEO | A | `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts` | — |
| UI Components | A | `components/ui/`, `components/magicui/` | CLAUDE.md (Component Guidelines) |

## Architecture
- **Next.js 14 App Router** — `app/` for pages + API routes
- **Supabase** — PostgreSQL backend, RLS policies, anon key client
- **Nodemailer** — GoDaddy SMTP, fire-and-forget email pattern
- **No third-party SaaS** — no Resend, Calendly, Formspree, etc.

See [ARCHITECTURE.md](ARCHITECTURE.md) for details.

## Where to Look

| Task | Start Here |
|------|-----------|
| Add a page section | `components/sections/`, follow BlurFade pattern |
| Modify booking flow | `components/booking/booking-flow.tsx` (orchestrator) |
| Change availability | `app/api/availability/route.ts`, `supabase/migrations/` |
| Email templates | `lib/email.ts` (HTML templates inline) |
| Design tokens | `app/globals.css` (CSS variables) |
| Add UI component | `npx shadcn@latest add <name>`, then `components/ui/` |
| Database changes | `supabase/migrations/`, update `docs/generated/db-schema.md` |

## Plans
- [Calendar Sync System](docs/plans/calendar-sync-system.md) — planned
- [Self-Hosted Email](docs/plans/self-hosted-email-notifications.md) — partially implemented

## Constraints
- Timezone math: pure string/number arithmetic, NO date-fns-tz
- Email: nodemailer + own SMTP only
- Graceful degradation: site must work without Supabase
