# PrepMaster AI — Routes Specification

**Status:** Draft (Phase 1)
**Routing model:** Next.js App Router (file-based, under `app/`)
**Auth gate:** `middleware.ts` — `/dashboard/*` requires `STUDENT` or `ADMIN`; `/admin/*` requires `ADMIN`.

---

## Conventions
- **RSC** — React Server Component (App Router default).
- **SSR** — server-rendered on each request.
- **SSG / ISR** — static at build, optionally revalidated.
- **Action** — server action invoked by a form submission or client interaction.
- Route segments in `[brackets]` are dynamic.
- "Key files" lists the primary `page.tsx` (and `layout.tsx` where relevant). Co-located actions live alongside in `actions.ts`.

---

## 1. Public Routes

Layout: `app/(marketing)/layout.tsx` — top nav + footer.

| Path | Auth | Rendering | Purpose | Key files |
| --- | --- | --- | --- | --- |
| `/` | Public | SSG | Marketing home — hero, features, exam coverage, social proof, CTA. | `app/page.tsx` |
| `/courses` | Public | SSR (RSC reads from DB) | Browseable course catalog with exam/difficulty filters. | `app/courses/page.tsx` |
| `/courses/[slug]` | Public | SSR + ISR | Course detail — outline, free preview lessons, enroll CTA. | `app/courses/[slug]/page.tsx` |
| `/mock-tests` | Public | SSR | List of public mock tests; the actual attempt requires auth. | `app/mock-tests/page.tsx` |
| `/study-material` | Public | SSG | Curated free study resources. | `app/study-material/page.tsx` |
| `/blog` | Public | SSR + ISR | Listing of published posts with category/tag filter. | `app/blog/page.tsx` |
| `/blog/[slug]` | Public | SSR + ISR | Blog post detail with OG metadata. | `app/blog/[slug]/page.tsx` |
| `/pricing` | Public | SSG | Free vs. paid comparison (paid is a placeholder for MVP). | `app/pricing/page.tsx` |
| `/contact` | Public | SSR + Action | Contact form posting to a server action. | `app/contact/page.tsx`, `app/contact/actions.ts` |
| `/login` | Public (redirect to `/dashboard` if signed in) | SSR + Action | Email + password sign-in. | `app/login/page.tsx` |
| `/register` | Public (same redirect) | SSR + Action | Self-serve signup (creates a `STUDENT`). | `app/register/page.tsx`, `app/register/actions.ts` |

---

## 2. Student Routes (require `STUDENT` or `ADMIN`)

Layout: `app/dashboard/layout.tsx` — sidebar + topbar + signed-in user chip.

| Path | Rendering | Purpose | Notable actions |
| --- | --- | --- | --- |
| `/dashboard` | SSR | Personal home — continue learning, upcoming tests, recent results, streak. | — |
| `/dashboard/courses` | SSR | Enrolled courses with course-level progress. | — |
| `/dashboard/courses/[courseId]` | SSR | Course outline with module/lesson list and completion state. | — |
| `/dashboard/lessons/[lessonId]` | SSR | Lesson player — markdown body or embedded video; prev/next; mark complete. | `markLessonComplete` |
| `/dashboard/tests` | SSR | Tabs: available / in-progress / completed. | — |
| `/dashboard/tests/[testId]` | SSR | Test detail — instructions, rules, start CTA. | `startAttempt` |
| `/dashboard/tests/[testId]/attempt` | RSC shell + client island for the attempt UI | Full-screen attempt UI: question canvas, navigation grid, timer, mark-for-review, auto-save (15 s), auto-submit on expiry. | `saveAnswer`, `markForReview`, `submitAttempt` |
| `/dashboard/results/[attemptId]` | SSR | Scorecard, topic breakdown, question-by-question review, AI feedback panel. | `regenerateFeedback` (manual retry) |
| `/dashboard/analytics` | SSR | Accuracy trend, topic mastery heatmap, weak topics. | — |
| `/dashboard/profile` | SSR + Action | Name, target exam, password change. | `updateProfile`, `changePassword` |

