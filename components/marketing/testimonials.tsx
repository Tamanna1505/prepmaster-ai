import { Quote } from "lucide-react"
import type { Testimonial } from "@/lib/sample-data"
import { testimonials } from "@/lib/sample-data"
import { Container, SectionHead } from "@/components/marketing/primitives"

export function TestimonialCard({ name, role, quote }: Testimonial) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)

  return (
    <figure className="flex h-full flex-col rounded-[20px] bg-surface p-6 shadow-[inset_0_0_0_1px_var(--color-line)] transition-all duration-200 ease-out hover:-translate-y-[3px] hover:shadow-card-hover">
      <Quote className="size-6 text-gold-300" strokeWidth={1.75} />
      <blockquote className="mt-4 flex-1 text-[16px] leading-[1.6] text-cocoa">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-full bg-gold-200 font-ui text-[13px] font-semibold text-gold-ink">
          {initials}
        </span>
        <span>
          <span className="block font-ui text-[14px] font-semibold text-ink">{name}</span>
          <span className="block font-data text-[12px] tracking-[-0.02em] text-taupe">{role}</span>
        </span>
      </figcaption>
    </figure>
  )
}

export function Testimonials() {
  return (
    <section className="bg-cream-100 py-14 sm:py-20">
      <Container wide>
        <SectionHead
          eyebrow="Student stories"
          title="From plateau to placement"
          description="Real outcomes from students who stopped guessing what to revise."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </Container>
    </section>
  )
}
