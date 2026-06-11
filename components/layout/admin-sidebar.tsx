"use client"

import {
  BookOpen,
  FileText,
  LayoutDashboard,
  ListChecks,
  Newspaper,
  Users,
} from "lucide-react"
import { SidebarFrame, type SidebarConfig } from "@/components/layout/sidebar-frame"

function initialsOf(name: string) {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "A"
  )
}

const NAV: SidebarConfig["nav"] = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/questions", label: "Questions", icon: ListChecks },
  { href: "/admin/tests", label: "Tests", icon: FileText },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/users", label: "Users", icon: Users },
]

export function AdminSidebar({ user }: { user?: { name: string } }) {
  const name = user?.name ?? "Administrator"
  const config: SidebarConfig = {
    title: "PrepMaster AI",
    kind: "Admin",
    homeHref: "/admin",
    rootHref: "/admin",
    accent: "teal",
    user: { name, role: "Administrator", initials: initialsOf(name) },
    nav: NAV,
  }
  return <SidebarFrame config={config} />
}
