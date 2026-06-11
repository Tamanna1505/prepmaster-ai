"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { PillButton } from "@/components/marketing/primitives"
import { fieldClass, fieldLabelClass } from "@/components/auth/auth-shell"
import { registerUser } from "@/app/register/actions"

const EXAM_TARGETS = ["CAT", "CUET", "MBA Entrance", "Aptitude"]

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="font-ui text-[12px] text-brand-error">{message}</p>
}

export function RegisterForm() {
  const router = useRouter()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrors({})
    setFormError(null)
    setLoading(true)

    const data = new FormData(e.currentTarget)
    const password = String(data.get("password") ?? "")
    const input = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      targetExam: String(data.get("examTarget") ?? ""),
      password,
      confirmPassword: String(data.get("confirmPassword") ?? ""),
    }

    const res = await registerUser(input)
    if (!res.ok) {
      setErrors(res.fieldErrors ?? {})
      setFormError(res.formError ?? null)
      setLoading(false)
      return
    }

    // Auto-login the new student, then go to the dashboard.
    const signRes = await signIn("credentials", {
      redirect: false,
      email: res.email,
      password,
    })
    if (!signRes || signRes.error) {
      router.push("/login?registered=1")
      return
    }
    router.push("/dashboard")
    router.refresh()
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      {formError ? (
        <p
          role="alert"
          className="rounded-[14px] bg-[rgba(194,80,47,0.08)] px-4 py-3 font-ui text-[13px] text-brand-error"
        >
          {formError}
        </p>
      ) : null}

      <div className="space-y-1.5">
        <label htmlFor="name" className={fieldLabelClass}>
          Full name
        </label>
        <input id="name" name="name" autoComplete="name" placeholder="Your full name" className={fieldClass} />
        <FieldError message={errors.name} />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="email" className={fieldLabelClass}>
          Email
        </label>
        <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" className={fieldClass} />
        <FieldError message={errors.email} />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="phone" className={fieldLabelClass}>
          Phone
        </label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+91 00000 00000" className={fieldClass} />
        <FieldError message={errors.phone} />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="examTarget" className={fieldLabelClass}>
          Target exam
        </label>
        <select id="examTarget" name="examTarget" defaultValue="" className={fieldClass}>
          <option value="" disabled>
            Select your target exam
          </option>
          {EXAM_TARGETS.map((exam) => (
            <option key={exam} value={exam}>
              {exam}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="password" className={fieldLabelClass}>
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            className={fieldClass}
          />
          <FieldError message={errors.password} />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="confirmPassword" className={fieldLabelClass}>
            Confirm password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Re-enter password"
            className={fieldClass}
          />
          <FieldError message={errors.confirmPassword} />
        </div>
      </div>

      <PillButton type="submit" variant="ink" size="lg" className="w-full" disabled={loading}>
        {loading ? "Creating account…" : "Create account"}
      </PillButton>
    </form>
  )
}
