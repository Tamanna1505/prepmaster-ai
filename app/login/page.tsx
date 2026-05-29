import type { Metadata } from "next"
import Link from "next/link"
import { Sparkles } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to PrepMaster AI.",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          PrepMaster AI
        </Link>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to continue your prep.
          </p>
        </div>
        <form className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/contact"
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Forgot?
              </Link>
            </div>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <button type="submit" className={`${buttonVariants({ size: "lg" })} w-full`}>
            Sign in
          </button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-foreground hover:underline">
            Get started
          </Link>
        </p>
        <p className="text-center text-xs text-muted-foreground">
          Auth is wired up in Phase 4.
        </p>
      </div>
    </div>
  )
}
