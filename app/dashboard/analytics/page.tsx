import type { Metadata } from "next"
import { TrendingDown, TrendingUp } from "lucide-react"
import { PageHeader } from "@/components/layout/page-header"
import { getStudentAnalytics } from "@/lib/analytics-data"
import { PerformanceSummary } from "@/components/analytics/performance-summary"
import { AiInsightPanel } from "@/components/analytics/ai-insight-panel"
import { ScoreTrendChart } from "@/components/analytics/score-trend-chart"
import { SectionPerformanceChart } from "@/components/analytics/section-performance-chart"
import { TopicWeaknessCard } from "@/components/analytics/topic-weakness-card"
import { TimeManagementCard } from "@/components/analytics/time-management-card"
import { RecommendationCard } from "@/components/analytics/recommendation-card"

export const metadata: Metadata = { title: "Analytics" }

function StrengthsWeaknesses({
  strong,
  weak,
}: {
  strong: { topic: string; accuracyPct: number }[]
  weak: { topic: string; accuracyPct: number }[]
}) {
  const cols = [
    {
      title: "Strongest areas",
      icon: TrendingUp,
      accent: "text-teal-deep",
      items: strong,
      tone: "text-teal-deep",
    },
    {
      title: "Focus areas",
      icon: TrendingDown,
      accent: "text-orange",
      items: weak,
      tone: "text-orange",
    },
  ]
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {cols.map((c) => (
        <div key={c.title} className="rounded-[20px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-6">
          <div className="flex items-center gap-2">
            <c.icon className={`size-4 ${c.accent}`} strokeWidth={2} />
            <p className="eyebrow text-teal-deep">{c.title}</p>
          </div>
          <ul className="mt-4 space-y-2.5">
            {c.items.map((it) => (
              <li
                key={it.topic}
                className="flex items-center justify-between rounded-[12px] bg-surface-muted px-4 py-2.5"
              >
                <span className="font-ui text-[14px] text-cocoa">{it.topic}</span>
                <span className={`font-data text-[14px] font-semibold tracking-[-0.02em] ${c.tone}`}>
                  {it.accuracyPct}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default function AnalyticsPage() {
  const a = getStudentAnalytics()

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Insights"
        title="Analytics"
        description="Your score and accuracy trends, section and topic performance, time management, and an AI read on what to fix next."
      />

      <PerformanceSummary summary={a.summary} />

      {/* AI mentor insight */}
      <AiInsightPanel insight={a.aiInsight} />

      {/* Trends */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ScoreTrendChart data={a.scoreTrend} metric="score" />
        <ScoreTrendChart data={a.scoreTrend} metric="accuracy" />
      </div>

      {/* Section performance + time management */}
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <SectionPerformanceChart sections={a.sectionPerformance} />
        <TimeManagementCard data={a.timeManagement} />
      </div>

      {/* Strengths & weaknesses */}
      <StrengthsWeaknesses strong={a.strongTopics} weak={a.weakTopics} />

      {/* Topic weakness analysis */}
      <TopicWeaknessCard topics={a.weakTopics} />

      {/* Recommended next actions */}
      <div>
        <h2 className="mb-4 font-serif text-[22px] tracking-[-0.02em] text-ink">
          Recommended next actions
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {a.recommendations.map((rec) => (
            <RecommendationCard key={rec.title} rec={rec} />
          ))}
        </div>
      </div>
    </div>
  )
}
