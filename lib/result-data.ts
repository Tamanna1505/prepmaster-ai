/* ──────────────────────────────────────────────────────────────────────────
   Phase 6 — sample attempts + derived result analytics. Sample/static only.
   A small set of authored attempts; the heavy analytics (score, section/topic
   breakdown, question review) are derived deterministically from the attempt's
   test so the numbers are internally consistent.
   ────────────────────────────────────────────────────────────────────────── */

import {
  getTest,
  type ExamTest,
  type TestQuestion,
} from "@/lib/test-data"

export type ReviewStatus = "correct" | "wrong" | "unattempted"

export type SampleAttempt = {
  id: string
  testId: string
  date: string
  percentile: number
  timeTakenSeconds: number
  accuracyTarget: number // drives the deterministic correct/wrong pattern
  aiFeedback: string
  recommendedSteps: string[]
}

export const sampleAttempts: SampleAttempt[] = [
  {
    id: "att-9001",
    testId: "jee-main-full-01",
    date: "2026-06-03",
    percentile: 88,
    timeTakenSeconds: 52 * 60,
    accuracyTarget: 74,
    aiFeedback:
      "Strong attempt — your mechanics and calculus work is reliable under time pressure. The marks you left on the table were concentrated in chemistry, where two careless sign/unit slips cost you. Your pacing was good: you finished with time to spare without rushing the hard questions.",
    recommendedSteps: [
      "Revise periodic-table trends and revisit the two chemistry questions you missed.",
      "Attempt the 'Electrostatics — Topic Drill' to convert near-misses into marks.",
      "Keep your current pacing — it's working. Don't speed up at the cost of accuracy.",
    ],
  },
  {
    id: "att-9000",
    testId: "cat-quant-full-01",
    date: "2026-06-01",
    percentile: 79,
    timeTakenSeconds: 37 * 60,
    accuracyTarget: 66,
    aiFeedback:
      "A solid quant section let down by data interpretation, where you lost the most marks. Your accuracy on arithmetic and algebra is good, but DI sets are eating time and inviting errors. The fix here is method, not effort.",
    recommendedSteps: [
      "Drill 2 DI sets a day for a week — focus on setup speed, not raw calculation.",
      "Slow down on the first read of each DI caselet to avoid misreading the table.",
      "Re-attempt this mock's DI section in isolation and compare your timing.",
    ],
  },
  {
    id: "att-8999",
    testId: "cuet-general-01",
    date: "2026-05-29",
    percentile: 64,
    timeTakenSeconds: 41 * 60,
    accuracyTarget: 58,
    aiFeedback:
      "Your general-knowledge base is developing well, but reasoning is where the score plateaued. Several reasoning questions were left unattempted, which suggests time ran short rather than a knowledge gap. Build speed and the score follows.",
    recommendedSteps: [
      "Practise timed reasoning sets — aim for under 50 seconds per question.",
      "Review the current-affairs questions you missed and note the themes.",
      "Attempt a sectional reasoning test before your next full mock.",
    ],
  },
  {
    id: "att-8998",
    testId: "aptitude-speed-drill",
    date: "2026-05-27",
    percentile: 91,
    timeTakenSeconds: 16 * 60,
    accuracyTarget: 82,
    aiFeedback:
      "Excellent speed-drill performance — high accuracy at pace. You're clearly comfortable with mixed aptitude. The remaining gains are at the margins: a couple of number-system questions need a second look.",
    recommendedSteps: [
      "Push into harder number-system problems to keep improving.",
      "Maintain this cadence in your full-length mocks.",
    ],
  },
  {
    id: "att-8997",
    testId: "cat-varc-sectional",
    date: "2026-05-24",
    percentile: 81,
    timeTakenSeconds: 33 * 60,
    accuracyTarget: 70,
    aiFeedback:
      "Reading comprehension is your strength; vocabulary cost you a couple of marks. Your inference questions were handled well, which is the harder skill to build.",
    recommendedSteps: [
      "Add 10 new words a day from your missed vocabulary questions.",
      "Keep practising inference-style RC — it's already a strength.",
    ],
  },
  {
    id: "att-8996",
    testId: "mba-reasoning-sectional",
    date: "2026-05-21",
    percentile: 85,
    timeTakenSeconds: 26 * 60,
    accuracyTarget: 76,
    aiFeedback:
      "Reasoning is in good shape — arrangement and series questions were strong. The data-interpretation crossover questions are where to focus next.",
    recommendedSteps: [
      "Mix in DI-reasoning hybrid sets to round out the section.",
      "Time yourself on arrangement puzzles to lock in your speed.",
    ],
  },
]

export function getAttempt(id: string): SampleAttempt | undefined {
  return sampleAttempts.find((a) => a.id === id)
}

/* Which sample result a submitted attempt of a given test should land on. */
export function resultIdForTest(testId: string): string {
  return sampleAttempts.find((a) => a.testId === testId)?.id ?? sampleAttempts[0].id
}

export type QuestionReviewItem = {
  index: number
  sectionName: string
  question: TestQuestion
  status: ReviewStatus
  yourAnswerText: string
  correctAnswerText: string
  marksAwarded: number
}

export type SectionResult = {
  name: string
  score: number
  maxScore: number
  total: number
  attempted: number
  correct: number
  accuracyPct: number
}

