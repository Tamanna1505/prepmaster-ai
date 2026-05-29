import type { Metadata } from "next"
import Link from "next/link"
import { Sparkles } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const metadata: Metadata = {
  title: "Get started",
  description: "Create a free PrepMaster AI account.",
}

export default function RegisterPage() {
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
          <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Free during MVP. No card required.</p>
        </div>
        <form className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your full name" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="targetExam">Target exam (optional)</Label>
            <Input id="targetExam" placeholder="e.g. JEE Main 2027" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="At least 8 characters" />
          </div>
          <button type="submit" className={`${buttonVariants({ size: "lg" })} w-full`}>
            Create account
          </button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-foreground hover:underline">
            Sign in
          </Link>
        </p>
        <p className="text-center text-xs text-muted-foreground">
          Auth is wired up in Phase 4.
        </p>
      </div>
    </div>
  )
}
