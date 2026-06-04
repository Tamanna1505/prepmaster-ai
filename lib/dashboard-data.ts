import type { LucideIcon } from "lucide-react"
import { BookOpen, FileCheck2, Gauge, Target } from "lucide-react"
import { courses, type Course } from "@/lib/sample-data"

/* Phase 4 — sample/static student data only. No DB, no real auth. */

export const studentUser = {
  name: "Rajan Patel",
  email: "student@prepmaster.ai",
  initials: "RP",
  examTarget: "CAT 2026",
  joinedAt: "2026-02-14",
  streakDays: 12,
}

export type SummaryStat = {
  label: string
  value: string
  delta: string
  trend: "up" | "down" | "flat"
  icon: LucideIcon
  tone?: "default" | "teal"
}

export const summaryStats: SummaryStat[] = [
  { label: "Enrolled courses", value: "3", delta: "+1 this month", trend: "up", icon: BookOpen },
  { label: "Tests attempted", value: "18", delta: "+5 vs last month", trend: "up", icon: FileCheck2 },
  {
    label: "Average score",
    value: "72%",
    delta: "+6% vs last 4",
    trend: "up",
    icon: Gauge,
    tone: "teal",
  },
  {
    label: "Accuracy",
    value: "74%",
    delta: "+4% vs last 4",
    trend: "up",
    icon: Target,
    tone: "teal",
  },
]

export type EnrolledCourse = {
  course: Course
  completedLessons: number
  progressPct: number
  lastLesson: string
}

export const enrolledCourses: EnrolledCourse[] = [
  {
    course: courses[0],
    completedLessons: 52,
    progressPct: 60,
    lastLesson: "Module 4 · Lesson 4.3 — Gauss law applications",
  },
  {
    course: courses[2],
    completedLessons: 38,
    progressPct: 27,
    lastLesson: "Module 2 · Lesson 2.6 — Fundamental rights",
  },
  {
    course: courses[3],
    completedLessons: 41,
    progressPct: 85,
    lastLesson: "Module 3 · Lesson 3.9 — Data interpretation sets",
  },
]

export const continueLearning = {
  courseTitle: "JEE Physics — Complete Course",
  lesson: "Module 4 · Lesson 4.3 — Gauss law applications",
  minutesLeft: 12,
  progressPct: 60,
  href: "/dashboard/courses",
}

export type RecentResult = {
  id: string
  title: string
  examTag: string
  scorePct: number
  accuracyPct: number
  correct: number
  total: number
  date: string
}

export const recentResults: RecentResult[] = [
  {
    id: "r-014",
    title: "JEE Physics — Topic Test #14",
    examTag: "JEE",
    scorePct: 76,
    accuracyPct: 78,
    correct: 57,
    total: 75,
    date: "2026-05-30",
  },
  {
    id: "r-013",
    title: "Quant — Full Mock #07",
    examTag: "CAT",
    scorePct: 68,
    accuracyPct: 72,
    correct: 41,
    total: 60,
    date: "2026-05-27",
  },
  {
    id: "r-012",
    title: "UPSC Prelims — Mock #5 (GS)",
    examTag: "UPSC",
    scorePct: 54,
    accuracyPct: 61,
    correct: 54,
    total: 100,
    date: "2026-05-24",
  },
  {
    id: "r-011",
    title: "Data Interpretation — Drill #9",
    examTag: "Aptitude",
    scorePct: 81,
    accuracyPct: 84,
    correct: 21,
    total: 25,
    date: "2026-05-21",
  },
]

export type WeakArea = {
  topic: string
  accuracyPct: number
  note: string
}

export const weakAreas: WeakArea[] = [
  { topic: "Electrostatics", accuracyPct: 52, note: "Revise Gauss law, then retake topic test." },
  { topic: "Current affairs", accuracyPct: 49, note: "Weekly news-to-syllabus mapping recommended." },
  { topic: "Data interpretation", accuracyPct: 58, note: "Focus on speed — time per set is high." },
  { topic: "Modern physics", accuracyPct: 61, note: "Dual nature and atomic models need work." },
]

export const aiRecommendation = {
  summary:
    "You're trending up — accuracy is the lever now, not coverage. Your last four attempts show strong mechanics but recurring losses in electrostatics.",
  steps: [
    "Revise Lesson 4.3 — Gauss law applications",
    "Attempt Electrostatics — Topic Test #3",
    "Slow down on DI sets — you're losing marks to rushing",
  ],
}

/* Accuracy across the last 10 attempts — performance preview (teal). */
export const performanceTrend = [60, 64, 58, 67, 71, 69, 74, 72, 76, 78]

export type RecommendedCourse = { course: Course; reason: string }

export const recommendedCourses: RecommendedCourse[] = [
  { course: courses[5], reason: "Strengthens reasoning — a recurring weak area." },
  { course: courses[3], reason: "Quant shortcuts to lift your DI speed." },
  { course: courses[4], reason: "Popular with students on your track." },
]
