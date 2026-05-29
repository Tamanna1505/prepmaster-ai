import type { Metadata } from "next"
import { Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { PageHeader } from "@/components/layout/page-header"
import { courses } from "@/lib/sample-data"

export const metadata: Metadata = { title: "Admin · Courses" }

export default function AdminCoursesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Content"
        title="Courses"
        description="Manage courses, modules, and lessons. CRUD wires up in Phase 8."
        actions={
          <button type="button" className={buttonVariants({ size: "sm" })}>
            <Plus className="size-3.5" /> New course
          </button>
        }
      />
      <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-3">Course</th>
              <th className="px-5 py-3">Exam</th>
              <th className="px-5 py-3">Lessons</th>
              <th className="px-5 py-3">Students</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {courses.map((c) => (
              <tr key={c.slug} className="hover:bg-muted/30">
                <td className="px-5 py-3 font-medium">{c.title}</td>
                <td className="px-5 py-3 text-muted-foreground">{c.examTag}</td>
                <td className="px-5 py-3">{c.lessonCount}</td>
                <td className="px-5 py-3">{c.studentsEnrolled.toLocaleString()}</td>
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
