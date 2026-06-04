import type { Metadata } from "next"
import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { QuestionForm } from "@/components/admin/question-form"

export const metadata: Metadata = { title: "Admin · New question" }

export default function NewQuestionPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Content"
        title="New question"
        description="Add a reusable question to the bank. It can then be added to any mock test."
        backHref="/admin/questions"
        backLabel="Question bank"
      />
      <QuestionForm mode="new" />
    </div>
  )
}
