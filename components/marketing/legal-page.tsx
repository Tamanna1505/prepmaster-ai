import type { ReactNode } from "react"
import { SiteShell } from "@/components/layout/site-shell"
import { Container, Eyebrow } from "@/components/marketing/primitives"

/* Shared chrome for the simple legal/content pages (Privacy, Terms). */
export function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string
  title: string
  updated: string
  children: ReactNode
}) {
  return (
    <SiteShell>
      <article className="bg-cream-100 py-14 sm:py-16">
        <Container className="max-w-[760px]">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-3 font-serif text-[34px] leading-[1.06] tracking-[-0.02em] text-ink sm:text-[44px]">
            {title}
          </h1>
          <p className="mt-3 font-ui text-[13px] text-taupe">Last updated {updated}</p>

          <div className="mt-8 space-y-6 text-[16px] leading-[1.7] text-cocoa [&_h2]:mt-8 [&_h2]:font-serif [&_h2]:text-[22px] [&_h2]:tracking-[-0.02em] [&_h2]:text-ink">
            {children}
          </div>

          <p className="mt-10 rounded-[14px] bg-surface-muted px-5 py-4 font-ui text-[13px] text-taupe">
            Sample policy text for this MVP prototype. It is illustrative and not legal advice —
            replace it with a reviewed policy before any production launch.
          </p>
        </Container>
      </article>
    </SiteShell>
  )
}
