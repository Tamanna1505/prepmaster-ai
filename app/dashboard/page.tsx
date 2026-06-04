import type { Metadata } from "next"
import { Flame, PlayCircle, Sparkle } from "lucide-react"
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card"
import { ProgressCard } from "@/components/dashboard/progress-card"
import { RecentTestCard } from "@/components/dashboard/recent-test-card"
import { RecommendedCourseCard } from "@/components/dashboard/recommended-course-card"
import { WeakAreaCard } from "@/components/dashboard/weak-area-card"
import { PerformancePreview } from "@/components/dashboard/performance-preview"
import { Eyebrow, LearnMore, PillLink, Tag } from "@/components/marketing/primitives"
import {
  aiRecommendation,
  continueLearning,
  performanceTrend,
  recentResults,
  recommendedCourses,
  studentUser,
  summaryStats,
  weakAreas,
} from "@/lib/dashboard-data"

export const metadata: Metadata = { title: "Dashboard" }

export default function DashboardHomePage() {
  return (
    <div className="space-y-10">
      {/* Welcome */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Eyebrow>Welcome back</Eyebrow>
          <h1 className="mt-2 font-serif text-[30px] leading-[1.08] tracking-[-0.02em] text-ink sm:text-[36px]">
            Good to see you, {studentUser.name.split(" ")[0]}
          </h1>
          <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[15px] text-cocoa">
            <span>
              Target: <span className="font-semibold text-ink">{studentUser.examTarget}</span>
            </span>
            <span className="flex items-center gap-1.5 text-orange">
              <Flame className="size-4" strokeWidth={1.75} /> {studentUser.streakDays}-day streak
            </span>
          </p>
        </div>
        <PillLink href="/dashboard/tests" variant="ink" size="lg">
          Start a test
        </PillLink>
      </div>

      {/* Summary stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryStats.map((s) => (
          <DashboardStatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Continue learning */}
      <ProgressCard
        icon={PlayCircle}
        eyebrow="Continue learning"
        title={continueLearning.courseTitle}
        subtitle={`${continueLearning.lesson} · ~${continueLearning.minutesLeft} min left`}
        progressPct={continueLearning.progressPct}
        meta="Course progress"
        cta={{ href: continueLearning.href, label: "Resume" }}
      />

      {/* Performance + recent results / AI + weak areas */}
      <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr]">
        <div className="space-y-6">
          <PerformancePreview series={performanceTrend} />

          <div>
            <div className="mb-4 flex items-end justify-between">
              <h2 className="font-serif text-[22px] tracking-[-0.02em] text-ink">
                Recent mock results
              </h2>
              <LearnMore label="All results" href="/dashboard/results" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {recentResults.slice(0, 4).map((r) => (
                <RecentTestCard key={r.id} result={r} />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* AI recommendation preview */}
          <div className="rounded-[20px] bg-gold-200 p-6 text-gold-ink shadow-card">
            <div className="flex items-center gap-2">
              <Sparkle className="size-4" strokeWidth={1.75} />
              <span className="eyebrow">AI Performance Insights</span>
            </div>
            <p className="mt-3 text-[15px] leading-[1.55] text-gold-ink">
              {aiRecommendation.summary}
            </p>
            <ul className="mt-4 space-y-2">
              {aiRecommendation.steps.map((step) => (
                <li key={step} className="flex items-start gap-2 text-[14px] text-brown">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-orange" />
                  {step}
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <LearnMore label="Open analytics" href="/dashboard/analytics" />
            </div>
          </div>

          {/* Weak areas */}
          <div>
            <div className="mb-4 flex items-end justify-between">
              <h2 className="font-serif text-[22px] tracking-[-0.02em] text-ink">Weak areas</h2>
              <Tag tone="teal">Focus next</Tag>
            </div>
            <div className="space-y-3">
              {weakAreas.map((area) => (
                <WeakAreaCard key={area.topic} area={area} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended courses */}
      <div>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-serif text-[22px] tracking-[-0.02em] text-ink">Recommended for you</h2>
          <LearnMore label="My courses" href="/dashboard/courses" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommendedCourses.map((item) => (
            <RecommendedCourseCard key={item.course.slug} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
