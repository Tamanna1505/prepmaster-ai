import type { LucideIcon } from "lucide-react"
import {
  Atom,
  Beaker,
  BookOpen,
  BrainCircuit,
  Calculator,
  FileText,
  Flame,
  LineChart,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from "lucide-react"

export type Course = {
  slug: string
  title: string
  summary: string
  examTag: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  lessonCount: number
  durationHours: number
  studentsEnrolled: number
  rating: number
  topics: string[]
  icon: LucideIcon
}

export const courses: Course[] = [
  {
    slug: "jee-physics-complete",
    title: "JEE Physics — Complete Course",
    summary:
      "Mechanics to modern physics with concept videos, worked examples, and topic-wise tests.",
    examTag: "JEE",
    difficulty: "Advanced",
    lessonCount: 86,
    durationHours: 64,
    studentsEnrolled: 4_320,
    rating: 4.8,
    topics: ["Mechanics", "Thermodynamics", "Electromagnetism", "Optics", "Modern Physics"],
    icon: Atom,
  },
  {
    slug: "neet-biology-mastery",
    title: "NEET Biology — Mastery Track",
    summary:
      "Botany + zoology with NCERT-aligned notes, diagrams, and weekly mock tests.",
    examTag: "NEET",
    difficulty: "Intermediate",
    lessonCount: 102,
    durationHours: 78,
    studentsEnrolled: 6_180,
    rating: 4.9,
    topics: ["Cell Biology", "Genetics", "Human Physiology", "Ecology"],
    icon: Beaker,
  },
  {
    slug: "upsc-prelims-foundation",
    title: "UPSC Prelims — Foundation",
    summary:
      "Polity, history, geography, economy — current-affairs linked to syllabus topics.",
    examTag: "UPSC",
    difficulty: "Intermediate",
    lessonCount: 140,
    durationHours: 110,
    studentsEnrolled: 9_540,
    rating: 4.7,
    topics: ["Polity", "Modern History", "Geography", "Economy", "Environment"],
    icon: BookOpen,
  },
  {
    slug: "ssc-cgl-quant-shortcuts",
    title: "SSC CGL — Quant Shortcuts",
    summary: "High-yield arithmetic and DI tricks. Built for time-pressed test-takers.",
    examTag: "SSC",
    difficulty: "Beginner",
    lessonCount: 48,
    durationHours: 32,
    studentsEnrolled: 3_120,
    rating: 4.6,
    topics: ["Arithmetic", "Algebra", "Geometry", "Data Interpretation"],
    icon: Calculator,
  },
  {
    slug: "gate-cs-algorithms",
    title: "GATE CS — Algorithms & DS",
    summary: "Time-complexity intuition first, code second. With curated previous-year drills.",
    examTag: "GATE",
    difficulty: "Advanced",
    lessonCount: 64,
    durationHours: 56,
    studentsEnrolled: 1_890,
    rating: 4.8,
    topics: ["Sorting", "Graphs", "DP", "Greedy"],
    icon: BrainCircuit,
  },
  {
    slug: "banking-reasoning-puzzles",
    title: "Banking — Reasoning Puzzles",
    summary: "Seating, blood relations, syllogisms — every IBPS/SBI puzzle pattern drilled.",
    examTag: "Banking",
    difficulty: "Intermediate",
    lessonCount: 36,
    durationHours: 28,
    studentsEnrolled: 2_780,
    rating: 4.5,
    topics: ["Seating Arrangement", "Puzzles", "Syllogism", "Coding-Decoding"],
    icon: Target,
  },
]

export type MockTest = {
  slug: string
  title: string
  examTag: string
  durationMinutes: number
  questionCount: number
  difficulty: "Easy" | "Medium" | "Hard"
  attempts: number
  averageScorePct: number
}

export const mockTests: MockTest[] = [
  {
    slug: "jee-main-full-mock-01",
    title: "JEE Main — Full Mock #01",
    examTag: "JEE",
    durationMinutes: 180,
    questionCount: 75,
    difficulty: "Hard",
    attempts: 3_412,
    averageScorePct: 62,
  },
  {
    slug: "neet-grand-test-2",
    title: "NEET — Grand Test #2",
    examTag: "NEET",
    durationMinutes: 200,
    questionCount: 180,
    difficulty: "Hard",
    attempts: 5_207,
    averageScorePct: 58,
  },
  {
    slug: "upsc-prelims-mock-5",
    title: "UPSC Prelims — Mock #5 (GS)",
    examTag: "UPSC",
    durationMinutes: 120,
    questionCount: 100,
    difficulty: "Hard",
    attempts: 2_810,
    averageScorePct: 48,
  },
  {
    slug: "ssc-cgl-tier1-mock-3",
    title: "SSC CGL — Tier-1 Mock #3",
    examTag: "SSC",
    durationMinutes: 60,
    questionCount: 100,
    difficulty: "Medium",
    attempts: 4_120,
    averageScorePct: 71,
  },
  {
    slug: "gate-cs-mock-2",
    title: "GATE CS — Mock #2",
    examTag: "GATE",
    durationMinutes: 180,
    questionCount: 65,
    difficulty: "Hard",
    attempts: 940,
    averageScorePct: 54,
  },
  {
    slug: "ibps-po-prelims-mock-7",
    title: "IBPS PO — Prelims Mock #7",
    examTag: "Banking",
    durationMinutes: 60,
    questionCount: 100,
    difficulty: "Medium",
    attempts: 2_330,
    averageScorePct: 65,
  },
]

export type BlogPost = {
  slug: string
  title: string
  summary: string
  category: string
  tags: string[]
  author: string
  publishedAt: string
  readMinutes: number
  coverGradient: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: "jee-main-strategy-final-30-days",
    title: "JEE Main: a strategy for the final 30 days",
    summary: "What to revise, what to ignore, and how to taper your mock-test load.",
    category: "Strategy",
    tags: ["JEE", "Revision", "Time Management"],
    author: "Priya Sharma",
    publishedAt: "2026-05-12",
    readMinutes: 7,
    coverGradient: "from-indigo-500 to-purple-600",
  },
  {
    slug: "neet-biology-diagram-method",
    title: "The biology diagram method that adds 30 marks",
    summary: "Why hand-drawing diagrams during revision sticks better than re-reading notes.",
    category: "Study Hacks",
    tags: ["NEET", "Biology", "Memory"],
    author: "Dr. Anand R.",
    publishedAt: "2026-05-04",
    readMinutes: 6,
    coverGradient: "from-emerald-500 to-teal-600",
  },
  {
    slug: "upsc-current-affairs-without-burnout",
    title: "How to track UPSC current affairs without burning out",
    summary: "A weekly system that converts the newspaper into syllabus-mapped notes in 40 minutes a day.",
    category: "Strategy",
    tags: ["UPSC", "Current Affairs"],
    author: "Rohit Menon",
    publishedAt: "2026-04-22",
    readMinutes: 9,
    coverGradient: "from-amber-500 to-orange-600",
  },
  {
    slug: "ai-feedback-changed-my-prep",
    title: "How AI feedback on mock tests changed my prep",
    summary: "A reader story: from plateauing at 60% to a consistent 78% in 8 weeks.",
    category: "Success Story",
    tags: ["AI", "Mock Tests"],
    author: "Aditi Kulkarni",
    publishedAt: "2026-04-09",
    readMinutes: 5,
    coverGradient: "from-rose-500 to-pink-600",
  },
  {
    slug: "negative-marking-mental-model",
    title: "A mental model for negative marking",
    summary: "When to attempt, when to skip — a simple expected-value rule you can apply mid-test.",
    category: "Strategy",
    tags: ["Mock Tests", "Decision Making"],
    author: "Karan Joshi",
    publishedAt: "2026-03-28",
    readMinutes: 8,
    coverGradient: "from-sky-500 to-cyan-600",
  },
  {
    slug: "gate-resource-stack-2026",
    title: "The GATE CS resource stack that actually worked in 2026",
    summary: "Books, lectures, and the exact order I used them in over 11 months.",
    category: "Resources",
    tags: ["GATE", "CS"],
    author: "Vivek Iyer",
    publishedAt: "2026-03-12",
    readMinutes: 10,
    coverGradient: "from-violet-500 to-fuchsia-600",
  },
]

