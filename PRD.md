# PrepMaster AI — Product Requirements Document

**Status:** Draft (Phase 1)
**Owner:** Product
**Last updated:** 2026-05-27

---

## 1. Product Overview
PrepMaster AI is a web platform for students preparing for competitive exams. It bundles structured courses, a mock-test engine, performance analytics, and AI-generated feedback into a single learning loop: students study lessons, practice on exam-grade mock tests, and receive personalized, AI-driven guidance on what to study next.

The platform is delivered as a responsive web application. The launch MVP targets English-only content and a free tier. Payments, live classes, and native mobile apps are deferred.

---

## 2. Problem Statement
Students preparing for competitive exams (JEE, NEET, UPSC, banking, SSC, GATE, and similar) typically face:

- Fragmented resources spread across YouTube, PDFs, coaching portals, and Telegram groups, with no single source of truth.
- One-size-fits-all coaching that ignores individual strengths and weaknesses.
- High costs for offline coaching and brand-name test series, putting quality prep out of reach for many.
- A weak feedback loop after attempting a test — students see a score but rarely a clear, actionable *what to do next*.
- Mock tests that mimic real-exam UX poorly (no proper timer, no navigation grid, no review flow).

PrepMaster AI addresses these by combining curated courses, exam-grade mock tests, and AI feedback that turns each attempt into a specific next step.

---

## 3. Target Users
- **Primary:** Students aged 16–25 actively preparing for a competitive exam over a 6–18 month horizon.
- **Secondary:** Repeaters and working professionals studying part-time for entrance or government exams.
- **Tertiary:** Self-learners who want exam-style practice without committing to a coaching center.

Operating assumptions:
- Most users discover and browse the platform on mobile; study sessions skew toward desktop or tablet.
- Network connectivity is unreliable in many target geographies — the app must degrade gracefully on slow networks.
- Users care deeply about exam authenticity (UI, marking scheme, navigation behavior).

---

## 4. User Roles

| Role | Auth | Capabilities |
| --- | --- | --- |
| **Guest** | Unauthenticated | Browse public marketing site; view course catalog (no enrollment); read blog posts and free study material; see pricing; submit contact form; register or log in. |
| **Student** | Authenticated, `role = STUDENT` | Enroll in courses; consume lessons; attempt mock tests; view personal results, analytics, and AI feedback; manage profile. |
| **Admin** | Authenticated, `role = ADMIN` | Manage all content (courses, modules, lessons, questions, tests, blog posts); manage users; view platform-wide metrics. |

Role transitions:
- Guest → Student via self-serve registration.
- Student → Admin only by manual promotion from an existing admin via the admin user management screen.

---

## 5. Core Features (MVP)
1. Public marketing site with SEO-friendly pages.
2. Email + password authentication via NextAuth credentials provider.
3. Course catalog with Course → Module → Lesson hierarchy.
4. Lesson viewer for text/markdown and embedded video lessons.
5. Mock test engine with timer, navigation grid, mark-for-review, auto-save, and auto-submit.
6. Detailed result page with question-by-question review.
7. AI feedback summary on every completed attempt.
8. Personal analytics dashboard.
9. Blog and study-resource system.
10. Admin CRUD for all content and users.

---

## 6. Public Website Requirements
- **Home (`/`):** Hero with value proposition, feature highlights, exam coverage, social proof, primary CTA to register.
- **Courses (`/courses`):** Filterable catalog (by exam tag, difficulty).
- **Course detail (`/courses/[slug]`):** Outline, prerequisites, free preview lessons, enroll CTA.
- **Mock tests (`/mock-tests`):** Public listing of available test series; guests must register to attempt.
- **Study material (`/study-material`):** Curated free resources (notes, formula sheets, downloadable PDFs).
- **Blog (`/blog`, `/blog/[slug]`):** Long-form articles, exam tips, success stories with categories and tags.
- **Pricing (`/pricing`):** Free-tier and (placeholder) paid-tier comparison. No checkout in MVP.
- **Contact (`/contact`):** Form posting to a server action that records or emails an admin inbox.
- **Login / Register (`/login`, `/register`):** Email + password.