export type TopicResult = {
  topic: string
  total: number
  correct: number
  accuracyPct: number
}

export type BuiltResult = {
  attempt: SampleAttempt
  test: ExamTest
  totalScore: number
  maxScore: number
  percentage: number
  accuracyPct: number
  total: number
  attempted: number
  correct: number
  wrong: number
  unattempted: number
  timeTakenSeconds: number
  percentile: number
  date: string
  sections: SectionResult[]
  topics: TopicResult[]
  review: QuestionReviewItem[]
}

function optionText(q: TestQuestion, ids: string[]): string {
  if (!q.options) return ""
  return q.options
    .filter((opt) => ids.includes(opt.id))
    .map((opt) => opt.text)
    .join(", ")
}

function correctAnswerText(q: TestQuestion): string {
  if (q.type === "NUMERIC") return String(q.correctNumeric)
  return optionText(q, q.correctOptionIds ?? [])
}

function wrongAnswerText(q: TestQuestion, seed: number): string {
  if (q.type === "NUMERIC") return String((q.correctNumeric ?? 0) + ((seed % 3) + 1))
  if (!q.options) return "—"
  const wrong = q.options.find((opt) => !(q.correctOptionIds ?? []).includes(opt.id))
  return wrong ? wrong.text : q.options[0].text
}

export function buildResult(attempt: SampleAttempt): BuiltResult | undefined {
  const test = getTest(attempt.testId)
  if (!test) return undefined

  const seed = [...attempt.id].reduce((s, c) => s + c.charCodeAt(0), 0)

  const review: QuestionReviewItem[] = test.questions.map((q, gi) => {
    const sectionName = test.sections.find((s) => s.id === q.sectionId)?.name ?? "Section"
    const unattempted = gi % 9 === 8
    const isCorrect = !unattempted && (gi * 31 + seed) % 100 < attempt.accuracyTarget
    const status: ReviewStatus = unattempted ? "unattempted" : isCorrect ? "correct" : "wrong"
    const marksAwarded =
      status === "correct" ? q.positiveMarks : status === "wrong" ? q.negativeMarks : 0
    const correct = correctAnswerText(q)
    const yourAnswerText =
      status === "unattempted" ? "—" : status === "correct" ? correct : wrongAnswerText(q, seed + gi)
    return { index: gi + 1, sectionName, question: q, status, yourAnswerText, correctAnswerText: correct, marksAwarded }
  })

  const correct = review.filter((r) => r.status === "correct").length
  const wrong = review.filter((r) => r.status === "wrong").length
  const unattempted = review.filter((r) => r.status === "unattempted").length
  const total = review.length
  const attempted = correct + wrong
  const totalScore = review.reduce((s, r) => s + r.marksAwarded, 0)
  const maxScore = test.questions.reduce((s, q) => s + q.positiveMarks, 0)
  const percentage = Math.max(0, Math.round((totalScore / maxScore) * 100))
  const accuracyPct = attempted ? Math.round((correct / attempted) * 100) : 0

  const sections: SectionResult[] = test.sections.map((sec) => {
    const items = review.filter((r) => r.question.sectionId === sec.id)
    const c = items.filter((r) => r.status === "correct").length
    const a = items.filter((r) => r.status !== "unattempted").length
    return {
      name: sec.name,
      score: items.reduce((s, r) => s + r.marksAwarded, 0),
      maxScore: items.reduce((s, r) => s + r.question.positiveMarks, 0),
      total: items.length,
      attempted: a,
      correct: c,
      accuracyPct: a ? Math.round((c / a) * 100) : 0,
    }
  })

  const topicMap = new Map<string, { total: number; correct: number }>()
  for (const r of review) {
    const t = topicMap.get(r.question.topic) ?? { total: 0, correct: 0 }
    t.total += 1
    if (r.status === "correct") t.correct += 1
    topicMap.set(r.question.topic, t)
  }
  const topics: TopicResult[] = [...topicMap.entries()]
    .map(([topic, v]) => ({
      topic,
      total: v.total,
      correct: v.correct,
      accuracyPct: Math.round((v.correct / v.total) * 100),
    }))
    .sort((a, b) => a.accuracyPct - b.accuracyPct)

  return {
    attempt,
    test,
    totalScore,
    maxScore,
    percentage,
    accuracyPct,
    total,
    attempted,
    correct,
    wrong,
    unattempted,
    timeTakenSeconds: attempt.timeTakenSeconds,
    percentile: attempt.percentile,
    date: attempt.date,
    sections,
    topics,
    review,
  }
}

export type AttemptSummary = {
  id: string
  title: string
  examTag: string
  testType: string
  scorePct: number
  accuracyPct: number
  percentile: number
  date: string
}

export function attemptSummaries(): AttemptSummary[] {
  const out: AttemptSummary[] = []
  for (const a of sampleAttempts) {
    const r = buildResult(a)
    if (!r) continue
    out.push({
      id: a.id,
      title: r.test.title,
      examTag: r.test.examTag,
      testType: r.test.testType,
      scorePct: r.percentage,
      accuracyPct: r.accuracyPct,
      percentile: r.percentile,
      date: a.date,
    })
  }
  return out
}
