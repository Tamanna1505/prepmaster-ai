/**
 * PrepMaster AI — database seed (Phase 10).
 *
 * Run with:  npx prisma db seed   (or: npx tsx prisma/seed.ts)
 * Requires DATABASE_URL to be set. Safe to re-run — everything is idempotent.
 *
 * Demo credentials (password is the same for both): password123
 *   Admin:   admin@prepmaster.ai
 *   Student: student@prepmaster.ai
 */
import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import bcrypt from "bcryptjs"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

const DEMO_PASSWORD = "password123"

type SeedLesson = {
  title: string
  type: "TEXT" | "VIDEO"
  body: string
  durationMinutes: number
  isFreePreview?: boolean
}
type SeedModule = { title: string; summary: string; lessons: SeedLesson[] }
type SeedCourse = {
  slug: string
  title: string
  summary: string
  description: string
  examTag: string
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
  price: number
  modules: SeedModule[]
}

const COURSES: SeedCourse[] = [
  {
    slug: "cat-quant-complete",
    title: "CAT Quantitative Aptitude — Complete Course",
    summary: "Arithmetic to modern maths with worked examples and topic-wise tests.",
    description:
      "A complete quantitative aptitude track for the CAT exam, built around the syllabus with concept videos, worked examples, and topic-wise practice.",
    examTag: "CAT",
    level: "INTERMEDIATE",
    price: 0,
    modules: [
      {
        title: "Module 1 · Arithmetic",
        summary: "The high-yield arithmetic foundation.",
        lessons: [
          { title: "Percentages — core concepts", type: "VIDEO", body: "Foundations of percentages.", durationMinutes: 14, isFreePreview: true },
          { title: "Time, Speed & Distance", type: "VIDEO", body: "TSD with worked examples.", durationMinutes: 18 },
          { title: "Time & Work", type: "TEXT", body: "Work-rate problems and shortcuts.", durationMinutes: 12 },
        ],
      },
      {
        title: "Module 2 · Algebra",
        summary: "Equations, inequalities, and functions.",
        lessons: [
          { title: "Linear & quadratic equations", type: "VIDEO", body: "Solving equations under time pressure.", durationMinutes: 16 },
          { title: "Inequalities", type: "TEXT", body: "Common inequality patterns.", durationMinutes: 11 },
          { title: "Functions & graphs", type: "VIDEO", body: "Reading and using graphs.", durationMinutes: 15 },
        ],
      },
    ],
  },
  {
    slug: "cuet-general-crash",
    title: "CUET General Test — Crash Course",
    summary: "General knowledge and reasoning, CUET pattern, in a focused crash format.",
    description:
      "A fast-paced crash course covering the CUET general test: current affairs, general knowledge, and reasoning, with exam-pattern practice.",
    examTag: "CUET",
    level: "BEGINNER",
    price: 0,
    modules: [
      {
        title: "Module 1 · General Knowledge",
        summary: "High-frequency GK and current affairs.",
        lessons: [
          { title: "Indian polity essentials", type: "VIDEO", body: "Constitution and polity basics.", durationMinutes: 13, isFreePreview: true },
          { title: "Current affairs system", type: "TEXT", body: "A weekly current-affairs routine.", durationMinutes: 10 },
        ],
      },
      {
        title: "Module 2 · Reasoning",
        summary: "Core reasoning patterns.",
        lessons: [
          { title: "Series & analogies", type: "VIDEO", body: "Number and letter series.", durationMinutes: 12 },
          { title: "Arrangements", type: "VIDEO", body: "Seating and linear arrangements.", durationMinutes: 14 },
        ],
      },
    ],
  },
  {
    slug: "logical-reasoning-mastery",
    title: "Logical Reasoning — Mastery Track",
    summary: "Every major reasoning pattern drilled for MBA-entrance and aptitude exams.",
    description:
      "An advanced logical-reasoning track covering arrangements, puzzles, syllogisms, and data-interpretation crossovers for MBA-entrance exams.",
    examTag: "MBA Entrance",
    level: "ADVANCED",
    price: 0,
    modules: [
      {
        title: "Module 1 · Arrangements & Puzzles",
        summary: "Set-based reasoning under time.",
        lessons: [
          { title: "Linear & circular arrangements", type: "VIDEO", body: "Setting up arrangement grids.", durationMinutes: 17, isFreePreview: true },
          { title: "Complex puzzles", type: "TEXT", body: "Multi-variable puzzles.", durationMinutes: 15 },
        ],
      },
      {
        title: "Module 2 · Logic & DI",
        summary: "Syllogisms and DI crossovers.",
        lessons: [
          { title: "Syllogisms", type: "VIDEO", body: "Venn-diagram method.", durationMinutes: 13 },
          { title: "DI-reasoning hybrids", type: "VIDEO", body: "Reasoning on data sets.", durationMinutes: 16 },
        ],
      },
    ],
  },
]

