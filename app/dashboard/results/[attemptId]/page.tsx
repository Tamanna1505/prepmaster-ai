import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft, Sparkle } from "lucide-react"
import { buildResult, getAttempt } from "@/lib/result-data"
import { Eyebrow, LearnMore, PillLink, Tag } from "@/components/marketing/primitives"
import { ResultSummaryCard } from "@/components/tests/result-summary-card"
import { SectionPerformance } from "@/components/tests/section-performance"
import { QuestionReview } from "@/components/tests/question-review"

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

      {/* Summary */}
      <ResultSummaryCard result={result} />

      {/* AI feedback + recommended steps */}
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-[20px] bg-ink p-6 text-cream-text shadow-feature sm:p-7">
          <div className="flex items-center gap-2">
            <Sparkle className="size-4 text-gold-200" strokeWidth={1.75} />
            <span className="eyebrow text-gold-200">AI Performance Insights</span>
          </div>
          <p className="mt-3 text-[16px] leading-[1.6] text-cream-text/90">
            {result.attempt.aiFeedback}
          </p>
          <div className="mt-5">
            <LearnMore label="Open full analytics" href="/dashboard/analytics" tone="cream" />
          </div>
        </div>

        <div className="rounded-[20px] bg-gold-200 p-6 text-gold-ink shadow-card">
          <Eyebrow tone="orange">Recommended next steps</Eyebrow>
          <ul className="mt-3 space-y-2.5">
            {result.attempt.recommendedSteps.map((step) => (
              <li key={step} className="flex items-start gap-2 text-[14px] leading-[1.5] text-brown">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-orange" />
                {step}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Section + topic performance */}
      <div>
        <h2 className="mb-4 font-serif text-[22px] tracking-[-0.02em] text-ink">Performance breakdown</h2>
        <SectionPerformance sections={result.sections} topics={result.topics} />
      </div>

      {/* Question-wise review */}
      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-serif text-[22px] tracking-[-0.02em] text-ink">
            Question-wise review
          </h2>
          <PillLink href={`/dashboard/tests/${test.id}`} variant="outline" size="sm">
            Re-attempt test
          </PillLink>
        </div>
        <QuestionReview review={result.review} />
      </div>
    </div>
  )
}