Non-functional:
- Mobile-first responsive.
- Lighthouse Performance ≥ 85 on `/`, `/courses`, `/blog`.
- OpenGraph and Twitter card metadata on every public route.
- `robots.txt` and `sitemap.xml` generated at build time.

---

## 7. Student Dashboard Requirements
- **Home (`/dashboard`):** "Continue learning" tile, upcoming/recommended tests, last 3 results, weekly streak indicator.
- **My courses (`/dashboard/courses`):** Enrolled courses with course-level progress.
- **Course detail (`/dashboard/courses/[courseId]`):** Module/lesson outline with completed/incomplete state.
- **Lesson player (`/dashboard/lessons/[lessonId]`):** Lesson body, prev/next navigation, mark-complete action.
- **My tests (`/dashboard/tests`):** Tabs for available, in-progress, completed.
- **Test detail (`/dashboard/tests/[testId]`):** Instructions, rules, start-attempt CTA.
- **Attempt screen (`/dashboard/tests/[testId]/attempt`):** Full-screen test UI; auto-save every 15 seconds; resume on browser reload within the active window.
- **Result (`/dashboard/results/[attemptId]`):** Scorecard, topic breakdown, question-by-question review, AI feedback panel.
- **Analytics (`/dashboard/analytics`):** Accuracy trend, topic mastery heatmap, time-management chart.
- **Profile (`/dashboard/profile`):** Name, target exam, password change.

---

## 8. Admin Dashboard Requirements
- **Home (`/admin`):** Active students, courses published, tests attempted (last 7/30 days), recent signups.
- **Courses (`/admin/courses`, `/new`, `/[id]/edit`):** List + CRUD; nested module/lesson editor with reordering.
- **Questions (`/admin/questions`, `/new`, `/[id]/edit`):** Question bank with type, difficulty, topic tags, explanation.
- **Tests (`/admin/tests`, `/new`, `/[id]/edit`):** Compose tests by selecting questions from the bank; configure duration and marking scheme.
- **Blog (`/admin/blog`, `/new`, `/[id]/edit`):** Markdown editor, publish/unpublish toggle.
- **Users (`/admin/users`):** List, filter, change role, deactivate.

All mutating screens use server actions and surface explicit success/error feedback.

---

## 9. Course System Requirements
- Hierarchy: Course → Module (ordered) → Lesson (ordered).
- Lesson types (MVP): `TEXT` (markdown body), `VIDEO` (YouTube/Vimeo embed via URL).
- Free-preview flag on individual lessons — guests can view those without enrolling.
- One `Enrollment` row per (user, course) for the free tier.
- Per-lesson completion is tracked; course progress is derived (`completed / total`).
- Soft-delete for courses to preserve historical enrollments.
- Optional lesson attachments (PDF/image) — deferred to post-MVP.

---

## 10. Mock Test Engine Requirements
- Tests are composed of an ordered list of references into the shared question bank.
- Question types (MVP):
  - `MCQ_SINGLE` — exactly one correct option.
  - `MCQ_MULTI` — one or more correct options; partial credit deferred to post-MVP.
  - `NUMERIC` — text input validated against an expected value within a tolerance.
- Per-test config: `durationMinutes`, default positive marks, default negative marks, instructions text. Per-question overrides supported via `TestQuestion`.
- Attempt lifecycle: `IN_PROGRESS → SUBMITTED` (manual) or `→ AUTO_SUBMITTED` (timer expiry); abandoned attempts can be `ABANDONED` for cleanup.
- Auto-save attempt state (current answers + remaining time) every 15 seconds. Reload resumes from the last saved snapshot.
- UI components: question canvas, navigation grid with state colors (answered / not answered / marked / not visited / answered & marked), per-question actions (save & next, mark for review, clear response), countdown timer.
- Scoring runs server-side at submission. The answer key is never sent to the client during the attempt.
- Out of scope for MVP: per-section timers, adaptive difficulty, subjective answers, partial credit on multi-select.

---

## 11. Result and Analytics Requirements
- **Scorecard:** total score, max score, percentage, accuracy, time spent, topic-wise breakdown. Rank/percentile deferred (single-user view at MVP).
- **Per-question review:** the student's answer, the correct answer, marks awarded, explanation, time spent.
- **Topic breakdown:** accuracy and average time per topic for the attempt.
- **Analytics dashboard:** trend chart over the last 10 attempts, topic-mastery heatmap, time-management chart, surfaced weak topics.

