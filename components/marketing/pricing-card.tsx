import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { PillLink, Tag } from "@/components/marketing/primitives"

export type PricingTier = {
  name: string
  price: string
  period?: string
  description: string
  features: string[]
  cta: { href: string; label: string }
  featured?: boolean
  badge?: string
}

export function PricingCard({ tier }: { tier: PricingTier }) {
  const featured = !!tier.featured

  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-[28px] p-7 transition-all duration-200 ease-out sm:p-8",
        featured
          ? "bg-ink text-cream-text shadow-feature lg:scale-[1.03]"
          : "bg-surface text-ink shadow-[inset_0_0_0_1px_var(--color-line)] hover:-translate-y-[3px] hover:shadow-card-hover"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className={cn("font-serif text-[22px]", featured ? "text-cream-text" : "text-ink")}>
          {tier.name}
        </h3>
        {featured ? <Tag tone="gold">{tier.badge ?? "Most popular"}</Tag> : null}
      </div>

      <p className={cn("mt-2 text-[14px] leading-[1.5]", featured ? "text-[#C9BCA6]" : "text-cocoa")}>
        {tier.description}
      </p>

      <div className="mt-5 flex items-baseline gap-1.5">
        <span
          className={cn(
            "font-serif text-[38px] leading-none tracking-[-0.02em]",
            featured ? "text-cream-text" : "text-ink"
          )}
        >
          {tier.price}
        </span>
        {tier.period ? (
          <span
            className={cn(
              "whitespace-nowrap font-ui text-[14px]",
              featured ? "text-[#C9BCA6]" : "text-taupe"
            )}
          >
            {tier.period}
          </span>
        ) : null}
      </div>

      <div className={cn("my-6 h-px", featured ? "bg-cream-text/12" : "bg-line")} />

      <ul className="flex-1 space-y-3">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[14px] leading-[1.45]">
            <CheckCircle2
              className={cn("mt-0.5 size-4 shrink-0", featured ? "text-gold-200" : "text-orange")}
              strokeWidth={1.75}
            />
            <span className={featured ? "text-cream-text/90" : "text-cocoa"}>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <PillLink
          href={tier.cta.href}
          variant={featured ? "gold" : "outline"}
          size="lg"
          className="w-full"
        >
          {tier.cta.label}
        </PillLink>
      </div>
    </div>
  )
}
