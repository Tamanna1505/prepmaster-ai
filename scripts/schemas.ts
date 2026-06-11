/**
 * Shared Zod schemas + helpers for the question/paper import system (Phase 10.5).
 * Pure validation — no database access. Used by:
 *   - scripts/validate-question-json.ts
 *   - scripts/import-questions.ts
 *   - scripts/import-test-paper.ts
 */
import { z } from "zod"

// ── Enums (mirror prisma/schema.prisma) ──────────────────────────────────────
export const ExamType = z.enum(["JEE_MAIN", "CAT"])
export const Subject = z.enum(["PHYSICS", "CHEMISTRY", "MATHEMATICS", "VARC", "DILR", "QA"])
export const QuestionType = z.enum(["SINGLE_CORRECT", "NUMERIC"])
export const Difficulty = z.enum(["EASY", "MEDIUM", "HARD"])
export const QuestionSetType = z.enum(["RC_PASSAGE", "DILR_SET", "STANDALONE"])
export const TestType = z.enum(["FULL_MOCK", "SECTIONAL", "TOPIC_QUIZ", "PREVIOUS_YEAR"])
export const PublishStatus = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"])

// ── Question ─────────────────────────────────────────────────────────────────
export const questionInputSchema = z
  .object({
    exam: ExamType,
    subject: Subject,
    topic: z.string().min(1),
    subtopic: z.string().optional(),
    year: z.number().int().optional(),
    session: z.string().optional(),
    shift: z.string().optional(),
    slot: z.string().optional(),
    paperName: z.string().optional(),
    questionNumber: z.number().int().optional(),
    questionType: QuestionType,
    questionText: z.string().min(1),
    passage: z.string().optional(),
    optionA: z.string().optional(),
    optionB: z.string().optional(),
    optionC: z.string().optional(),
    optionD: z.string().optional(),
    correctAnswer: z.string().min(1),
    explanation: z.string().optional().default(""),
    difficulty: Difficulty,
    marks: z.number(),
    negativeMarks: z.number().min(0), // penalty magnitude (>= 0); stored negated
    tolerance: z.number().optional(),
    sourceName: z.string().min(1),
    sourceUrl: z.string().min(1),
    sourceYear: z.number().int().optional(),
    imageUrl: z.string().optional(),
    solutionImageUrl: z.string().optional(),
    // Links the question to a top-level questionSet by its `key`.
    setKey: z.string().optional(),
  })
  .superRefine((q, ctx) => {
    if (q.questionType === "SINGLE_CORRECT") {
      for (const k of ["optionA", "optionB", "optionC", "optionD"] as const) {
        if (!q[k] || q[k]!.trim() === "") {
          ctx.addIssue({ code: "custom", path: [k], message: `${k} is required for SINGLE_CORRECT` })
        }
      }
      if (!["A", "B", "C", "D"].includes(q.correctAnswer)) {
        ctx.addIssue({
          code: "custom",
          path: ["correctAnswer"],
          message: "correctAnswer must be one of A, B, C, D for SINGLE_CORRECT",
        })
      }
    } else {
      // NUMERIC
      if (Number.isNaN(Number(q.correctAnswer))) {
        ctx.addIssue({
          code: "custom",
          path: ["correctAnswer"],
          message: "correctAnswer must be a numeric string for NUMERIC",
        })
      }
    }
  })

export type QuestionInput = z.infer<typeof questionInputSchema>

// ── QuestionSet (CAT RC / DILR grouped sets) ─────────────────────────────────
export const questionSetInputSchema = z.object({
  key: z.string().min(1), // referenced by questions via `setKey`
  exam: ExamType,
  year: z.number().int().optional(),
  slot: z.string().optional(),
  section: Subject.optional(),
  title: z.string().min(1),
  setType: QuestionSetType,
  content: z.string().min(1), // shared passage / table / data
  sourceName: z.string().optional(),
  sourceUrl: z.string().optional(),
})

export type QuestionSetInput = z.infer<typeof questionSetInputSchema>

// ── Question-bank file ───────────────────────────────────────────────────────
export const questionBankFileSchema = z.object({
  type: z.literal("question-bank"),
  questionSets: z.array(questionSetInputSchema).optional().default([]),
  questions: z.array(questionInputSchema).min(1),
})

export type QuestionBankFile = z.infer<typeof questionBankFileSchema>

// ── Full-paper file ──────────────────────────────────────────────────────────
export const refSchema = z.object({ ref: z.string().min(1) }).strict()
export type QuestionRef = z.infer<typeof refSchema>

export const sectionSchema = z.object({
  name: z.string().min(1), // section label, e.g. "Physics", "DILR"
  subject: Subject.optional(),
  // Each item is either a full embedded question or a `{ ref: importKey }`.
  questions: z.array(z.union([refSchema, questionInputSchema])).min(1),
})

export const testInputSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional().default(""),
  exam: ExamType,
  year: z.number().int().optional(),
  session: z.string().optional(),
  shift: z.string().optional(),
  slot: z.string().optional(),
  testType: TestType,
  durationMinutes: z.number().int().positive(),
  difficulty: Difficulty.optional().default("MEDIUM"),
  positiveMarks: z.number().optional().default(1),
  negativeMarks: z.number().optional().default(0),
  status: PublishStatus.optional().default("PUBLISHED"),
})

export type TestInput = z.infer<typeof testInputSchema>

export const fullPaperFileSchema = z.object({
  type: z.literal("full-paper"),
  test: testInputSchema,
  questionSets: z.array(questionSetInputSchema).optional().default([]),
  sections: z.array(sectionSchema).min(1),
})

export type FullPaperFile = z.infer<typeof fullPaperFileSchema>

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Small stable hash for fallback dedupe keys (djb2). */
export function shortHash(input: string): string {
  let h = 5381
  for (let i = 0; i < input.length; i++) h = (h * 33) ^ input.charCodeAt(i)
  return (h >>> 0).toString(36)
}

/** Deterministic dedupe key for a question, derived from its source metadata. */
export function buildQuestionImportKey(q: QuestionInput): string {
  const number = q.questionNumber != null ? `Q${q.questionNumber}` : `H${shortHash(q.questionText)}`
  return [
    q.exam,
    q.year ?? "x",
    q.session ?? q.slot ?? "x",
    q.shift ?? "x",
    q.subject,
    number,
  ].join("|")
}

/** Deterministic dedupe key for a question set. */
export function buildSetImportKey(s: QuestionSetInput): string {
  const title = s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
  return [s.exam, s.year ?? "x", s.slot ?? "x", title].join("|")
}

/** Format a ZodError into readable `path: message` lines. */
export function formatIssues(error: z.ZodError): string[] {
  return error.issues.map((i) => {
    const path = i.path.length ? i.path.join(".") : "(root)"
    return `  • ${path}: ${i.message}`
  })
}
