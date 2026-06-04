# PrepMaster AI — Design System

> **Status: LOCKED.** This is the single source of truth for the PrepMaster AI public website visual direction. Treat it as authoritative. Read it fully before writing any UI code, and keep it updated as components are implemented. The brand name is always written exactly **PrepMaster AI**.
>
> **Scope of this file:** design reference only. It does not build or edit UI. Pair it with `colors_and_type.css`, `assets/`, and the reference recreation in `ui_kits/website/`.

---

## 1. Visual Summary

**Overall look & feel.** Premium editorial-academic. A warm cream canvas punctuated by **golden feature blocks**, set with **large elegant serif headlines** and a quiet humanist-sans body. Generous whitespace, modular bordered card grids, rounded pill buttons, and a signature **Bauhaus geometric pattern band** as the recurring decorative device. The mood is calm, intelligent, and premium — like a well-made academic journal that became a product.

**How close to stay.** **Very close.** This is a locked direction. Match the spacing, type, palette balance, and component styling shown in `ui_kits/website/`. Reuse the patterns; do not redesign them.

**What to avoid.**
- ❌ Generic blue/purple SaaS gradients, glassmorphism, neon glows.
- ❌ Emoji anywhere. Childish or playful illustration.
- ❌ Pure black (`#000`) — use ink `#170E09`. Pure white pages — use cream.
- ❌ Heavy drop shadows, hard borders, dense/cramped layouts.
- ❌ Cards with a colored left-border accent stripe.
- ❌ Teal as a primary/large fill (see palette rules below).
- ❌ Inventing new colors or fonts outside this system.

---

## 2. Brand System

**Logo.** Wordmark **"PrepMaster AI"** set in the display serif (Newsreader) Medium, `-0.02em` tracking, paired with a square Bauhaus **mark** (`assets/mark.svg` for light surfaces, `assets/mark-cream.svg` for dark). "AI" is tinted with the warm accent (orange on light) or gold (on dark).

- **Navbar logo:** mark (~34px) + wordmark, dark ink text, "AI" in `--orange-500`. Clickable → home.
- **Footer logo:** mark + wordmark on ink background, cream text, "AI" in `--gold-200`.
- **Favicon / app icon:** the standalone mark tile (`assets/mark.svg`) — rounded ink square with the split-circle/quarter motif. Export 32 / 180 / 512px PNGs from it.

**Rules.** Minimum logo clear space = height of the mark. Never recolor the mark arbitrarily, stretch it, or set the wordmark in a non-serif face.

**Asset references.**
- Logo marks: `assets/mark.svg`, `assets/mark-cream.svg`
- Pattern band: `assets/pattern-band.svg`
- Tokens: `colors_and_type.css` (root)
- Reference recreation: `ui_kits/website/` (open `index.html`)
- Brand & content rules: `README.md` (root)

---

## 3. Color Tokens

Exact brand palette (do not alter): `#FAE199 #FDE08A #DAC27B #B69E58 #D89147 #E5C36D #F2B463 #635237 #170E09 #549FAA`. Cream neutrals are derived to complete the system.

```js
// tailwind.config.js → theme.extend.colors
colors: {
  // raw brand ramp
  gold:  { 100:'#FDE08A', 200:'#FAE199', 300:'#E5C36D', 400:'#DAC27B', 500:'#B69E58' },
  amber: '#F2B463',
  orange:'#D89147',
  brown: '#635237',
  ink:   '#170E09',
  teal:  '#549FAA',
  cream: { 50:'#FDFBF6', 100:'#FAF5EC', 200:'#F3EBDC', 300:'#E9DEC9' },

  // semantic (use these in components)
  background:      '#FAF5EC', // cream-100, page
  'bg-bright':     '#FDFBF6', // cream-50, alternating sections
  surface:         '#FFFFFF', // cards on cream
  'surface-muted': '#F7F1E6', // soft inset blocks
  'text-primary':  '#170E09', // ink
  'text-secondary':'#4A3F30',
  'text-muted':    '#7A6E5B',
  border:          '#E4D9C4', // hairline
  'cta-primary':   '#170E09', // ink pill (cream text #FBF4E6)
  'cta-secondary': '#FAE199', // gold pill / outline uses border+ink
  'accent-warm':   '#D89147', // orange — links, small highlights
  'accent-ai':     '#549FAA', // teal — AI/analytics/charts ONLY
  success: '#4E8C6A',
  warning: '#D89147',
  error:   '#C2502F',
}
```

