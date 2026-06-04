import type { Metadata } from "next"
import { BookOpen, ListChecks, FileText, Newspaper } from "lucide-react"
import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { AdminStatCard } from "@/components/admin/admin-stat-card"
import { AdminActionCard } from "@/components/admin/admin-action-card"
import { AdminTable } from "@/components/admin/admin-table"
import { StatusBadge } from "@/components/admin/status-badge"
import { Tag } from "@/components/marketing/primitives"
import { adminSummary, contentHealth, recentAttempts, recentUsers } from "@/lib/admin-data"

export const metadata: Metadata = { title: "Admin · Overview" }

const QUICK_ACTIONS = [
  { href: "/admin/courses/new", label: "Add course", description: "Create a course with modules and lessons.", icon: BookOpen },
  { href: "/admin/questions/new", label: "Add question", description: "Add to the question bank.", icon: ListChecks },
  { href: "/admin/tests/new", label: "Create mock test", description: "Compose a test from the bank.", icon: FileText },
  { href: "/admin/blog/new", label: "Write blog post", description: "Author and publish an article.", icon: Newspaper },
]

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export default function AdminHomePage() {
  return (
    <div className="space-y-10">
      <AdminPageHeader
        eyebrow="Welcome back"
        title="Admin dashboard"
        description="Manage courses, questions, tests, blog posts and users — and keep an eye on platform activity."
      />

      {/* Summary stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {adminSummary.map((s) => (
          <AdminStatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Quick actions */}
      <section>
        <h2 className="mb-4 font-serif text-[22px] tracking-[-0.02em] text-ink">Quick actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_ACTIONS.map((a) => (
            <AdminActionCard key={a.href} {...a} />
          ))}
        </div>
      </section>

      {/* Content health */}
      <section>
        <h2 className="mb-4 font-serif text-[22px] tracking-[-0.02em] text-ink">Content health</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contentHealth.map((h) => {
            const total = h.published + h.draft
            const pct = total ? Math.round((h.published / total) * 100) : 0
            return (
              <div
                key={h.label}
                className="rounded-[18px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)]"
              >
                <div className="flex items-center justify-between">
                  <p className="font-ui text-[15px] font-semibold text-ink">{h.label}</p>
                  <span className="font-data text-[13px] tracking-[-0.02em] text-teal-deep">{pct}%</span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-teal-tint">
                  <div className="h-full rounded-full bg-teal" style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-3 font-data text-[13px] tracking-[-0.02em] text-cocoa">
                  {h.published.toLocaleString()} published · {h.draft} draft
                </p>
                <p className="mt-1 font-ui text-[12px] text-taupe">{h.note}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Recent activity */}
      <div className="grid gap-8 xl:grid-cols-2">
        <section>
          <h2 className="mb-4 font-serif text-[22px] tracking-[-0.02em] text-ink">Recent users</h2>
          <AdminTable
            minWidth={480}
            columns={[{ header: "Name" }, { header: "Role" }, { header: "Joined" }]}
            rows={recentUsers.slice(0, 5).map((u) => ({
              key: u.id,
              cells: [
                <div key="n">
                  <p className="font-medium text-ink">{u.name}</p>
                  <p className="font-data text-[12px] tracking-[-0.01em] text-taupe">{u.email}</p>
                </div>,
                <StatusBadge key="r" status={u.role} />,
                fmt(u.joined),
              ],
            }))}
          />
        </section>

        <section>
          <h2 className="mb-4 font-serif text-[22px] tracking-[-0.02em] text-ink">Recent test attempts</h2>
          <AdminTable
            minWidth={480}
            columns={[{ header: "Student" }, { header: "Test" }, { header: "Score", align: "right" }]}
            rows={recentAttempts.map((a) => ({
              key: a.id,
              cells: [
                a.student,
                <div key="t" className="flex items-center gap-2">
                  <Tag tone="outline">{a.examTag}</Tag>
                  <span className="text-ink">{a.test}</span>
                </div>,
                <span key="s" className="font-data font-semibold tracking-[-0.02em] text-teal-deep">
                  {a.scorePct}%
                </span>,
              ],
            }))}
          />
        </section>
      </div>
    </div>
  )
}
