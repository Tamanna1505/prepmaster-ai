import type { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/layout/page-header"

export const metadata: Metadata = { title: "Admin · Users" }

const SAMPLE_USERS = [
  {
    name: "Aanya Reddy",
    email: "aanya@example.com",
    role: "STUDENT",
    joined: "2026-05-27",
    status: "Active",
  },
  {
    name: "Vikram Iyer",
    email: "vikram@example.com",
    role: "STUDENT",
    joined: "2026-05-26",
    status: "Active",
  },
  {
    name: "Sara Khan",
    email: "sara@example.com",
    role: "STUDENT",
    joined: "2026-05-26",
    status: "Active",
  },
  {
    name: "Priya Sharma",
    email: "priya@prepmaster.ai",
    role: "ADMIN",
    joined: "2026-04-15",
    status: "Active",
  },
  {
    name: "Pratik Joshi",
    email: "pratik@example.com",
    role: "STUDENT",
    joined: "2026-05-25",
    status: "Active",
  },
  {
    name: "Dr. Anand R.",
    email: "anand@prepmaster.ai",
    role: "ADMIN",
    joined: "2026-03-01",
    status: "Active",
  },
]

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="Users"
        description="Manage roles and deactivate accounts. Role changes wire up in Phase 8."
      />
      <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Joined</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {SAMPLE_USERS.map((u) => (
              <tr key={u.email} className="hover:bg-muted/30">
                <td className="px-5 py-3 font-medium">{u.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{u.email}</td>
                <td className="px-5 py-3">
                  <Badge variant={u.role === "ADMIN" ? "default" : "outline"}>{u.role}</Badge>
                </td>
                <td className="px-5 py-3 text-muted-foreground">{u.joined}</td>
                <td className="px-5 py-3">
                  <Badge variant="secondary">{u.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
