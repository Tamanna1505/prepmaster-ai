# PrepMaster AI — Backend Plan

**Status:** Planning (no backend code written yet)
**Audience:** the engineer (or Claude Code) who will implement the real full-stack version, phase by phase.
**Companion docs:** [`PRD.md`](./PRD.md), [`PROJECT_PLAN.md`](./PROJECT_PLAN.md), [`ROUTES.md`](./ROUTES.md), [`DATABASE_MODELS.md`](./DATABASE_MODELS.md), [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md), [`README.md`](./README.md).

> This document plans the work only. It does **not** add backend code, modify the Prisma schema, or touch authentication files. It refines and extends `DATABASE_MODELS.md` where noted (notably an explicit `LessonProgress` model and an optional `AIRecommendation` model).

---

## 1. Backend Objective

PrepMaster AI is currently a **polished front-end prototype**: every screen — the public marketing site, the student dashboard, the mock-test engine, the analytics/AI-feedback experience, and the admin CMS — renders from **in-repo sample/static data** under `lib/` (`sample-data.ts`, `dashboard-data.ts`, `test-data.ts`, `result-data.ts`, `analytics-data.ts`, `admin-data.ts`). There is no database, no real authentication, and no AI API call.

**The objective of the backend phase is to convert this prototype into a real, database-driven, full-stack application** without redesigning the UI:

- Replace each `lib/*-data.ts` source with live database reads/writes through Prisma.
- Add real authentication and role-based route protection.
- Persist enrollment, lesson progress, test attempts, and results.
- Compute scores and analytics **on the server** from stored data.
- Generate AI feedback (rule-based first, real AI optional later).

The UI, design system, routes, and component contracts stay as they are; only the data layer and access control change. The existing sample-data shapes were intentionally modeled to mirror the planned schema (e.g. `toPublicTest()` already strips the answer key), so the migration is a swap of data sources, not a rewrite.

---

## 2. Backend Architecture

Request/response flow, top to bottom:

```
Browser UI (React Server + Client Components)
   │
   ▼
Next.js App Router
   ├── Server Components  → read data directly via Prisma (server-side)
   └── Client Components  → call Server Actions / fetch API Routes
   │
   ▼
Server Actions  &  API Routes        (the only places mutations happen)
   │
   ▼
Zod validation                       (validate & parse every input at the boundary)
   │
   ▼
Auth + Authorization layer           (Auth.js session + role checks; middleware gate)
   │
   ▼
Service / data-access functions      (lib/services/*, thin, typed, reusable)
   │
   ▼
Prisma ORM                           (lib/db.ts singleton)
   │
   ▼
PostgreSQL database                  (Neon / Supabase in prod, SQLite optional for local)
```

Principles:

- **Reads** happen in Server Components (or service functions they call) — no API round-trip for first paint.
- **Writes** happen only in Server Actions (forms/buttons) or API Routes (NextAuth handler, webhooks). Never trust the client for anything authoritative (scores, roles, ownership).
- **Validation** (Zod) sits at every server boundary before Prisma is touched.
- **Authorization** is checked in three places: `middleware.ts` (coarse route gate), the Server Action/Route (fine-grained ownership/role), and the data-access function (defensive `where` clauses scoped to the current user).

---

## 3. Technology Stack

| Technology | Role in the backend |
| --- | --- |
| **Next.js 16** (App Router) | Server Components for reads, Server Actions + Route Handlers for writes, `middleware.ts` for route gating. |
| **TypeScript** | End-to-end type safety from Prisma types → service functions → components. |
| **PostgreSQL** | The production relational database. |
| **Prisma** | Schema definition, migrations, and the typed query client (`lib/db.ts`). |
| **Auth.js / NextAuth** | Authentication — credentials provider, JWT session, role claim in the token. (`next-auth` v4 is already installed.) |
| **bcryptjs** | Hash and verify passwords (already installed). |
| **Zod** | Validate and parse every form/action input; one schema per action (already installed). |
| **Server Actions** | The default mutation mechanism for forms and buttons (create/update/delete, enroll, submit attempt). |
| **API Routes (Route Handlers)** | NextAuth handler at `/api/auth/[...nextauth]`; any future webhooks or non-form endpoints. |
| **Vercel** | Hosting, build, preview deploys, environment variables, cron (optional, for the abandoned-attempt janitor). |
| **Neon or Supabase PostgreSQL** | Managed Postgres providing `DATABASE_URL`. Either works; Neon's serverless driver pairs well with Vercel. |
| **GitHub** | Source control; PR previews trigger Vercel deploys. |

