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

const CONFIG: SidebarConfig = {
  title: "PrepMaster AI",
  kind: "Student",
  homeHref: "/dashboard",
  rootHref: "/dashboard",
  accent: "gold",
  user: { name: studentUser.name, role: "Student", initials: studentUser.initials },
  nav: [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/courses", label: "My courses", icon: BookOpen },
    { href: "/dashboard/tests", label: "Mock tests", icon: FileText },
    { href: "/dashboard/results", label: "Results", icon: Trophy },
    { href: "/dashboard/analytics", label: "Analytics", icon: LineChart },
    { href: "/dashboard/profile", label: "Profile", icon: UserRound },
  ],
}

export function DashboardSidebar() {
  return <SidebarFrame config={CONFIG} />
}