export type DashboardStat = {
  label: string
  value: string
  delta: string
  trend: "up" | "down" | "flat"
  icon: LucideIcon
}

export const dashboardStats: DashboardStat[] = [
  { label: "Tests this week", value: "5", delta: "+2 vs last week", trend: "up", icon: FileText },
  { label: "Average accuracy", value: "72%", delta: "+4% vs last 4", trend: "up", icon: Target },
  { label: "Study streak", value: "12 days", delta: "Best: 18 days", trend: "flat", icon: Flame },
  { label: "Topic mastery", value: "68%", delta: "+8% this month", trend: "up", icon: LineChart },
]

export type AdminStat = DashboardStat

export const adminStats: AdminStat[] = [
  { label: "Active students (7d)", value: "1,284", delta: "+18% WoW", trend: "up", icon: Sparkles },
  { label: "Tests attempted (7d)", value: "3,940", delta: "+9% WoW", trend: "up", icon: Trophy },
  { label: "Courses published", value: "26", delta: "+3 this month", trend: "up", icon: BookOpen },
  { label: "New signups (24h)", value: "142", delta: "+22 vs avg", trend: "up", icon: Zap },
]

export type Testimonial = {
  name: string
  role: string
  quote: string
}

export const testimonials: Testimonial[] = [
  {
    name: "Aditi K.",
    role: "JEE Main, AIR 1,847",
    quote:
      "The AI feedback after each mock told me exactly which topics were costing me marks. I stopped guessing what to revise.",
  },
  {
    name: "Rohan S.",
    role: "NEET 2026 aspirant",
    quote:
      "The navigation grid and timer feel exactly like the real exam. No more last-week-of-exam UI shocks.",
  },
  {
    name: "Meera P.",
    role: "UPSC Prelims qualified",
    quote:
      "Topic-wise analytics surfaced gaps I didn't know I had. Five weeks of targeted prep saved me a year.",
  },
]