type SeedOption = { id: string; text: string; isCorrect: boolean }
type SeedQuestion = {
  id: string
  type: "SINGLE_CORRECT" | "NUMERIC"
  stem: string
  options?: SeedOption[]
  correctNumeric?: number
  tolerance?: number
  explanation: string
  section: string
  topic: string
  difficulty: "EASY" | "MEDIUM" | "HARD"
  positiveMarks: number
  negativeMarks: number
}

const opt = (texts: [string, string, string, string], correctIndex: number): SeedOption[] =>
  texts.map((text, i) => ({ id: "abcd"[i], text, isCorrect: i === correctIndex }))

const QUESTIONS: SeedQuestion[] = [
  {
    id: "seed-q-1",
    type: "SINGLE_CORRECT",
    stem: "If 35% of a number is 84, what is the number?",
    options: opt(["240", "210", "260", "294"], 0),
    explanation: "Number = 84 / 0.35 = 240.",
    section: "Quantitative Aptitude",
    topic: "Arithmetic",
    difficulty: "EASY",
    positiveMarks: 3,
    negativeMarks: -1,
  },
  {
    id: "seed-q-2",
    type: "NUMERIC",
    stem: "A train covers 60 km at 40 km/h and returns at 60 km/h. Average speed (km/h)?",
    correctNumeric: 48,
    tolerance: 0.5,
    explanation: "Average speed = 2ab/(a+b) = 2·40·60/100 = 48 km/h.",
    section: "Quantitative Aptitude",
    topic: "Arithmetic",
    difficulty: "MEDIUM",
    positiveMarks: 3,
    negativeMarks: 0,
  },
  {
    id: "seed-q-3",
    type: "SINGLE_CORRECT",
    stem: "If x + 1/x = 3, then x² + 1/x² equals:",
    options: opt(["7", "9", "11", "5"], 0),
    explanation: "(x + 1/x)² = x² + 1/x² + 2, so x² + 1/x² = 9 − 2 = 7.",
    section: "Quantitative Aptitude",
    topic: "Algebra",
    difficulty: "MEDIUM",
    positiveMarks: 3,
    negativeMarks: -1,
  },
  {
    id: "seed-q-4",
    type: "SINGLE_CORRECT",
    stem: "A is taller than B but shorter than C. D is taller than C. Who is the tallest?",
    options: opt(["D", "C", "A", "B"], 0),
    explanation: "Order: D > C > A > B, so D is the tallest.",
    section: "Logical Reasoning",
    topic: "Logical Reasoning",
    difficulty: "EASY",
    positiveMarks: 1,
    negativeMarks: 0,
  },
  {
    id: "seed-q-5",
    type: "NUMERIC",
    stem: "Find the next number in the series: 2, 6, 12, 20, 30, ?",
    correctNumeric: 42,
    tolerance: 0,
    explanation: "Differences are 4, 6, 8, 10, 12; 30 + 12 = 42.",
    section: "Logical Reasoning",
    topic: "Logical Reasoning",
    difficulty: "MEDIUM",
    positiveMarks: 1,
    negativeMarks: 0,
  },
  {
    id: "seed-q-6",
    type: "SINGLE_CORRECT",
    stem: "The Preamble to the Indian Constitution was amended by which amendment?",
    options: opt(["42nd Amendment", "44th Amendment", "1st Amendment", "73rd Amendment"], 0),
    explanation: "The 42nd Amendment (1976) added 'Socialist', 'Secular' and 'Integrity'.",
    section: "General Studies",
    topic: "Polity",
    difficulty: "MEDIUM",
    positiveMarks: 2,
    negativeMarks: -0.66,
  },
]

