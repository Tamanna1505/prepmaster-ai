# PrepMaster AI — 60-Day Project Plan

**Status:** Draft (Phase 1)
**Window:** 60 calendar days from kickoff
**Cadence:** weekly review on Mondays; an explicit phase-exit gate at the end of each phase

---

## Conventions
- Each phase lists: **goal**, **day range**, **scope**, **deliverables**, **exit criteria**.
- Day ranges assume 5–6 working days per week. Slip is absorbed by trimming scope, not by extending the window.
- Phases run sequentially unless overlap is called out explicitly.
- "Done" means deployed and reachable in the dev environment with the exit criteria met — not "code written".

---

## Phase 1 — PRD, Planning, Architecture
- **Goal:** Lock product scope and technical foundations so build phases start without re-planning.
- **Days:** 1–3
- **Scope:**
  - Write the PRD.
  - Write this 60-day plan.
  - Enumerate routes (public, student, admin).
  - Design database models.
  - Decide on auth strategy (NextAuth credentials), deployment target (Vercel + managed Postgres), AI provider (Claude API).
  - Initialize Next.js 16 + Tailwind v4 + shadcn/ui; install baseline dependencies; configure ESLint.
- **Deliverables:** `PRD.md`, `PROJECT_PLAN.md`, `ROUTES.md`, `DATABASE_MODELS.md`; a clean Next.js project booting on `npm run dev`.
- **Exit criteria:** All four planning docs reviewed; dev server boots; baseline dependencies installed and committed.

---

## Phase 2 — Project Setup and Base UI
- **Goal:** A reusable design system and app shell on top of which feature work moves quickly.
- **Days:** 4–10
- **Scope:**
  - Confirm Tailwind v4 base tokens (color scale, radius, typography).
  - Install initial shadcn components: `button`, `input`, `card`, `badge`, `dialog`, `dropdown-menu`, `form`, `label`, `separator`, `sheet`, `sonner` (toasts), `table`, `tabs`, `textarea`.
  - Build `MarketingLayout` (top nav + footer) and `DashboardLayout` (sidebar + topbar) shells.
  - Set up `app/globals.css` design tokens; defer dark-mode behind a flag.
  - Establish `lib/` skeleton:
    - `lib/db.ts` — Prisma client singleton.
    - `lib/auth.ts` — NextAuth config (skeleton, no providers yet).
    - `lib/utils.ts` — `cn()` and small helpers (already created by shadcn init).
    - `lib/validation/` — Zod schema home.
  - Configure Prisma (SQLite for dev, Postgres for prod); generate the first empty migration.
  - Add scripts: `db:generate`, `db:migrate`, `db:seed`.
- **Deliverables:** App shells, design tokens, baseline component imports, Prisma client wired up.
- **Exit criteria:** Public and dashboard shells render with placeholder content; `prisma migrate dev` runs cleanly; `npm run lint` and `tsc --noEmit` are clean.

---

## Phase 3 — Public Website
- **Goal:** Ship every guest-facing page to production quality.
- **Days:** 11–21
- **Scope:**
  - `/` — hero, features, exam coverage, testimonials, CTA.
  - `/courses` — server-rendered listing (uses placeholder data until Phase 5 seeds courses).
  - `/courses/[slug]` — course detail with outline + preview lessons.
  - `/mock-tests` — public listing.
  - `/study-material` — curated free resources.
  - `/blog`, `/blog/[slug]` — listing + detail, markdown rendered.
  - `/pricing` — free vs paid comparison (paid is a placeholder).
  - `/contact` — form posting to a server action.
  - `/login`, `/register` — pages only; logic wired in Phase 4.
  - SEO: per-page OpenGraph, `sitemap.xml`, `robots.txt`.
- **Deliverables:** All public routes navigable and responsive.
- **Exit criteria:** Lighthouse Performance ≥ 85 on `/`, `/courses`, `/blog`; all routes pass typecheck and lint.

---

## Phase 4 — Authentication and Dashboards
- **Goal:** Working auth flow and signed-in shells (no real features yet).
- **Days:** 22–28
- **Scope:**
  - NextAuth credentials provider; session strategy `jwt`; role claim baked into the token.
  - `register` server action: validate with Zod, hash with `bcryptjs`, create `User` with `role = STUDENT`.
  - `login` flow and a `middleware.ts` that gates `/dashboard/*` and `/admin/*` by role.
  - Student and Admin route groups, each with its own layout.
  - Sign-out and a read-only profile page.
  - Auth tests: happy-path login, bad credentials, student hitting `/admin` is rejected.
- **Deliverables:** Working credentials login/register/logout; student and admin dashboards reachable behind the role gate.
- **Exit criteria:** A registered student lands on `/dashboard`; a student hitting `/admin` is redirected; an admin reaches `/admin`.

---

## Phase 5 — Course and Lesson System
- **Goal:** Students can enroll and consume lessons end-to-end.
- **Days:** 29–35
- **Scope:**
  - Activate Prisma models `Course`, `Module`, `Lesson`, `Enrollment`; run migration.
  - Switch public `/courses` and `/courses/[slug]` from placeholders to live DB reads.
  - `enroll` server action (free tier) that creates an `Enrollment` row.
  - Student `/dashboard/courses` and `/dashboard/courses/[courseId]` outline.
  - `/dashboard/lessons/[lessonId]` viewer — markdown render for `TEXT`, embedded player for `VIDEO`.
  - `markComplete` action and progress derivation.
  - Seed one full sample course (3 modules, 8–10 lessons).