**Palette usage rules (LOCKED):**
- **Golden-dominant.** Cream base + golden feature blocks (`gold-200`) carry the brand. Per screen: cream background + 1 golden block family + ink text + at most 2 accent hues.
- **Teal is reserved** for AI analytics, charts, performance insights, focus rings, and small highlights — **never** a large background fill or primary button.
- **Orange** = warm accent for links, eyebrows, the "AI" in the logo, and pattern-band shapes.
- **On-ink text** uses `#FBF4E6`. **Text on gold blocks** uses `#2A2113`.
- **Never pure black** (`#000`) for text — always ink `#170E09`. Body copy on cream uses `text-secondary` (`#4A3F30`), not pure ink.

---

## 4. Typography

- **Heading font:** **Newsreader** (Google Fonts) — editorial old-style serif. Weights 400/500.
- **Body / UI font:** **Hanken Grotesk** (Google Fonts) — warm humanist grotesque. 400/500/600/700.
- **Data / mono:** **Spline Sans Mono** — scores, percentiles, timers, ranks (tabular numerals).

Wire all three via `next/font`. Load Phosphor Icons for iconography.

| Element | Font | Size (desktop) | Weight | Tracking / Leading | Case |
|---|---|---|---|---|---|
| **h1 / hero** | Newsreader | 56–64px | 400 | −0.02em / 1.04 | Sentence |
| **h2 / section** | Newsreader | 38–40px | 400 | −0.02em / 1.12 | Sentence |
| **h3 / card title** | Newsreader | 19–22px | 500 | normal / 1.2 | Sentence |
| **body** | Hanken Grotesk | 16–18px | 400 | normal / 1.6 | Sentence |
| **caption / meta** | Hanken Grotesk | 13px | 400/500 | normal / 1.5 | Sentence |
| **eyebrow / overline** | Hanken Grotesk | 12px | 600 | 0.14em / — | UPPERCASE |
| **button** | Hanken Grotesk | 14–15px | 600 | normal | Sentence |
| **badge** | Hanken Grotesk | 12px | 600 | normal | Sentence |
| **data / scores** | Spline Sans Mono | per context | 600 | −0.02em, tabular | — |

**Typography rules:**
- **Serif for headings, sans for everything functional.**
- Sentence case everywhere. **Title Case only for proper product names** (e.g. *AI Performance Insights*).
- **Uppercase only for tracked eyebrows / overlines.** No ALL-CAPS body.
- Body copy on cream uses `text-secondary` (`#4A3F30`), not pure ink.

---

## 5. Layout Rules

- **Containers.** `max-w-[1320px]` (wide layouts) / `max-w-[1200px]` (text-dense layouts), centered. Padding `px-8` desktop → `px-5` mobile.
- **Grids.** Use CSS grid with consistent `gap` (20–24px). Equal-height cards. Never rely on inline-flow spacing.
- **Section rhythm.** Alternate section backgrounds between `cream-100` (`background`) and `cream-50` (`bg-bright`). Reserve golden blocks for hero accents, the pattern-band CTA, and featured pricing.
- **Section vertical padding.** Desktop 56–96px; mobile ~48px.
- **Whitespace.** Generous. Avoid dense/cramped layouts.

**Homepage section order:**
1. Navbar (sticky)
2. Hero
3. Stats (trust band)
4. Featured courses
5. Mock test preview
6. AI analytics preview
7. Decorative pattern band (golden CTA feature block)
8. Testimonials
9. Pricing preview
10. FAQ
11. Final CTA
12. Footer

