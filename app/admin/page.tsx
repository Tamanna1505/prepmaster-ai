import type { Metadata } from "next"
import { BookOpen, FileText, ListChecks, Newspaper } from "lucide-react"
import { AdminActionCard } from "@/components/admin/admin-action-card"
import { StatCard } from "@/components/dashboard/stat-card"
import { PageHeader } from "@/components/layout/page-header"
import { adminStats } from "@/lib/sample-data"

export const metadata: Metadata = { title: "Admin · Overview" }

const QUICK_ACTIONS = [
  {
    href: "/admin/courses",
    label: "New course",
    description: "Create a course with modules and lessons.",
    icon: BookOpen,
  },
  {
    href: "/admin/questions",
    label: "New question",
    description: "Add to the question bank.",
    icon: ListChecks,
  },
  {
    href: "/admin/tests",
    label: "New test",
    description: "Compose a mock test.",
    icon: FileText,
  },
  {
    href: "/admin/blog",
    label: "New blog post",
    description: "Publish an article.",
    icon: Newspaper,
  },
]

const RECENT_SIGNUPS = [
  { name: "Aanya Reddy", email: "aanya@example.com", date: "2026-05-27" },
  { name: "Vikram Iyer", email: "vikram@example.com", date: "2026-05-26" },
  { name: "Sara Khan", email: "sara@example.com", date: "2026-05-26" },
  { name: "Pratik Joshi", email: "pratik@example.com", date: "2026-05-25" },
]

export default function AdminHomePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="Admin overview"
        description="At-a-glance metrics. Live data lands when the database is wired in Phase 5+."
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {adminStats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">Quick actions</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_ACTIONS.map((a) => (
            <AdminActionCard key={a.href} {...a} />
          ))}
        </div>
      </section>

      <div className="rounded-xl border border-border/60 bg-card">
        <div className="border-b border-border/60 p-5">
          <h3 className="text-sm font-semibold">Recent signups</h3>
          <p className="text-xs text-muted-foreground">Last 24 hours</p>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {RECENT_SIGNUPS.map((u) => (
              <tr key={u.email}>
                <td className="px-5 py-3 font-medium">{u.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{u.email}</td>
                <td className="px-5 py-3 text-muted-foreground">{u.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
