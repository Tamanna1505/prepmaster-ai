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

const CONFIG: SidebarConfig = {
  title: "PrepMaster AI",
  kind: "Admin",
  homeHref: "/admin",
  rootHref: "/admin",
  accent: "teal",
  user: { name: "Priya Sharma", role: "Administrator", initials: "PS" },
  nav: [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/courses", label: "Courses", icon: BookOpen },
    { href: "/admin/questions", label: "Questions", icon: ListChecks },
    { href: "/admin/tests", label: "Tests", icon: FileText },
    { href: "/admin/blog", label: "Blog", icon: Newspaper },
    { href: "/admin/users", label: "Users", icon: Users },
  ],
}

export function AdminSidebar() {
  return <SidebarFrame config={CONFIG} />
}
