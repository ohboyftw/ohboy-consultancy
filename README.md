# Ohboy Consultancy Website

A modern, responsive technical consulting website built with Next.js 14, Tailwind CSS, Shadcn/UI, and Framer Motion.

![Ohboy Consultancy](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-blue?style=flat-square&logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📁 Project Structure

```
ohboy-consultancy/
├── app/
│   ├── globals.css          # Global styles & CSS variables
│   ├── layout.tsx           # Root layout with fonts & metadata
│   └── page.tsx             # Main page component
├── components/
│   ├── magicui/             # Animation components
│   │   ├── blur-fade.tsx    # Scroll-triggered fade animation
│   │   ├── number-ticker.tsx # Animated number counter
│   │   ├── particles.tsx    # Interactive particle background
│   │   └── typewriter.tsx   # Typewriter text effect
│   ├── sections/            # Page sections
│   │   ├── navbar.tsx       # Navigation with mobile drawer
│   │   ├── hero.tsx         # Hero section with particles
│   │   ├── about.tsx        # About section with timeline
│   │   ├── services.tsx     # Services grid
│   │   ├── portfolio.tsx    # Filterable project showcase
│   │   ├── pricing.tsx      # Pricing cards
│   │   ├── contact.tsx      # Contact form & info
│   │   └── footer.tsx       # Footer with links
│   └── ui/                  # Shadcn/UI components
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── sheet.tsx
│       └── textarea.tsx
├── lib/
│   └── utils.ts             # Utility functions (cn helper)
├── public/                  # Static assets
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies & scripts
```

## 🎨 Design System

### Colors (HSL)
| Token | Value | Usage |
|-------|-------|-------|
| `--background` | 222.2 84% 4.9% | Page background (#020617) |
| `--foreground` | 210 40% 98% | Primary text (#F8FAFC) |
| `--primary` | 160 84% 39% | Emerald accent (#10B981) |
| `--accent` | 25 95% 53% | Orange CTA (#F97316) |
| `--muted-foreground` | 215 20.2% 65.1% | Secondary text (#94A3B8) |
| `--border` | 217.2 32.6% 17.5% | Borders (#1E293B) |

### Typography
| Role | Font | Class |
|------|------|-------|
| Display | Space Grotesk | `font-display` |
| Body | Plus Jakarta Sans | `font-sans` |
| Mono | JetBrains Mono | `font-mono` |

## 🧩 Components

### Shadcn/UI Components
- **Button** - Multiple variants: `default`, `outline`, `ghost`, `gradient`
- **Card** - With variants: `default`, `glass`, `glow`
- **Badge** - Variants: `default`, `tech`, `success`, `warning`, `info`, `purple`
- **Input** / **Textarea** - Styled form inputs
- **Sheet** - Mobile navigation drawer

### Magic UI Components
- **BlurFade** - Scroll-triggered blur & fade animation
- **Typewriter** - Multi-phrase typing animation
- **NumberTicker** - Animated counting numbers
- **Particles** - Interactive particle background

## 🔧 Customization

### Update Content
Edit the data arrays in each section component:
- `components/sections/hero.tsx` - Hero messages, trust badges
- `components/sections/about.tsx` - Stats, values, timeline
- `components/sections/services.tsx` - Services, tech stack
- `components/sections/portfolio.tsx` - Projects
- `components/sections/pricing.tsx` - Packages
- `components/sections/contact.tsx` - Contact methods

### Update Colors
Modify CSS variables in `app/globals.css`:
```css
:root {
  --primary: 160 84% 39%;  /* Change primary color */
  --accent: 25 95% 53%;     /* Change accent color */
}
```

### Add Cal.com Integration
Replace the booking button link in `contact.tsx`:
```tsx
<Link href="https://cal.com/your-username/discovery">
```

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| next | 14.1.0 | React framework |
| react | 18.2.0 | UI library |
| tailwindcss | 3.4.1 | Styling |
| framer-motion | 11.0.3 | Animations |
| lucide-react | 0.312.0 | Icons |
| @radix-ui/* | various | Headless UI primitives |
| class-variance-authority | 0.7.0 | Component variants |
| tailwind-merge | 2.2.1 | Class merging |

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

## 📝 License

MIT License - Feel free to use for your own projects.

## 🤝 Credits

- Design inspired by [Dillonverma/portfolio](https://github.com/dillionverma/portfolio)
- Components from [Shadcn/UI](https://ui.shadcn.com)
- Animations from [Magic UI](https://magicui.design)

---

Built with ❤️ for Ohboy Consultancy by Claude
