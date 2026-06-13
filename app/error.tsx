"use client"

import { useEffect } from "react"
import Link from "next/link"

/* App-wide error boundary. Turns any unexpected runtime error into a visible,
   on-brand message (instead of a blank white screen) and lets the user retry. */
export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="grid min-h-screen place-items-center bg-cream-100 px-5 py-12 text-center font-ui text-ink">
      <div className="max-w-md">
        <p className="eyebrow text-taupe">Something went wrong</p>
        <h1 className="mt-3 font-serif text-[28px] leading-[1.1] tracking-[-0.02em] text-ink sm:text-[34px]">
          We couldn&apos;t load this page
        </h1>
        <p className="mt-3 text-[15px] leading-[1.6] text-cocoa">
          An unexpected error occurred. Please try again — if it keeps happening, check that the
          database is reachable.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="focus-ring inline-flex items-center rounded-full bg-ink px-5 py-2.5 font-ui text-[14px] font-semibold text-cream-text transition-all hover:-translate-y-px hover:shadow-card-hover"
          >
            Try again
          </button>
          <Link
            href="/"
            className="focus-ring inline-flex items-center rounded-full px-5 py-2.5 font-ui text-[14px] font-semibold text-cocoa shadow-[inset_0_0_0_1.5px_var(--color-line)] transition-colors hover:bg-surface-muted hover:text-ink"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}