---

## 12. AI Feedback Requirements
- Generated server-side after attempt submission via the Claude API.
- Input: attempt summary (score, per-topic stats, weakest topics, time-management indicators) — never raw answer keys.
- Output: a 3–5 paragraph narrative covering:
  1. One-line summary of how the attempt went.
  2. What went well.
  3. Where the student lost the most points.
  4. Specific, named recommendations (lessons, topics, follow-up tests).
- Cached against the `TestAttempt` row in a single text column. One manual regeneration allowed per attempt.
- Failure mode: if the Claude API call fails, the result page renders without the AI panel and shows a "retry" button. The page never blocks on feedback.
- Cost control: leverage prompt caching where supported; enforce a per-user daily quota; cap output tokens.

---

## 13. Blog and Resource System Requirements
- Markdown-authored posts with frontmatter (title, slug, summary, cover image, tags, publish state).
- Categories and tag-based filtering on the listing page.
- Author profile (display name and bio) sourced from the `User` row.
- OpenGraph and Twitter card metadata generated per post.
- Featured/pinned flag for the homepage carousel.
- Study material is a sibling content type (curated free notes/PDFs) — surfaced via `/study-material` and seeded by admins.

---

## 14. MVP Scope
**In scope:**
- All public website pages listed in §6.
- Email + password authentication.
- Course catalog, enrollment, lesson viewer (`TEXT` + `VIDEO`).
- Mock test engine for `MCQ_SINGLE`, `MCQ_MULTI`, `NUMERIC`.
- Result page with question review and AI feedback.
- Personal analytics dashboard.
- Admin CRUD for courses, modules, lessons, questions, tests, blog, users.
- Free tier only.

**Stretch (only if Phase 9 lands early):**
- Bookmark questions.
- Test difficulty filter on `/mock-tests`.
- Admin bulk-import of questions via CSV.

---

## 15. Out of Scope (post-MVP)
- Payments, subscriptions, invoicing.
- Live classes, video conferencing, group calls.
- Forums, comments, leaderboards, social profiles.
- Native mobile apps.
- Multi-language support.
- Adaptive recommendation engine.
- Subjective / descriptive question grading.
- Push or email notifications beyond auth flows.
- OAuth providers (Google, GitHub, etc.) — credentials only at launch.

---

## 16. Success Criteria

| Dimension | Target |
| --- | --- |
| Functional | All P0 user flows from §6–§13 working end-to-end in production. |
| Quality | Zero P0/P1 bugs at launch; no more than 10 known P2 issues. |
| Performance | Lighthouse Performance ≥ 85 on `/`, `/courses`, `/blog`. p95 dashboard SSR ≤ 1.2 s. |
| Adoption | 50 beta students onboarded by end of week 8; ≥ 30% complete at least one full mock test. |
| AI | ≥ 95% of completed attempts receive a feedback summary within 30 s of submission. |
| Stability | < 1% error rate on attempt submission during the pilot window. |

---

## 17. Two-Month Timeline

| Week | Day range | Focus | Phases |
| --- | --- | --- | --- |
| 1 | 1–7 | PRD, planning, scaffold, base UI primitives | Phase 1 + start of Phase 2 |
| 2 | 8–14 | Complete base UI; start public site | Phase 2 → Phase 3 |
| 3 | 15–21 | Public website pages complete | Phase 3 |
| 4 | 22–28 | Auth + dashboard shells | Phase 4 |
| 5 | 29–35 | Course catalog + lesson viewer | Phase 5 |
| 6 | 36–44 | Mock test engine | Phase 6 |
| 7 | 45–52 | Results + analytics + AI feedback; start admin | Phase 7 + Phase 8 |
| 8 | 53–60 | Admin complete; QA, polish, deploy | Phase 8 → Phase 9 |

Phase-level detail lives in [PROJECT_PLAN.md](./PROJECT_PLAN.md). Route inventory in [ROUTES.md](./ROUTES.md). Data model in [DATABASE_MODELS.md](./DATABASE_MODELS.md).
