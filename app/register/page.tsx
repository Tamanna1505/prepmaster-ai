import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { AuthShell } from "@/components/auth/auth-shell"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "Create your account",
  description: "Create a free PrepMaster AI account.",
}

export default async function RegisterPage() {
  const user = await getCurrentUser()
  if (user) redirect(user.role === "ADMIN" ? "/admin" : "/dashboard")

  return (
    <AuthShell
      title="Create your account"
      subtitle="Free during the MVP. No card required."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="focus-ring rounded font-semibold text-orange hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <RegisterForm />

      <p className="mt-5 text-center font-ui text-[12px] text-taupe">
        By creating an account you agree to our{" "}
        <Link href="/terms" className="text-cocoa underline">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-cocoa underline">
          Privacy Policy
        </Link>
        .
      </p>
    </AuthShell>
  )
}