---

## 6. Component Rules

**Component list to build.**
`Navbar` · `Hero` · `StatsSection` · `CourseCard` · `FeaturedCourses` · `MockTestPreview` (+ `MockTestCard`) · `AIAnalyticsSection` · `Testimonials` (+ `TestimonialCard`) · `FAQSection` (accordion) · `PricingCard` · `CTASection` · `PatternBand` · `BlogCard` · `Footer`.

**Shared primitives (build first):**
`Button` (ink / outline / gold), `LearnMore` (label + circular-arrow ring), `Badge`, `Eyebrow`, `SectionHead`, `Photo` (image with rounded frame + fallback), `Container` (max-width wrapper).

> Reference implementations exist in `ui_kits/website/components.jsx`, `Navbar.jsx`, `Sections.jsx`, `Sections2.jsx`, `Dashboard.jsx` — port these to Tailwind/Next components.

### Per-component styling

**Navbar.** Sticky top, `bg-background/82` + `backdrop-blur-md`, 1px bottom border (`border`). Left: logo. Center/left: text links (`text-secondary` → `text-primary` on hover, 15px/500). Right: "Log in" text link + primary "Start free trial" pill. Height ~64px, container `px-8`.

**Footer.** Ink background, cream text. 4-column grid (brand blurb + 3 link columns). Column headers 13px/600 cream; links `#C9BCA6` → cream on hover. Bottom sub-bar with 1px top divider: copyright left, Privacy/Terms right.

**Buttons (pills, `rounded-full`).**
- *Primary:* ink fill, `#FBF4E6` text, `px-6 py-3`. Hover: lift `-1px` + `shadow-md`.
- *Secondary (outline):* transparent, `inset 0 0 0 1.5px ink`, ink text. Hover: `bg-ink/5`.
- *Gold:* `gold-200` fill, on-gold text, subtle border. Hover: lift + `shadow-md`.
- All: 600 weight, `whitespace-nowrap`, optional trailing Phosphor icon, 150–180ms ease transition. Press: `scale(.98)`.

**Cards (base).** `bg-surface`, `rounded-[20px]`, hairline border (`inset 0 0 0 1px border`), no/soft shadow at rest. Hover: lift `-3px` + `shadow-md`, border fades. ~20–24px internal padding.

**Course cards.** Top thumbnail band (~104px) in a tinted fill (gold/teal/cream) with a Phosphor subject icon top-left and optional `Badge` top-right. Body: eyebrow (exam·topic), serif h3 title, meta row (lessons · hrs) with small icons in `text-muted`.

**Mock test cards.** `bg-surface`, rounded icon tile (`gold-200`, exam glyph) + state badge ("● Live now" / "New"). Serif title, mono meta row (questions · min · level), divider, footer with `LearnMore` ("Start mock") + "instant AI report" note.

**AI analytics cards.** **Ink background**, cream text. Eyebrow in `gold-200`. Conic-gradient **accuracy dial** using `teal` for the filled arc + mono % in center; topic bars use gold/teal/orange fills on `white/10` tracks. Insight callout on `white/6` with a Phosphor `sparkle` in gold. **Teal is the signature color here.**

**Blog cards.** Rounded cover image (16:10) with hairline border, then below-image: eyebrow category, serif h3 title, footer row (read time + small `arrow-up-right`). Whole card lifts on hover.

**Pricing cards.** `rounded-[28px]`. Standard = surface + hairline border. **Featured (Pro)** = ink background, cream text, `shadow-lg`, `scale-[1.03]`, "Most popular" gold badge inline in the header row. Price in serif (38px), period in muted sans (`whitespace-nowrap`). Feature list with Phosphor `check-circle` (orange on light, gold on ink). Full-width CTA at bottom.

