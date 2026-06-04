import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { buildResult, getAttempt } from "@/lib/result-data"
import { buildAttemptInsight, type Recommendation } from "@/lib/analytics-data"
import { PillLink, Tag } from "@/components/marketing/primitives"
import { ResultSummaryCard } from "@/components/tests/result-summary-card"
import { SectionPerformance } from "@/components/tests/section-performance"
import { QuestionReview } from "@/components/tests/question-review"
import { AiInsightPanel } from "@/components/analytics/ai-insight-panel"
import { RecommendationCard } from "@/components/analytics/recommendation-card"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ attemptId: string }>
}): Promise<Metadata> {
  const { attemptId } = await params
  const attempt = getAttempt(attemptId)
  const result = attempt ? buildResult(attempt) : undefined
  return { title: result ? `Result · ${result.test.title}` : "Result" }
}

export default async function ResultDetailPage({
  params,
}: {
  params: Promise<{ attemptId: string }>
}) {
  const { attemptId } = await params
  const attempt = getAttempt(attemptId)
  const result = attempt ? buildResult(attempt) : undefined
  if (!result) notFound()

  const { test } = result
  const insight = buildAttemptInsight(result)
  const weakest = [...result.topics].sort((a, b) => a.accuracyPct - b.accuracyPct)[0]

  const recs: Recommendation[] = [
    {
      priority: "High",
      title: `Revise ${weakest?.topic ?? "your weakest topic"}`,
      detail: `At ${weakest?.accuracyPct ?? 0}% here, it's your highest-return fix. One focused module closes most of the gap.`,
      cta: { label: "Open module", href: "/dashboard/courses" },
    },
    {
      priority: "High",
      title: "Practice weak topics",
      detail: "20 targeted questions on your lowest topics, with an instant AI report at the end.",
      cta: { label: "Start drill", href: "/dashboard/tests/aptitude-speed-drill" },
    },
    {
      priority: "Medium",
      title: "Retake this test",
      detail: "Re-attempt to confirm the fixes landed and compare your timing.",
      cta: { label: "Retake", href: `/dashboard/tests/${test.id}` },
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/dashboard/results"
          className="focus-ring inline-flex items-center gap-1 rounded font-ui text-[13px] font-medium text-cocoa transition-colors hover:text-ink"
        >
          <ChevronLeft className="size-4" strokeWidth={2} /> Results
        </Link>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Tag tone="outline">{test.examTag}</Tag>
          <Tag tone="gold">{test.testType}</Tag>
          <span className="font-ui text-[13px] text-taupe">
            {new Date(result.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        <h1 className="mt-3 font-serif text-[28px] leading-[1.08] tracking-[-0.02em] text-ink sm:text-[34px]">
          {test.title}
        </h1>
      </div>

      {/* Premium summary hero */}
      <ResultSummaryCard result={result} />

      {/* CTAs */}
      <div className="flex flex-wrap items-center gap-3">
        <PillLink href={`/dashboard/tests/${test.id}`} variant="gold" size="lg">
          Retake test
        </PillLink>
        <PillLink href="/dashboard/tests/aptitude-speed-drill" variant="ink" size="lg">
          Practice weak topics
        </PillLink>
        <PillLink href="/dashboard/analytics" variant="outline" size="lg">
          View analytics
        </PillLink>
      </div>

      {/* AI feedback */}
      <AiInsightPanel insight={insight} analyticsHref="/dashboard/analytics" />

      {/* Section + topic performance */}
      <div>
        <h2 className="mb-4 font-serif text-[22px] tracking-[-0.02em] text-ink">Performance breakdown</h2>
        <SectionPerformance sections={result.sections} topics={result.topics} />
      </div>

      {/* Recommended practice */}
      <div>
        <h2 className="mb-4 font-serif text-[22px] tracking-[-0.02em] text-ink">Recommended practice</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {recs.map((rec) => (
            <RecommendationCard key={rec.title} rec={rec} />
          ))}
        </div>
      </div>

      {/* Question-wise review */}
      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-serif text-[22px] tracking-[-0.02em] text-ink">Question-wise review</h2>
          <PillLink href={`/dashboard/tests/${test.id}`} variant="outline" size="sm">
            Re-attempt test
          </PillLink>
        </div>
        <QuestionReview review={result.review} />
      </div>
    </div>
  )
}
