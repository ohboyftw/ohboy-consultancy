# Code Style & Conventions - Ohboy Consultancy Website

## TypeScript/React Conventions

### Component Structure
- Use **named exports** for components: `export function ComponentName() {}`
- Components in `components/sections/` are page sections
- Components in `components/ui/` are reusable Shadcn UI components
- Components in `components/magicui/` are animation utilities

### File Organization
- One component per file
- File name matches component name in kebab-case: `blur-fade.tsx` → `BlurFade`
- Client components marked with `"use client"` directive at top

### Import Order
1. React/framework imports
2. Third-party libraries (framer-motion, lucide-react)
3. Internal components (`@/components/...`)
4. Utilities (`@/lib/utils`)
5. Types (if separate)

### Naming Conventions
- **Components:** PascalCase (`Hero`, `ServiceCard`)
- **Files:** kebab-case (`blur-fade.tsx`, `number-ticker.tsx`)
- **Variables/Functions:** camelCase
- **CSS classes:** Tailwind utilities, kebab-case for custom classes
- **Constants:** SCREAMING_SNAKE_CASE for static data arrays

## Styling Conventions

### Tailwind CSS
- Use Tailwind utilities directly in JSX
- Use `cn()` helper from `@/lib/utils` for conditional classes
- Custom CSS variables defined in `app/globals.css`

### Color Usage
- Use semantic tokens: `bg-background`, `text-foreground`, `bg-card`
- Primary accent: `text-emerald-*`, `bg-emerald-*`
- Muted text: `text-slate-400`, `text-muted-foreground`

### Animation Patterns
- Wrap content with `<BlurFade delay={n}>` for scroll reveals
- Use staggered delays: `delay={0.1 + i * 0.05}`
- Framer Motion for complex animations
- CSS transitions for simple hover states

### Card Hover Effects
```tsx
className="card-glow"  // Adds hover glow effect
```

## Component Patterns

### Button Variants
```tsx
<Button variant="gradient" size="xl">Primary CTA</Button>
<Button variant="outline" size="xl">Secondary CTA</Button>
```

### Responsive Design
- Mobile-first approach
- Common breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Use `flex-col sm:flex-row` for stacked → horizontal layouts

## File Header Pattern
```tsx
"use client";  // Only if using hooks/interactivity

import { motion } from "framer-motion";
import { IconName } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/magicui/blur-fade";
```
