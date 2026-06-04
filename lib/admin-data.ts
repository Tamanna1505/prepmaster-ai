import type { LucideIcon } from "lucide-react"
import { BookOpen, FileText, ListChecks, Newspaper, Sigma, Users } from "lucide-react"

/* Phase 4/8 — sample/static admin data only. No DB, no real auth. */

export type AdminSummaryStat = {
  label: string
  value: string
  delta: string
  trend: "up" | "down" | "flat"
  icon: LucideIcon
  tone?: "default" | "teal"
}

export const adminSummary: AdminSummaryStat[] = [
  { label: "Total students", value: "12,840", delta: "+18% WoW", trend: "up", icon: Users },
  { label: "Total courses", value: "26", delta: "+3 this month", trend: "up", icon: BookOpen },
  { label: "Total questions", value: "9,412", delta: "+214 this week", trend: "up", icon: Sigma },
  { label: "Total mock tests", value: "148", delta: "+6 this month", trend: "up", icon: ListChecks },
  { label: "Test attempts", value: "84,210", delta: "+9% WoW", trend: "up", icon: FileText, tone: "teal" },
  { label: "Published blogs", value: "38", delta: "+4 this month", trend: "up", icon: Newspaper, tone: "teal" },
]

/* ── Users ─────────────────────────────────────────────────────────────────── */

export type AdminUser = {
  id: string
  name: string
  email: string
  role: "STUDENT" | "ADMIN"
  targetExam: string
  enrolledCourses: number
  testsAttempted: number
  avgScorePct: number
  joined: string
  lastActive: string
  status: "Active" | "Inactive"
}

export const adminUsers: AdminUser[] = [
  { id: "u-1042", name: "Aanya Reddy", email: "aanya@example.com", role: "STUDENT", targetExam: "CAT 2026", enrolledCourses: 3, testsAttempted: 18, avgScorePct: 74, joined: "2026-06-02", lastActive: "2026-06-04", status: "Active" },
  { id: "u-1041", name: "Vikram Iyer", email: "vikram@example.com", role: "STUDENT", targetExam: "JEE 2027", enrolledCourses: 2, testsAttempted: 11, avgScorePct: 61, joined: "2026-06-02", lastActive: "2026-06-04", status: "Active" },
  { id: "u-1040", name: "Sara Khan", email: "sara@example.com", role: "STUDENT", targetExam: "NEET 2026", enrolledCourses: 4, testsAttempted: 22, avgScorePct: 68, joined: "2026-06-01", lastActive: "2026-06-03", status: "Active" },
  { id: "u-1039", name: "Priya Sharma", email: "priya@prepmaster.ai", role: "ADMIN", targetExam: "—", enrolledCourses: 0, testsAttempted: 0, avgScorePct: 0, joined: "2026-04-15", lastActive: "2026-06-04", status: "Active" },
  { id: "u-1038", name: "Pratik Joshi", email: "pratik@example.com", role: "STUDENT", targetExam: "SSC CGL", enrolledCourses: 1, testsAttempted: 4, avgScorePct: 52, joined: "2026-05-31", lastActive: "2026-05-31", status: "Inactive" },
  { id: "u-1037", name: "Meera Pillai", email: "meera@example.com", role: "STUDENT", targetExam: "UPSC 2027", enrolledCourses: 5, testsAttempted: 31, avgScorePct: 71, joined: "2026-05-28", lastActive: "2026-06-04", status: "Active" },
  { id: "u-1036", name: "Dr. Anand R.", email: "anand@prepmaster.ai", role: "ADMIN", targetExam: "—", enrolledCourses: 0, testsAttempted: 0, avgScorePct: 0, joined: "2026-03-01", lastActive: "2026-06-03", status: "Active" },
  { id: "u-1035", name: "Karan Joshi", email: "karan@example.com", role: "STUDENT", targetExam: "CUET 2026", enrolledCourses: 2, testsAttempted: 9, avgScorePct: 66, joined: "2026-05-24", lastActive: "2026-06-02", status: "Active" },
  { id: "u-1034", name: "Ishita Bose", email: "ishita@example.com", role: "STUDENT", targetExam: "CAT 2026", enrolledCourses: 3, testsAttempted: 15, avgScorePct: 79, joined: "2026-05-20", lastActive: "2026-06-04", status: "Active" },
]

