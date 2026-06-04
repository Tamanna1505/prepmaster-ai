import type { LucideIcon } from "lucide-react"
import { BookOpen, FileText, ListChecks, Sigma, Users } from "lucide-react"

/* Phase 4 — sample/static admin data only. No DB, no real auth. */

export type AdminSummaryStat = {
  label: string
  value: string
  delta: string
  trend: "up" | "down" | "flat"
  icon: LucideIcon
}

export const adminSummary: AdminSummaryStat[] = [
  { label: "Total students", value: "12,840", delta: "+18% WoW", trend: "up", icon: Users },
  { label: "Total courses", value: "26", delta: "+3 this month", trend: "up", icon: BookOpen },
  { label: "Total questions", value: "9,412", delta: "+214 this week", trend: "up", icon: Sigma },
  { label: "Total tests", value: "148", delta: "+6 this month", trend: "up", icon: ListChecks },
  { label: "Total attempts", value: "84,210", delta: "+9% WoW", trend: "up", icon: FileText },
]

export type AdminUser = {
  name: string
  email: string
  role: "STUDENT" | "ADMIN"
  joined: string
  status: "Active" | "Inactive"
}

export const recentUsers: AdminUser[] = [
  { name: "Aanya Reddy", email: "aanya@example.com", role: "STUDENT", joined: "2026-06-02", status: "Active" },
  { name: "Vikram Iyer", email: "vikram@example.com", role: "STUDENT", joined: "2026-06-02", status: "Active" },
  { name: "Sara Khan", email: "sara@example.com", role: "STUDENT", joined: "2026-06-01", status: "Active" },
  { name: "Priya Sharma", email: "priya@prepmaster.ai", role: "ADMIN", joined: "2026-04-15", status: "Active" },
  { name: "Pratik Joshi", email: "pratik@example.com", role: "STUDENT", joined: "2026-05-31", status: "Inactive" },
  { name: "Dr. Anand R.", email: "anand@prepmaster.ai", role: "ADMIN", joined: "2026-03-01", status: "Active" },
]

export type AdminAttempt = {
  id: string
  student: string
  test: string
  examTag: string
  scorePct: number
  date: string
}

export const recentAttempts: AdminAttempt[] = [
  { id: "a-9001", student: "Aanya Reddy", test: "JEE Main — Full Mock #01", examTag: "JEE", scorePct: 74, date: "2026-06-03" },
  { id: "a-9000", student: "Vikram Iyer", test: "CAT Quant — Full Mock #07", examTag: "CAT", scorePct: 61, date: "2026-06-03" },
  { id: "a-8999", student: "Sara Khan", test: "NEET — Grand Test #2", examTag: "NEET", scorePct: 68, date: "2026-06-02" },
  { id: "a-8998", student: "Pratik Joshi", test: "SSC CGL — Tier-1 Mock #3", examTag: "SSC", scorePct: 71, date: "2026-06-02" },
  { id: "a-8997", student: "Meera Pillai", test: "UPSC Prelims — Mock #5", examTag: "UPSC", scorePct: 49, date: "2026-06-01" },
]

export type AdminQuestion = {
  id: string
  stem: string
  topic: string
  type: "MCQ single" | "MCQ multi" | "Numeric"
  difficulty: "Easy" | "Medium" | "Hard"
}

export const adminQuestions: AdminQuestion[] = [
  { id: "Q-3201", stem: "A point charge is placed at the centre of a cube. The flux through one face is…", topic: "Electrostatics", type: "MCQ single", difficulty: "Medium" },
  { id: "Q-3200", stem: "Which of the following sequences are arithmetic progressions?", topic: "Sequences", type: "MCQ multi", difficulty: "Easy" },
  { id: "Q-3199", stem: "Find the value of x for which the determinant vanishes.", topic: "Matrices", type: "Numeric", difficulty: "Hard" },
  { id: "Q-3198", stem: "The Preamble to the Constitution was amended by which act?", topic: "Polity", type: "MCQ single", difficulty: "Medium" },
  { id: "Q-3197", stem: "Compute the time complexity of the given recurrence.", topic: "Algorithms", type: "MCQ single", difficulty: "Hard" },
  { id: "Q-3196", stem: "A train travels 60 km at 40 km/h and returns at 60 km/h. Average speed?", topic: "Arithmetic", type: "Numeric", difficulty: "Easy" },
]

export type AdminTestRow = {
  id: string
  title: string
  examTag: string
  questions: number
  durationMinutes: number
  status: "Published" | "Draft"
}

export const adminTests: AdminTestRow[] = [
  { id: "T-148", title: "JEE Main — Full Mock #01", examTag: "JEE", questions: 75, durationMinutes: 180, status: "Published" },
  { id: "T-147", title: "CAT Quant — Full Mock #07", examTag: "CAT", questions: 60, durationMinutes: 120, status: "Published" },
  { id: "T-146", title: "NEET — Grand Test #2", examTag: "NEET", questions: 180, durationMinutes: 200, status: "Published" },
  { id: "T-145", title: "Aptitude — DI Drill #9", examTag: "Aptitude", questions: 25, durationMinutes: 30, status: "Draft" },
  { id: "T-144", title: "UPSC Prelims — Mock #6 (GS)", examTag: "UPSC", questions: 100, durationMinutes: 120, status: "Draft" },
]

export type AdminBlogRow = {
  title: string
  category: string
  author: string
  publishedAt: string
  status: "Published" | "Draft"
}

export const adminBlog: AdminBlogRow[] = [
  { title: "CAT: a strategy for the final 30 days", category: "Strategy", author: "Priya Sharma", publishedAt: "2026-05-12", status: "Published" },
  { title: "The biology diagram method that adds 30 marks", category: "Study Hacks", author: "Dr. Anand R.", publishedAt: "2026-05-04", status: "Published" },
  { title: "How to track current affairs without burning out", category: "Strategy", author: "Rohit Menon", publishedAt: "2026-04-22", status: "Published" },
  { title: "How AI feedback on mock tests changed my prep", category: "Success Story", author: "Aditi Kulkarni", publishedAt: "2026-04-09", status: "Draft" },
  { title: "A mental model for negative marking", category: "Strategy", author: "Karan Joshi", publishedAt: "", status: "Draft" },
]