---

## 4. Environment Variables

Create `.env.local` for local dev and set the same keys in **Vercel → Settings → Environment Variables** for production.

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string used by Prisma. |
| `NEXTAUTH_SECRET` | Yes | Secret used by Auth.js to sign/encrypt the JWT session. Generate with `openssl rand -base64 32`. |
| `NEXTAUTH_URL` | Yes | Canonical app URL (e.g. `http://localhost:3000` locally, `https://<app>.vercel.app` in prod). |
| `AI_API_KEY` | Optional | Key for the AI provider (e.g. Anthropic). If absent, the app falls back to rule-based feedback (see §14). |
| `NEXT_PUBLIC_APP_URL` | Optional | Public base URL for absolute links / OpenGraph. Exposed to the client (hence the `NEXT_PUBLIC_` prefix). |

Rules:

- **`.env` / `.env.local` must never be committed.** Confirm they are in `.gitignore` (the Next.js default ignores `.env*`). Only commit a redacted `.env.example`.
- Secrets (`DATABASE_URL`, `NEXTAUTH_SECRET`, `AI_API_KEY`) must never be referenced in client components or `NEXT_PUBLIC_*` variables.
- A `.env.example` with placeholder values should be committed so contributors know which keys to set.

```bash
# .env.example (commit this; never commit the real .env.local)
DATABASE_URL="postgresql://user:password@host:5432/prepmaster?schema=public"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
# AI_API_KEY=""
# NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 5. Database Model Plan

Conventions (consistent with `DATABASE_MODELS.md`): every table has `id` (cuid), `createdAt` (default now), `updatedAt` (auto-updated). Enums are declared in Prisma. Soft delete via nullable `deletedAt` only where indicated. Enums: `Role { STUDENT, ADMIN }`, `LessonType { TEXT, VIDEO }`, `QuestionType { MCQ_SINGLE, MCQ_MULTI, NUMERIC }`, `Difficulty { EASY, MEDIUM, HARD }`, `AttemptStatus { IN_PROGRESS, SUBMITTED, AUTO_SUBMITTED, ABANDONED }`, `PostStatus { DRAFT, PUBLISHED }`.

### User
- **Purpose:** A platform account; authenticates via Auth.js and authors blog posts / admin actions.
- **Key fields:** `email` (unique, lowercased), `passwordHash` (bcrypt; never returned to client), `name`, `role` (`STUDENT` default), `targetExam?`, `bio?`, `isActive` (default `true`), `lastLoginAt?`.
- **Relationships:** `enrollments[]`, `lessonProgress[]`, `testAttempts[]`, `blogPosts[]` (as author), `aiRecommendations[]`.
- **Constraints:** `@@unique([email])`, `@@index([role])`. `passwordHash` excluded from every client projection.

### Course
- **Purpose:** Top-level study program.
- **Key fields:** `slug` (unique), `title`, `summary`, `description` (markdown), `coverImage?`, `examTag?`, `level` (`Difficulty`), `price` (Int, in paise/cents; `0` = free), `isPublished` (default `false`), `deletedAt?`.
- **Relationships:** `modules[]`, `enrollments[]`.
- **Constraints:** `@@unique([slug])`, `@@index([isPublished, examTag])`, `@@index([deletedAt])`.

### Module
- **Purpose:** Ordered grouping of lessons inside a course.
- **Key fields:** `courseId` (FK → Course, `onDelete: Cascade`), `title`, `summary?`, `orderIndex` (Int, 0-based).
- **Relationships:** `course`, `lessons[]`.
- **Constraints:** `@@unique([courseId, orderIndex])`, `@@index([courseId, orderIndex])`.

### Lesson
- **Purpose:** Atomic unit of learnable content.
- **Key fields:** `moduleId` (FK → Module, `onDelete: Cascade`), `title`, `type` (`LessonType`), `body` (markdown — rendered for `TEXT`, description for `VIDEO`), `videoUrl?`, `durationMinutes?`, `isFreePreview` (default `false`), `orderIndex` (Int).
- **Relationships:** `module`, `lessonProgress[]`.
- **Constraints:** `@@unique([moduleId, orderIndex])`, `@@index([moduleId, orderIndex])`.

### Enrollment
- **Purpose:** Records that a user is enrolled in a course.
- **Key fields:** `userId` (FK → User, Cascade), `courseId` (FK → Course, Cascade), `enrolledAt` (default now).
- **Relationships:** `user`, `course`. (Lesson-level completion lives in `LessonProgress`.)
- **Constraints:** `@@unique([userId, courseId])` (one enrollment per user per course), `@@index([userId])`.

### LessonProgress
- **Purpose:** Explicit per-lesson completion with a timestamp — refines the implicit m:n noted in `DATABASE_MODELS.md` §4 so progress analytics are queryable.
- **Key fields:** `userId` (FK → User, Cascade), `lessonId` (FK → Lesson, Cascade), `completedAt` (DateTime, set when marked complete). Optionally `enrollmentId` for convenience.
- **Relationships:** `user`, `lesson`.
- **Constraints:** `@@unique([userId, lessonId])` (idempotent mark-complete), `@@index([userId])`, `@@index([lessonId])`.

### Question
- **Purpose:** Reusable question-bank item.
- **Key fields:** `type` (`QuestionType`), `stem` (markdown), `passage?`, `options` (`Json` — `Array<{ id: string; text: string; isCorrect: boolean }>` for MCQ; `null` for NUMERIC), `correctNumeric?` (Float), `tolerance?` (Float), `explanation` (markdown), `section` (String), `topic` (String), `subTopic?`, `difficulty` (`Difficulty`), `defaultPositiveMarks` (Float), `defaultNegativeMarks` (Float).
- **Relationships:** `testQuestions[]`, `testAnswers[]`.
- **Constraints:** `@@index([topic, difficulty, type])`, `@@index([section])`. **The answer key (`options[].isCorrect`, `correctNumeric`) is stripped server-side before a question reaches the attempt client** via a `toPublicQuestion()` projection.

### Test
- **Purpose:** A composed mock test with marking scheme and duration.
- **Key fields:** `slug` (unique), `title`, `description` (markdown), `examTag?`, `testType` (String: Full-length / Sectional / Topic drill), `durationMinutes` (Int), `positiveMarks` (Float, default), `negativeMarks` (Float, default), `difficulty` (`Difficulty`), `isPublished` (default `false`), `deletedAt?`.
- **Relationships:** `testQuestions[]`, `attempts[]`.
- **Constraints:** `@@unique([slug])`, `@@index([isPublished, examTag])`, `@@index([deletedAt])`.

### TestQuestion
- **Purpose:** Ordered join between Test and Question with per-question marking + section overrides.
- **Key fields:** `testId` (FK → Test, Cascade), `questionId` (FK → Question, Restrict), `sectionName?` (per-test section grouping), `orderIndex` (Int), `positiveMarksOverride?`, `negativeMarksOverride?`.
- **Relationships:** `test`, `question`.
- **Constraints:** `@@unique([testId, questionId])`, `@@unique([testId, orderIndex])`, `@@index([questionId])`.

### TestAttempt
- **Purpose:** A single attempt by a user against a test — timing, score, AI feedback.
- **Key fields:** `userId` (FK → User, Cascade), `testId` (FK → Test, Restrict — preserve history), `status` (`AttemptStatus`), `startedAt`, `submittedAt?`, `durationSeconds` (Int, server-authoritative), `totalScore?` (Float), `maxScore?` (Float — snapshot at submit), `accuracyPct?` (Float), `percentile?` (Float), `answersSnapshot?` (`Json` — last auto-saved client state for resume), `aiFeedback?` (String), `aiFeedbackGeneratedAt?`.
- **Relationships:** `user`, `test`, `answers[]`, `aiRecommendation?`.
- **Constraints:** `@@index([userId, submittedAt])`, `@@index([testId])`, `@@index([status])`. At most one `IN_PROGRESS` attempt per `(userId, testId)` (enforced in the app layer).

### TestAnswer
- **Purpose:** Per-question response within an attempt; scored at submission.
- **Key fields:** `attemptId` (FK → TestAttempt, Cascade), `questionId` (FK → Question, Restrict), `selectedOptionIds` (`Json` — `string[]`), `numericAnswer?` (Float), `isMarkedForReview` (default `false`), `isCorrect?` (Boolean — computed at submit), `marksAwarded?` (Float — computed at submit), `timeSpentSeconds?`, `answeredAt?`.
- **Relationships:** `attempt`, `question`.
- **Constraints:** `@@unique([attemptId, questionId])`, `@@index([questionId])`.

### BlogPost
- **Purpose:** Markdown article on the public blog.
- **Key fields:** `slug` (unique), `title`, `category`, `excerpt`, `body` (markdown), `coverImage?`, `seoTitle?`, `seoDescription?`, `tags` (`Json` for SQLite / `String[]` for Postgres), `authorId` (FK → User, Restrict), `status` (`PostStatus`), `publishedAt?`, `isFeatured` (default `false`).
- **Relationships:** `author` (User).
- **Constraints:** `@@unique([slug])`, `@@index([status, publishedAt])`, `@@index([isFeatured])`.

### AIRecommendation (optional)
- **Purpose:** Cache the structured AI feedback / recommended next steps for an attempt so it isn't regenerated on every view.
- **Key fields:** `attemptId` (FK → TestAttempt, Cascade, **unique** — one per attempt), `userId` (FK → User), `summary` (String), `strengths` (`Json`), `weaknesses` (`Json`), `recommendedSteps` (`Json`), `source` (String: `"rule-based"` | `"ai"`), `generatedAt`.
- **Relationships:** `attempt`, `user`.
- **Constraints:** `@@unique([attemptId])`.

---

## 6. Database Relationships

```
User ─┬─< Enrollment >─ Course ─< Module ─< Lesson
      │                                        │
      ├─< LessonProgress >─────────────────────┘
      │
      ├─< TestAttempt >─ Test ─< TestQuestion >─ Question
      │        │                                   ↑
      │        ├─< TestAnswer ─────────────────────┘
      │        └─1─ AIRecommendation (optional)
      │
      └─< BlogPost (author)
