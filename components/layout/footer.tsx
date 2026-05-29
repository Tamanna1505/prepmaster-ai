import Link from "next/link"
import { Sparkles } from "lucide-react"

const FOOTER_COLS = [
  {
    title: "Platform",
    links: [
      { href: "/courses", label: "Courses" },
      { href: "/mock-tests", label: "Mock Tests" },
      { href: "/study-material", label: "Study Material" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/login", label: "Sign in" },
      { href: "/register", label: "Get started" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 md:grid-cols-4">
        <div className="space-y-3">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </span>
            PrepMaster AI
          </Link>
          <p className="text-sm text-muted-foreground">
            Structured courses, exam-grade mock tests, and AI feedback that turns every attempt into
            a clear next step.
          </p>
        </div>
        {FOOTER_COLS.map((col) => (
          <div key={col.title}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {col.title}
            </p>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} PrepMaster AI</span>
          <span>Made for competitive-exam students</span>
        </div>
      </div>
    </footer>
  )
}
