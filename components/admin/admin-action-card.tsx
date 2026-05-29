import Link from "next/link"
import type { LucideIcon } from "lucide-react"

export function AdminActionCard({
  href,
  icon: Icon,
  label,
  description,
}: {
  href: string
  icon: LucideIcon
  label: string
  description: string
}) {
  return (
    <Link
      href={href}
      className="flex items-start gap-3 rounded-xl border border-border/60 bg-card p-4 transition-colors hover:bg-muted/30"
    >
      <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-4" />
      </span>
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </Link>
  )
}
