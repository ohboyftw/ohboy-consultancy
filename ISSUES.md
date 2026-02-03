# Ohboy Consultancy Website - Code Review Issue Tracker

**Review Date:** 2026-02-03
**Framework:** Next.js 14 with App Router, Shadcn/UI, Tailwind CSS

## Summary

| Severity | Count | Status |
|----------|-------|--------|
| Critical | 2 | **2 FIXED** |
| High | 8 | **4 FIXED**, 4 Open |
| Medium | 15 | Open |
| Low | 12 | **1 FIXED**, 11 Open |
| **Total** | **37** | **7 Fixed, 30 Open** |

**Build Status:** ✅ Passing (as of 2026-02-03)

---

## Critical Issues

### ~~ISSUE-001: Missing Form Validation and XSS Prevention~~ FIXED
- **Severity:** Critical
- **Category:** Security
- **File:** `components/sections/contact.tsx`
- **Lines:** 55-63
- **Description:** The contact form directly interpolates user input into a mailto URL without sanitization. The `formState.name` value is not encoded in the subject parameter.
- **Fix Applied:** All user inputs (name, email, message) now encoded with `encodeURIComponent()`. Subject and body both sanitized.

### ~~ISSUE-002: Deprecated next/image Configuration~~ FIXED
- **Severity:** Critical
- **Category:** Best Practices
- **File:** `next.config.mjs`
- **Description:** The `domains` configuration is deprecated in Next.js 14. Should use `remotePatterns` instead for image optimization.
- **Fix Applied:** Updated to `remotePatterns` syntax with explicit protocol and hostname.

---

## High Priority Issues

### ~~ISSUE-003: Missing Accessible Labels on Navigation~~ FIXED
- **Severity:** High
- **Category:** Accessibility
- **File:** `components/sections/navbar.tsx`
- **Description:** Mobile menu button lacks aria-label for screen readers.
- **Fix Applied:** Added `aria-label="Open navigation menu"` to hamburger button.

### ~~ISSUE-004: Missing aria-labels on Icon-Only Links~~ FIXED
- **Severity:** High
- **Category:** Accessibility
- **Files:** `components/sections/about.tsx`, `components/sections/navbar.tsx`
- **Description:** GitHub and LinkedIn icon links missing accessible labels.
- **Fix Applied:** Added aria-labels to all icon links in navbar and about sections.

### ISSUE-005: Form Labels Not Associated with Inputs
- **Severity:** High
- **Category:** Accessibility
- **File:** `components/sections/contact.tsx`
- **Description:** Form inputs use placeholder text instead of proper `<label>` elements.
- **Suggested Fix:** Add associated `<label>` elements with `htmlFor` attributes.

### ISSUE-006: Hardcoded Calendar Link
- **Severity:** High
- **Category:** Bug
- **File:** `components/sections/contact.tsx`, `components/sections/pricing.tsx`
- **Description:** Calendar booking link points to generic `https://cal.com` instead of actual booking URL.
- **Suggested Fix:** Update to actual Cal.com booking URL (e.g., `https://cal.com/aravind-ohboy`).

### ISSUE-007: Unused Variables in Navbar
- **Severity:** High
- **Category:** Code Quality
- **File:** `components/sections/navbar.tsx`
- **Description:** Potential unused imports or variables detected.
- **Suggested Fix:** Run `npm run lint` and remove unused code.

### ISSUE-008: Particles Component O(n^2) Performance
- **Severity:** High
- **Category:** Performance
- **File:** `components/magicui/particles.tsx`
- **Description:** Particle connection logic may have O(n^2) complexity with large particle counts.
- **Suggested Fix:** Implement spatial partitioning or limit connection checks.

### ~~ISSUE-009: Missing Error Boundary~~ FIXED
- **Severity:** High
- **Category:** Best Practices
- **File:** `app/error.tsx`
- **Description:** No error boundary to gracefully handle runtime errors.
- **Fix Applied:** Created `app/error.tsx` and `app/not-found.tsx` with branded error pages.

### ~~ISSUE-010: Missing OpenGraph Image~~ FIXED
- **Severity:** High
- **Category:** SEO
- **File:** `app/layout.tsx`
- **Description:** OpenGraph metadata missing image property - critical for social sharing.
- **Fix Applied:** Added images, icons, twitter card, and robots metadata to layout.

