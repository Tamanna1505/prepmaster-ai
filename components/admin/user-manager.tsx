"use client"

import { useMemo, useState } from "react"
import { Mail, X } from "lucide-react"
import { adminUsers, type AdminUser } from "@/lib/admin-data"
import { cn } from "@/lib/utils"
import { AdminTable } from "@/components/admin/admin-table"
import { AdminFilterBar } from "@/components/admin/admin-filter-bar"
import { StatusBadge } from "@/components/admin/status-badge"

const ROLES = ["All", "STUDENT", "ADMIN"]
const STATUSES = ["All", "Active", "Inactive"]
const EXAMS = ["All", ...Array.from(new Set(adminUsers.map((u) => u.targetExam).filter((e) => e !== "—")))]

function fmt(date: string) {
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function DetailPanel({ user, onClose }: { user: AdminUser; onClose: () => void }) {
  const stats = [
    { label: "Enrolled courses", value: String(user.enrolledCourses) },
    { label: "Tests attempted", value: String(user.testsAttempted) },
    { label: "Average score", value: user.role === "STUDENT" ? `${user.avgScorePct}%` : "—", teal: true },
    { label: "Target exam", value: user.targetExam },
  ]
  return (
    <div className="fixed inset-0 z-[80]">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
      />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col overflow-y-auto bg-cream-100 p-6 shadow-feature sm:p-7">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-full bg-gold-200 font-ui text-[16px] font-semibold text-gold-ink">
              {user.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
            </span>
            <div>
              <p className="font-serif text-[20px] tracking-[-0.02em] text-ink">{user.name}</p>
              <p className="font-data text-[12px] tracking-[-0.01em] text-taupe">{user.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="focus-ring grid size-9 place-items-center rounded-full text-taupe hover:bg-surface-muted hover:text-ink"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <StatusBadge status={user.role} />
          <StatusBadge status={user.status} />
          <span className="font-ui text-[12px] text-taupe">Joined {fmt(user.joined)}</span>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-[14px] bg-surface p-4 shadow-[inset_0_0_0_1px_var(--color-line)]">
              <dd className={cn("font-data text-[20px] font-semibold tracking-[-0.02em]", s.teal ? "text-teal-deep" : "text-ink")}>
                {s.value}
              </dd>
              <dt className="mt-1 font-ui text-[12px] text-taupe">{s.label}</dt>
            </div>
          ))}
        </dl>

        <div className="mt-6 rounded-[14px] bg-surface p-4 shadow-[inset_0_0_0_1px_var(--color-line)]">
          <p className="eyebrow text-taupe">Activity</p>
          <p className="mt-2 font-ui text-[14px] text-cocoa">
            Last active {fmt(user.lastActive)} · ID {user.id}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href={`mailto:${user.email}`}
            className="focus-ring inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 font-ui text-[14px] font-semibold text-cream-text transition-all hover:-translate-y-px hover:shadow-card-hover"
          >
            <Mail className="size-4" strokeWidth={2} /> Email user
          </a>
          <button
            type="button"
            className="focus-ring inline-flex items-center rounded-full px-4 py-2.5 font-ui text-[14px] font-semibold text-cocoa shadow-[inset_0_0_0_1.5px_var(--color-line)] transition-colors hover:bg-surface-muted hover:text-ink"
          >
            {user.status === "Active" ? "Deactivate" : "Reactivate"}
          </button>
        </div>
        <p className="mt-3 font-ui text-[12px] text-taupe">Actions are visual only in this phase.</p>
      </div>
    </div>
  )
}

export function UserManager() {
  const [query, setQuery] = useState("")
  const [role, setRole] = useState("All")
  const [status, setStatus] = useState("All")
  const [exam, setExam] = useState("All")
  const [selected, setSelected] = useState<AdminUser | null>(null)

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return adminUsers.filter(
      (u) =>
        (role === "All" || u.role === role) &&
        (status === "All" || u.status === status) &&
        (exam === "All" || u.targetExam === exam) &&
        (!q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
    )
  }, [query, role, status, exam])

  return (
    <div className="space-y-6">
      <AdminFilterBar
        search={{ value: query, onChange: setQuery, placeholder: "Search by name or email" }}
        groups={[
          { label: "Role", options: ROLES, active: role, onChange: setRole },
          { label: "Status", options: STATUSES, active: status, onChange: setStatus },
          { label: "Exam", options: EXAMS, active: exam, onChange: setExam },
        ]}
      />

      <AdminTable
        minWidth={1040}
        columns={[
          { header: "Name" },
          { header: "Role" },
          { header: "Target" },
          { header: "Courses", align: "right" },
          { header: "Tests", align: "right" },
          { header: "Avg score", align: "right" },
          { header: "Joined" },
          { header: "Status" },
          { header: "Actions", align: "right" },
        ]}
        rows={visible.map((u) => ({
          key: u.id,
          cells: [
            <div key="n">
              <p className="font-medium text-ink">{u.name}</p>
              <p className="font-data text-[12px] tracking-[-0.01em] text-taupe">{u.email}</p>
            </div>,
            <StatusBadge key="r" status={u.role} />,
            u.targetExam,
            <span key="c" className="font-data tracking-[-0.02em]">{u.enrolledCourses}</span>,
            <span key="te" className="font-data tracking-[-0.02em]">{u.testsAttempted}</span>,
            <span key="a" className="font-data tracking-[-0.02em] text-teal-deep">
              {u.role === "STUDENT" ? `${u.avgScorePct}%` : "—"}
            </span>,
            fmt(u.joined),
            <StatusBadge key="s" status={u.status} />,
            <div key="ac" className="flex justify-end">
              <button
                type="button"
                onClick={() => setSelected(u)}
                className="focus-ring rounded-full px-3 py-1.5 font-ui text-[12px] font-semibold text-cocoa shadow-[inset_0_0_0_1px_var(--color-line)] transition-colors hover:bg-surface-muted hover:text-ink"
              >
                View
              </button>
            </div>,
          ],
        }))}
      />

      {selected ? <DetailPanel user={selected} onClose={() => setSelected(null)} /> : null}
    </div>
  )
}
