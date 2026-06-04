import type { Metadata } from "next"
import { PageHeader } from "@/components/layout/page-header"
import { AdminTable } from "@/components/admin/admin-table"
import { LearnMore, Tag } from "@/components/marketing/primitives"
import { recentUsers } from "@/lib/admin-data"

export const metadata: Metadata = { title: "Admin · Users" }

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="Users"
        description="Manage roles and deactivate accounts."
      />
      <AdminTable
        columns={[
          { header: "Name" },
          { header: "Email" },
          { header: "Role" },
          { header: "Joined" },
          { header: "Status" },
          { header: "", align: "right" },
        ]}
        rows={recentUsers.map((u) => ({
          key: u.email,
          cells: [
            <span key="n" className="font-medium text-ink">
              {u.name}
            </span>,
            <span key="e" className="font-data text-[12px] tracking-[-0.01em] text-taupe">
              {u.email}
            </span>,
            <Tag key="r" tone={u.role === "ADMIN" ? "ink" : "outline"}>
              {u.role}
            </Tag>,
            new Date(u.joined).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            <Tag key="st" tone={u.status === "Active" ? "teal" : "live"}>
              {u.status}
            </Tag>,
            <span key="a" className="inline-flex justify-end">
              <LearnMore label="Manage" href="/admin/users" />
            </span>,
          ],
        }))}
      />
    </div>
  )
}
