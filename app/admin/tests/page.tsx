import type { Metadata } from "next"
import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { TestManager } from "@/components/admin/test-manager"

export const metadata: Metadata = { title: "Admin · Tests" }

export default function AdminTestsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Content"
        title="Mock tests"
        description="Compose tests from the question bank, configure sections and marking, and publish."
      />
      <TestManager />
    </div>
  )
}
