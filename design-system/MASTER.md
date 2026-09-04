# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** UX UI MATE
**Source:** Live site tokens (`css/style.css`, `css/hero.css`, and related sheets)
**Category:** Design studio / B2B service / portfolio
**Stack:** Static HTML + custom CSS (class prefix `mil-`). Not Tailwind. Not a JS framework.

This file documents **what the site already uses**. Do not replace Outfit, `#E5526A`, or `mil-*` patterns with a generic “recommended” system (navy + Archivo, etc.).

---

## Product and voice

- Newcastle-based UX/UI studio. Direct, plain English. No agency fluff.
- Proof before claims: Clutch 5.0, Google 5.0, real case work.
- Primary CTAs: **Start a Project** / **Send your brief** + **Book a 30-min call**.
- Currency and copy: UK English, pounds (`£`).

---

## Global Rules

### Color Palette

| Role | Hex | CSS / class |
|------|-----|-------------|
| Accent / CTA (light) | `#E5526A` | `--mil-accent`, `.mil-accent`, `.mil-button` fill |
| Nav accent (light) | `#e8195a` | `--nav-accent` |
| Ink | `#000000` / `#161616` | `.mil-dark`, `--ed-ink` |
| Body muted | `rgba(0, 0, 0, 0.5)` | `body`, `.mil-dark-soft` |
| Hero lead (higher contrast) | `rgba(0, 0, 0, 0.78)` | `.mil-hero-subtitle` |
| Emphasis in body | `rgba(0, 0, 0, 0.85)` | `.mil-emphasize` |
| White | `#ffffff` | `.mil-white-bg`, `.mil-light` |
| Soft section | `#f2f2f2` | `.mil-soft-bg` |
| Hairline | `rgba(22, 22, 22, 0.1)` | `--ed-line` |
| Dark canvas | `#0d0d0d` | `body.mil-theme-dark` |
| Accent (dark theme) | `#ff9800` | `--mil-dark-accent` (overrides `--mil-accent`) |
| Dark headline tint | `#ffeef3` | `--mil-dark-headline` |
| Proof stars | `#c9a24a` | `.mil-hero-proof__stars` |

**Color notes:** Pink is the only light-mode brand accent. Dark mode swaps accent to amber (`#ff9800`). Do not introduce a second light-mode brand colour. Geometric ornaments use `--mil-geo-*` (black wire in light; amber in dark).

### Typography

- **Family:** Outfit (self-hosted variable font `fonts/outfit/Outfit-VariableFont_wght.woff2`). Fallback: `sans-serif`.
- **Do not** load Google Fonts for headings/body. Do not switch to Archivo / Space Grotesk / Inter.
- **Body:** 16px / weight 300 / line-height 150%. Mobile ≤768px: 15px.
- **Headings:** Outfit, weight 500, line-height 120%, colour black (`.mil-dark` on light).
- **Thin contrast in titles:** wrap the quieter word in `<span class="mil-thin">` (weight 100). In dark theme, thin spans in h1–h3 take `--mil-dark-accent`.
- **UI labels / buttons / links:** 12px, weight 500, uppercase, letter-spacing 2px.

| Level | Desktop | ≤768px |
|-------|---------|--------|
| h1 | 86px (74 / 72 / 58 down the breakpoints) | 34px |
| h2 | 68px | 36px |
| h3 | 42px | 30px |
| h4 | 28px | 22px |
| h5 | 20px | 18px |

**Supertitle:** `.mil-suptitle` — 12px uppercase, 2px tracking.

### Spacing

Site rhythm is **15 / 30 / 60 / 90 / 120**. Prefer existing utilities over new magic numbers.

| Class | Value |
|-------|-------|
| `.mil-mb-15` | 15px |
| `.mil-mb-30` / `.mil-mt-30` | 30px |
| `.mil-mb-60` | 60px |
| `.mil-mb-90` | 90px |
| `.mil-mb-120` | 120px (90px ≤992px) |
| `.mil-p-120-90` | section padding 120 / 90 |
| `.mil-p-120-60` | 120 / 60 |
| `.mil-p-120-30` | 120 / 30 |

Hero: 100vh. Split hero copy is vertically centred; on mobile keep extra top pad for the nav (`css/hero.css`).

### Motion

