import type { Metadata } from "next"
import Link from "next/link"
import { AuthShell, Field } from "@/components/auth/auth-shell"
import { PillButton } from "@/components/marketing/primitives"

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to PrepMaster AI.",
}

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to continue your prep."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="focus-ring rounded font-semibold text-orange hover:underline">
            Create one
          </Link>
        </>
      }
    >
      <form className="space-y-5">
        <Field id="email" label="Email" type="email" placeholder="you@example.com" autoComplete="email" />
        <Field id="password" label="Password" type="password" placeholder="••••••••" autoComplete="current-password" />

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

        <PillButton type="submit" variant="ink" size="lg" className="w-full">
          Log in
        </PillButton>
      </form>

      {/* Demo credentials — sample only, no real auth wired in this phase. */}
      <div className="mt-6 rounded-[16px] bg-surface-muted p-4">
        <p className="eyebrow text-taupe">Demo credentials</p>
        <dl className="mt-2.5 space-y-1.5 font-data text-[13px] tracking-[-0.01em] text-cocoa">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-taupe">Student</dt>
            <dd className="text-ink">student@prepmaster.ai</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-taupe">Admin</dt>
            <dd className="text-ink">admin@prepmaster.ai</dd>
          </div>
        </dl>
      </div>
    </AuthShell>
  )
}
