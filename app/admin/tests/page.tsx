import type { Metadata } from "next"
import { Plus } from "lucide-react"
import { PageHeader } from "@/components/layout/page-header"
import { AdminTable } from "@/components/admin/admin-table"
import { LearnMore, PillButton, Tag } from "@/components/marketing/primitives"
import { adminTests } from "@/lib/admin-data"

export const metadata: Metadata = { title: "Admin · Tests" }

export default function AdminTestsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Content"
        title="Mock tests"
        description="Compose tests from the question bank and configure duration and marking."
        actions={
          <PillButton type="button" variant="ink" size="md">
            <Plus className="size-4" strokeWidth={2} /> New test
          </PillButton>
        }
      />
      <AdminTable
        columns={[
          { header: "ID" },
          { header: "Test" },
          { header: "Exam" },
          { header: "Questions", align: "right" },
          { header: "Duration", align: "right" },
          { header: "Status" },
          { header: "", align: "right" },
        ]}
        rows={adminTests.map((t) => ({
          key: t.id,
          cells: [
            <span key="id" className="font-data text-[12px] tracking-[-0.01em] text-taupe">
              {t.id}
            </span>,
            <span key="t" className="font-medium text-ink">
              {t.title}
            </span>,
            t.examTag,
            <span key="q" className="font-data tracking-[-0.02em]">
              {t.questions}
            </span>,
            <span key="d" className="font-data tracking-[-0.02em]">
              {t.durationMinutes} min
            </span>,
            <Tag key="st" tone={t.status === "Published" ? "teal" : "outline"}>
              {t.status}
            </Tag>,
            <span key="a" className="inline-flex justify-end">
              <LearnMore label="Edit" href="/admin/tests" />
            </span>,
          ],
        }))}
      />
    </div>
  )
}
