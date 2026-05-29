import type { Metadata } from "next"
import Link from "next/link"
import { Check, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { PageHeader } from "@/components/layout/page-header"
import { SiteShell } from "@/components/layout/site-shell"

export const metadata: Metadata = {
  title: "Pricing",
  description: "Free during MVP. Paid tiers launching later.",
}

const TIERS = [
  {
    name: "Free",
    price: "₹ 0",
    period: "MVP launch",
    description: "Everything you need to start preparing today.",
    features: [
      "Full course catalog",
      "All mock tests",
      "AI feedback on every attempt",
      "Personal analytics dashboard",
      "Blog and study material",
    ],
    cta: "Get started",
    highlight: true,
  },
  {
    name: "Pro",
    price: "Coming soon",
    period: "Post-MVP",
    description: "Live doubt-solving, exclusive premium tests, and priority AI generation.",
    features: [
      "Everything in Free",
      "Premium test series",
      "Live doubt-solving sessions",
      "Priority AI feedback generation",
      "Personal study planner (AI)",
    ],
    cta: "Notify me",
    highlight: false,
  },
]

export default function PricingPage() {
  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-5xl px-4 py-10">
        <PageHeader
          eyebrow="Pricing"
          title="Simple, fair, exam-aware"
          description="Free during MVP — anyone joining now keeps free access to everything available today."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={`flex flex-col gap-4 rounded-2xl border bg-card p-6 ${
                t.highlight ? "border-primary/40 ring-1 ring-primary/20" : "border-border/60"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{t.name}</h3>
                {t.highlight ? (
                  <Badge variant="secondary" className="gap-1">
                    <Sparkles className="size-3" /> Current
                  </Badge>
                ) : null}
              </div>
              <div>
                <p className="text-3xl font-semibold tracking-tight">{t.price}</p>
                <p className="text-xs text-muted-foreground">{t.period}</p>
              </div>
              <p className="text-sm text-muted-foreground">{t.description}</p>
              <ul className="space-y-2 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 text-primary" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                href={t.highlight ? "/register" : "/contact"}
                className={`${buttonVariants({
                  variant: t.highlight ? "default" : "outline",
                  size: "lg",
                })} mt-auto`}
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  )
}