- **Deliverables:** A student can enroll in the seeded course, open lessons, and mark them complete.
- **Exit criteria:** Course progress updates in real time; the "continue learning" tile on `/dashboard` points to the next incomplete lesson.

---

## Phase 6 — Mock Test Engine
- **Goal:** Students can attempt a timed mock test and submit it correctly.
- **Days:** 36–44
- **Scope:**
  - Activate Prisma models `Question`, `Test`, `TestQuestion`, `TestAttempt`, `TestAnswer`; run migration.
  - `/dashboard/tests` and `/dashboard/tests/[testId]` — instructions, rules, start CTA.
  - `/dashboard/tests/[testId]/attempt` — full-screen attempt UI:
    - Question canvas.
    - Navigation grid with state colors (answered / not answered / marked / not visited / answered & marked).
    - Per-question actions: save & next, mark for review, clear response.
    - Countdown timer.
    - Auto-save every 15 seconds; resume on reload.
    - Auto-submit on timer expiry.
  - Server actions: `startAttempt`, `saveAnswer`, `markForReview`, `submitAttempt`.
  - Scoring runs server-side at submission. The answer key is never sent to the client during the attempt.
  - Seed one full sample test (≥ 20 questions, mixed types).
- **Deliverables:** A student can complete a full mock test including resume after browser reload.
- **Exit criteria:** Submitting a test creates a `TestAttempt` with correct totals and time-spent metrics; refreshing during an attempt resumes within 2 seconds.

---

## Phase 7 — Results, Analytics, and AI Feedback
- **Goal:** Turn an attempt into actionable insight.
- **Days:** 45–52
- **Scope:**
  - `/dashboard/results/[attemptId]` — scorecard, topic breakdown, question-by-question review with explanations.
  - `/dashboard/analytics` — accuracy trend over last 10 attempts, topic mastery heatmap, time-management chart, weak topics list.
  - `lib/ai.ts` — Claude API integration that generates the feedback narrative.
  - Background generation pattern: result page renders immediately; AI panel hydrates when ready; manual retry button on failure.
  - Prompt caching where supported; per-user daily quota.
- **Deliverables:** Result and analytics pages live; AI feedback panel populated for completed attempts.
- **Exit criteria:** ≥ 95% of submitted attempts in staging produce a feedback summary within 30 s; failures degrade gracefully.

---

## Phase 8 — Admin Dashboard
- **Goal:** Internal staff can run the platform without engineering involvement.
- **Days:** 51–56 (overlaps the tail of Phase 7)
- **Scope:**
  - `/admin` — at-a-glance metrics.
  - Courses CRUD with nested module/lesson editor and reorder.
  - Question bank CRUD with topic, sub-topic, difficulty, type, explanation.
  - Test composer — pick questions from the bank, set duration and marking scheme.
  - Blog CRUD with markdown editor + publish toggle.
  - Users — list, filter, change role, deactivate.
  - `createdAt` / `updatedAt` populated on all mutations for auditability.
- **Deliverables:** Every content type can be created, edited, and removed from the admin UI.
- **Exit criteria:** A new admin user can seed a course + test + blog post end-to-end without touching the database.

---

## Phase 9 — Testing, Polish, Deployment
- **Goal:** Ship a stable MVP.
- **Days:** 57–60
- **Scope:**
  - End-to-end smoke tests covering the critical paths: register → enroll → take test → see feedback.
  - Manual QA pass against the Success Criteria in `PRD.md` §16.
  - Accessibility sweep on public + dashboard pages (keyboard navigation, contrast ratios, form labels).
  - Performance pass: image optimization, RSC/island boundaries, Prisma query review (N+1 hunts).
  - Security review: rate-limit auth and attempt-submit endpoints; secrets confined to env; NextAuth CSRF posture verified.
  - Production deploy (Vercel + managed Postgres); database backups configured.
  - Post-deploy monitoring: log drain, error tracking, basic uptime check.
- **Deliverables:** Production URL with the MVP live; runbook for incidents; rollback procedure verified.
- **Exit criteria:** All Success Criteria in PRD §16 met; pilot cohort invited.

---

## Risks and Mitigations

| Risk | Likelihood | Mitigation |
| --- | --- | --- |
| Next.js 16 API surprises (per `AGENTS.md` note) | Medium | Read `node_modules/next/dist/docs/` before any non-trivial code; small spikes first. |
| AI feedback latency or cost overruns | Medium | Prompt caching; per-user daily quota; result page never blocks on AI; cap output tokens. |
| Test engine edge cases (clock drift, mid-attempt refresh, network drops) | High | Server-authoritative timer; auto-save on every answer change as well as the 15 s interval. |
| Scope creep into payments / live classes | High | Treat PRD §15 (Out of Scope) as a hard fence. Any new request triggers a PRD update. |
| Single-developer bandwidth | High | Each phase has a hard day budget; cut stretch goals first; "done" is reachable in dev, not "code written". |
| Data loss on Postgres migration during pilot | Low | Backups before any destructive migration; `prisma migrate deploy` not `db push` in prod. |

---

## Cross-Phase Workstreams
Some work doesn't belong to a single phase and is folded into the closest one without a separate budget:

- **Type safety:** Zod schemas for all server actions and form inputs.
- **Telemetry:** structured logging (Phase 9), error tracking (Phase 9).
- **Seed scripts:** grow incrementally — Phase 5 seeds a course, Phase 6 seeds a test, Phase 8 seeds blog content.
- **Docs:** keep `PRD.md`, `ROUTES.md`, and `DATABASE_MODELS.md` updated as we go; out-of-date docs are worse than no docs.
