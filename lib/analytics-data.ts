/* ──────────────────────────────────────────────────────────────────────────
   Phase 7 — student analytics, derived from the same sample attempts that drive
   the results pages so every number lines up. Sample/static only; no DB, no AI
   API. The AI insight is a templated "mentor summary" built from the computed
   strengths / weaknesses.
   ────────────────────────────────────────────────────────────────────────── */

import { buildResult, sampleAttempts, type BuiltResult } from "@/lib/result-data"

export type TrendPoint = {
  label: string
  date: string
  score: number
  accuracy: number
  percentile: number
}

export type SectionAgg = {
  name: string
  score: number
  maxScore: number
  total: number
  attempted: number
  correct: number
  accuracyPct: number
}

export type TopicAgg = {
  topic: string
  total: number
  correct: number
  accuracyPct: number
  subtopics: string[]
}

export type TimeManagement = {
  avgSecondsPerQuestion: number
  byDifficulty: { difficulty: "Easy" | "Medium" | "Hard"; avgSeconds: number; verdict: string }[]
  rushedPct: number
  optimalPct: number
  overtimePct: number
  note: string
}

export type AiInsight = {
  headline: string
  narrative: string
  strength: { title: string; detail: string }
  weakness: { title: string; detail: string }
  timeFeedback: string
  revisionAdvice: string
  nextSteps: string[]
  practiceSet: { title: string; detail: string; href: string }
  priority: "High" | "Medium" | "Low"
  confidencePct: number
}

export type Recommendation = {
  priority: "High" | "Medium" | "Low"
  title: string
  detail: string
  cta: { label: string; href: string }
}

export type StudentAnalytics = {
  summary: {
    testsTaken: number
    avgScore: number
    avgAccuracy: number
    bestPercentile: number
    improvement: number
    avgSecondsPerQuestion: number
  }
  scoreTrend: TrendPoint[]
  sectionPerformance: SectionAgg[]
  topicPerformance: TopicAgg[]
  strongTopics: TopicAgg[]
  weakTopics: TopicAgg[]
  timeManagement: TimeManagement
  aiInsight: AiInsight
  recommendations: Recommendation[]
}

/* Finer tags shown on weak-topic cards (sample). */
const SUBTOPICS: Record<string, string[]> = {
  Arithmetic: ["Time & Work", "Percentages", "Averages"],
  Algebra: ["Quadratics", "Inequalities"],
  "Number System": ["Remainders", "Factors"],
  "Data Interpretation": ["Tables", "Caselets"],
  "Logical Reasoning": ["Arrangements", "Series"],
  Vocabulary: ["Antonyms", "Usage"],
  Grammar: ["Subject–verb agreement"],
  Reading: ["Inference", "Tone"],
  Physics: ["Electrostatics", "Modern physics"],
  Chemistry: ["Periodic trends", "Acids & bases"],
  Calculus: ["Integration"],
  "General Knowledge": ["Polity", "Current affairs"],
}

function builtResults(): BuiltResult[] {
  const out: BuiltResult[] = []
  for (const a of sampleAttempts) {
    const r = buildResult(a)
    if (r) out.push(r)
  }
  return out.sort((a, b) => a.date.localeCompare(b.date))
}

function mean(nums: number[]): number {
  return nums.length ? Math.round(nums.reduce((s, n) => s + n, 0) / nums.length) : 0
}

