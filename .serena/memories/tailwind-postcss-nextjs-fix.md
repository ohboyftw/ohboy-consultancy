# Tailwind CSS PostCSS Configuration Fix for Next.js

## Problem

Tailwind CSS utility classes not being compiled - `@tailwind base; @tailwind components; @tailwind utilities;` directives appear unchanged in the final CSS output.

### Symptoms
- Flexbox layouts don't work (elements stack vertically instead of horizontally)
- `min-h-screen`, `flex`, `items-center`, `justify-center` classes have no effect
- Computed styles show `display: block` instead of `display: flex`
- Custom fonts don't load (fallback to Times New Roman)
- CSS variables work but utility classes don't

## Root Cause

Next.js 14.x may not properly load PostCSS configuration when using ESM format (`.mjs` extension).

## Solution

Convert `postcss.config.mjs` (ESM) to `postcss.config.js` (CommonJS):

### Before (broken - ESM format)
```js
// postcss.config.mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
```

### After (working - CommonJS format)
```js
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

## Steps to Fix

1. Delete `postcss.config.mjs`
2. Create `postcss.config.js` with CommonJS syntax
3. Delete `.next` folder to clear cache
4. Restart the dev server (`npm run dev`)

## Verification

Check that Tailwind is processing by:
1. Inspecting computed styles in browser - `flex` class should result in `display: flex`
2. Checking that `@tailwind` directives don't appear in the final CSS output
3. Confirming custom fonts are loading (not Times New Roman)

## Tech Stack Context
- Next.js 14.1.0
- Tailwind CSS 3.4.x
- PostCSS 8.x

## Note for Tailwind v4

If using Tailwind v4, the PostCSS plugin changed to `@tailwindcss/postcss`:
```js
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

And the CSS entry should be:
```css
@import "tailwindcss";
```
