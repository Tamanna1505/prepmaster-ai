import type { Metadata } from "next"
import { Clock, Mail, MapPin, MessageSquare } from "lucide-react"
import { SiteShell } from "@/components/layout/site-shell"
import { Container, Eyebrow, PillButton } from "@/components/marketing/primitives"
import { courses } from "@/lib/sample-data"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Questions about a course, feedback on a test, or a partnership — reach the PrepMaster AI team.",
}

const EXAM_TARGETS = Array.from(new Set(courses.map((c) => c.examTag)))

const labelClass = "font-ui text-[12px] font-semibold text-cocoa"
const fieldClass =
  "focus-ring w-full rounded-[14px] bg-surface px-4 py-3 font-ui text-[15px] text-ink shadow-[inset_0_0_0_1px_var(--color-line)] placeholder:text-taupe"

export default function ContactPage() {
  return (
    <SiteShell>
      <section className="border-b border-line bg-cream-100 py-14 sm:py-16">
        <Container wide>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-3 max-w-3xl font-serif text-[40px] leading-[1.04] tracking-[-0.02em] text-ink sm:text-[52px]">
            Say hello
          </h1>
          <p className="mt-4 max-w-xl text-[17px] leading-[1.6] text-cocoa">
            Questions about a course, feedback on a test, or a partnership — we read everything and
            reply fast.
          </p>
        </Container>
      </section>

      <section className="bg-cream-100 py-12 sm:py-16">
        <Container wide>
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            {/* Form */}
            <form className="rounded-[24px] bg-surface p-6 shadow-card shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="name" className={labelClass}>
                    Name
                  </label>
                  <input id="name" name="name" placeholder="Your name" className={fieldClass} />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="mt-5 space-y-1.5">
                <label htmlFor="exam" className={labelClass}>
                  Target exam
                </label>
                <select id="exam" name="exam" className={fieldClass} defaultValue="">
                  <option value="" disabled>
                    Select an exam
                  </option>
                  {EXAM_TARGETS.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mt-5 space-y-1.5">
                <label htmlFor="message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell us a bit more…"
                  className={`${fieldClass} resize-y`}
                />
              </div>

              <div className="mt-6">
                <PillButton type="submit" variant="ink" size="lg">
                  Send message
                </PillButton>
              </div>
              <p className="mt-3 font-ui text-[12px] text-taupe">
                Sample form — submission wiring (a server action) is out of scope for this UI phase.
              </p>
            </form>

            {/* Supporting info */}
            <div className="space-y-4">
              <div className="rounded-[20px] bg-surface p-6 shadow-[inset_0_0_0_1px_var(--color-line)]">
                <h2 className="font-serif text-[20px] text-ink">Other ways to reach us</h2>
                <ul className="mt-4 space-y-3.5 font-ui text-[14px] text-cocoa">
                  <li className="flex items-center gap-3">
                    <Mail className="size-4 text-orange" strokeWidth={1.75} /> hello@prepmaster.ai
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock className="size-4 text-orange" strokeWidth={1.75} /> Replies within one
                    business day
                  </li>
                  <li className="flex items-center gap-3">
                    <MessageSquare className="size-4 text-orange" strokeWidth={1.75} /> In-app live
                    chat (post-launch)
                  </li>
                  <li className="flex items-center gap-3">
                    <MapPin className="size-4 text-orange" strokeWidth={1.75} /> Remote-first, India
                  </li>
                </ul>
              </div>

              <div className="rounded-[20px] bg-gold-200 p-6 text-gold-ink shadow-card">
                <p className="font-serif text-[20px]">Prefer to explore first?</p>
                <p className="mt-2 text-[14px] leading-[1.55] text-brown">
                  Browse the course catalog or take a free mock test before you reach out.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </SiteShell>
  )
}