```

- **User → Enrollment (1:N):** a user enrolls in many courses; each enrollment is unique per `(user, course)`.
- **Course → Module (1:N):** a course has many ordered modules.
- **Module → Lesson (1:N):** a module has many ordered lessons.
- **User → LessonProgress (1:N)** and **Lesson → LessonProgress (1:N):** completion is one row per `(user, lesson)`; course progress = completed lessons / total lessons.
- **User → TestAttempt (1:N):** a user has many attempts across tests.
- **Test → TestQuestion (1:N)** and **Question → TestQuestion (1:N):** `TestQuestion` is the join that places a bank question into a test with ordering and marking overrides.
- **TestAttempt → TestAnswer (1:N):** one answer row per question per attempt.
- **TestAttempt → AIRecommendation (1:1, optional):** cached feedback for that attempt.
- **User → BlogPost (1:N):** a post belongs to exactly one author (User).

---

## 7. Authentication Plan

Use **Auth.js (NextAuth)** with the **Credentials provider** and a **JWT** session strategy. Config lives in `lib/auth.ts`; the handler at `app/api/auth/[...nextauth]/route.ts`.

**Registration flow** (`/register`, Server Action `registerUser`):
1. Validate input with Zod (name, email, password, confirm, targetExam).
2. Normalize email to lowercase; check it isn't already taken.
3. Hash the password with `bcryptjs` (`bcrypt.hash(password, 12)`).
4. Create the `User` with `role = STUDENT`, `isActive = true`.
5. Sign the user in (or redirect to `/login`).

**Login flow** (`/login`, NextAuth `signIn("credentials", ...)`):
1. The Credentials `authorize` callback looks up the user by email.
2. Reject if not found or `isActive === false`.
3. Compare the password with `bcrypt.compare`. Reject on mismatch.
4. On success, update `lastLoginAt`, return a minimal user object (`id`, `email`, `name`, `role`) — **never** `passwordHash`.

**Password hashing:** `bcryptjs` with a cost factor of 12. Only `passwordHash` is stored; the plaintext is never logged or persisted.

**Session handling:** JWT strategy. In the `jwt` callback, bake `role` and `id` into the token; in the `session` callback, expose them on `session.user`. This lets `middleware.ts` and Server Actions read the role without a DB hit.

**Logout:** NextAuth `signOut()` clears the session cookie and returns the user to `/`. The existing dashboard/admin sidebar "Log out" control (currently visual) will call this.

**Role handling:** `role` is `STUDENT` by default. Promotion to `ADMIN` happens only via an admin action on `/admin/users` (manual). The role travels in the JWT and is the basis for authorization (§8).

---

## 8. Authorization and Route Protection

A `middleware.ts` matcher provides the coarse gate; Server Actions and data-access functions enforce fine-grained ownership.

**Public (no session required):**
`/`, `/courses`, `/courses/[slug]`, `/mock-tests`, `/study-material`, `/blog`, `/blog/[slug]`, `/pricing`, `/contact`, `/login`, `/register`, `/privacy`, `/terms`.

**Student-protected (session with role `STUDENT` or `ADMIN`):**
`/dashboard` and all `/dashboard/*`.

**Admin-protected (session with role `ADMIN`):**
`/admin` and all `/admin/*`.

**Behaviors:**

| Situation | Behavior |
| --- | --- |
| Guest opens `/dashboard/*` or `/admin/*` | Redirect to `/login?callbackUrl=<original>`; after login, return to the original page. |
| Student opens `/admin/*` | Redirect to `/dashboard` (or a `/unauthorized` page) — never render admin content. |
| Signed-in user opens `/login` or `/register` | Redirect to `/dashboard` (or `/admin` if admin). |
| Admin signs in | Redirect to `/admin`. |
| Student signs in | Redirect to `/dashboard`. |
| Deactivated user (`isActive = false`) tries to sign in | Rejected at `authorize`. |

**Middleware matcher:**
```ts
export const config = { matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"] }
```
Inside Server Actions, additionally verify ownership (e.g. a student can only submit/read their own `TestAttempt`) using `where: { userId: session.user.id }` rather than trusting an id from the client.

---

## 9. Admin CRUD Plan

All mutations are **Server Actions** co-located with the page (`actions.ts`), each guarded by an `ADMIN` role check and Zod validation, writing through Prisma, then `revalidatePath()` to refresh the affected list. The existing admin forms/managers already provide the UI; they will be wired to these actions.

| Entity | Create | Read | Update | Delete | Publish | Key validation |
| --- | --- | --- | --- | --- | --- | --- |
| **Course** | `createCourse` | list + detail | `updateCourse` | soft-delete (`deletedAt`) | `togglePublish` | unique slug; price ≥ 0; required title/summary. |
| **Module** | `upsertModule` | nested in course | `upsertModule` | cascade with course / `deleteModule` | — | unique `orderIndex` within course; reorder action. |
| **Lesson** | `upsertLesson` | nested in module | `upsertLesson` | `deleteLesson` | (`isFreePreview` toggle) | type ∈ {TEXT, VIDEO}; `videoUrl` required when VIDEO; unique `orderIndex` within module. |
| **Question** | `createQuestion` | bank list + detail | `updateQuestion` | `deleteQuestion` (Restrict if used by a test) | — | type-conditional: MCQ needs ≥2 options and ≥1 correct; NUMERIC needs `correctNumeric` (+ tolerance). |
| **Test** | `createTest` | list + detail | `updateTest`, `reorderTestQuestions` | soft-delete | `togglePublish` | ≥1 question; duration > 0; valid section assignment. |
| **BlogPost** | `createBlogPost` | list + detail | `updateBlogPost` | `deleteBlogPost` | `togglePublished` (sets `publishedAt` on first publish) | unique slug; required title/excerpt/body; SEO length hints. |
| **User** | (via register) | list + detail | `setUserRole`, `setUserActive` | deactivate (no hard delete) | — | cannot demote/deactivate the last remaining admin. |

Rules common to all: validate with Zod first; check `ADMIN`; perform the write in a transaction when it spans multiple rows (e.g. course + modules + lessons reorder); return a typed success/error result the UI can surface; `revalidatePath` the list and detail routes.

---

## 10. Student Learning Plan

- **Course enrollment:** `enrollInCourse(courseId)` Server Action — requires a session, creates an `Enrollment` (idempotent via the `@@unique([userId, courseId])` constraint; if it exists, no-op), then `revalidatePath("/dashboard/courses")`. Free tier only; no payment.
- **Enrolled-courses dashboard** (`/dashboard/courses`): query `Enrollment` for the current user, join `Course → Module → Lesson` and `LessonProgress`, compute `progressPct = completedLessons / totalLessons` per course.
- **Lesson access** (`/dashboard/lessons/[lessonId]`): a lesson is viewable if the user is enrolled in its course **or** the lesson `isFreePreview`. Otherwise redirect to the course detail with an enroll prompt.
- **Mark lesson complete:** `markLessonComplete(lessonId)` Server Action — upsert a `LessonProgress` row for `(userId, lessonId)` with `completedAt = now()` (idempotent). A "mark incomplete" variant deletes the row.
- **Course progress calculation:** derived, not stored: `completed = count(LessonProgress where lesson in course)`, `total = count(Lesson in course)`, `progressPct = round(completed/total*100)`. The "continue learning" tile points to the first lesson (by module/lesson `orderIndex`) without a `LessonProgress` row.
- **Recommended courses:** published courses the user is **not** enrolled in, ranked by a simple heuristic (matching `examTag` to the user's `targetExam`, then by enrollment count). No ML in the MVP.

---

## 11. Mock Test Attempt Plan

- **Start test** (`/dashboard/tests/[testId]`, action `startAttempt`): require a session; if an `IN_PROGRESS` attempt exists for `(userId, testId)`, **resume** it; otherwise create a `TestAttempt` with `status = IN_PROGRESS`, `startedAt = now()`. Redirect to `…/attempt`.
- **Load questions:** the attempt page server-loads the test's questions through `toPublicQuestion()` — **answer keys are never sent to the client.** Order by `TestQuestion.orderIndex`, grouped by section.
- **Client state during the attempt:** selected answers, visited set, and marked-for-review set live in client state (as they already do in the prototype's `TestRunner`). Periodically (every ~15s) call `saveAttemptProgress(attemptId, snapshot)` to persist `answersSnapshot` + `durationSeconds` for resume-on-reload.
- **Mark for review / clear response:** client-side toggles reflected in the next auto-save snapshot.
- **Submit test** (action `submitAttempt`): runs server-side in a **transaction**:
  1. Re-load the attempt scoped to `userId` (reject if not the owner or already submitted).
  2. Upsert a `TestAnswer` per question from the submitted snapshot.
  3. Score each answer **on the server** against the question's stored answer key (§12).
  4. Update the `TestAttempt`: `status = SUBMITTED` (or `AUTO_SUBMITTED` on timer expiry), `submittedAt`, `durationSeconds`, `totalScore`, `maxScore`, `accuracyPct`, `percentile`.
  5. Generate feedback (rule-based; §14) and store it (and/or `AIRecommendation`).
  6. Commit, then redirect to `/dashboard/results/[attemptId]`.
- **Auto-submit:** when the server-authoritative timer (derived from `startedAt + durationMinutes`) elapses, the same `submitAttempt` runs with `AUTO_SUBMITTED`.

---

## 12. Result Calculation Logic

All computed **server-side** from `TestAnswer` + the question key. Definitions per attempt:

- **attempted** = answers where the student gave a non-empty response (`selectedOptionIds` non-empty or `numericAnswer` present).
- **unattempted** = `totalQuestions − attempted`.
- **correct** = answers where `isCorrect === true`.
- **incorrect** = `attempted − correct`.
- **Per-answer scoring:**
  - MCQ_SINGLE: correct if the single selected option `isCorrect`.
  - MCQ_MULTI (no partial credit in MVP): correct only if the selected set exactly equals the correct set.
  - NUMERIC: correct if `abs(numericAnswer − correctNumeric) ≤ tolerance`.
  - `marksAwarded` = `+positiveMarks` if correct; `negativeMarks` (≤ 0) if attempted & incorrect; `0` if unattempted. Use the `TestQuestion` override if present, else the `Test` default.
- **totalScore** = `sum(marksAwarded)`, floored at 0 for display if negative marking drives it below 0 (store the raw value, clamp in the UI).
- **maxScore** = `sum(positiveMarks)` across the test's questions (snapshot at submit time).
- **percentage** = `round(totalScore / maxScore * 100)` (clamped to `[0, 100]`).
- **accuracyPct** = `attempted > 0 ? round(correct / attempted * 100) : 0`.
- **Section-wise score:** group answers by `TestQuestion.sectionName`; per section report `score`, `maxScore`, `attempted`, `correct`, `accuracyPct`.
- **Topic-wise weakness:** group answers by `Question.topic`; per topic report accuracy; weak topics = lowest accuracy (ascending).
- **Percentile estimate (MVP):** rank this attempt's `percentage` against all **submitted** attempts for the **same test**: `percentile = round((# attempts with percentage ≤ this) / (total attempts) * 100)`. If too few attempts exist, fall back to a fixed monotonic mapping from `percentage` (e.g. a lookup curve) and label it an estimate. Store the computed value on `TestAttempt.percentile`.

---

## 13. Analytics Plan

The `/dashboard/analytics` page (and the dashboard overview widgets) read from the user's stored attempts and answers — replacing `lib/analytics-data.ts`'s sample aggregation with the same shapes computed from the DB:

- **Dashboard analytics:** summary tiles — tests taken, average score, average accuracy, best percentile, improvement, average time per question.
- **Score trend:** ordered series of `percentage` per submitted attempt (last N), by `submittedAt`.
- **Accuracy trend:** same series for `accuracyPct`.
- **Section performance:** aggregate section scores across attempts (group `TestAnswer` by `TestQuestion.sectionName`).
- **Topic performance:** aggregate accuracy by `Question.topic` across attempts.
- **Weak areas:** lowest-accuracy topics with their sub-topics; drives the AI insight and recommendations.
- **Time-management analysis:** from `durationSeconds` and per-answer `timeSpentSeconds` (best-effort) — average time per question, and a rushed/on-pace/overtime split by difficulty.

Keep the existing component contracts (`StudentAnalytics`, `TrendPoint`, `SectionAgg`, `TopicAgg`, etc.) so the charts/components don't change — only the data source moves to Prisma queries (consider a few indexed aggregate queries rather than loading every answer).

---

## 14. AI Feedback Plan

Phased to avoid a hard dependency on an AI provider:

1. **First backend phase — rule-based only.** Compute a mentor-style summary deterministically from the attempt analytics (strongest/weakest topic, time feedback, next steps, suggested practice set), exactly as the prototype's `buildAttemptInsight()` already does. Store it as `aiFeedback` (and/or an `AIRecommendation` row with `source = "rule-based"`). **No external call.**
2. **Later — optional real AI.** If `AI_API_KEY` is set, generate the narrative by calling the AI provider with a **summarized** payload only.
3. **Fallback:** if `AI_API_KEY` is missing or the call fails/times out, silently use the rule-based output. The result page must **never block** on AI — render immediately and hydrate/replace the panel when ready, with a manual "regenerate" allowed once per attempt.
4. **Data minimization:** send the AI only what's needed — score, accuracy, per-topic and per-section accuracy, time-management indicators, weakest topics. **Never** send raw answer keys, full question text dumps, passwords, emails, or other PII. Cache the result against the attempt (`AIRecommendation`) so it isn't regenerated on every view; enforce a per-user daily quota and cap output tokens.

---

## 15. Seed Data Plan

A `prisma/seed.ts` script (run via `npm run db:seed`) populates a realistic starter dataset. Port the existing `lib/*-data.ts` content so the seeded app matches the prototype.

Required seed data:

- **One admin user** — `admin@prepmaster.ai` (role `ADMIN`).
- **One student user** — `student@prepmaster.ai` (role `STUDENT`, name "Rajan Punchouty", target "CAT 2026").
- **Sample courses** (port the 6 from `lib/sample-data.ts`) with `isPublished = true`.
- **Modules + lessons** per course (port the generated module/lesson trees; mark the first lesson of each course `isFreePreview`).
- **Questions** — port the bank from `lib/test-data.ts` / `lib/admin-data.ts` (mix of MCQ_SINGLE, MCQ_MULTI, NUMERIC with explanations).
- **Tests** — port the 6 tests with their `TestQuestion` joins and section assignments; some published, some draft.
- **Blog posts** — port from `lib/admin-data.ts` (mix of published/draft, one featured).
- **One sample completed attempt** for the student — a `TestAttempt` (`SUBMITTED`) with its `TestAnswer` rows and a stored rule-based `AIRecommendation`, so the results/analytics pages have data on first login.

Demo credentials (set real bcrypt-hashed passwords in the seed; document them in the README):

```
Admin:   admin@prepmaster.ai
Student: student@prepmaster.ai
```

Seeding must be **idempotent** (upsert by unique keys) so it can be re-run safely.

---

## 16. Implementation Phases

Each phase is independently shippable, ends lint-clean and building, and keeps the existing UI working (swapping a sample-data source for a DB-backed one at a time).

| Phase | Goal | Key deliverables |
| --- | --- | --- |
| **10 — Prisma schema & DB setup** | Database exists and is queryable. | `prisma/schema.prisma` with all §5 models + enums; `lib/db.ts` Prisma singleton; `DATABASE_URL` wired; first migration (`prisma migrate dev`); `db:generate` / `db:migrate` / `db:seed` scripts. |
| **11 — Auth.js authentication** | Real login/register/logout. | `lib/auth.ts` (credentials, JWT, role in token); `app/api/auth/[...nextauth]/route.ts`; `registerUser` action (bcrypt); `middleware.ts` gate (§8); wire the sidebar logout. |
| **12 — Seed data & DB-driven public pages** | Public site reads from the DB. | `prisma/seed.ts` (§15); switch `/courses`, `/courses/[slug]`, `/blog`, `/blog/[slug]`, `/mock-tests`, `/study-material` from sample data to Prisma reads. |
| **13 — Admin course/module/lesson CRUD** | Manage learning content for real. | Server Actions for course/module/lesson create/update/delete/reorder/publish; wire the existing admin course form + manager. |
| **14 — Admin question/test CRUD** | Manage the test engine content. | Question CRUD with type-conditional validation; test composer (`TestQuestion` ordering + sections); publish toggles; wire existing forms. |
| **15 — Student enrollment & lesson progress** | Students learn end-to-end. | `enrollInCourse`, `markLessonComplete`; DB-driven `/dashboard/courses`, course detail, and lesson viewer; real progress + continue-learning. |
| **16 — Real mock test attempts** | Attempts persist and resume. | `startAttempt`, `saveAttemptProgress` (auto-save), `submitAttempt`; server-authoritative timer; answer-key stripping; resume-on-reload. |
| **17 — Result calculation & analytics** | Scores and analytics from real data. | Server-side scoring (§12); DB-driven `/dashboard/results`, result detail, and `/dashboard/analytics`. |
| **18 — AI feedback integration** | Mentor feedback for real attempts. | Rule-based feedback stored as `AIRecommendation`; optional AI call behind `AI_API_KEY` with fallback (§14). |
| **19 — Deployment & final testing** | Production launch. | Provision Neon/Supabase; `prisma migrate deploy` in CI; Vercel env vars; smoke + acceptance tests; backups; monitoring. |

---

## 17. Risk and Safety Notes

- **Never commit `.env` / `.env.local`.** Commit only `.env.example`. Rotate any secret that leaks.
- **Validate every input** with Zod at the server boundary before it reaches Prisma — including hidden fields and ids (verify ownership, don't trust client-supplied `userId`).
- **Protect admin routes** in `middleware.ts` *and* re-check `role === ADMIN` inside every admin Server Action (defense in depth).
- **Never expose `passwordHash`** — exclude it from every `select`/projection returned to the client; never log it.
- **Never trust client-side score calculation.** The client may show provisional UI, but the authoritative `totalScore`, `accuracyPct`, and `percentile` are computed **only** on the server from stored answers and the question key.
- **Use a transaction for test submission** so writing all `TestAnswer` rows and updating the `TestAttempt` totals is atomic — a partial submit must never leave an inconsistent attempt.
- **Strip the answer key** before any question is sent to the attempt client (`toPublicQuestion()`); never include `isCorrect` / `correctNumeric` in attempt payloads.
- **Scope all student reads/writes** to `session.user.id` so one student can never read or mutate another's enrollment, progress, or attempts.
- **Rate-limit** auth (login/register) and `submitAttempt`; cap AI output tokens and enforce a per-user daily quota.
- **Migrations:** use `prisma migrate deploy` (never `db push`) in shared/production environments; back up the database before any destructive migration.

---

## 18. Acceptance Criteria

The backend is "done" when all of the following hold:

- [ ] `prisma migrate deploy` runs cleanly against a fresh database; `npm run db:seed` is idempotent and produces the §15 dataset.
- [ ] A guest can register, which creates a `STUDENT` user with a bcrypt-hashed password; the plaintext is never stored or logged.
- [ ] Login authenticates against the database; bad credentials and deactivated accounts are rejected; logout clears the session.
- [ ] A guest visiting `/dashboard/*` or `/admin/*` is redirected to `/login`; a student visiting `/admin/*` is redirected away; an admin lands on `/admin`, a student on `/dashboard`.
- [ ] All public pages (`/courses`, `/courses/[slug]`, `/blog`, `/blog/[slug]`, `/mock-tests`, `/study-material`) render from the database, not from `lib/*-data.ts`.
- [ ] An admin can create, edit, publish/unpublish, and delete courses (with modules/lessons), questions, tests, and blog posts entirely from the admin UI; changes persist and appear publicly when published.
- [ ] A student can enroll in a course, open lessons (free previews work without enrollment), mark lessons complete, and see accurate course progress and a correct "continue learning" target.
- [ ] A student can start a test, have progress auto-saved, resume after a browser reload within the window, and submit; the answer key is never present in any client payload.
- [ ] On submission, `totalScore`, `maxScore`, `accuracyPct`, section/topic breakdowns, and `percentile` are computed **server-side** in a transaction and match the §12 formulas; the result page reflects them.
- [ ] `/dashboard/analytics` shows trends and breakdowns derived from the student's real attempts.
- [ ] Each submitted attempt has stored feedback (rule-based by default; AI-enhanced when `AI_API_KEY` is set), and the result page never blocks on the AI call.
- [ ] No `passwordHash` or answer key is ever exposed to the client; admin routes/actions are protected in both middleware and action layers.
- [ ] `npm run lint` and `npm run build` pass; the app deploys to Vercel with the required environment variables; the §16 acceptance smoke tests pass against the deployed URL.

---

*This plan extends and stays consistent with `DATABASE_MODELS.md`, `ROUTES.md`, and `PRD.md`. Implement it phase by phase (Phases 10–19); keep the planning docs updated as the schema and actions land.*
