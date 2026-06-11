"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { signIn, getSession } from "next-auth/react"
import { PillButton } from "@/components/marketing/primitives"
import { fieldClass, fieldLabelClass } from "@/components/auth/auth-shell"

export function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const justRegistered = params.get("registered") === "1"
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const data = new FormData(e.currentTarget)
    const res = await signIn("credentials", {
      redirect: false,
      email: String(data.get("email") ?? ""),
      password: String(data.get("password") ?? ""),
    })

    if (!res || res.error) {
      setError("Invalid email or password.")
      setLoading(false)
      return
    }

    // Route by role: admins to /admin, everyone else to /dashboard.
    const session = await getSession()
    router.push(session?.user?.role === "ADMIN" ? "/admin" : "/dashboard")
    router.refresh()
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      {justRegistered && !error ? (
        <p className="rounded-[14px] bg-teal-tint px-4 py-3 font-ui text-[13px] text-teal-deep">
          Account created — log in to continue.
        </p>
      ) : null}
      {error ? (
        <p
          role="alert"
          className="rounded-[14px] bg-[rgba(194,80,47,0.08)] px-4 py-3 font-ui text-[13px] text-brand-error"
        >
          {error}
        </p>
      ) : null}

      <div className="space-y-1.5">
        <label htmlFor="email" className={fieldLabelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={fieldClass}
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" className={fieldLabelClass}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className={fieldClass}
        />
      </div>

      <div className="flex items-center justify-between">
        <label htmlFor="remember" className="flex cursor-pointer items-center gap-2 font-ui text-[14px] text-cocoa">
          <input
            id="remember"
            name="remember"
            type="checkbox"
            className="focus-ring size-4 rounded-[5px] accent-[var(--color-ink)]"
          />
          Remember me
        </label>
        <Link
          href="/contact"
          className="focus-ring rounded font-ui text-[14px] font-medium text-orange hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <PillButton type="submit" variant="ink" size="lg" className="w-full" disabled={loading}>
        {loading ? "Logging in…" : "Log in"}
      </PillButton>
    </form>
  )
}
