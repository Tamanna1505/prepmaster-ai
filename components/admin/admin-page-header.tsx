import type { ReactNode } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Eyebrow } from "@/components/marketing/primitives"

/* Admin page header with optional back link + actions slot. */
export function AdminPageHeader({
  eyebrow,
  title,
  description,
  actions,
  backHref,
  backLabel,
}: {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
  backHref?: string
  backLabel?: string
}) {
  return (
    <div className="border-b border-line pb-6">
      {backHref ? (
        <Link
          href={backHref}
          className="focus-ring mb-3 inline-flex items-center gap-1 rounded font-ui text-[13px] font-medium text-cocoa transition-colors hover:text-ink"
        >
          <ChevronLeft className="size-4" strokeWidth={2} /> {backLabel ?? "Back"}
        </Link>
      ) : null}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {eyebrow ? <Eyebrow tone="orange">{eyebrow}</Eyebrow> : null}
          <h1 className="mt-2 font-serif text-[28px] leading-[1.1] tracking-[-0.02em] text-ink sm:text-[34px]">
            {title}
          </h1>
          {description ? (
            <p className="mt-2 max-w-2xl text-[15px] leading-[1.6] text-cocoa">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
    </div>
  )
}
