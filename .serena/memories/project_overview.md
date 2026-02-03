# Ohboy Consultancy Website - Project Overview

## Purpose
Official website for **Ohboy Consultancy FZ LLC**, a Dubai-based technical consulting firm founded by Aravind Vijayakumar. The site is a single-page application showcasing services, portfolio, and enabling client contact.

**Domain:** ohboyconsultancy.com

## Tech Stack
- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS + Shadcn/UI component library
- **Animation:** Framer Motion + Magic UI components
- **Icons:** Lucide React
- **Fonts:** Plus Jakarta Sans (body), Space Grotesk (display), JetBrains Mono (code)

## Project Structure
```
app/                    # Next.js App Router
├── page.tsx           # Main SPA (assembles all sections)
├── layout.tsx         # Root layout with fonts & metadata
└── globals.css        # CSS variables, theme, utilities

components/
├── ui/                # Shadcn UI components (button, card, badge, etc.)
├── magicui/           # Animation components (blur-fade, typewriter, particles)
└── sections/          # Page sections (hero, about, services, portfolio, etc.)

lib/utils.ts           # cn() helper for class merging
public/                # Static assets
```

## Key Sections
1. **Hero** - Animated headline, typewriter, trust badges
2. **About** - Founder story, timeline, value propositions
3. **Services** - 4 service cards (Architecture, AI/ML, Full-Stack, Embedded)
4. **Portfolio** - Project case studies with tech badges
5. **Pricing** - 4 packages (Discovery FREE, Architecture Sprint, Embedded Partner, Project Build)
6. **Contact** - Cal.com booking integration, contact methods

## Design Theme
- **Dark theme** by default (slate-950 background)
- **Primary accent:** Emerald (#10B981) for CTAs and highlights
- **Secondary accent:** Orange (#F97316) for emphasis
- **Glassmorphism effects** on cards
- **Code-inspired aesthetics** (monospace fonts, terminal elements)

## Reference Documents
Located in project root:
- `Ohboy_Consultancy_Website_Mother_Document.docx` - Full content, brand story, services
- `Ohboy_Shadcn_UX_UI_Design_Document.docx` - Design specs, component guidelines

## Brand & Value Propositions

### Tagline
"Bridging Hardware, Software, and AI"

### Value Props (Outcome-Focused)
- **Ship Fast** - "Weeks, not months" - Rapid delivery
- **One Expert, Full Stack** - No team coordination overhead
- **No Vendor Lock-in** - Best tool for the job
- **Lean Solutions** - No over-engineering, lower maintenance

### The "Ohboy Moment"
The moment a client realizes: "One senior engineer delivering what would typically require 3 specialists and months of coordination."

### Client Benefits
1. **Speed** - Prototype to production in weeks
2. **Cost** - Fractional CTO without full-time overhead
3. **Risk** - Battle-tested at Olympic scale
4. **Simplicity** - Single point of contact
