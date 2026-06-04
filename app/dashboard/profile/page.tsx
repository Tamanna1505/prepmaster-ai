import type { Metadata } from "next"
import { PageHeader } from "@/components/layout/page-header"
import { PillButton } from "@/components/marketing/primitives"
import { fieldClass, fieldLabelClass } from "@/components/auth/auth-shell"
import { studentUser } from "@/lib/dashboard-data"

export const metadata: Metadata = { title: "Profile" }

const EXAM_TARGETS = ["CAT", "CUET", "MBA Entrance", "Aptitude"]

export default function ProfilePage() {
  const joined = new Date(studentUser.joinedAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Account"
        title="Profile"
        description="Manage your name, target exam, and password."
      />

      {/* Identity card */}
      <div className="flex flex-col gap-4 rounded-[20px] bg-surface p-6 shadow-[inset_0_0_0_1px_var(--color-line)] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="grid size-14 place-items-center rounded-full bg-gold-200 font-ui text-[18px] font-semibold text-gold-ink">
            {studentUser.initials}
          </span>
          <div>
            <p className="font-serif text-[20px] text-ink">{studentUser.name}</p>
            <p className="font-data text-[13px] tracking-[-0.01em] text-taupe">
              {studentUser.email}
            </p>
          </div>
        </div>
        <div className="flex gap-8 sm:text-right">
          <div>
            <p className="eyebrow text-taupe">Target</p>
            <p className="mt-1 font-ui text-[15px] font-semibold text-ink">
              {studentUser.examTarget}
            </p>
          </div>
          <div>
            <p className="eyebrow text-taupe">Member since</p>
            <p className="mt-1 font-ui text-[15px] font-semibold text-ink">{joined}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Account details */}
        <form className="rounded-[20px] bg-surface p-6 shadow-[inset_0_0_0_1px_var(--color-line)]">
          <h2 className="font-serif text-[19px] text-ink">Account details</h2>
          <div className="mt-5 space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="name" className={fieldLabelClass}>
                Full name
              </label>
              <input id="name" name="name" defaultValue={studentUser.name} className={fieldClass} />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="email" className={fieldLabelClass}>
                Email
              </label>
              <input
                id="email"
                name="email"
                defaultValue={studentUser.email}
                disabled
                className={`${fieldClass} cursor-not-allowed opacity-70`}
              />
              <p className="font-ui text-[12px] text-taupe">Email cannot be changed in the MVP.</p>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="targetExam" className={fieldLabelClass}>
                Target exam
              </label>
              <select
                id="targetExam"
                name="targetExam"
                defaultValue="CAT"
                className={fieldClass}
              >
                {EXAM_TARGETS.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-6">
            <PillButton type="submit" variant="ink" size="md">
              Save changes
            </PillButton>
          </div>
        </form>

        {/* Change password */}
        <form className="rounded-[20px] bg-surface p-6 shadow-[inset_0_0_0_1px_var(--color-line)]">
          <h2 className="font-serif text-[19px] text-ink">Change password</h2>
          <div className="mt-5 space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="currentPassword" className={fieldLabelClass}>
                Current password
              </label>
              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                placeholder="••••••••"
                className={fieldClass}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="newPassword" className={fieldLabelClass}>
                New password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="At least 8 characters"
                className={fieldClass}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="confirmNewPassword" className={fieldLabelClass}>
                Confirm new password
              </label>
              <input
                id="confirmNewPassword"
                name="confirmNewPassword"
                type="password"
                placeholder="Re-enter new password"
                className={fieldClass}
              />
            </div>
          </div>
          <div className="mt-6">
            <PillButton type="submit" variant="outline" size="md">
              Update password
            </PillButton>
          </div>
        </form>
      </div>

      <p className="font-ui text-[12px] text-taupe">
        Sample forms — profile and password actions are wired in a later phase.
      </p>
    </div>
  )
}
