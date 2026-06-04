import Link from "next/link"
import type { ComponentProps, ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/* ──────────────────────────────────────────────────────────────────────────
   PrepMaster AI — shared marketing primitives (DESIGN_SYSTEM.md §6)
   Brand-namespaced so they don't collide with the shadcn ui/* primitives
   used by the dashboard and admin areas.
   ────────────────────────────────────────────────────────────────────────── */

/* Container — centered max-width wrapper. */
export function Container({
  className,
  wide = false,
  children,
  ...props
}: ComponentProps<"div"> & { wide?: boolean }) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        wide ? "max-w-[1320px]" : "max-w-[1200px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/* Eyebrow — tracked uppercase overline. */
export function Eyebrow({
  className,
  children,
  tone = "orange",
}: {
  className?: string
  children: ReactNode
  tone?: "orange" | "teal" | "gold" | "taupe" | "cream"
}) {
  const tones = {
    orange: "text-orange",
    teal: "text-teal-deep",
    gold: "text-gold-500",
    taupe: "text-taupe",
    cream: "text-gold-200",
  } as const
  return <p className={cn("eyebrow", tones[tone], className)}>{children}</p>
}

/* SectionHead — eyebrow + serif heading + optional supporting copy / trailing slot. */
export function SectionHead({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "orange",
  trailing,
  className,
}: {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: "left" | "center"
  tone?: "orange" | "teal" | "gold" | "taupe" | "cream"
  trailing?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "sm:flex-col sm:items-center",
        className
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
        {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
        <h2 className="mt-3 font-serif text-[30px] leading-[1.12] tracking-[-0.02em] text-ink sm:text-[38px]">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-[16px] leading-[1.6] text-cocoa sm:text-[17px]">{description}</p>
        ) : null}
      </div>
      {trailing ? <div className="shrink-0">{trailing}</div> : null}
    </div>
  )
}

/* Pill — rounded-full button/link in ink / outline / gold variants (DESIGN_SYSTEM.md §6). */
type PillVariant = "ink" | "outline" | "gold" | "cream"
type PillSize = "sm" | "md" | "lg"

const pillBase =
  "focus-ring group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-ui font-semibold transition-all duration-150 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"

const pillSizes: Record<PillSize, string> = {
  sm: "px-4 py-2 text-[14px]",
  md: "px-5 py-2.5 text-[14px]",
  lg: "px-6 py-3 text-[15px]",
}

const pillVariants: Record<PillVariant, string> = {
  ink: "bg-ink text-cream-text hover:-translate-y-px hover:shadow-card-hover",
  outline:
    "bg-transparent text-ink shadow-[inset_0_0_0_1.5px_var(--color-ink)] hover:bg-ink/5",
  gold: "bg-gold-200 text-gold-ink shadow-[inset_0_0_0_1px_var(--color-gold-300)] hover:-translate-y-px hover:shadow-card-hover",
  cream:
    "bg-cream-text text-ink hover:-translate-y-px hover:shadow-card-hover",
}

export function pillClass(opts?: { variant?: PillVariant; size?: PillSize; className?: string }) {
  const { variant = "ink", size = "md", className } = opts ?? {}
  return cn(pillBase, pillSizes[size], pillVariants[variant], className)
}

type PillProps = {
  variant?: PillVariant
  size?: PillSize
  className?: string
  children: ReactNode
}

export function PillButton({
  variant,
  size,
  className,
  children,
  ...props
}: PillProps & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={pillClass({ variant, size, className })} {...props}>
      {children}
    </button>
  )
}

export function PillLink({
  variant,
  size,
  className,
  children,
  href,
  ...props
}: PillProps & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link href={href} className={pillClass({ variant, size, className })} {...props}>
      {children}
    </Link>
  )
}

/* LearnMore — label + circular-arrow ring that nudges + inverts on hover. */
export function LearnMore({
  label = "Learn more",
  href,
  tone = "ink",
  className,
}: {
  label?: string
  href?: string
  tone?: "ink" | "cream"
  className?: string
}) {
  const inner = (
    <span
      className={cn(
        "focus-ring group inline-flex items-center gap-2 font-ui text-[14px] font-semibold",
        tone === "ink" ? "text-ink" : "text-cream-text",
        className
      )}
    >
      {label}
      <span
        className={cn(
          "grid size-7 place-items-center rounded-full transition-all duration-150 ease-out",
          tone === "ink"
            ? "border border-ink/30 text-ink group-hover:bg-ink group-hover:text-cream-text"
            : "border border-cream-text/40 text-cream-text group-hover:bg-cream-text group-hover:text-ink"
        )}
      >
        <ArrowUpRight className="size-3.5 transition-transform duration-150 ease-out group-hover:translate-x-px group-hover:-translate-y-px" />
      </span>
    </span>
  )
  return href ? (
    <Link href={href} className="inline-flex">
      {inner}
    </Link>
  ) : (
    inner
  )
}

/* Tag — small rounded-full badge in brand tones (DESIGN_SYSTEM.md §6 Badges). */
type TagTone = "gold" | "teal" | "ink" | "live" | "outline"

export function Tag({
  tone = "gold",
  className,
  children,
}: {
  tone?: TagTone
  className?: string
  children: ReactNode
}) {
  const tones: Record<TagTone, string> = {
    gold: "bg-gold-200 text-gold-ink",
    teal: "bg-teal-tint text-teal-deep",
    ink: "bg-ink text-cream-text",
    live: "bg-live-tint text-live-deep",
    outline: "bg-transparent text-cocoa shadow-[inset_0_0_0_1px_var(--color-line)]",
  }
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 font-ui text-[12px] font-semibold",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  )
}

/* Photo — rounded image frame with a tinted, clearly-marked placeholder fallback.
   Real imagery is not yet wired; tinted blocks stand in (DESIGN_SYSTEM.md §6). */
export function Photo({
  tone = "gold",
  icon: Icon,
  ratio = "aspect-[16/10]",
  label,
  className,
  children,
}: {
  tone?: "gold" | "teal" | "cream" | "ink"
  icon?: LucideIcon
  ratio?: string
  label?: string
  className?: string
  children?: ReactNode
}) {
  const tones = {
    gold: "bg-gold-200 text-gold-ink",
    teal: "bg-teal/15 text-teal-deep",
    cream: "bg-surface-muted text-brown",
    ink: "bg-ink text-cream-text",
  } as const
  return (
    <div
      className={cn(
        "relative grid place-items-center overflow-hidden rounded-[20px] shadow-[inset_0_0_0_1px_var(--color-line)]",
        ratio,
        tones[tone],
        className
      )}
    >
      {children ?? (
        <div className="flex flex-col items-center gap-2 opacity-80">
          {Icon ? <Icon className="size-8" strokeWidth={1.5} /> : null}
          {label ? <span className="font-ui text-[12px] font-medium">{label}</span> : null}
        </div>
      )}
    </div>
  )
}
