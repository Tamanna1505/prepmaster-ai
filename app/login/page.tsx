import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { AuthShell } from "@/components/auth/auth-shell"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to PrepMaster AI.",
}

export default async function LoginPage() {
  const user = await getCurrentUser()
  if (user) redirect(user.role === "ADMIN" ? "/admin" : "/dashboard")

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
      <LoginForm />

      {/* Demo credentials (seeded by `npm run db:seed`, password: password123). */}
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
