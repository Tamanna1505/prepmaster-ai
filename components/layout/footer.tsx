import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/marketing/primitives"

const FOOTER_COLS = [
  {
    title: "Platform",
    links: [
      { href: "/courses", label: "Courses" },
      { href: "/mock-tests", label: "Mock tests" },
      { href: "/study-material", label: "Study material" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/login", label: "Log in" },
      { href: "/register", label: "Start free trial" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-ink text-cream-text">
      <Container wide className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <Link href="/" className="focus-ring flex w-fit items-center gap-2.5 rounded-lg">
            <Image src="/mark-cream.svg" alt="" width={34} height={34} className="size-[34px]" />
            <span className="font-serif text-[19px] tracking-[-0.02em] text-cream-text">
              PrepMaster <span className="text-gold-200">AI</span>
            </span>
          </Link>
          <p className="max-w-xs text-[14px] leading-[1.6] text-[#C9BCA6]">
            Structured courses, exam-grade mock tests, and AI feedback that turns every attempt into
            a clear next step.
          </p>
        </div>

        {FOOTER_COLS.map((col) => (
          <div key={col.title}>
            <p className="font-ui text-[13px] font-semibold text-cream-text">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={`${col.title}-${l.href}-${l.label}`}>
                  <Link
                    href={l.href}
                    className="focus-ring rounded font-ui text-[14px] text-[#C9BCA6] transition-colors duration-150 hover:text-cream-text"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="border-t border-cream-text/12">
        <Container
          wide
          className="flex flex-col items-center justify-between gap-2 py-5 text-[13px] text-[#C9BCA6] sm:flex-row"
        >
          <span>© {new Date().getFullYear()} PrepMaster AI. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="focus-ring rounded transition-colors hover:text-cream-text">
              Privacy
            </Link>
            <Link href="/terms" className="focus-ring rounded transition-colors hover:text-cream-text">
              Terms
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  )
}
