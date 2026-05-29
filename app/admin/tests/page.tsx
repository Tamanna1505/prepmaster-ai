import type { Metadata } from "next"
import { Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { PageHeader } from "@/components/layout/page-header"
import { mockTests } from "@/lib/sample-data"

export const metadata: Metadata = { title: "Admin · Tests" }

export default function AdminTestsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Content"
        title="Mock tests"
        description="Compose tests from the question bank. Editor wires up in Phase 8."
        actions={
          <button type="button" className={buttonVariants({ size: "sm" })}>
            <Plus className="size-3.5" /> New test
          </button>
        }
      />
      <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-3">Test</th>
              <th className="px-5 py-3">Exam</th>
              <th className="px-5 py-3">Questions</th>
              <th className="px-5 py-3">Duration</th>
              <th className="px-5 py-3">Attempts</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {mockTests.map((t) => (
              <tr key={t.slug} className="hover:bg-muted/30">
                <td className="px-5 py-3 font-medium">{t.title}</td>
                <td className="px-5 py-3 text-muted-foreground">{t.examTag}</td>
                <td className="px-5 py-3">{t.questionCount}</td>
                <td className="px-5 py-3">{t.durationMinutes} min</td>
                <td className="px-5 py-3">{t.attempts.toLocaleString()}</td>
                <td className="px-5 py-3">
                  <Badge variant="secondary">Published</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