---

## Medium Priority Issues

### ISSUE-011: Unused Props in Particles Component
- **Severity:** Medium
- **Category:** Code Quality
- **File:** `components/magicui/particles.tsx`
- **Description:** Some props may be defined but not used in component logic.

### ISSUE-012: Missing Twitter/X Card Metadata
- **Severity:** Medium
- **Category:** SEO
- **File:** `app/layout.tsx`
- **Description:** No Twitter card metadata for X/Twitter sharing.
- **Suggested Fix:** Add `twitter` metadata with card, title, description, images.

### ISSUE-013: Missing robots Metadata and Sitemap
- **Severity:** Medium
- **Category:** SEO
- **Files:** Missing `app/sitemap.ts`, `app/robots.ts`
- **Description:** No programmatic sitemap or robots.txt for search engines.
- **Suggested Fix:** Create Next.js metadata files for sitemap and robots.

### ISSUE-014: Inconsistent Key Usage in Lists
- **Severity:** Medium
- **Category:** Best Practices
- **Files:** Multiple section components
- **Description:** Using array index as React key instead of unique identifiers.
- **Suggested Fix:** Use unique IDs (e.g., `badge.name`, `service.title`) as keys.

### ISSUE-015: Missing Focus Visible Styles on Filter Buttons
- **Severity:** Medium
- **Category:** Accessibility
- **File:** `components/sections/portfolio.tsx`
- **Description:** Portfolio filter buttons may lack visible focus indicators.
- **Suggested Fix:** Add `focus-visible:ring-2 focus-visible:ring-primary` classes.

### ISSUE-016: Potential Memory Leak in Typewriter Effect
- **Severity:** Medium
- **Category:** Performance
- **File:** `components/magicui/typewriter.tsx`
- **Description:** Interval/timeout may not be properly cleaned up on unmount.
- **Suggested Fix:** Ensure cleanup in useEffect return function.

### ISSUE-017: Missing Skip-to-Content Link
- **Severity:** Medium
- **Category:** Accessibility
- **File:** `app/layout.tsx`
- **Description:** No skip navigation link for keyboard users.
- **Suggested Fix:** Add visually hidden skip link before navbar.

### ISSUE-018: Non-Semantic HTML in Footer
- **Severity:** Medium
- **Category:** Accessibility/SEO
- **File:** `components/sections/footer.tsx`
- **Description:** Footer may not use proper semantic elements (`<address>`, `<nav>`).
- **Suggested Fix:** Use semantic HTML5 elements appropriately.