function formatLabel(date: string): string {
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export function getStudentAnalytics(): StudentAnalytics {
  const results = builtResults()

  const scoreTrend: TrendPoint[] = results.map((r) => ({
    label: formatLabel(r.date),
    date: r.date,
    score: r.percentage,
    accuracy: r.accuracyPct,
    percentile: r.percentile,
  }))

  // Sections aggregated across attempts.
  const sectionMap = new Map<string, SectionAgg>()
  for (const r of results) {
    for (const s of r.sections) {
      const cur =
        sectionMap.get(s.name) ??
        { name: s.name, score: 0, maxScore: 0, total: 0, attempted: 0, correct: 0, accuracyPct: 0 }
      cur.score += s.score
      cur.maxScore += s.maxScore
      cur.total += s.total
      cur.attempted += s.attempted
      cur.correct += s.correct
      sectionMap.set(s.name, cur)
    }
  }
  const sectionPerformance = [...sectionMap.values()]
    .map((s) => ({ ...s, accuracyPct: s.attempted ? Math.round((s.correct / s.attempted) * 100) : 0 }))
    .sort((a, b) => b.accuracyPct - a.accuracyPct)

  // Topics aggregated across attempts.
  const topicMap = new Map<string, { total: number; correct: number }>()
  for (const r of results) {
    for (const item of r.review) {
      const cur = topicMap.get(item.question.topic) ?? { total: 0, correct: 0 }
      cur.total += 1
      if (item.status === "correct") cur.correct += 1
      topicMap.set(item.question.topic, cur)
    }
  }
  const topicPerformance: TopicAgg[] = [...topicMap.entries()]
    .map(([topic, v]) => ({
      topic,
      total: v.total,
      correct: v.correct,
      accuracyPct: Math.round((v.correct / v.total) * 100),
      subtopics: SUBTOPICS[topic] ?? [],
    }))
    .sort((a, b) => a.accuracyPct - b.accuracyPct)

  const weakTopics = topicPerformance.slice(0, 4)
  const strongTopics = [...topicPerformance].reverse().slice(0, 4)

  const totalQuestions = results.reduce((s, r) => s + r.total, 0)
  const totalTime = results.reduce((s, r) => s + r.timeTakenSeconds, 0)
  const avgSecondsPerQuestion = totalQuestions ? Math.round(totalTime / totalQuestions) : 0

  const timeManagement: TimeManagement = {
    avgSecondsPerQuestion,
    byDifficulty: [
      { difficulty: "Easy", avgSeconds: 34, verdict: "On pace" },
      { difficulty: "Medium", avgSeconds: 71, verdict: "Too slow" },
      { difficulty: "Hard", avgSeconds: 96, verdict: "On pace" },
    ],
    rushedPct: 11,
    optimalPct: 100 - 11 - 18,
    overtimePct: 18,
    note: "You're spending the most time on medium-difficulty quant — that's where the clock is leaking.",
  }

  const summary = {
    testsTaken: results.length,
    avgScore: mean(results.map((r) => r.percentage)),
    avgAccuracy: mean(results.map((r) => r.accuracyPct)),
    bestPercentile: Math.max(...results.map((r) => r.percentile)),
    improvement:
      results.length >= 2 ? results[results.length - 1].percentage - results[0].percentage : 0,
    avgSecondsPerQuestion,
  }

  const strongest = strongTopics[0]
  const weakest = weakTopics[0]
  const weakSubs = (weakest?.subtopics ?? []).slice(0, 2).join(" and ")

  const aiInsight: AiInsight = {
    headline: `You're trending ${summary.improvement >= 0 ? "up" : "down"} — accuracy is the lever now, not coverage.`,
    narrative: `Your strongest area is ${strongest?.topic ?? "—"} (${strongest?.accuracyPct ?? 0}% accuracy). Your weakest area is ${weakest?.topic ?? "—"} (${weakest?.accuracyPct ?? 0}%)${weakSubs ? `, especially ${weakSubs}` : ""}. You're spending too much time on medium-difficulty quant questions. Before your next mock, complete one ${weakest?.topic.toLowerCase() ?? "revision"} module and attempt twenty topic-wise questions.`,
    strength: {
      title: strongest?.topic ?? "—",
      detail: `${strongest?.accuracyPct ?? 0}% accuracy across ${strongest?.total ?? 0} questions — your most reliable area under time pressure.`,
    },
    weakness: {
      title: weakest?.topic ?? "—",
      detail: `${weakest?.accuracyPct ?? 0}% accuracy${weakSubs ? `, with ${weakSubs} the biggest gaps` : ""}. This is the single highest-return area to fix.`,
    },
    timeFeedback:
      "Medium-difficulty questions are averaging 71s — about 20s over target. Trimming that alone recovers several marks per mock.",
    revisionAdvice: `Do one focused ${weakest?.topic ?? "revision"} module, then 20 topic-wise questions to convert near-misses into marks. Keep your strong areas warm, don't over-invest in them.`,
    nextSteps: [
      `Complete the ${weakest?.topic ?? "weak-topic"} revision module`,
      "Attempt 20 topic-wise questions on your two weakest sub-topics",
      "Re-attempt your lowest-scoring mock and compare timing",
    ],
    practiceSet: {
      title: `${weakest?.topic ?? "Mixed"} — Topic Drill`,
      detail: "20 targeted questions · ~25 min · instant AI report",
      href: "/dashboard/tests/aptitude-speed-drill",
    },
    priority: "High",
    confidencePct: 86,
  }

  const recommendations: Recommendation[] = [
    {
      priority: "High",
      title: `Revise ${weakest?.topic ?? "your weakest topic"}`,
      detail: `At ${weakest?.accuracyPct ?? 0}% accuracy, this is your highest-return fix. One module + 20 questions.`,
      cta: { label: "Open module", href: "/dashboard/courses" },
    },
    {
      priority: "High",
      title: "Drill data interpretation under time",
      detail: "Speed, not method, is the gap. Two timed DI sets a day for a week.",
      cta: { label: "Start drill", href: "/dashboard/tests/aptitude-speed-drill" },
    },
    {
      priority: "Medium",
      title: "Re-attempt your lowest mock",
      detail: "Compare timing and accuracy to confirm the fixes are landing.",
      cta: { label: "Re-attempt", href: "/dashboard/tests/cuet-general-01" },
    },
  ]

  return {
    summary,
    scoreTrend,
    sectionPerformance,
    topicPerformance,
    strongTopics,
    weakTopics,
    timeManagement,
    aiInsight,
    recommendations,
  }
}

/* Per-attempt mentor insight for the result detail page. */
export function buildAttemptInsight(result: BuiltResult): AiInsight {
  const sortedTopics = [...result.topics].sort((a, b) => a.accuracyPct - b.accuracyPct)
  const weakest = sortedTopics[0]
  const strongest = sortedTopics[sortedTopics.length - 1]
  const sortedSections = [...result.sections].sort((a, b) => b.accuracyPct - a.accuracyPct)
  const bestSection = sortedSections[0]

  return {
    headline: result.attempt.aiFeedback.split(".")[0] + ".",
    narrative: result.attempt.aiFeedback,
    strength: {
      title: bestSection?.name ?? strongest?.topic ?? "—",
      detail: `${bestSection?.accuracyPct ?? strongest?.accuracyPct ?? 0}% accuracy — your most reliable section in this attempt.`,
    },
    weakness: {
      title: weakest?.topic ?? "—",
      detail: `${weakest?.accuracyPct ?? 0}% accuracy — the area that cost you the most marks here.`,
    },
    timeFeedback: `You used ${Math.round(result.timeTakenSeconds / 60)} minutes of the ${result.test.durationMinutes}-minute window. ${
      result.unattempted > 0
        ? `${result.unattempted} question${result.unattempted > 1 ? "s were" : " was"} left unattempted — pace earlier next time.`
        : "Pacing was well controlled."
    }`,
    revisionAdvice: `Revisit ${weakest?.topic ?? "your weakest topic"} before your next attempt, then re-test on the same section to confirm.`,
    nextSteps: result.attempt.recommendedSteps,
    practiceSet: {
      title: `${weakest?.topic ?? "Mixed"} — Topic Drill`,
      detail: "20 targeted questions · instant AI report",
      href: "/dashboard/tests/aptitude-speed-drill",
    },
    priority: result.percentage >= 70 ? "Medium" : "High",
    confidencePct: Math.min(95, 60 + Math.round(result.accuracyPct / 4)),
  }
}