export function getAdminUser(id: string): AdminUser | undefined {
  return adminUsers.find((u) => u.id === id)
}

/* Backwards-compatible alias used by the overview's recent-users table. */
export const recentUsers = adminUsers

/* ── Recent attempts ───────────────────────────────────────────────────────── */

export type AdminAttempt = {
  id: string
  student: string
  test: string
  examTag: string
  scorePct: number
  date: string
}

export const recentAttempts: AdminAttempt[] = [
  { id: "a-9001", student: "Aanya Reddy", test: "JEE Main — Full Mock #01", examTag: "JEE", scorePct: 74, date: "2026-06-04" },
  { id: "a-9000", student: "Vikram Iyer", test: "CAT Quant — Full Mock #07", examTag: "CAT", scorePct: 61, date: "2026-06-04" },
  { id: "a-8999", student: "Sara Khan", test: "NEET — Grand Test #2", examTag: "NEET", scorePct: 68, date: "2026-06-03" },
  { id: "a-8998", student: "Pratik Joshi", test: "SSC CGL — Tier-1 Mock #3", examTag: "SSC", scorePct: 52, date: "2026-06-03" },
  { id: "a-8997", student: "Meera Pillai", test: "UPSC Prelims — Mock #5", examTag: "UPSC", scorePct: 71, date: "2026-06-02" },
]

/* ── Question bank ─────────────────────────────────────────────────────────── */

export type AdminQuestionType = "MCQ single" | "MCQ multi" | "Numeric"

export type AdminQuestion = {
  id: string
  stem: string
  passage?: string
  type: AdminQuestionType
  options: string[] // A–D
  correctAnswers: string[] // option letters for MCQ; e.g. ["A"]
  numericAnswer?: string
  explanation: string
  section: string
  topic: string
  difficulty: "Easy" | "Medium" | "Hard"
  marks: number
  negativeMarks: number
}

export const adminQuestions: AdminQuestion[] = [
  {
    id: "Q-3201",
    stem: "A point charge Q is placed at the centre of a cube. The electric flux through one face is:",
    type: "MCQ single",
    options: ["Q / 6ε₀", "Q / ε₀", "Q / 8ε₀", "Q / 2ε₀"],
    correctAnswers: ["A"],
    explanation: "Total flux is Q/ε₀ (Gauss's law); by symmetry each of the 6 faces gets Q/6ε₀.",
    section: "Physics",
    topic: "Electrostatics",
    difficulty: "Medium",
    marks: 4,
    negativeMarks: -1,
  },
  {
    id: "Q-3200",
    stem: "Which of the following are arithmetic progressions?",
    type: "MCQ multi",
    options: ["2, 4, 6, 8", "1, 2, 4, 8", "5, 10, 15, 20", "3, 6, 9, 12"],
    correctAnswers: ["A", "C", "D"],
    explanation: "An AP has a constant common difference. 1, 2, 4, 8 is geometric, not arithmetic.",
    section: "Quantitative Aptitude",
    topic: "Sequences",
    difficulty: "Easy",
    marks: 3,
    negativeMarks: -1,
  },
  {
    id: "Q-3199",
    stem: "Find the value of x for which the determinant of the given 2×2 matrix vanishes.",
    type: "Numeric",
    options: [],
    correctAnswers: [],
    numericAnswer: "3",
    explanation: "Set the determinant ad − bc = 0 and solve for x, giving x = 3.",
    section: "Quantitative Aptitude",
    topic: "Matrices",
    difficulty: "Hard",
    marks: 4,
    negativeMarks: 0,
  },
  {
    id: "Q-3198",
    stem: "The Preamble to the Indian Constitution was amended by which amendment?",
    type: "MCQ single",
    options: ["42nd Amendment", "44th Amendment", "1st Amendment", "73rd Amendment"],
    correctAnswers: ["A"],
    explanation: "The 42nd Amendment (1976) added 'Socialist', 'Secular' and 'Integrity'.",
    section: "General Studies",
    topic: "Polity",
    difficulty: "Medium",
    marks: 2,
    negativeMarks: -0.66,
  },
  {
    id: "Q-3197",
    stem: "Compute the time complexity of T(n) = 2T(n/2) + n.",
    type: "MCQ single",
    options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
    correctAnswers: ["A"],
    explanation: "By the Master Theorem (case 2), T(n) = O(n log n).",
    section: "Computer Science",
    topic: "Algorithms",
    difficulty: "Hard",
    marks: 4,
    negativeMarks: -1,
  },
  {
    id: "Q-3196",
    stem: "A train travels 60 km at 40 km/h and returns at 60 km/h. What is the average speed (km/h)?",
    type: "Numeric",
    options: [],
    correctAnswers: [],
    numericAnswer: "48",
    explanation: "Average speed = 2ab/(a+b) = 2·40·60/100 = 48 km/h.",
    section: "Quantitative Aptitude",
    topic: "Arithmetic",
    difficulty: "Easy",
    marks: 3,
    negativeMarks: -1,
  },
  {
    id: "Q-3195",
    stem: "Read the passage and choose the word most nearly OPPOSITE in meaning to 'augment'.",
    passage:
      "The committee proposed several measures to augment the institution's research output over the coming decade, though critics argued the funding fell short.",
    type: "MCQ single",
    options: ["Diminish", "Expand", "Enhance", "Bolster"],
    correctAnswers: ["A"],
    explanation: "Augment means to increase; its antonym is 'diminish'.",
    section: "Verbal Ability",
    topic: "Vocabulary",
    difficulty: "Medium",
    marks: 3,
    negativeMarks: -1,
  },
  {
    id: "Q-3194",
    stem: "Which of the following are noble gases?",
    type: "MCQ multi",
    options: ["Helium", "Nitrogen", "Argon", "Neon"],
    correctAnswers: ["A", "C", "D"],
    explanation: "Helium, Argon and Neon are Group-18 noble gases; nitrogen is not.",
    section: "Chemistry",
    topic: "Periodic Table",
    difficulty: "Easy",
    marks: 4,
    negativeMarks: -1,
  },
]

