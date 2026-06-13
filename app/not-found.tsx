import Link from "next/link"

/* Shown when a page (or a detail route's notFound()) can't be resolved. */
export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-cream-100 px-5 py-12 text-center font-ui text-ink">
      <div className="max-w-md">
        <p className="eyebrow text-taupe">404</p>
        <h1 className="mt-3 font-serif text-[28px] leading-[1.1] tracking-[-0.02em] text-ink sm:text-[34px]">
          Page not found
        </h1>
        <p className="mt-3 text-[15px] leading-[1.6] text-cocoa">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="focus-ring inline-flex items-center rounded-full bg-ink px-5 py-2.5 font-ui text-[14px] font-semibold text-cream-text transition-all hover:-translate-y-px hover:shadow-card-hover"
          >
            Go home
          </Link>
          <Link
            href="/courses"
            className="focus-ring inline-flex items-center rounded-full px-5 py-2.5 font-ui text-[14px] font-semibold text-cocoa shadow-[inset_0_0_0_1.5px_var(--color-line)] transition-colors hover:bg-surface-muted hover:text-ink"
          >
            Browse courses
          </Link>
        </div>
      </div>
    </div>
  )
}
