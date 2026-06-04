import type { Metadata } from "next"
import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { QuestionManager } from "@/components/admin/question-manager"

export const metadata: Metadata = { title: "Admin · Questions" }

export default function AdminQuestionsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Content"
        title="Question bank"
        description="Reusable questions across mock tests. Filter by section, topic, type, and difficulty."
      />
      <QuestionManager />
    </div>
  )
}