**Forms.** Inputs: `bg-surface`, `rounded-[14px]`, hairline border, `px-4 py-3`, optional leading Phosphor icon in `text-muted`. Focus: `inset 0 0 0 1.5px ink` (or 2px teal ring for emphasis), icon → ink. Search variant uses `rounded-full`. Labels 12px/600 `text-secondary`.

**Badges.** `rounded-full`, 12px/600, `px-3 py-1`. Tones: gold (`gold-200`/on-gold), teal (`#E4F0F2`/`#2C6068`), ink (ink/cream), live (`#F7E6DF`/`#8E2F18`).

**Pattern bands.** Tile `assets/pattern-band.svg` via `background-repeat: repeat-x; background-size: auto <h>px`. Anchor to the **bottom of golden feature blocks** and use as section dividers. **Decorative only** — never behind body text.

---

## 7. Interaction Rules

- **Hover states.** Cards lift `translateY(-3px)` + gain `shadow-md`; nav/footer links shift to a darker/cream tone; primary button lifts `-1px`; `LearnMore` arrow nudges right and its ring inverts (fills ink).
- **Transitions.** Calm, short: **150–220ms ease-out**. No bounce/spring. Entering content may fade + slide-up ~12px.
- **Shadows.** Soft, warm-tinted `rgba(23,14,9,…)`, low opacity: `xs` hairline, `sm` resting card, `md` hover, `lg` modal/featured. No hard drops.
- **Card lift.** `transform: translateY(-3px)` + shadow swap from inset-border to `md`.
- **Button hover.** Lift + shadow (filled) or `bg-ink/5` (outline). Press: `scale(.98)`.
- **Focus.** 2px **teal** ring with offset — visible and on-brand.
- **Responsive menu.** Below `md`, collapse nav links into a hamburger → slide-down/overlay panel on cream with `backdrop-blur`; CTA pill stays visible; close on link tap.

---

## 8. Responsive Rules

- **Containers.** `max-w-[1320px]` (wide) / `max-w-[1200px]` (text-dense), centered, `px-8` desktop → `px-5` mobile.
- **Mobile (`< 640px`).** Single column. Card grids → 1 col. Hero stacks (copy above image). h1 → ~40px, h2 → ~30px. Section vertical padding ~48px. Hamburger nav. Pricing cards stack (featured loses `scale`).
- **Tablet (`640–1024px`).** 2-col course/blog grids, 2–3 col mocks. Hero may stay stacked or 2-col depending on width. Pricing 1–2 cols.
- **Desktop (`≥ 1024px`).** 4-col featured courses, 3-col mocks/blog/pricing, 2-col hero & AI analytics. Section padding 56–96px.
- **Grid rules.** Use CSS grid with consistent `gap` (20–24px). Equal-height cards. Never rely on inline-flow spacing.

---

## 9. Page-Specific Notes

- **Home.** Section order from §5. Alternate section backgrounds between `cream-100` and `cream-50` for rhythm; reserve golden blocks for hero accents, the pattern-band CTA, and featured-pricing.
- **Courses (listing).** Sticky filter bar of pill **chips** (All / CAT / CUET / MBA / Aptitude) + search field. Responsive `CourseCard` grid (4→2→1). Optional sort dropdown (styled select).
- **Course detail.** Editorial header (eyebrow, serif h1, meta row, primary CTA), then 2-col: syllabus/lesson list (left) + sticky enroll card (right, surface, price, includes, CTA). Use `LearnMore`/accordion for module expand.
- **Mock tests.** Tabs/segmented control (Full-length / Sectional / Topic drills). `MockTestCard` grid with live/new badges. Each links to an instructions screen → "instant AI report" promise reinforced.
- **Study material.** Resource grid of soft bordered cards (Phosphor icon, title, short desc, `LearnMore`) — mirrors the reference "Essential Resources" grid. Group by subject with `SectionHead`s.
- **Blog (listing).** Featured post (large 2-col) then `BlogCard` grid (3→2→1). Category chips for filtering.
- **Blog detail.** Centered reading column (`max-w-[720px]`), serif h1, author/date/read-time meta, generous body leading (1.7), pull-quotes in serif, cover image with hairline frame. Related posts row at the end.
- **Pricing.** Three `PricingCard`s (Free / Pro featured / Mentor), then an FAQ accordion and a final CTA section. Optional monthly/quarterly toggle.
- **Contact.** Two-col: form (name/email/exam-target select/message) on surface card + supporting info (response time, links) beside it. Submit = primary pill.