export type FaqItem = { question: string; answer: string }

export const faqs: FaqItem[] = [
  {
    question: "Is PrepMaster AI free to use?",
    answer:
      "The MVP launches free. Paid tiers will be introduced later — anyone using the platform before launch keeps free access to the courses and tests available today.",
  },
  {
    question: "Which exams are covered?",
    answer:
      "JEE, NEET, UPSC, SSC, GATE, and banking exams (IBPS, SBI). The catalog expands monthly based on student requests.",
  },
  {
    question: "How does the AI feedback work?",
    answer:
      "After you submit a mock test, we analyse your topic-wise performance, time spent, and accuracy. The AI produces a short, actionable plan: what to revise next, which lessons to revisit, and which test to take after that.",
  },
  {
    question: "Will the mock tests match the real exam UI?",
    answer:
      "Yes. The attempt screen includes a global timer, navigation grid, mark-for-review, and auto-submit on expiry — the same affordances as official exam portals.",
  },
  {
    question: "Can I use this on mobile?",
    answer:
      "Yes, the platform is responsive. We recommend a tablet or desktop for full-length mock tests to avoid attention loss on small screens.",
  },
]

export type WhyItem = {
  title: string
  description: string
  icon: LucideIcon
}

export const whyChoose: WhyItem[] = [
  {
    title: "AI feedback after every attempt",
    description:
      "Specific, named topics to revise. Not 'work harder' — actually a what-to-do-tomorrow list.",
    icon: Sparkles,
  },
  {
    title: "Exam-grade mock UI",
    description:
      "Timer, navigation grid, mark-for-review, auto-submit. The full feel of the real exam portal.",
    icon: Target,
  },
  {
    title: "Topic-wise analytics",
    description:
      "See accuracy per topic and time per question. Find the leaks before they cost you marks.",
    icon: LineChart,
  },
  {
    title: "Curated lessons, not infinite content",
    description:
      "Every lesson earned its place. We cut what doesn't move scores; we add what does.",
    icon: BookOpen,
  },
]

/* ──────────────────────────────────────────────────────────────────────────
   Phase 5 — Course content (Course → Module → Lesson). Sample/static only.
   Generated deterministically from each course's topics so every course has a
   consistent module/lesson tree without hand-authoring all of them. Mirrors the
   Module / Lesson models in DATABASE_MODELS.md (LessonType TEXT|VIDEO, duration,
   isFreePreview).
   ────────────────────────────────────────────────────────────────────────── */

export type CourseLessonKind = "video" | "reading"

export type CourseLesson = {
  id: string
  title: string
  kind: CourseLessonKind
  durationMinutes: number
  hasResource: boolean
  isFreePreview: boolean
}

