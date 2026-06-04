import type { Metadata } from "next"
import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { TestForm } from "@/components/admin/test-form"

export const metadata: Metadata = { title: "Admin · New test" }

export default function NewTestPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Content"
        title="Create mock test"
        description="Set the test details, configure sections, and select questions from the bank."
        backHref="/admin/tests"
        backLabel="Mock tests"
      />
      <TestForm mode="new" />
    </div>
  )
}