---

## 10. Implementation Checklist (for future Claude Code prompts)

When implementing UI against this system:

1. **Read this file fully first** and treat it as authoritative. Also read `colors_and_type.css`, `assets/`, and `ui_kits/website/` if present (port patterns, don't redesign).
2. **Setup:** add the semantic Tailwind color tokens (§3) to `tailwind.config`. Wire the three Google Fonts (Newsreader, Hanken Grotesk, Spline Sans Mono) via `next/font`. Load Phosphor Icons.
3. **Build shared primitives first** (§6), then section components, then pages.
4. **Honor the locked rules:** golden-dominant palette, teal only for AI/analytics/focus, ink (never pure black) for text + primary CTA, no emoji, no blue/purple SaaS gradients, no left-border-accent cards.
5. **Type:** serif headings + sans body + mono data; sentence case (Title Case only for product names); uppercase only for tracked eyebrows.
6. **Motion:** cards lift `-3px` with soft shadow on hover; transitions 150–220ms ease-out, no bounce; focus = 2px teal ring.
7. **Build production-quality** React/Next + Tailwind: clean, accessible, responsive. Use clearly-marked placeholder content/images where real assets are missing.
8. **Keep this file updated** to reflect what was actually implemented.

---

## 11. Implementation Status (Phase 3 — public website UI)

Implemented against this system on the existing Next.js 16 + **Tailwind v4** project.

**Sanctioned deviations from the locked direction:**
- **Icons:** Phosphor is not installed; the project already ships **lucide-react** (and `lib/sample-data.ts` types icons as `LucideIcon`). Lucide is used throughout as the icon set. Swap to Phosphor later if desired — icon usage is centralised in the marketing components.
- **Assets:** `colors_and_type.css` and `ui_kits/website/` were not present. Brand SVGs were authored fresh in `public/`: `mark.svg`, `mark-cream.svg`, `pattern-band.svg`.

**Token wiring (Tailwind v4, CSS-first):**
- Tokens live in `app/globals.css` under a dedicated `@theme` block, **namespaced** so they don't collide with the shadcn tokens used by the dashboard/admin areas. Notable name changes vs §3 to avoid collisions: page background = `bg-cream-100` / `bg-cream-50`; hairline border = `border-line`; secondary text = `text-cocoa`; muted text = `text-taupe`; on-ink text = `text-cream-text`; on-gold text = `text-gold-ink`. Raw ramp (`gold-*`, `cream-*`, `ink`, `teal`, `orange`, `amber`, `brown`) matches §3 exactly.
- Fonts wired via `next/font` in `app/layout.tsx`: Newsreader (`font-serif`), Hanken Grotesk (`font-ui`), Spline Sans Mono (`font-data`).
- Helpers in `globals.css`: `.eyebrow`, `.focus-ring` (2px teal), `.pattern-band`, `animate-fade-up`, and warm shadows `shadow-card` / `shadow-card-hover` / `shadow-feature`.

**Components** live in `components/marketing/` (sections + primitives in `primitives.tsx`) and `components/layout/` (navbar, footer, site-shell). The marketing canvas (cream + ink text + `font-ui`) is applied via `SiteShell`, leaving the dashboard/admin theme untouched.

**Pages implemented:** `/`, `/courses`, `/courses/[slug]`, `/mock-tests`, `/study-material`, `/blog`, `/blog/[slug]`, `/pricing`, `/contact`.

**Out of scope (as instructed):** no database, real auth, or payment logic. Forms and downloads are sample-only and clearly marked. The blog post body and pricing tiers are sample content.
