import type { Metadata } from "next"
import Link from "next/link"
import { AuthShell, Field, fieldClass, fieldLabelClass } from "@/components/auth/auth-shell"
import { PillButton } from "@/components/marketing/primitives"

export const metadata: Metadata = {
  title: "Create your account",
  description: "Create a free PrepMaster AI account.",
}

const EXAM_TARGETS = ["CAT", "CUET", "MBA Entrance", "Aptitude"]

export default function RegisterPage() {
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
      <form className="space-y-5">
        <Field id="name" label="Full name" placeholder="Your full name" autoComplete="name" />
        <Field id="email" label="Email" type="email" placeholder="you@example.com" autoComplete="email" />
        <Field id="phone" label="Phone" type="tel" placeholder="+91 00000 00000" autoComplete="tel" />

        <div className="space-y-1.5">
          <label htmlFor="examTarget" className={fieldLabelClass}>
            Target exam
          </label>
          <select id="examTarget" name="examTarget" defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select your target exam
            </option>
            {EXAM_TARGETS.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id="password"
            label="Password"
            type="password"
            placeholder="At least 8 characters"
            autoComplete="new-password"
          />
          <Field
            id="confirmPassword"
            label="Confirm password"
            type="password"
            placeholder="Re-enter password"
            autoComplete="new-password"
          />
        </div>

        <PillButton type="submit" variant="ink" size="lg" className="w-full">
          Create account
        </PillButton>

        <p className="text-center font-ui text-[12px] text-taupe">
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
      </form>
    </AuthShell>
  )
}
