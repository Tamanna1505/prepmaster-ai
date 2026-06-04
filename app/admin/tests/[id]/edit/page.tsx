import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAdminTest } from "@/lib/admin-data"
import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { TestForm } from "@/components/admin/test-form"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const test = getAdminTest(id)
  return { title: test ? `Admin · Edit ${test.title}` : "Admin · Edit test" }
}

export default async function EditTestPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const test = getAdminTest(id)
  if (!test) notFound()

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Content"
        title={`Edit · ${test.title}`}
        description="Update the test details, sections, and question selection."
        backHref="/admin/tests"
        backLabel="Mock tests"
      />
      <TestForm mode="edit" initial={test} />
    </div>
  )
}
