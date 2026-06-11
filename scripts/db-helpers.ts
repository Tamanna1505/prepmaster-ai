/**
 * Database helpers for the import scripts (Phase 10.5):
 * a Prisma client factory (with the v7 driver adapter) and mappers that turn
 * validated import objects into Prisma create inputs.
 */
import { Prisma, PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import type { QuestionInput, QuestionSetInput } from "./schemas"

export function createPrismaClient(): PrismaClient {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
  return new PrismaClient({ adapter })
}

/** Engine-compatible options array for SINGLE_CORRECT questions. */
function optionsArray(q: QuestionInput): Prisma.InputJsonValue {
  return [
    { id: "a", text: q.optionA ?? "", isCorrect: q.correctAnswer === "A" },
    { id: "b", text: q.optionB ?? "", isCorrect: q.correctAnswer === "B" },
    { id: "c", text: q.optionC ?? "", isCorrect: q.correctAnswer === "C" },
    { id: "d", text: q.optionD ?? "", isCorrect: q.correctAnswer === "D" },
  ]
}

export function questionCreateData(
  q: QuestionInput,
  importKey: string,
  questionSetId?: string | null
): Prisma.QuestionUncheckedCreateInput {
  const isNumeric = q.questionType === "NUMERIC"
  return {
    importKey,
    exam: q.exam,
    subject: q.subject,
    topic: q.topic,
    subTopic: q.subtopic ?? null,
    year: q.year ?? null,
    session: q.session ?? null,
    shift: q.shift ?? null,
    slot: q.slot ?? null,
    paperName: q.paperName ?? null,
    questionNumber: q.questionNumber ?? null,
    sourceName: q.sourceName,
    sourceUrl: q.sourceUrl,
    sourceYear: q.sourceYear ?? q.year ?? null,
    type: q.questionType,
    stem: q.questionText,
    passage: q.passage ?? null,
    optionA: q.optionA ?? null,
    optionB: q.optionB ?? null,
    optionC: q.optionC ?? null,
    optionD: q.optionD ?? null,
    correctAnswer: q.correctAnswer,
    correctNumeric: isNumeric ? Number(q.correctAnswer) : null,
    tolerance: q.tolerance ?? null,
    explanation: q.explanation ?? "",
    imageUrl: q.imageUrl ?? null,
    solutionImageUrl: q.solutionImageUrl ?? null,
    section: q.subject,
    difficulty: q.difficulty,
    // JSON `negativeMarks` is a positive penalty magnitude; stored negated.
    defaultPositiveMarks: q.marks,
    defaultNegativeMarks: -Math.abs(q.negativeMarks),
    questionSetId: questionSetId ?? null,
    ...(isNumeric ? {} : { options: optionsArray(q) }),
  }
}

export function questionSetCreateData(
  s: QuestionSetInput,
  importKey: string
): Prisma.QuestionSetUncheckedCreateInput {
  return {
    importKey,
    exam: s.exam,
    year: s.year ?? null,
    slot: s.slot ?? null,
    section: s.section ?? null,
    title: s.title,
    setType: s.setType,
    content: s.content,
    sourceName: s.sourceName ?? null,
    sourceUrl: s.sourceUrl ?? null,
  }
}
