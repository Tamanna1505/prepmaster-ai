"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut, Menu, X, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export type NavItem = { href: string; label: string; icon: LucideIcon }

export type SidebarConfig = {
  /* Brand label shown next to the mark. */
  title: string
  /* Small label under the page chrome, e.g. "Student" / "Admin". */
  kind: string
  homeHref: string
  rootHref: string
  nav: NavItem[]
  user: { name: string; role: string; initials: string }
  accent: "gold" | "teal"
}

function isActive(pathname: string, href: string, rootHref: string) {
  if (href === rootHref) return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}

function NavLinks({
  nav,
  rootHref,
  onNavigate,
}: {
  nav: NavItem[]
  rootHref: string
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  return (
    <nav className="flex flex-col gap-1">
      {nav.map((item) => {
        const Icon = item.icon
        const active = isActive(pathname, item.href, rootHref)
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "focus-ring flex items-center gap-3 rounded-[12px] px-3 py-2.5 font-ui text-[14px] font-medium transition-all duration-150",
              active
                ? "bg-ink text-cream-text shadow-card"
                : "text-cocoa hover:bg-surface-muted hover:text-ink"
            )}
          >
            <Icon className="size-[18px]" strokeWidth={1.75} />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

function Brand({ title, homeHref }: { title: string; homeHref: string }) {
  return (
    <Link href={homeHref} className="focus-ring flex items-center gap-2.5 rounded-lg">
      <Image src="/mark.svg" alt="" width={32} height={32} className="size-8" />
      <span className="font-serif text-[18px] tracking-[-0.02em] text-ink">{title}</span>
    </Link>
  )
}

function UserFooter({
  user,
  accent,
  onNavigate,
}: {
  user: SidebarConfig["user"]
  accent: SidebarConfig["accent"]
  onNavigate?: () => void
}) {
  return (
    <div className="border-t border-line pt-4">
      <div className="flex items-center gap-3 px-1">
        <span
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-full font-ui text-[13px] font-semibold",
            accent === "teal" ? "bg-teal-tint text-teal-deep" : "bg-gold-200 text-gold-ink"
          )}
        >
          {user.initials}
        </span>
        <div className="min-w-0">
          <p className="truncate font-ui text-[14px] font-semibold text-ink">{user.name}</p>
          <p className="truncate font-ui text-[12px] text-taupe">{user.role}</p>
        </div>
      </div>
      {/* Visual logout only — no real auth logic in this phase. */}
      <Link
        href="/login"
        onClick={onNavigate}
        className="focus-ring mt-3 flex items-center justify-center gap-2 rounded-full px-4 py-2 font-ui text-[14px] font-semibold text-cocoa shadow-[inset_0_0_0_1.5px_var(--color-line)] transition-colors hover:bg-surface-muted hover:text-ink"
      >
        <LogOut className="size-4" strokeWidth={1.75} /> Log out
      </Link>
    </div>
  )
}

export function SidebarFrame({ config }: { config: SidebarConfig }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-line bg-cream-50 px-4 py-5 lg:flex">
        <div className="px-1">
          <Brand title={config.title} homeHref={config.homeHref} />
        </div>
        <p className="eyebrow mt-6 px-2 text-taupe">{config.kind}</p>
        <div className="mt-3 flex-1 overflow-y-auto">
          <NavLinks nav={config.nav} rootHref={config.rootHref} />
        </div>
        <UserFooter user={config.user} accent={config.accent} />
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-line bg-cream-50/90 px-5 py-3 backdrop-blur-md lg:hidden">
        <Brand title={config.title} homeHref={config.homeHref} />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="focus-ring grid size-10 place-items-center rounded-full text-ink"
        >
          <Menu className="size-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[82%] flex-col bg-cream-50 px-4 py-5 shadow-feature">
            <div className="flex items-center justify-between px-1">
              <Brand title={config.title} homeHref={config.homeHref} />
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="focus-ring grid size-9 place-items-center rounded-full text-ink"
              >
                <X className="size-5" />
              </button>
            </div>
            <p className="eyebrow mt-6 px-2 text-taupe">{config.kind}</p>
            <div className="mt-3 flex-1 overflow-y-auto">
              <NavLinks nav={config.nav} rootHref={config.rootHref} onNavigate={close} />
            </div>
            <UserFooter user={config.user} accent={config.accent} onNavigate={close} />
          </div>
        </div>
      ) : null}
    </>
  )
}
