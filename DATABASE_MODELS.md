# PrepMaster AI — Database Models

**Status:** Draft (Phase 1)
**ORM:** Prisma
**Engines:** SQLite for local dev; PostgreSQL in production
**Migration policy:** every schema change ships with a Prisma migration. No `db push` in shared environments — use `prisma migrate deploy`.

---

## Conventions
- Every table includes `id` (cuid), `createdAt` (default now), `updatedAt` (auto-updated).
- Soft delete uses a nullable `deletedAt` only where indicated; otherwise rows are hard-deleted.
- Enums are declared in Prisma rather than referenced as strings inline.
- Field names use camelCase. Postgres column names follow Prisma defaults.
- Foreign keys default to `onDelete: Restrict` unless the entity is genuinely owned by another (then `Cascade`).
- All JSON fields document their shape inline because Prisma's `Json` is unstructured at the DB level.

---

## Enums

| Enum | Values | Notes |
| --- | --- | --- |
| `Role` | `STUDENT`, `ADMIN` | `GUEST` is *not* stored — it is derived for unauthenticated requests. |
| `LessonType` | `TEXT`, `VIDEO` | Future: `QUIZ`, `PDF`. |
| `QuestionType` | `MCQ_SINGLE`, `MCQ_MULTI`, `NUMERIC` | Future: `SUBJECTIVE`. |
| `Difficulty` | `EASY`, `MEDIUM`, `HARD` | |
| `AttemptStatus` | `IN_PROGRESS`, `SUBMITTED`, `AUTO_SUBMITTED`, `ABANDONED` | `ABANDONED` is set by a janitor when an attempt is left idle past a threshold. |
| `PostStatus` | `DRAFT`, `PUBLISHED` | |

---

## 1. User
**Purpose:** A platform account. Backs NextAuth credentials, and is also the author of blog posts and admin actions.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `String` (cuid) | PK |
| `email` | `String` | unique, normalized to lowercase on save |
| `passwordHash` | `String` | `bcryptjs` hash; never returned to the client |
| `name` | `String` | display name |
| `role` | `Role` | default `STUDENT` |
| `targetExam` | `String?` | free-text exam tag (e.g. "JEE-Main 2027") |
| `bio` | `String?` | shown when the user authors blog posts |
| `isActive` | `Boolean` | default `true`; admin can deactivate to block sign-in |
| `lastLoginAt` | `DateTime?` | updated by NextAuth `signIn` event |
| `createdAt`, `updatedAt` | `DateTime` | |

**Relations**
- `Enrollment[]`
- `TestAttempt[]`
- `BlogPost[]` (as `author`)

**Indexes**
- `@@unique([email])`
- `@@index([role])`

**Notes**
- MVP has only a credentials provider, so we do not need NextAuth's `Account`, `Session`, or `VerificationToken` tables. If we add OAuth later, a migration will introduce them.

---

## 2. Course
**Purpose:** Top-level container for a study program (e.g. "JEE Physics Crash Course").

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `String` (cuid) | PK |
| `slug` | `String` | unique, URL-safe |
| `title` | `String` | |
| `summary` | `String` | shown in cards and listings |
| `description` | `String` | markdown; shown on the detail page |
| `coverImage` | `String?` | external URL (MVP has no upload pipeline) |
| `examTag` | `String?` | e.g. "JEE", "NEET" |
| `difficulty` | `Difficulty` | overall difficulty |
| `isPublished` | `Boolean` | default `false`; only published courses appear publicly |
| `deletedAt` | `DateTime?` | soft-delete |
| `createdAt`, `updatedAt` | `DateTime` | |

**Relations**
- `Module[]`
- `Enrollment[]`

**Indexes**
- `@@unique([slug])`
- `@@index([isPublished, examTag])`
- `@@index([deletedAt])`

---

## 3. Module
**Purpose:** Ordered grouping of lessons inside a course.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `String` (cuid) | PK |
| `courseId` | `String` | FK → `Course.id`, `onDelete: Cascade` |
| `title` | `String` | |
| `summary` | `String?` | |
| `orderIndex` | `Int` | 0-based order within the course |
| `createdAt`, `updatedAt` | `DateTime` | |

**Relations**
- `Course`
- `Lesson[]`

**Indexes**
- `@@index([courseId, orderIndex])`
- `@@unique([courseId, orderIndex])` — enforces ordering integrity

---

## 4. Lesson
**Purpose:** Atomic unit of learnable content.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `String` (cuid) | PK |
| `moduleId` | `String` | FK → `Module.id`, `onDelete: Cascade` |
| `title` | `String` | |
| `type` | `LessonType` | `TEXT` or `VIDEO` for MVP |
| `body` | `String` | markdown; rendered for `TEXT`, used as description for `VIDEO` |
| `videoUrl` | `String?` | YouTube/Vimeo URL when `type = VIDEO` |
| `durationMinutes` | `Int?` | rough estimate shown in UI |
| `isFreePreview` | `Boolean` | default `false`; viewable by guests on the course detail page |
| `orderIndex` | `Int` | within the module |
| `createdAt`, `updatedAt` | `DateTime` | |

