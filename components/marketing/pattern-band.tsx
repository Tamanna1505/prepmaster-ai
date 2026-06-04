import { cn } from "@/lib/utils"

/* PatternBand — decorative tileable Bauhaus strip (DESIGN_SYSTEM.md §6, §7).
   Anchor to the bottom of golden feature blocks. Decorative only — never
   place body text over it. */
export function PatternBand({
  height = 44,
  className,
}: {
  height?: number
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={cn("pattern-band w-full", className)}
      style={{ height }}
    />
  )
}
