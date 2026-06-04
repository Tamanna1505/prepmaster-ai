import type { Metadata } from "next"
import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { UserManager } from "@/components/admin/user-manager"

export const metadata: Metadata = { title: "Admin · Users" }

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Platform"
        title="Users"
        description="Search and filter accounts, review a student's activity, and manage roles and status."
      />
      <UserManager />
    </div>
  )
}
