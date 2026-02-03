# Design System - Ohboy Consultancy Website

## Color Palette (CSS Variables)

### Core Colors
| Token | HSL | Hex | Usage |
|-------|-----|-----|-------|
| `--background` | 222.2 84% 4.9% | #020617 | Page background |
| `--foreground` | 210 40% 98% | #F8FAFC | Primary text |
| `--card` | 222.2 84% 6% | ~#0F172A | Card surfaces |
| `--primary` | 160 84% 39% | #10B981 | Emerald accent |
| `--accent` | 25 95% 53% | #F97316 | Orange emphasis |
| `--muted` | 217.2 32.6% 17.5% | #1E293B | Muted backgrounds |
| `--muted-foreground` | 215 20.2% 65.1% | #94A3B8 | Secondary text |
| `--border` | 217.2 32.6% 17.5% | #334155 | Borders |

### Accent Colors (Syntax Highlighting Inspired)
- **Cyan:** #22D3EE - Links, interactive elements
- **Purple:** #A78BFA - Tags, keywords
- **Yellow:** #FBBF24 - Warnings, highlights
- **Pink:** #F472B6 - Special accents

## Typography

### Font Families
- **Display (--font-space):** Space Grotesk - Hero headlines, section titles
- **Body (--font-jakarta):** Plus Jakarta Sans - Body text, descriptions
- **Mono (--font-jetbrains):** JetBrains Mono - Code, tech badges, terminal

### Type Scale
| Element | Size | Weight | Tailwind |
|---------|------|--------|----------|
| Hero Title | 72px | 700 | text-7xl font-bold |
| Section Title | 48px | 600 | text-5xl font-semibold |
| Card Title | 24px | 600 | text-2xl font-semibold |
| Body Large | 18px | 400 | text-lg |
| Body | 16px | 400 | text-base |
| Small | 14px | 400 | text-sm |

## Custom Utility Classes

### Gradients
```css
.text-gradient          /* White → slate gradient text */
.text-gradient-emerald  /* Emerald gradient text */
.text-gradient-orange   /* Orange gradient text */
```

### Glass Effects
```css
.glass       /* Glassmorphism background */
.glass-card  /* Card with glass effect */
```

### Glow Effects
```css
.glow-emerald         /* Subtle emerald shadow */
.glow-emerald-strong  /* Strong emerald shadow */
.card-glow            /* Hover glow effect */
```

### Terminal Style
```css
.terminal-window  /* Terminal container */
.terminal-header  /* Terminal top bar */
.terminal-dot     /* Colored dots */
```

## Animation Guidelines

### BlurFade Entry Animation
- Default delay increment: 0.05s
- Start delay: 0.1s
- Pattern: `delay={0.1 + i * 0.05}`

### Hover Transitions
- Duration: 0.2s - 0.5s
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)`
- Card lift: `hover:-translate-y-1`

### Scroll Behavior
- Smooth scrolling enabled globally
- Section IDs for anchor navigation (#about, #services, etc.)

## Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| default | < 640px | Single column, stacked |
| sm: | ≥ 640px | 2-column grids begin |
| md: | ≥ 768px | Desktop nav, 2-col services |
| lg: | ≥ 1024px | Full layouts |
| xl: | ≥ 1280px | Max-width container |

## Brand Keywords
- **Tagline:** "Bridging Hardware, Software, and AI"
- **Values:** Grit, Quest for Knowledge, Stack-Agnostic, First-Principles
- **Tone:** Technical authority + creative boldness