export type CourseModule = {
  id: string
  title: string
  summary: string
  lessons: CourseLesson[]
}

export type CourseContent = {
  slug: string
  modules: CourseModule[]
  outcomes: string[]
}

const LESSON_BEATS = [
  "Core concepts",
  "Worked examples",
  "Common pitfalls",
  "Speed techniques",
  "Previous-year drills",
]

const LESSONS_PER_MODULE = [5, 4, 4, 3]

function buildModule(slug: string, examTag: string, topic: string, mi: number): CourseModule {
  const count = LESSONS_PER_MODULE[mi % LESSONS_PER_MODULE.length]
  const lessons: CourseLesson[] = Array.from({ length: count }, (_, li) => ({
    id: `${slug}__m${mi + 1}l${li + 1}`,
    title: `${topic} — ${LESSON_BEATS[li % LESSON_BEATS.length]}`,
    kind: li % 3 === 1 ? "reading" : "video",
    durationMinutes: 8 + ((mi * 5 + li * 4) % 15),
    hasResource: li % 2 === 0,
    isFreePreview: mi === 0 && li === 0,
  }))
  const totalMin = lessons.reduce((s, l) => s + l.durationMinutes, 0)
  void examTag
  return {
    id: `${slug}__m${mi + 1}`,
    title: `Module ${mi + 1} · ${topic}`,
    summary: `${count} lessons · ${totalMin} min`,
    lessons,
  }
}

function generateCourseContent(course: Course): CourseContent {
  const topics = course.topics.length ? course.topics : ["Foundations"]
  const moduleTopics = topics.slice(0, 4)
  while (moduleTopics.length < 3) moduleTopics.push(`${topics[0]} — advanced`)
  const modules = moduleTopics.map((t, mi) => buildModule(course.slug, course.examTag, t, mi))
  const outcomes = [
    `Build exam-ready intuition for ${topics[0].toLowerCase()}`,
    `Solve ${course.examTag} problems under real time pressure`,
    "Recognise the question patterns that repeat every year",
    "Avoid the silly mistakes that cost the most marks",
    "Track your weak topics and close them with targeted practice",
    "Finish with a revision plan you can actually follow",
  ]
  return { slug: course.slug, modules, outcomes }
}

export const courseContentBySlug: Record<string, CourseContent> = Object.fromEntries(
  courses.map((c) => [c.slug, generateCourseContent(c)])
)

export function getCourseContent(slug: string): CourseContent | undefined {
  return courseContentBySlug[slug]
}

export type FlatLesson = {
  lesson: CourseLesson
  module: CourseModule
  moduleIndex: number
  lessonIndex: number
  globalIndex: number
}

export function flattenLessons(content: CourseContent): FlatLesson[] {
  const flat: FlatLesson[] = []
  content.modules.forEach((module, moduleIndex) => {
    module.lessons.forEach((lesson, lessonIndex) => {
      flat.push({ lesson, module, moduleIndex, lessonIndex, globalIndex: flat.length })
    })
  })
  return flat
}

export function courseTotals(content: CourseContent) {
  const flat = flattenLessons(content)
  const totalMinutes = flat.reduce((s, f) => s + f.lesson.durationMinutes, 0)
  return { totalLessons: flat.length, totalMinutes }
}

export type LessonLocation = {
  course: Course
  content: CourseContent
  flat: FlatLesson
  prev?: CourseLesson
  next?: CourseLesson
}

const lessonLookup: Map<string, { slug: string; globalIndex: number }> = (() => {
  const map = new Map<string, { slug: string; globalIndex: number }>()
  for (const c of courses) {
    flattenLessons(courseContentBySlug[c.slug]).forEach((f) =>
      map.set(f.lesson.id, { slug: c.slug, globalIndex: f.globalIndex })
    )
  }
  return map
})()

export function getLessonLocation(lessonId: string): LessonLocation | undefined {
  const hit = lessonLookup.get(lessonId)
  if (!hit) return undefined
  const course = courses.find((c) => c.slug === hit.slug)
  if (!course) return undefined
  const content = courseContentBySlug[hit.slug]
  const flat = flattenLessons(content)
  const idx = hit.globalIndex
  return {
    course,
    content,
    flat: flat[idx],
    prev: flat[idx - 1]?.lesson,
    next: flat[idx + 1]?.lesson,
  }
}
