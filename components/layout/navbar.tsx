"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Container, PillLink } from "@/components/marketing/primitives"

const NAV = [
  { href: "/courses", label: "Courses" },
  { href: "/mock-tests", label: "Mock tests" },
  { href: "/study-material", label: "Study material" },
  { href: "/blog", label: "Blog" },
  { href: "/pricing", label: "Pricing" },
]

function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("focus-ring flex items-center gap-2.5 rounded-lg", className)}
      aria-label="PrepMaster AI — home"
    >
      <Image src="/mark.svg" alt="" width={34} height={34} className="size-[34px]" priority />
      <span className="font-serif text-[19px] tracking-[-0.02em] text-ink">
        PrepMaster <span className="text-orange">AI</span>
      </span>
    </Link>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-cream-100/82 backdrop-blur-md">
      <Container wide className="flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring rounded font-ui text-[15px] font-medium text-cocoa transition-colors duration-150 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/login"
            className="focus-ring rounded font-ui text-[15px] font-medium text-cocoa transition-colors duration-150 hover:text-ink"
          >
            Log in
          </Link>
          <PillLink href="/register" variant="ink" size="md">
            Start free trial
          </PillLink>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <PillLink href="/register" variant="ink" size="sm">
            Start free trial
          </PillLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="focus-ring grid size-10 place-items-center rounded-full text-ink"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile slide-down panel */}
      {open ? (
        <div className="border-t border-line bg-cream-100/95 backdrop-blur-md md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="focus-ring rounded-lg px-2 py-2.5 font-ui text-[16px] font-medium text-cocoa transition-colors hover:bg-ink/5 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="focus-ring mt-1 rounded-lg px-2 py-2.5 font-ui text-[16px] font-medium text-cocoa transition-colors hover:bg-ink/5 hover:text-ink"
            >
              Log in
            </Link>
          </Container>
        </div>
      ) : null}
    </header>
  )
}
