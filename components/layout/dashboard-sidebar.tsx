"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  FileText,
  LayoutDashboard,
  LineChart,
  Sparkles,
  Trophy,
  UserRound,
} from "lucide-react"
import { cn } from "@/lib/utils"

const NAV = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/courses", label: "My courses", icon: BookOpen },
  { href: "/dashboard/tests", label: "Mock tests", icon: FileText },
  { href: "/dashboard/results", label: "Results", icon: Trophy },
  { href: "/dashboard/analytics", label: "Analytics", icon: LineChart },
  { href: "/dashboard/profile", label: "Profile", icon: UserRound },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  return (
    <aside className="hidden w-60 shrink-0 border-r border-border/60 bg-muted/20 lg:block">
      <div className="flex h-14 items-center gap-2 border-b border-border/60 px-4 font-semibold tracking-tight">
        <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
          <Sparkles className="size-4" />
        </span>
        PrepMaster AI
      </div>
      <nav className="flex flex-col gap-1 p-3">
        {NAV.map((item) => {
          const Icon = item.icon
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
