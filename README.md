# PrepMaster AI

**Smarter preparation for competitive exams** — structured courses, exam-grade mock tests, and AI-style performance feedback that turns every attempt into a clear next step.

PrepMaster AI is a full **front-end prototype** of a competitive-exam learning platform, built with Next.js 16 and Tailwind v4. It ships a complete, polished UI across the public marketing site, the student dashboard, the mock-test engine, the analytics/AI-feedback experience, and a full admin content-management dashboard — all running on **sample/static data**.

> **Prototype scope.** This build is UI-complete and submission-ready. Database (Prisma), authentication (NextAuth), AI feedback (Claude API), and payments are **designed but intentionally not wired** — every screen renders from in-repo sample data so the entire experience is navigable end-to-end without any backend. See [Current Limitations](#current-limitations).

---

## Project Description

Students preparing for exams like CAT, CUET, JEE, NEET, UPSC, SSC, GATE, and banking face fragmented resources, one-size-fits-all coaching, and a weak feedback loop after each test. PrepMaster AI brings courses, exam-realistic mock tests, and personalized AI feedback into a single learning loop: **study → attempt → improve**. Each mock test ends with an instant, mentor-style report on exactly what to revise next.

---

## Feature Overview

- **Premium editorial-academic design system** — a warm cream/gold canvas, serif headlines, and teal reserved for analytics. Fully documented in [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md).
- **Public marketing site** — hero, featured courses, mock-test preview, AI-analytics section, testimonials, pricing, FAQ, blog, study material, and contact.
- **Course & lesson system** — course catalog, course detail with module/lesson outline, and a focused lesson viewer (video/reading, notes, resources, mark-complete, AI study tip) with progress and lock states.
- **Mock-test engine** — instructions screen, then a full-screen attempt interface with a countdown timer, section tabs, a question palette (answered / not-answered / marked / not-visited), mark-for-review, clear-response, and a submit-confirmation modal.
- **Results & analytics** — premium result breakdowns (score, accuracy, percentile, time, section + topic performance, question-wise review with explanations) and an analytics dashboard with Recharts trend charts, time management, and strengths/weaknesses.
- **AI feedback (sample)** — a mentor-style insight panel with strengths, weaknesses, time feedback, revision advice, next steps, and a suggested practice set. Generated from computed sample analytics (no AI API call).
- **Admin CMS** — overview with content-health, plus full management of courses, questions, tests, blog posts, and users — including search/filter, status badges, and create/edit forms with builders (module/lesson, sections/question-selection).
- **Responsive** across mobile, tablet, and desktop, with accessible focus states.

---

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | **Next.js 16** (App Router, React Server Components, Turbopack) |
| Language | **TypeScript** |
| UI | **React 19** |
| Styling | **Tailwind CSS v4** (CSS-first `@theme` tokens) + a custom brand design system |
| Fonts | Newsreader (serif), Hanken Grotesk (sans), Spline Sans Mono (data) via `next/font` |
| Icons | lucide-react |
| Charts | Recharts |
| Linting | ESLint (`eslint-config-next`) |
| Planned backend | Prisma + PostgreSQL, NextAuth (credentials), Claude API — *not wired in this prototype* |

---

## Project Modules

- **Design system & primitives** — tokens, `Container`, `PillButton`/`PillLink`, `Tag`, `Eyebrow`, `SectionHead`, `LearnMore`, `PatternBand`.
- **Marketing** — homepage sections and shared marketing components.
- **Courses & lessons** — listing, detail, lesson viewer, module list, progress cards, course form.
- **Mock-test engine** — test cards, filter bar, instructions, timer, question card, palette, submit modal, attempt runner.
- **Results & analytics** — result summary, section/topic performance, question review, charts, AI insight panel, recommendations.
- **Admin** — page header, filter bar, tables, status badges, form sections, row actions, and per-entity managers + forms.
- **Sample data layer** (`lib/`) — `sample-data.ts`, `dashboard-data.ts`, `test-data.ts`, `result-data.ts`, `analytics-data.ts`, `admin-data.ts`, `pricing.ts`.

---

## Routes

### Public routes
| Path | Page |
| --- | --- |
| `/` | Marketing home |
| `/courses` | Course catalog (filter + search) |
| `/courses/[slug]` | Course detail |
| `/mock-tests` | Public mock-test listing |
| `/study-material` | Free study resources |
| `/blog` | Blog listing |
| `/blog/[slug]` | Blog post |
| `/pricing` | Pricing (Free / Pro / Mentor) |
| `/contact` | Contact form |
| `/login` · `/register` | Auth screens (UI only) |
| `/privacy` · `/terms` | Legal pages |

### Student routes (`/dashboard`)
| Path | Page |
| --- | --- |
| `/dashboard` | Overview (stats, continue learning, recent results, weak areas, AI recommendation) |
| `/dashboard/courses` | Enrolled courses + recommendations |
| `/dashboard/courses/[courseId]` | Course detail (modules, lessons, progress, outcomes) |
| `/dashboard/lessons/[lessonId]` | Lesson viewer |
| `/dashboard/tests` | Available / In-progress / Completed tests |
| `/dashboard/tests/[testId]` | Test instructions |
| `/dashboard/tests/[testId]/attempt` | Full-screen attempt interface |
| `/dashboard/results` | Results listing (search/filter + improvement summary) |
| `/dashboard/results/[attemptId]` | Result detail + AI feedback |
| `/dashboard/analytics` | Analytics dashboard (charts + AI insight) |
| `/dashboard/profile` | Profile & password (UI only) |

### Admin routes (`/admin`)
| Path | Page |
| --- | --- |
| `/admin` | Admin overview + content health |
| `/admin/courses` · `/new` · `/[id]/edit` | Course management + form (module/lesson builder) |
| `/admin/questions` · `/new` · `/[id]/edit` | Question bank + form (adaptive answer UI) |
| `/admin/tests` · `/new` · `/[id]/edit` | Test management + form (sections + question selection) |
| `/admin/blog` · `/new` · `/[id]/edit` | Blog management + editor-style form |
| `/admin/users` | User management + detail panel |

---

## Setup Instructions

**Prerequisites:** Node.js 18.18+ (Node 20+ recommended) and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Then open **http://localhost:3000**.

No environment variables or database are required to run the prototype — everything renders from sample data.

### How to Run Locally

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack) at `http://localhost:3000` |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