### ISSUE-019: Contrast Ratio on Muted Text
- **Severity:** Medium
- **Category:** Accessibility
- **File:** `app/globals.css`
- **Description:** `--muted-foreground` (#94A3B8) on dark backgrounds may not meet WCAG AA for small text.
- **Suggested Fix:** Verify contrast ratios and adjust if below 4.5:1.

### ISSUE-020: No Loading States
- **Severity:** Medium
- **Category:** UX
- **Files:** Multiple
- **Description:** No loading indicators for form submission or navigation.
- **Suggested Fix:** Add loading states with Suspense or loading.tsx.

### ISSUE-021: Missing Canonical URL
- **Severity:** Medium
- **Category:** SEO
- **File:** `app/layout.tsx`
- **Description:** No canonical URL in metadata.
- **Suggested Fix:** Add `metadataBase` and canonical URL.

### ISSUE-022: No Viewport Meta Customization
- **Severity:** Medium
- **Category:** Mobile
- **File:** `app/layout.tsx`
- **Description:** Using default viewport without explicit configuration.
- **Suggested Fix:** Add explicit viewport metadata if needed.

### ISSUE-023: Missing Preconnect for External Resources
- **Severity:** Medium
- **Category:** Performance
- **File:** `app/layout.tsx`
- **Description:** No preconnect hints for Google Fonts or external services.
- **Suggested Fix:** Next.js handles fonts, but verify other external resources.

### ISSUE-024: Inline Styles in Some Components
- **Severity:** Medium
- **Category:** Code Quality
- **Files:** Various
- **Description:** Some inline styles could be Tailwind utilities.
- **Suggested Fix:** Convert inline styles to Tailwind classes for consistency.

### ISSUE-025: Missing Component Documentation
- **Severity:** Medium
- **Category:** Maintainability
- **Files:** All components
- **Description:** No JSDoc or prop documentation on exported components.
- **Suggested Fix:** Add brief JSDoc comments to component exports.

---

## Low Priority Issues

### ISSUE-026: Inconsistent Icon Sizes
- **Severity:** Low
- **Category:** Consistency
- **Files:** Multiple section components
- **Description:** Icon sizes vary (16, 18, 20, 24) without clear pattern.
- **Suggested Fix:** Establish icon size scale and apply consistently.

### ISSUE-027: Bundle Size - Framer Motion
- **Severity:** Low
- **Category:** Performance
- **Description:** Framer Motion adds ~30kb to bundle. May want tree-shaking.
- **Suggested Fix:** Import only needed functions, consider alternatives for simple animations.

### ISSUE-028: CSS Custom Scrollbar Not Cross-Browser
- **Severity:** Low
- **Category:** Compatibility
- **File:** `app/globals.css`
- **Description:** WebKit scrollbar styles don't work in Firefox.
- **Suggested Fix:** Add Firefox scrollbar-width/color properties.

### ISSUE-029: Missing Structured Data (JSON-LD)
- **Severity:** Low
- **Category:** SEO
- **File:** `app/layout.tsx`
- **Description:** No JSON-LD structured data for Organization, Service, Person.
- **Suggested Fix:** Add JSON-LD script in layout for rich search results.

### ~~ISSUE-030: No Custom 404 Page~~ FIXED
- **Severity:** Low
- **Category:** UX
- **File:** `app/not-found.tsx`
- **Description:** No custom 404 error page.
- **Fix Applied:** Created branded not-found.tsx with navigation options.

### ISSUE-031: Potential Hydration Mismatch - Footer Year
- **Severity:** Low
- **Category:** Bug
- **File:** `components/sections/footer.tsx`
- **Description:** Dynamic year generation may cause hydration mismatch.
- **Suggested Fix:** Use suppressHydrationWarning or generate at build time.

### ISSUE-032: No Favicon Variants
- **Severity:** Low
- **Category:** Branding
- **File:** `public/`
- **Description:** Missing various favicon sizes (apple-touch-icon, etc.).
- **Suggested Fix:** Generate favicon set and add to public/.

### ISSUE-033: Hardcoded Strings
- **Severity:** Low
- **Category:** Maintainability
- **Files:** Section components
- **Description:** Content hardcoded in components rather than data files.
- **Suggested Fix:** Consider extracting to content files for easier updates.

### ISSUE-034: Missing Web Manifest
- **Severity:** Low
- **Category:** PWA
- **File:** Missing `public/manifest.json`
- **Description:** No web app manifest for PWA support.
- **Suggested Fix:** Add manifest.json if PWA features desired.

### ISSUE-035: Console Statements
- **Severity:** Low
- **Category:** Code Quality
- **Files:** Various
- **Description:** Check for any remaining console.log statements.
- **Suggested Fix:** Remove or guard console statements for production.

### ISSUE-036: Missing Tests
- **Severity:** Low
- **Category:** Quality
- **Description:** No test files found in project.
- **Suggested Fix:** Add Jest/Vitest and React Testing Library for critical components.

### ISSUE-037: No CI/CD Configuration
- **Severity:** Low
- **Category:** DevOps
- **Description:** No GitHub Actions or deployment workflow.
- **Suggested Fix:** Add `.github/workflows` for automated testing and deployment.

---

## Immediate Actions Required

1. **Fix form XSS vulnerability** (ISSUE-001) - Security critical
2. **Update deprecated next/image config** (ISSUE-002) - Compatibility
3. **Add accessibility labels** (ISSUE-003, 004, 005) - WCAG compliance
4. **Fix broken calendar link** (ISSUE-006) - Functionality
5. **Add error boundary** (ISSUE-009) - Stability
6. **Add OpenGraph image** (ISSUE-010) - Social sharing

---

## Notes

- Most issues are straightforward fixes
- Accessibility issues should be prioritized for professional consulting brand
- SEO improvements will help with discoverability
- Performance optimizations can wait until after launch
