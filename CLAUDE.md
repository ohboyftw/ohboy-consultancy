# CLAUDE.md - Ohboy Consultancy Website

## Project Overview

This is the official website for **Ohboy Consultancy FZ LLC**, a Dubai-based technical consulting firm founded by Aravind Vijayakumar. The website serves as the primary digital presence, positioning the consultancy as a go-to partner for product companies seeking expertise in hardware, software, and AI.

**Domain:** ohboyconsultancy.com

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + Shadcn/UI components
- **Animation:** Framer Motion + Magic UI components
- **Language:** TypeScript
- **Package Manager:** npm

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Project Structure

```
/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Main single-page application
│   ├── layout.tsx         # Root layout with fonts
│   └── globals.css        # CSS variables and utility classes
├── components/
│   ├── ui/                # Shadcn UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   └── sheet.tsx
│   ├── magicui/           # Magic UI animation components
│   │   ├── blur-fade.tsx
│   │   ├── typewriter.tsx
│   │   ├── number-ticker.tsx
│   │   └── particles.tsx
│   └── sections/          # Page sections
│       ├── navbar.tsx
│       ├── hero.tsx
│       ├── about.tsx
│       ├── services.tsx
│       ├── portfolio.tsx
│       ├── pricing.tsx
│       ├── contact.tsx
│       └── footer.tsx
├── lib/
│   └── utils.ts           # Utility functions (cn helper)
└── public/                # Static assets
```

## Design System

### Color Palette (CSS Variables in globals.css)

| Token | HSL Value | Hex | Usage |
|-------|-----------|-----|-------|
| --background | 222.2 84% 4.9% | #020617 | Page background |
| --foreground | 210 40% 98% | #F8FAFC | Primary text |
| --card | 222.2 84% 6% | ~#0F172A | Card surfaces |
| --primary | 160 84% 39% | #10B981 | Primary accent (emerald) |
| --accent | 25 95% 53% | #F97316 | CTA buttons (orange) |
| --muted | 217.2 32.6% 17.5% | #1E293B | Muted backgrounds |
| --muted-foreground | 215 20.2% 65.1% | #94A3B8 | Secondary text |

### Typography

- **Display:** Space Grotesk (--font-space)
- **Body:** Plus Jakarta Sans (--font-jakarta)
- **Monospace:** JetBrains Mono (--font-jetbrains)

### Custom Utility Classes

- `.text-gradient` - White to slate gradient text
- `.text-gradient-emerald` - Emerald gradient text
- `.text-gradient-orange` - Orange gradient text
- `.glass` - Glassmorphism background
- `.glass-card` - Card with glass effect
- `.glow-emerald` - Emerald glow shadow
- `.card-glow` - Hover glow effect for cards
- `.terminal-window` - Terminal-style container

## Component Guidelines

### Adding New Shadcn Components

```bash
npx shadcn@latest add [component-name]
```

### Animation Patterns

Use BlurFade wrapper for scroll reveals:
```tsx
import { BlurFade } from "@/components/magicui/blur-fade";

<BlurFade delay={0.1}>
  <Content />
</BlurFade>
```

Use stagger delays for lists (increment by 0.05s):
```tsx
{items.map((item, i) => (
  <BlurFade key={i} delay={0.1 + i * 0.05}>
    <Item {...item} />
  </BlurFade>
))}
```

### Card Hover Effects

Apply `card-glow` class for interactive cards with hover state.

## Content Sources

Reference documents in project root:
- `Ohboy_Consultancy_Website_Mother_Document.docx` - Brand story, services, pricing, content
- `Ohboy_Shadcn_UX_UI_Design_Document.docx` - Design specifications, component specs

## Brand Guidelines

### Value Propositions (Outcome-Focused)
- **SHIP FAST:** "Weeks, not months" - Rapid prototype to production delivery
- **ONE EXPERT, FULL STACK:** No team coordination overhead - single point of contact
- **NO VENDOR LOCK-IN:** Best tool for the job, technology-agnostic solutions
- **LEAN SOLUTIONS:** No over-engineering, lower maintenance costs

### The "Ohboy" Moment
The moment a client realizes: *"One senior engineer who can bridge hardware, software, and AI - delivering what would typically require 3 specialists and months of coordination."*

### Key Messaging
- **Tagline:** "Bridging Hardware, Software, and AI"
- **Subheadline:** "From Olympics to Startups - 20 Years of Engineering Excellence"

### Client Benefits to Emphasize
1. **Speed** - Prototype to production in weeks
2. **Cost** - Fractional CTO expertise without full-time overhead
3. **Risk** - Battle-tested at Olympic scale - systems that can't fail
4. **Simplicity** - Single point of contact across the entire stack

## Services (4 main offerings)

1. **Technical Architecture & Consulting** - Fractional CTO, architecture design
2. **AI/ML Solutions** - LLM applications, Medical AI, computer vision
3. **Full-Stack Product Development** - MVP to scale development
4. **Embedded Systems & Firmware** - IoT, robotics, hardware-software integration

## Pricing Packages

1. **Discovery Session** - FREE (60-min consultation)
2. **Architecture Sprint** - Contact for quote (1-2 week engagement)
3. **Embedded Partner** - Monthly retainer (ongoing fractional CTO)
4. **Project Build** - Fixed quote (scoped development)

## Contact Information

- **Email:** aravind@ohboyconsultancy.com
- **WhatsApp:** +971 585 707 124
- **LinkedIn:** linkedin.com/in/aravindvijayakumar
- **GitHub:** github.com/ohboyftw

## Implementation Notes

### Sections to Complete/Enhance

1. **Videos/Demos Section** - Currently placeholder, will add Remotion animations
2. **Testimonials Section** - Placeholder with collection mechanism
3. **Cal.com Integration** - Booking widget in Contact section

### SEO Priorities

- Meta tags for each section
- Structured data for services/pricing
- Open Graph images
- Performance optimization (Core Web Vitals)

### Accessibility

- WCAG AA contrast ratios
- Visible focus rings (ring-2 ring-primary ring-offset-2)
- Proper heading hierarchy
- ARIA labels on icon-only buttons
