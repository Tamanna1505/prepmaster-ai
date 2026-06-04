import Link from "next/link"
import { ArrowUpRight, type LucideIcon } from "lucide-react"

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
      className="focus-ring group flex items-start gap-3 rounded-[16px] bg-surface p-4 shadow-[inset_0_0_0_1px_var(--color-line)] transition-all duration-200 ease-out hover:-translate-y-[2px] hover:shadow-card-hover"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-gold-200 text-gold-ink">
        <Icon className="size-5" strokeWidth={1.75} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1 font-ui text-[15px] font-semibold text-ink">
          {label}
          <ArrowUpRight className="size-3.5 text-taupe transition-transform duration-150 ease-out group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-ink" />
        </p>
        <p className="mt-0.5 font-ui text-[13px] leading-[1.5] text-cocoa">{description}</p>
      </div>
    </Link>
  )
}
