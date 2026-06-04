import { Container, Eyebrow, PillLink } from "@/components/marketing/primitives"
import { PatternBand } from "@/components/marketing/pattern-band"

type CTAProps = {
  eyebrow?: string
  title: string
  description?: string
  primary?: { href: string; label: string }
  secondary?: { href: string; label: string }
  tone?: "gold" | "ink"
  withPattern?: boolean
}

/* CTASection — golden feature block (with optional pattern band anchored to its
   bottom) or an ink final-CTA block (DESIGN_SYSTEM.md §5 #7 and #11). */
export function CTASection({
  eyebrow,
  title,
  description,
  primary = { href: "/register", label: "Start free trial" },
  secondary,
  tone = "gold",
  withPattern = false,
}: CTAProps) {
  const isGold = tone === "gold"

  return (
    <section className={isGold ? "bg-cream-100 py-14 sm:py-20" : "bg-cream-50 py-14 sm:py-20"}>
      <Container wide>
        <div
          className={
            isGold
              ? "relative overflow-hidden rounded-[28px] bg-gold-200 text-gold-ink shadow-card"
              : "relative overflow-hidden rounded-[28px] bg-ink text-cream-text shadow-feature"
          }
        >
          <div className="px-7 py-12 text-center sm:px-10 sm:py-16">
            {eyebrow ? (
              <Eyebrow tone={isGold ? "orange" : "cream"} className="justify-center">
                {eyebrow}
              </Eyebrow>
            ) : null}
            <h2
              className={`mx-auto mt-3 max-w-2xl font-serif text-[30px] leading-[1.1] tracking-[-0.02em] sm:text-[40px] ${
                isGold ? "text-gold-ink" : "text-cream-text"
              }`}
            >
              {title}
            </h2>
            {description ? (
              <p
                className={`mx-auto mt-4 max-w-xl text-[16px] leading-[1.6] sm:text-[17px] ${
                  isGold ? "text-brown" : "text-[#C9BCA6]"
                }`}
              >
                {description}
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <PillLink href={primary.href} variant={isGold ? "ink" : "cream"} size="lg">
                {primary.label}
              </PillLink>
              {secondary ? (
                <PillLink
                  href={secondary.href}
                  variant="outline"
                  size="lg"
                  className={
                    isGold
                      ? ""
                      : "text-cream-text shadow-[inset_0_0_0_1.5px_var(--color-cream-text)] hover:bg-white/10"
                  }
                >
                  {secondary.label}
                </PillLink>
              ) : null}
            </div>
          </div>

          {withPattern && isGold ? <PatternBand height={40} className="opacity-90" /> : null}
        </div>
      </Container>
    </section>
  )
}