export function getAdminQuestion(id: string): AdminQuestion | undefined {
  return adminQuestions.find((q) => q.id === id)
}

export const QUESTION_SECTIONS = [
  "Quantitative Aptitude",
  "Verbal Ability",
  "Physics",
  "Chemistry",
  "General Studies",
  "Computer Science",
]

/* ── Mock tests ────────────────────────────────────────────────────────────── */

export type AdminTestRow = {
  id: string
  title: string
  description: string
  examTag: string
  testType: "Full-length" | "Sectional" | "Topic drill"
  durationMinutes: number
  questions: number
  totalMarks: number
  difficulty: "Easy" | "Medium" | "Hard"
  status: "Published" | "Draft"
}

export const adminTests: AdminTestRow[] = [
  { id: "cat-quant-full-01", title: "CAT Quant — Full Mock #01", description: "A full-length quantitative aptitude mock with DI & LR.", examTag: "CAT", testType: "Full-length", durationMinutes: 40, questions: 8, totalMarks: 24, difficulty: "Hard", status: "Published" },
  { id: "jee-main-full-01", title: "JEE Main — Full Mock #01", description: "Physics, Chemistry and Mathematics, exam-pattern.", examTag: "JEE", testType: "Full-length", durationMinutes: 60, questions: 9, totalMarks: 36, difficulty: "Hard", status: "Published" },
  { id: "aptitude-speed-drill", title: "Aptitude — Speed Drill #09", description: "A short mixed-aptitude speed drill.", examTag: "Aptitude", testType: "Topic drill", durationMinutes: 20, questions: 5, totalMarks: 5, difficulty: "Easy", status: "Published" },
  { id: "cuet-general-01", title: "CUET — General Test #02", description: "General test plus reasoning, CUET pattern.", examTag: "CUET", testType: "Full-length", durationMinutes: 45, questions: 7, totalMarks: 35, difficulty: "Medium", status: "Draft" },
  { id: "mba-reasoning-sectional", title: "MBA Entrance — Reasoning #05", description: "A sectional logical-reasoning test.", examTag: "MBA Entrance", testType: "Sectional", durationMinutes: 30, questions: 5, totalMarks: 10, difficulty: "Medium", status: "Draft" },
]

export function getAdminTest(id: string): AdminTestRow | undefined {
  return adminTests.find((t) => t.id === id)
}

/* ── Blog ──────────────────────────────────────────────────────────────────── */