type SeedTest = {
  slug: string
  title: string
  description: string
  examTag: string
  testType: "FULL_MOCK" | "SECTIONAL" | "TOPIC_QUIZ" | "PREVIOUS_YEAR"
  durationMinutes: number
  difficulty: "EASY" | "MEDIUM" | "HARD"
  positiveMarks: number
  negativeMarks: number
  questions: { questionId: string; sectionName: string }[]
}

const TESTS: SeedTest[] = [
  {
    slug: "cat-quant-full-01",
    title: "CAT Quant — Full Mock #01",
    description: "A full-length quantitative aptitude mock test.",
    examTag: "CAT",
    testType: "FULL_MOCK",
    durationMinutes: 40,
    difficulty: "HARD",
    positiveMarks: 3,
    negativeMarks: -1,
    questions: [
      { questionId: "seed-q-1", sectionName: "Quantitative Aptitude" },
      { questionId: "seed-q-2", sectionName: "Quantitative Aptitude" },
      { questionId: "seed-q-3", sectionName: "Quantitative Aptitude" },
    ],
  },
  {
    slug: "aptitude-topic-quiz-01",
    title: "Aptitude — Topic Quiz #01",
    description: "A short mixed-aptitude topic quiz.",
    examTag: "Aptitude",
    testType: "TOPIC_QUIZ",
    durationMinutes: 20,
    difficulty: "EASY",
    positiveMarks: 1,
    negativeMarks: 0,
    questions: [
      { questionId: "seed-q-4", sectionName: "Logical Reasoning" },
      { questionId: "seed-q-5", sectionName: "Logical Reasoning" },
      { questionId: "seed-q-6", sectionName: "General Studies" },
    ],
  },
]

type SeedBlog = {
  slug: string
  title: string
  category: string
  excerpt: string
  body: string
  status: "DRAFT" | "PUBLISHED"
  isFeatured: boolean
  publishedAt: Date | null
}

const BLOGS: SeedBlog[] = [
  {
    slug: "cat-strategy-final-30-days",
    title: "CAT: a strategy for the final 30 days",
    category: "Strategy",
    excerpt: "What to revise, what to ignore, and how to taper your mock-test load.",
    body: "## The final stretch\n\nThe last 30 days are about consolidation, not new material.",
    status: "PUBLISHED",
    isFeatured: true,
    publishedAt: new Date("2026-05-12"),
  },
  {
    slug: "current-affairs-without-burnout",
    title: "How to track current affairs without burning out",
    category: "Strategy",
    excerpt: "A weekly system that converts the newspaper into syllabus-mapped notes.",
    body: "## A repeatable weekly loop\n\nConsistency beats intensity.",
    status: "PUBLISHED",
    isFeatured: false,
    publishedAt: new Date("2026-04-22"),
  },
  {
    slug: "negative-marking-mental-model",
    title: "A mental model for negative marking",
    category: "Strategy",
    excerpt: "When to attempt and when to skip — a simple expected-value rule.",
    body: "## Expected value, fast\n\nTreat each question as a small bet.",
    status: "DRAFT",
    isFeatured: false,
    publishedAt: null,
  },
]

