import type { Metadata } from "next"
import { Plus } from "lucide-react"
import { PageHeader } from "@/components/layout/page-header"
import { AdminTable } from "@/components/admin/admin-table"
import { LearnMore, PillButton, Tag } from "@/components/marketing/primitives"
import { adminQuestions } from "@/lib/admin-data"

export const metadata: Metadata = { title: "Admin · Questions" }

const DIFFICULTY_TONE = {
  Easy: "teal",
  Medium: "gold",
  Hard: "live",
} as const

export default function AdminQuestionsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Content"
        title="Question bank"
        description="Reusable questions across mock tests, filterable by topic, type, and difficulty."
        actions={
          <PillButton type="button" variant="ink" size="md">
            <Plus className="size-4" strokeWidth={2} /> New question
          </PillButton>
        }
      />
      <AdminTable
        minWidth={760}
        columns={[
          { header: "ID" },
          { header: "Stem" },
          { header: "Topic" },
          { header: "Type" },
          { header: "Difficulty" },
          { header: "", align: "right" },
        ]}
        rows={adminQuestions.map((q) => ({
          key: q.id,
          cells: [
            <span key="id" className="font-data text-[12px] tracking-[-0.01em] text-taupe">
              {q.id}
            </span>,
            <span key="s" className="line-clamp-1 block max-w-sm font-medium text-ink">
              {q.stem}
            </span>,
            q.topic,
            <Tag key="ty" tone="outline">
              {q.type}
            </Tag>,
            <Tag key="d" tone={DIFFICULTY_TONE[q.difficulty]}>
              {q.difficulty}
            </Tag>,
            <span key="a" className="inline-flex justify-end">
              <LearnMore label="Edit" href="/admin/questions" />
            </span>,
          ],
        }))}
      />
    </div>
  )
}
