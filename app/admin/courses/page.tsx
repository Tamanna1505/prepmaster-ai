import type { Metadata } from "next"
import { Plus } from "lucide-react"
import { PageHeader } from "@/components/layout/page-header"
import { AdminTable } from "@/components/admin/admin-table"
import { LearnMore, PillButton, Tag } from "@/components/marketing/primitives"
import { courses } from "@/lib/sample-data"

export const metadata: Metadata = { title: "Admin · Courses" }

export default function AdminCoursesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Content"
        title="Courses"
        description="Manage courses, modules, and lessons."
        actions={
          <PillButton type="button" variant="ink" size="md">
            <Plus className="size-4" strokeWidth={2} /> New course
          </PillButton>
        }
      />
      <AdminTable
        columns={[
          { header: "Course" },
          { header: "Exam" },
          { header: "Lessons", align: "right" },
          { header: "Students", align: "right" },
          { header: "Status" },
          { header: "", align: "right" },
        ]}
        rows={courses.map((c) => ({
          key: c.slug,
          cells: [
            <span key="t" className="font-medium text-ink">
              {c.title}
            </span>,
            c.examTag,
            <span key="l" className="font-data tracking-[-0.02em]">
              {c.lessonCount}
            </span>,
            <span key="s" className="font-data tracking-[-0.02em]">
              {c.studentsEnrolled.toLocaleString()}
            </span>,
            <Tag key="st" tone="teal">
              Published
            </Tag>,
            <span key="a" className="inline-flex justify-end">
              <LearnMore label="Edit" href="/admin/courses" />
            </span>,
          ],
        }))}
      />
    </div>
  )
}