**Relations**
- `Module`
- `Enrollment[]` (via implicit m:n `completedLessons`, see §5)

**Indexes**
- `@@index([moduleId, orderIndex])`
- `@@unique([moduleId, orderIndex])`

**Notes**
- Per-lesson completion is tracked via an implicit m:n on `Enrollment.completedLessons` (Prisma generates the join table). If completion analytics become rich we will graduate to an explicit `LessonCompletion` table with timestamps.

---

## 5. Enrollment
**Purpose:** Records that a user is enrolled in a course and tracks lesson-level progress.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `String` (cuid) | PK |
| `userId` | `String` | FK → `User.id`, `onDelete: Cascade` |
| `courseId` | `String` | FK → `Course.id`, `onDelete: Cascade` |
| `enrolledAt` | `DateTime` | default `now()` |
| `completedLessons` | `Lesson[]` | implicit m:n; lessons the user has marked complete |
| `createdAt`, `updatedAt` | `DateTime` | |

**Relations**
- `User`, `Course`
- `Lesson[]` (m:n via implicit join `_EnrollmentCompletedLessons`)

**Indexes**
- `@@unique([userId, courseId])` — one enrollment per user per course
- `@@index([userId])`

---

## 6. Question
**Purpose:** Reusable question in the bank; referenced by tests via `TestQuestion`.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `String` (cuid) | PK |
| `type` | `QuestionType` | |
| `stem` | `String` | markdown; the question body |
| `options` | `Json` | For MCQ types: `Array<{ id: string; text: string; isCorrect: boolean }>`. For `NUMERIC`: `null`. |
| `correctNumeric` | `Float?` | For `NUMERIC`: expected value. |
| `tolerance` | `Float?` | For `NUMERIC`: absolute tolerance (`abs(answer - expected) <= tolerance`). |
| `explanation` | `String` | markdown; shown on the result review screen |
| `topic` | `String` | tag used for breakdowns (e.g. "Mechanics") |
| `subTopic` | `String?` | finer tag (e.g. "Rotational Motion") |
| `difficulty` | `Difficulty` | |
| `defaultPositiveMarks` | `Float` | typical positive marks; overridable per test |
| `defaultNegativeMarks` | `Float` | typical negative marks; overridable per test |
| `createdAt`, `updatedAt` | `DateTime` | |

**Relations**
- `TestQuestion[]`
- `TestAnswer[]`

**Indexes**
- `@@index([topic, difficulty, type])`
- `@@index([subTopic])`

**Notes**
- The answer key (`options[i].isCorrect`, `correctNumeric`) MUST be stripped server-side before sending a question to the attempt client. Use a `toPublicQuestion()` projection helper that omits these fields.

---

## 7. Test
**Purpose:** A composed mock test referencing questions, with marking scheme and duration.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `String` (cuid) | PK |
| `slug` | `String` | unique, URL-safe |
| `title` | `String` | |
| `description` | `String` | markdown; instructions and rules |
| `examTag` | `String?` | e.g. "JEE", "NEET" |
| `durationMinutes` | `Int` | total attempt time |
| `positiveMarks` | `Float` | default per question; can be overridden on `TestQuestion` |
| `negativeMarks` | `Float` | default per question; can be overridden on `TestQuestion` |
| `isPublished` | `Boolean` | default `false` |
| `deletedAt` | `DateTime?` | soft-delete |
| `createdAt`, `updatedAt` | `DateTime` | |

**Relations**
- `TestQuestion[]`
- `TestAttempt[]`

**Indexes**
- `@@unique([slug])`
- `@@index([isPublished, examTag])`
- `@@index([deletedAt])`

---

## 8. TestQuestion
**Purpose:** Join between `Test` and `Question` with ordering and optional marking overrides.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `String` (cuid) | PK |
| `testId` | `String` | FK → `Test.id`, `onDelete: Cascade` |
| `questionId` | `String` | FK → `Question.id`, `onDelete: Restrict` |
| `orderIndex` | `Int` | position within the test |
| `positiveMarksOverride` | `Float?` | if null, falls back to `Test.positiveMarks` |
| `negativeMarksOverride` | `Float?` | if null, falls back to `Test.negativeMarks` |
| `createdAt`, `updatedAt` | `DateTime` | |

**Relations**
- `Test`, `Question`

**Indexes**
- `@@unique([testId, questionId])` — a question can appear at most once per test
- `@@unique([testId, orderIndex])` — ordering integrity
- `@@index([questionId])`

---

