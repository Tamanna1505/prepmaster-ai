import type { Metadata } from "next"
import { BookOpen, FileText, ListChecks, Newspaper } from "lucide-react"
import { PageHeader } from "@/components/layout/page-header"
import { AdminStatCard } from "@/components/admin/admin-stat-card"
import { AdminActionCard } from "@/components/admin/admin-action-card"
import { AdminTable } from "@/components/admin/admin-table"
import { Tag } from "@/components/marketing/primitives"
import { adminSummary, recentAttempts, recentUsers } from "@/lib/admin-data"

export const metadata: Metadata = { title: "Admin · Overview" }

const QUICK_ACTIONS = [
  { href: "/admin/courses", label: "New course", description: "Create a course with modules and lessons.", icon: BookOpen },
  { href: "/admin/questions", label: "New question", description: "Add to the question bank.", icon: ListChecks },
  { href: "/admin/tests", label: "New test", description: "Compose a mock test.", icon: FileText },
  { href: "/admin/blog", label: "New blog post", description: "Publish an article.", icon: Newspaper },
]

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export default function AdminHomePage() {
  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Platform"
        title="Admin overview"
        description="At-a-glance metrics across students, content, and activity."
      />

      {/* Summary stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
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

      {/* Recent activity */}
      <div className="grid gap-8 xl:grid-cols-2">
        <section>
          <h2 className="mb-4 font-serif text-[22px] tracking-[-0.02em] text-ink">Recent users</h2>
          <AdminTable
            minWidth={480}
            columns={[{ header: "Name" }, { header: "Role" }, { header: "Joined" }]}
            rows={recentUsers.slice(0, 5).map((u) => ({
              key: u.email,
              cells: [
                <div key="n">
                  <p className="font-medium text-ink">{u.name}</p>
                  <p className="font-data text-[12px] tracking-[-0.01em] text-taupe">{u.email}</p>
                </div>,
                <Tag key="r" tone={u.role === "ADMIN" ? "ink" : "outline"}>
                  {u.role}
                </Tag>,
                fmtDate(u.joined),
              ],
            }))}
          />
        </section>

        <section>
          <h2 className="mb-4 font-serif text-[22px] tracking-[-0.02em] text-ink">
            Recent test attempts
          </h2>
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
                <span key="s" className="font-data font-semibold tracking-[-0.02em] text-ink">
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
