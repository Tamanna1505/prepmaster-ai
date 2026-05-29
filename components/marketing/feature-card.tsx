import type { LucideIcon } from "lucide-react"

export function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card p-6 transition-colors hover:bg-muted/40">
      <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-5" />
      </span>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
