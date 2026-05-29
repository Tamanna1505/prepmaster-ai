"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  FileText,
  LayoutDashboard,
  ListChecks,
  Newspaper,
  Shield,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/questions", label: "Questions", icon: ListChecks },
  { href: "/admin/tests", label: "Tests", icon: FileText },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/users", label: "Users", icon: Users },
]

export function AdminSidebar() {
  const pathname = usePathname()
  return (
    <aside className="hidden w-60 shrink-0 border-r border-border/60 bg-muted/20 lg:block">
      <div className="flex h-14 items-center gap-2 border-b border-border/60 px-4 font-semibold tracking-tight">
        <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
          <Shield className="size-4" />
        </span>
        Admin · PrepMaster
      </div>
      <nav className="flex flex-col gap-1 p-3">
        {NAV.map((item) => {
          const Icon = item.icon
          const active =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href))
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