---

## Sample / Demo Credentials

Authentication is **not wired** in this prototype, so the login form does not authenticate — you can navigate to `/dashboard` and `/admin` directly. The login screen displays demo credentials to illustrate the intended roles:

| Role | Email |
| --- | --- |
| Student | `student@prepmaster.ai` |
| Admin | `admin@prepmaster.ai` |

Sample student identity used across the dashboard: **Rajan Punchouty** (target: CAT 2026).

---

## Current Limitations

- **No database** — all content (courses, lessons, tests, questions, attempts, users, blog) is static sample data in `lib/`. Prisma models are designed in [`DATABASE_MODELS.md`](./DATABASE_MODELS.md) but not connected.
- **No real authentication** — login/register are UI only; routes are not gated by role.
- **No AI API** — AI feedback is a templated, mentor-style summary computed from sample analytics; no Claude API call is made.
- **No payments** — pricing tiers are a visual preview; there is no checkout.
- **Admin mutations are visual only** — create/edit forms, publish/unpublish, and delete update local component state and reset on reload.
- **Images are placeholders** — course/blog covers use branded tinted blocks; image URLs in forms are illustrative.

These are deliberate: Phase 9 is a polish/submission milestone, not a backend build.

---

## Future Enhancements

- Wire **Prisma + PostgreSQL** to the existing UI (models already specified).
- **NextAuth** credentials auth + `middleware.ts` role gating for `/dashboard` and `/admin`.
- **Claude API** integration for real AI feedback with prompt caching and a per-user quota.
- Persisted attempt auto-save/resume and server-side scoring.
- Real admin CRUD with server actions and optimistic UI.
- Payments for paid tiers; bookmarks; CSV question import; multi-language.

---

## Screenshots

> _Add screenshots here before submission._

| Screen | Image |
| --- | --- |
| Homepage | `docs/screenshots/home.png` |
| Course detail | `docs/screenshots/course-detail.png` |
| Lesson viewer | `docs/screenshots/lesson.png` |
| Mock-test attempt | `docs/screenshots/attempt.png` |
| Result detail | `docs/screenshots/result.png` |
| Analytics | `docs/screenshots/analytics.png` |
| Admin overview | `docs/screenshots/admin.png` |

---

## Deployment Notes

The app deploys cleanly to **Vercel** with zero configuration (`npm run build`). No environment variables are needed for the prototype. See [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) for step-by-step instructions, the GitHub push workflow, and notes for adding a database later.

---

## Documentation

| Doc | Purpose |
| --- | --- |
| [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) | Locked visual design system |
| [`PRD.md`](./PRD.md) | Product requirements |
| [`PROJECT_PLAN.md`](./PROJECT_PLAN.md) | 60-day phase plan |
| [`ROUTES.md`](./ROUTES.md) | Route inventory |
| [`DATABASE_MODELS.md`](./DATABASE_MODELS.md) | Prisma data model design |
| [`FINAL_PROJECT_REPORT.md`](./FINAL_PROJECT_REPORT.md) | Project report |
| [`TESTING_CHECKLIST.md`](./TESTING_CHECKLIST.md) | Manual QA checklist |
| [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) | Deployment guide |

---

*PrepMaster AI — built as a phased portfolio project. The brand name is always written exactly “PrepMaster AI”.*
