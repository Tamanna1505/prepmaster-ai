import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAdminQuestion } from "@/lib/admin-data"
import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { QuestionForm } from "@/components/admin/question-form"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  return { title: `Admin · Edit ${id}` }
}

export default async function EditQuestionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const question = getAdminQuestion(id)
  if (!question) notFound()

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Content"
        title={`Edit question · ${question.id}`}
        description={`${question.section} · ${question.topic}`}
        backHref="/admin/questions"
        backLabel="Question bank"
      />
      <QuestionForm mode="edit" initial={question} />
    </div>
  )
}
