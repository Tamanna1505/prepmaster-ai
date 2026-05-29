import Link from "next/link"
import { Sparkles } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

const NAV = [
  { href: "/courses", label: "Courses" },
  { href: "/mock-tests", label: "Mock Tests" },
  { href: "/study-material", label: "Study Material" },
  { href: "/blog", label: "Blog" },
  { href: "/pricing", label: "Pricing" },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          PrepMaster AI
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            Sign in
          </Link>
          <Link href="/register" className={buttonVariants({ size: "sm" })}>
            Get started
          </Link>
        </div>
      </div>
    </header>
  )
}