async function main() {
  console.log("Seeding PrepMaster AI database…")
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10)

  // 1. Users
  const admin = await prisma.user.upsert({
    where: { email: "admin@prepmaster.ai" },
    update: { name: "Priya Sharma", role: "ADMIN", passwordHash },
    create: { email: "admin@prepmaster.ai", name: "Priya Sharma", role: "ADMIN", passwordHash },
  })
  const student = await prisma.user.upsert({
    where: { email: "student@prepmaster.ai" },
    update: { name: "Rajan Punchouty", role: "STUDENT", targetExam: "CAT 2026", passwordHash },
    create: {
      email: "student@prepmaster.ai",
      name: "Rajan Punchouty",
      role: "STUDENT",
      targetExam: "CAT 2026",
      passwordHash,
    },
  })
  console.log(`  ✓ users: ${admin.email}, ${student.email}`)

  // 2. Courses → modules → lessons (idempotent: rebuild modules per course)
  for (const c of COURSES) {
    const course = await prisma.course.upsert({
      where: { slug: c.slug },
      update: {
        title: c.title,
        summary: c.summary,
        description: c.description,
        examTag: c.examTag,
        level: c.level,
        price: c.price,
        status: "PUBLISHED",
      },
      create: {
        slug: c.slug,
        title: c.title,
        summary: c.summary,
        description: c.description,
        examTag: c.examTag,
        level: c.level,
        price: c.price,
        status: "PUBLISHED",
      },
    })
    await prisma.module.deleteMany({ where: { courseId: course.id } })
    for (const [mi, m] of c.modules.entries()) {
      await prisma.module.create({
        data: {
          courseId: course.id,
          title: m.title,
          summary: m.summary,
          orderIndex: mi,
          lessons: {
            create: m.lessons.map((l, li) => ({
              title: l.title,
              type: l.type,
              body: l.body,
              durationMinutes: l.durationMinutes,
              isFreePreview: l.isFreePreview ?? false,
              orderIndex: li,
            })),
          },
        },
      })
    }
  }
  console.log(`  ✓ courses: ${COURSES.length} (with modules + lessons)`)

  // 3. Questions (idempotent by explicit id)
  for (const q of QUESTIONS) {
    const data = {
      type: q.type,
      stem: q.stem,
      options: q.options ?? undefined,
      correctNumeric: q.correctNumeric ?? null,
      tolerance: q.tolerance ?? null,
      explanation: q.explanation,
      section: q.section,
      topic: q.topic,
      difficulty: q.difficulty,
      defaultPositiveMarks: q.positiveMarks,
      defaultNegativeMarks: q.negativeMarks,
    }
    await prisma.question.upsert({ where: { id: q.id }, update: data, create: { id: q.id, ...data } })
  }
  console.log(`  ✓ questions: ${QUESTIONS.length}`)

  // 4. Tests + test-question mappings (idempotent: rebuild mappings per test)
  for (const t of TESTS) {
    const test = await prisma.test.upsert({
      where: { slug: t.slug },
      update: {
        title: t.title,
        description: t.description,
        examTag: t.examTag,
        testType: t.testType,
        durationMinutes: t.durationMinutes,
        difficulty: t.difficulty,
        positiveMarks: t.positiveMarks,
        negativeMarks: t.negativeMarks,
        status: "PUBLISHED",
      },
      create: {
        slug: t.slug,
        title: t.title,
        description: t.description,
        examTag: t.examTag,
        testType: t.testType,
        durationMinutes: t.durationMinutes,
        difficulty: t.difficulty,
        positiveMarks: t.positiveMarks,
        negativeMarks: t.negativeMarks,
        status: "PUBLISHED",
      },
    })
    await prisma.testQuestion.deleteMany({ where: { testId: test.id } })
    await prisma.testQuestion.createMany({
      data: t.questions.map((q, i) => ({
        testId: test.id,
        questionId: q.questionId,
        sectionName: q.sectionName,
        orderIndex: i,
      })),
    })
  }
  console.log(`  ✓ tests: ${TESTS.length} (with question mappings)`)

  // 5. Blog posts (authored by admin)
  for (const b of BLOGS) {
    await prisma.blogPost.upsert({
      where: { slug: b.slug },
      update: {
        title: b.title,
        category: b.category,
        excerpt: b.excerpt,
        body: b.body,
        status: b.status,
        isFeatured: b.isFeatured,
        publishedAt: b.publishedAt,
        authorId: admin.id,
      },
      create: {
        slug: b.slug,
        title: b.title,
        category: b.category,
        excerpt: b.excerpt,
        body: b.body,
        status: b.status,
        isFeatured: b.isFeatured,
        publishedAt: b.publishedAt,
        authorId: admin.id,
      },
    })
  }
  console.log(`  ✓ blog posts: ${BLOGS.length}`)

  console.log("Seed complete.")
}

main()
  .catch((e) => {
    console.error("Seed failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
