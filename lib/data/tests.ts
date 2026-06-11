import { prisma } from "@/lib/db"
import type {
  Difficulty,
  PublicQuestion,
  PublicTest,
  QuestionOption,
  QuestionType,
  TestSection,
  TestType,
} from "@/lib/test-data"

/* Phase 12 — DB-backed public test data. Returns PublicTest objects (the answer
   key is never included), reusing the existing test-engine types so the cards
   and totals helpers work unchanged. */

const TYPE_LABEL: Record<string, TestType> = {
  FULL_MOCK: "Full-length",
  SECTIONAL: "Sectional",
  TOPIC_QUIZ: "Topic drill",
  PREVIOUS_YEAR: "Full-length",
}

const DIFF_LABEL: Record<string, Difficulty> = {
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
}

const QTYPE_LABEL: Record<string, QuestionType> = {
  SINGLE_CORRECT: "MCQ_SINGLE",
  NUMERIC: "NUMERIC",
}

const testSelect = {
  slug: true,
  title: true,
  exam: true,
  examTag: true,
  testType: true,
  difficulty: true,
  durationMinutes: true,
  positiveMarks: true,
  negativeMarks: true,
  testQuestions: {
    orderBy: { orderIndex: "asc" as const },
    select: {
      sectionName: true,
      positiveMarksOverride: true,
      negativeMarksOverride: true,
      question: {
        select: {
          id: true,
          type: true,
          stem: true,
          options: true,
          explanation: true,
          topic: true,
          difficulty: true,
        },
      },
    },
  },
  _count: { select: { attempts: true } },
}

type DbTest = {
  slug: string
  title: string
  exam: string | null
  examTag: string | null
  testType: string
  difficulty: string
  durationMinutes: number
  positiveMarks: number
  negativeMarks: number
  testQuestions: {
    sectionName: string | null
    positiveMarksOverride: number | null
    negativeMarksOverride: number | null
    question: {
      id: string
      type: string
      stem: string
      options: unknown
      explanation: string
      topic: string
      difficulty: string
    }
  }[]
  _count: { attempts: number }
}

/** Map stored options Json to public {id,text} pairs — drops the `isCorrect` key. */
function publicOptions(raw: unknown): QuestionOption[] | undefined {
  if (!Array.isArray(raw)) return undefined
  const opts = raw
    .filter((o): o is { id: unknown; text: unknown } => !!o && typeof o === "object")
    .map((o) => ({ id: String(o.id), text: String(o.text) }))
  return opts.length ? opts : undefined
}

function slugifyName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "section"
}

function toPublicTest(t: DbTest): PublicTest {
  // Build sections in first-seen order, collecting question ids.
  const sectionOrder: string[] = []
  const sectionMap = new Map<string, TestSection>()
  const questions: PublicQuestion[] = []

  t.testQuestions.forEach((tq, i) => {
    const sectionName = tq.sectionName?.trim() || "Section"
    let section = sectionMap.get(sectionName)
    if (!section) {
      section = { id: `${slugifyName(sectionName)}-${sectionOrder.length + 1}`, name: sectionName, questionIds: [] }
      sectionMap.set(sectionName, section)
      sectionOrder.push(sectionName)
    }
    const qid = `${t.slug}-q${i + 1}`
    section.questionIds.push(qid)
    questions.push({
      id: qid,
      sectionId: section.id,
      type: QTYPE_LABEL[tq.question.type] ?? "MCQ_SINGLE",
      stem: tq.question.stem,
      options: publicOptions(tq.question.options),
      explanation: tq.question.explanation,
      topic: tq.question.topic,
      difficulty: DIFF_LABEL[tq.question.difficulty] ?? "Medium",
      positiveMarks: tq.positiveMarksOverride ?? t.positiveMarks,
      negativeMarks: tq.negativeMarksOverride ?? t.negativeMarks,
    })
  })

  return {
    id: t.slug,
    title: t.title,
    examTag: t.examTag ?? t.exam ?? "General",
    testType: TYPE_LABEL[t.testType] ?? "Full-length",
    difficulty: DIFF_LABEL[t.difficulty] ?? "Medium",
    durationMinutes: t.durationMinutes,
    positiveMarks: t.positiveMarks,
    negativeMarks: t.negativeMarks,
    attempts: t._count.attempts,
    instructions: [],
    sections: sectionOrder.map((name) => sectionMap.get(name)!),
    questions,
  }
}

export async function getPublishedTests(): Promise<PublicTest[]> {
  const tests = await prisma.test.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    select: testSelect,
  })
  return (tests as DbTest[]).map(toPublicTest)
}

export async function getTestBySlugOrId(idOrSlug: string): Promise<PublicTest | null> {
  const test = await prisma.test.findFirst({
    where: { status: "PUBLISHED", OR: [{ slug: idOrSlug }, { id: idOrSlug }] },
    select: testSelect,
  })
  return test ? toPublicTest(test as DbTest) : null
}