## 9. TestAttempt
**Purpose:** A single attempt by a user against a test — includes timing, score, and AI feedback.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `String` (cuid) | PK |
| `userId` | `String` | FK → `User.id`, `onDelete: Cascade` |
| `testId` | `String` | FK → `Test.id`, `onDelete: Restrict` (preserve history) |
| `status` | `AttemptStatus` | |
| `startedAt` | `DateTime` | |
| `submittedAt` | `DateTime?` | set on submission or auto-submit |
| `durationSeconds` | `Int` | server-authoritative time spent in the attempt |
| `totalScore` | `Float?` | computed at submission |
| `maxScore` | `Float?` | snapshot of the test's max at submission time |
| `accuracyPct` | `Float?` | computed at submission |
| `aiFeedback` | `String?` | Claude-generated narrative |
| `aiFeedbackGeneratedAt` | `DateTime?` | |
| `createdAt`, `updatedAt` | `DateTime` | |

**Relations**
- `User`, `Test`
- `TestAnswer[]`

**Indexes**
- `@@index([userId, submittedAt])`
- `@@index([testId])`
- `@@index([status])` — used by the janitor to find stale `IN_PROGRESS` attempts

**Notes**
- At most one `IN_PROGRESS` attempt per (`userId`, `testId`) — enforced at the application layer (the `startAttempt` action checks and either resumes the existing attempt or creates a new one).
- Storing `maxScore` at submission time decouples historical scorecards from later test edits.

---

## 10. TestAnswer
**Purpose:** Per-question response within an attempt.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `String` (cuid) | PK |
| `attemptId` | `String` | FK → `TestAttempt.id`, `onDelete: Cascade` |
| `questionId` | `String` | FK → `Question.id`, `onDelete: Restrict` |
| `selectedOptionIds` | `Json` | `string[]` of option ids for MCQ types; empty array if unanswered |
| `numericAnswer` | `Float?` | for `NUMERIC` type |
| `isMarkedForReview` | `Boolean` | default `false` |
| `isCorrect` | `Boolean?` | computed at submission |
| `marksAwarded` | `Float?` | computed at submission (uses `TestQuestion` override or `Test` default) |
| `timeSpentSeconds` | `Int?` | best-effort from the client; not load-bearing for scoring |
| `answeredAt` | `DateTime?` | last update by the student |
| `createdAt`, `updatedAt` | `DateTime` | |

**Relations**
- `TestAttempt`, `Question`

**Indexes**
- `@@unique([attemptId, questionId])` — one answer row per question per attempt
- `@@index([questionId])`

---

## 11. BlogPost
**Purpose:** Markdown article published on the public blog.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `String` (cuid) | PK |
| `slug` | `String` | unique, URL-safe |
| `title` | `String` | |
| `summary` | `String` | shown in cards and used as OG description |
| `coverImage` | `String?` | external URL |
| `body` | `String` | markdown body |
| `tags` | `String[]` (Postgres) / `Json` (SQLite) | for filtering; SQLite cannot use `String[]` |
| `authorId` | `String` | FK → `User.id`, `onDelete: Restrict` |
| `status` | `PostStatus` | `DRAFT` or `PUBLISHED` |
| `publishedAt` | `DateTime?` | set when first transitioned to `PUBLISHED` |
| `isFeatured` | `Boolean` | default `false`; surfaced in the homepage carousel when true |
| `createdAt`, `updatedAt` | `DateTime` | |

**Relations**
- `User` (`author`)

**Indexes**
- `@@unique([slug])`
- `@@index([status, publishedAt])`
- `@@index([isFeatured])`

**Notes**
- For the SQLite dev environment we will store tags as JSON; the production Postgres schema will use a native `String[]`. The Prisma schema will conditionally pick the type via `provider`-specific blocks, or we will normalize to `Json` everywhere if conditional types prove fragile.

---

## Entity Relationship Summary

```
User ─┬─< Enrollment >─ Course ─< Module ─< Lesson
      │                                       │
      │                                       └── (m:n, implicit)
      │                                              ↑
      │                                         completedLessons
      │                                              │
      │                                          Enrollment
      │
      ├─< TestAttempt >─ Test ─< TestQuestion >─ Question
      │       │                                     ↑
      │       └─< TestAnswer ───────────────────────┘
      │
      └─< BlogPost (author)
```

---

## Open Questions
- **Topic table?** Should `Question.topic` be a free-text field or a FK into a normalized `Topic` table? For MVP it stays free-text with an admin-side autocomplete to keep tag values consistent.
- **Bookmarks.** Deferred to post-MVP; would be a `QuestionBookmark(userId, questionId)` join table.
- **Asset model.** MVP relies on external URLs for cover images. A future `Asset` model + storage provider (S3/R2) will replace inline URLs in `Course.coverImage`, `BlogPost.coverImage`, and any lesson attachments.
- **Per-section tests.** Currently a test is a flat list of questions. If exams that require section gating come up (e.g. JEE Advanced), introduce a `TestSection` interposed between `Test` and `TestQuestion`.
- **Partial credit on `MCQ_MULTI`.** Out of scope for MVP. Adding it later only needs scoring logic changes — schema is unchanged.
