"use client"

import {
  BookOpen,
  FileText,
  LayoutDashboard,
  LineChart,
  Trophy,
  UserRound,
} from "lucide-react"
import { SidebarFrame, type SidebarConfig } from "@/components/layout/sidebar-frame"
import { studentUser } from "@/lib/dashboard-data"

function initialsOf(name: string) {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U"
  )
}

const NAV: SidebarConfig["nav"] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/courses", label: "My courses", icon: BookOpen },
  { href: "/dashboard/tests", label: "Mock tests", icon: FileText },
  { href: "/dashboard/results", label: "Results", icon: Trophy },
  { href: "/dashboard/analytics", label: "Analytics", icon: LineChart },
  { href: "/dashboard/profile", label: "Profile", icon: UserRound },
]

export function DashboardSidebar({ user }: { user?: { name: string } }) {
  const name = user?.name ?? studentUser.name
  const config: SidebarConfig = {
    title: "PrepMaster AI",
    kind: "Student",
    homeHref: "/dashboard",
    rootHref: "/dashboard",
    accent: "gold",
    user: { name, role: "Student", initials: initialsOf(name) },
    nav: NAV,
  }
  return <SidebarFrame config={config} />
}