- Default easing: `0.4s cubic-bezier(0, 0, 0.3642, 1)`.
- Button hover: scale `1.015`, brightness 110%; inner arrow circle scale `1.15`.
- GSAP / Swup page transitions already exist — do not add a second animation library for layout.
- Respect `prefers-reduced-motion` on galleries, fan cards, and scroll ornaments.

### Breakpoints

576, 768, 992, 1200, 1400 (Bootstrap grid + custom). Mobile-first behaviour for split heroes kicks in at **991px**.

---

## Component Specs

### Buttons — `.mil-button`

- Height 70px (60px ≤992px). Radius 70px (pill).
- Background `#E5526A`, text black, padding `0 15px 0 50px`.
- Arrow sits in a 40px black circle; path fill is accent.
- Pair with `.mil-arrow-place` when the SVG is injected by JS.
- Dark theme: fill `--mil-dark-accent`.

### Text links — `.mil-link`

- Same 12px uppercase tracking as buttons.
- Circle icon 40px. `.mil-link.mil-dark` for light sections.
- Hover: icon scale 1.15. Do not underline.

### Hero — `.mil-banner.mil-banner--split`

- Full-bleed photo/video right (`.mil-banner-visual`), copy left (`.mil-banner-copy`).
- Always include breadcrumbs, H1 with optional `.mil-thin`, lead (`.mil-hero-subtitle` or `.mil-dark-soft`), primary button + secondary link, then `.mil-hero-proof` (Clutch + Google).
- Scroll control: `.mil-circle-text`.
- Mockup variant: `.mil-banner--mockup` (About). Desktop copy may sit lower; mobile still centres.

### Proof strip — `.svc-proof`

- Directly under service heroes. Four stats: value (Outfit 600, uppercase, accent) + label (muted).
- Keep four columns desktop, two on ≤992px.

### FAQ — `.mil-quick-guide` / `.mil-accordion-group`

- One FAQ section per service page. Heading **Common questions**. `id="common-questions"`.
- Soft background. Single CTA pair at the end (Start a Project + Book a call).
- Do not add a second “Quick guide” accordion block.

### Cards and work

- Service teasers: `.mil-service-card-sm` / `.mil-card-sm--media`.
- Pricing / offers: fan cards (`.mil-fan-card`).
- Portfolio: existing works fan + case-study layouts. Hover overlay, not a new masonry system.

### Forms

- Existing contact / Calendly / feedback patterns in `css/contact.css` and `css/feedback.css`.
- Labels Outfit. Accent on focus/required. No new form library.

### Icons

- SVG in buttons/links (theme arrow). Brand logos: official Clutch PNG + Google SVG in `img/icons/`.
- No emoji as UI icons. Font Awesome is loaded for a few existing uses — do not expand it for new UI.

---

## Page structure (default service page)

1. Split hero + proof + Clutch/Google
2. Four-stat `.svc-proof` strip
3. “Helps you…” tag row (`.mil-tags`)
4. How we work / process
5. Packages / prices (`#prices`)
6. One Common questions accordion
7. Other services
8. Footer

Homepage: hero → problems → work gallery → services/offers → proof → insights → footer. See `pages/homepage.md` if present.

---

## Anti-patterns

- Do not restyle to navy `#0F172A` / blue CTA `#0369A1` / Archivo.
- Do not add `node_modules` libraries to production pages (site is static HTML).
- Do not invent a second FAQ block or a second hero proof row.
- Do not pin mobile hero copy to the bottom (`align-items: flex-end`).
- Do not use drop shadows as the primary depth language; the site is mostly flat + photo + geometric wireframes.
- Do not put new CSS in random page `<style>` tags when it belongs in `css/hero.css` or `css/style.css`.
- Hosting does not need `.cursor/` or `node_modules/`.

---

## Pre-delivery checklist

- [ ] Outfit only; accent `#E5526A` light / `#ff9800` dark
- [ ] New UI uses `mil-*` utilities and existing components
- [ ] Clickable elements use `cursor: pointer` (buttons/links already do)
- [ ] Hover uses existing 0.4s curve; no layout-shifting scale on cards
- [ ] Light text contrast: prefer `.mil-hero-subtitle` / `.mil-emphasize` over 50% grey for important copy
- [ ] Keyboard focus visible
- [ ] `prefers-reduced-motion` on new motion
- [ ] Check 375, 768, 992, 1440
- [ ] UK English, £, existing CTA labels
