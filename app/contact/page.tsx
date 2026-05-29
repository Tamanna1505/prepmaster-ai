import type { Metadata } from "next"
import { Mail, MessageSquare, Phone } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PageHeader } from "@/components/layout/page-header"
import { SiteShell } from "@/components/layout/site-shell"

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions, feedback, partnerships — say hello.",
}

export default function ContactPage() {
  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-5xl px-4 py-10">
        <PageHeader
          eyebrow="Contact"
          title="Say hello"
          description="Questions about a course, feedback on a test, or a partnership — we read everything."
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <form className="space-y-4 rounded-2xl border border-border/60 bg-card p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your name" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" name="email" placeholder="you@example.com" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" name="subject" placeholder="What's this about?" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" rows={6} placeholder="Tell us a bit more..." />
            </div>
            <button type="submit" className={buttonVariants({ size: "lg" })}>
              Send message
            </button>
            <p className="text-xs text-muted-foreground">
              Form submission is not wired up yet — it will be in Phase 3 via a server action.
            </p>
          </form>

          <div className="space-y-4">
            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <h3 className="text-sm font-semibold">Other ways to reach us</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <Mail className="size-4 text-muted-foreground" /> hello@prepmaster.ai
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="size-4 text-muted-foreground" /> +91-00000-00000
                </li>
                <li className="flex items-center gap-3">
                  <MessageSquare className="size-4 text-muted-foreground" /> Live chat (in-app,
                  post-launch)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  )
}