---

## 3. Admin Routes (require `ADMIN`)

Layout: `app/admin/layout.tsx` — admin sidebar.

| Path | Rendering | Purpose | Notable actions |
| --- | --- | --- | --- |
| `/admin` | SSR | Platform metrics: signups, active students, attempts, etc. | — |
| `/admin/courses` | SSR | List + filter + delete (soft). | `deleteCourse` |
| `/admin/courses/new` | SSR + Action | Create a course (title, slug, description, cover, tags). | `createCourse` |
| `/admin/courses/[id]/edit` | SSR + Action | Edit course and manage its modules and lessons (nested). | `updateCourse`, `upsertModule`, `upsertLesson`, `reorderLessons` |
| `/admin/questions` | SSR | Question bank — filter by topic, difficulty, type. | — |
| `/admin/questions/new` | SSR + Action | Create question (stem, options/answer, explanation, tags). | `createQuestion` |
| `/admin/questions/[id]/edit` | SSR + Action | Edit a question. | `updateQuestion` |
| `/admin/tests` | SSR | List of tests. | — |
| `/admin/tests/new` | SSR + Action | Compose a test: pick questions from the bank; set duration and marking. | `createTest` |
| `/admin/tests/[id]/edit` | SSR + Action | Edit test composition and metadata. | `updateTest`, `reorderTestQuestions` |
| `/admin/blog` | SSR | List of posts. | — |
| `/admin/blog/new` | SSR + Action | Author a new post (markdown editor). | `createBlogPost` |
| `/admin/blog/[id]/edit` | SSR + Action | Edit a post; toggle published state. | `updateBlogPost`, `togglePublished` |
| `/admin/users` | SSR + Action | List, filter, change role, deactivate. | `setUserRole`, `setUserActive` |

---

## 4. API and Special Endpoints

| Path | Purpose | Notes |
| --- | --- | --- |
| `/api/auth/[...nextauth]` | NextAuth route handlers | Provided by `next-auth`. Credentials provider only in MVP. |
| `/sitemap.xml` | SEO sitemap | Generated via Next file convention (`app/sitemap.ts`). |
| `/robots.txt` | Crawler directives | `app/robots.ts`. |

Server actions live next to their feature pages (`actions.ts`). There is no global `/api` shape beyond NextAuth.

---

## 5. Middleware Matrix

| Path matcher | Behavior |
| --- | --- |
| `/dashboard/:path*` | Require session with role in {`STUDENT`, `ADMIN`}; otherwise redirect to `/login?callbackUrl=...`. |
| `/admin/:path*` | Require session with role `ADMIN`; if `STUDENT`, respond 403 / redirect to `/dashboard`. |
| `/login`, `/register` | If a valid session exists, redirect to `/dashboard`. |
| All other paths | Pass through. |

---

## 6. Route Groups and Layouts Summary

| Group | Folder | Layout responsibilities |
| --- | --- | --- |
| Marketing | `app/(marketing)/` | Top nav, footer, light theme, marketing-only metadata defaults. |
| Auth | `app/(auth)/` (optional) | Centered form layout for `/login` and `/register`; redirect-if-signed-in handled in middleware. |
| Dashboard | `app/dashboard/` | Sidebar, topbar, user chip, dashboard-only metadata defaults, requires session. |
| Admin | `app/admin/` | Admin sidebar; requires `ADMIN` role. |

Route groups with `()` parens do not add a URL segment — they only affect layout composition.

---

## 7. Open Questions
- Do we want a separate `/dashboard/help` or in-app docs page in MVP? Tentatively deferred.
- Do `/login` and `/register` need their own layout group, or can they share the marketing layout with a slim variant? Decision deferred to Phase 4.
- Sitemap should include published blog and course pages — confirm ISR revalidation cadence (likely 60 s) during Phase 3.