export type AdminBlogRow = {
  id: string
  slug: string
  title: string
  category: string
  author: string
  excerpt: string
  content: string
  featuredImage: string
  seoTitle: string
  seoDescription: string
  publishedAt: string
  status: "Published" | "Draft"
  featured: boolean
}

export const adminBlog: AdminBlogRow[] = [
  {
    id: "b-1",
    slug: "cat-strategy-final-30-days",
    title: "CAT: a strategy for the final 30 days",
    category: "Strategy",
    author: "Priya Sharma",
    excerpt: "What to revise, what to ignore, and how to taper your mock-test load before the exam.",
    content: "## The final stretch\n\nThe last 30 days are about consolidation, not new material...",
    featuredImage: "https://images.example.com/cat-30-days.jpg",
    seoTitle: "CAT Final 30 Days Strategy — PrepMaster AI",
    seoDescription: "A practical 30-day plan to peak for the CAT exam.",
    publishedAt: "2026-05-12",
    status: "Published",
    featured: true,
  },
  {
    id: "b-2",
    slug: "biology-diagram-method",
    title: "The biology diagram method that adds 30 marks",
    category: "Study Hacks",
    author: "Dr. Anand R.",
    excerpt: "Why hand-drawing diagrams during revision sticks better than re-reading notes.",
    content: "## Draw to remember\n\nActive recall beats passive review...",
    featuredImage: "https://images.example.com/bio-diagrams.jpg",
    seoTitle: "Biology Diagram Method — PrepMaster AI",
    seoDescription: "A revision technique that reliably adds marks in biology.",
    publishedAt: "2026-05-04",
    status: "Published",
    featured: false,
  },
  {
    id: "b-3",
    slug: "current-affairs-without-burnout",
    title: "How to track current affairs without burning out",
    category: "Strategy",
    author: "Rohit Menon",
    excerpt: "A weekly system that converts the newspaper into syllabus-mapped notes in 40 minutes a day.",
    content: "## A repeatable weekly loop\n\nConsistency beats intensity...",
    featuredImage: "https://images.example.com/current-affairs.jpg",
    seoTitle: "Track Current Affairs Without Burnout — PrepMaster AI",
    seoDescription: "A sustainable current-affairs system for competitive exams.",
    publishedAt: "2026-04-22",
    status: "Published",
    featured: false,
  },
  {
    id: "b-4",
    slug: "ai-feedback-changed-my-prep",
    title: "How AI feedback on mock tests changed my prep",
    category: "Success Story",
    author: "Aditi Kulkarni",
    excerpt: "A reader story: from plateauing at 60% to a consistent 78% in eight weeks.",
    content: "## From plateau to progress\n\nThe turning point was specificity...",
    featuredImage: "https://images.example.com/ai-feedback.jpg",
    seoTitle: "AI Feedback Success Story — PrepMaster AI",
    seoDescription: "How targeted AI feedback lifted one student's mock scores.",
    publishedAt: "",
    status: "Draft",
    featured: false,
  },
  {
    id: "b-5",
    slug: "negative-marking-mental-model",
    title: "A mental model for negative marking",
    category: "Strategy",
    author: "Karan Joshi",
    excerpt: "When to attempt and when to skip — a simple expected-value rule you can apply mid-test.",
    content: "## Expected value, fast\n\nTreat each question as a small bet...",
    featuredImage: "",
    seoTitle: "Negative Marking Mental Model — PrepMaster AI",
    seoDescription: "A quick expected-value rule for negative marking decisions.",
    publishedAt: "",
    status: "Draft",
    featured: false,
  },
]

export function getAdminBlog(id: string): AdminBlogRow | undefined {
  return adminBlog.find((p) => p.id === id)
}

export const BLOG_CATEGORIES = ["Strategy", "Study Hacks", "Success Story", "Resources"]

/* ── Content health (overview) ─────────────────────────────────────────────── */

export type HealthRow = {
  label: string
  published: number
  draft: number
  note: string
}

export const contentHealth: HealthRow[] = [
  { label: "Courses", published: 24, draft: 2, note: "2 drafts awaiting review" },
  { label: "Mock tests", published: 3, draft: 2, note: "2 drafts not yet published" },
  { label: "Blog posts", published: 3, draft: 2, note: "2 drafts in progress" },
  { label: "Question bank", published: 9412, draft: 184, note: "184 flagged for review" },
]
