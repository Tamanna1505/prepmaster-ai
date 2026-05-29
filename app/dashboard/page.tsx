import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, PlayCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { CourseCard } from "@/components/courses/course-card"
import { StatCard } from "@/components/dashboard/stat-card"
import { PageHeader } from "@/components/layout/page-header"
import { MockTestCard } from "@/components/tests/mock-test-card"
import { courses, dashboardStats, mockTests } from "@/lib/sample-data"

export const metadata: Metadata = { title: "Dashboard" }

export default function DashboardHomePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Welcome back"
        title="Your week at a glance"
        description="Pick up where you left off, or start a new mock test."
        actions={
          <Link href="/dashboard/tests" className={buttonVariants({ size: "sm" })}>
            Start a test <ArrowRight className="size-3.5" />
          </Link>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="rounded-2xl border border-border/60 bg-card p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge variant="outline" className="mb-2 gap-1">
              <PlayCircle className="size-3" /> Continue learning
            </Badge>
            <h2 className="text-lg font-semibold">JEE Physics · Module 4 · Lesson 4.3</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Gauss law — applications. ~12 min remaining.
            </p>
          </div>
          <Link
            href="/dashboard/courses"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Resume
          </Link>
        </div>
      </div>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Recommended courses
            </p>
            <h2 className="mt-1 text-lg font-semibold">Continue exploring</h2>
          </div>
          <Link
            href="/dashboard/courses"
            className="text-sm font-medium text-primary hover:underline"
          >
            All courses
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 3).map((c) => (
            <CourseCard key={c.slug} course={c} href="/dashboard/courses" />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Upcoming tests
            </p>
            <h2 className="mt-1 text-lg font-semibold">Stay sharp this week</h2>
          </div>
          <Link
            href="/dashboard/tests"
            className="text-sm font-medium text-primary hover:underline"
          >
            All tests
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {mockTests.slice(0, 3).map((t) => (
            <MockTestCard key={t.slug} test={t} />
          ))}
        </div>
      </section>
    </div>
  )
}
