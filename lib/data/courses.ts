import { prisma } from "@/lib/db"

/* Phase 12 — DB-backed public course data. Returns only serializable, public
   fields the UI needs (never passwordHash or other private data). */

const LEVEL_LABEL = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
} as const

export type CourseLevelLabel = (typeof LEVEL_LABEL)[keyof typeof LEVEL_LABEL]

export type PublicCourseListItem = {
  slug: string
  title: string
  summary: string
  examTag: string
  difficulty: CourseLevelLabel
  lessonCount: number
  durationHours: number
  topics: string[]
}

export type PublicCourseDetail = PublicCourseListItem & {
  description: string
  studentsEnrolled: number
  modules: { title: string; meta: string; lessons: string[] }[]
}

/** Strip a leading "Module 1 ·" style prefix to recover a topic label. */
function moduleTopic(title: string): string {
  return title.replace(/^module\s*\d+\s*[·:.\-–]?\s*/i, "").trim() || title
}

function hoursFromMinutes(minutes: number): number {
  return minutes > 0 ? Math.max(1, Math.round(minutes / 60)) : 0
}

export async function getPublishedCourses(): Promise<PublicCourseListItem[]> {
  const courses = await prisma.course.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    select: {
      slug: true,
      title: true,
      summary: true,
      examTag: true,
      level: true,
      modules: {
        orderBy: { orderIndex: "asc" },
        select: { title: true, lessons: { select: { durationMinutes: true } } },
      },
    },
  })

  return courses.map((c) => {
    const lessons = c.modules.flatMap((m) => m.lessons)
    const minutes = lessons.reduce((sum, l) => sum + (l.durationMinutes ?? 0), 0)
    return {
      slug: c.slug,
      title: c.title,
      summary: c.summary,
      examTag: c.examTag ?? "General",
      difficulty: LEVEL_LABEL[c.level],
      lessonCount: lessons.length,
      durationHours: hoursFromMinutes(minutes),
      topics: c.modules.map((m) => moduleTopic(m.title)).slice(0, 6),
    }
  })
}

export async function getCourseBySlug(slug: string): Promise<PublicCourseDetail | null> {
  const c = await prisma.course.findFirst({
    where: { slug, status: "PUBLISHED" },
    select: {
      slug: true,
      title: true,
      summary: true,
      description: true,
      examTag: true,
      level: true,
      modules: {
        orderBy: { orderIndex: "asc" },
        select: {
          title: true,
          lessons: {
            orderBy: { orderIndex: "asc" },
            select: { title: true, durationMinutes: true },
          },
        },
      },
      _count: { select: { enrollments: true } },
    },
  })
  if (!c) return null

  const allLessons = c.modules.flatMap((m) => m.lessons)
  const totalMinutes = allLessons.reduce((sum, l) => sum + (l.durationMinutes ?? 0), 0)

  return {
    slug: c.slug,
    title: c.title,
    summary: c.summary,
    description: c.description,
    examTag: c.examTag ?? "General",
    difficulty: LEVEL_LABEL[c.level],
    lessonCount: allLessons.length,
    durationHours: hoursFromMinutes(totalMinutes),
    studentsEnrolled: c._count.enrollments,
    topics: c.modules.map((m) => moduleTopic(m.title)).slice(0, 6),
    modules: c.modules.map((m) => {
      const minutes = m.lessons.reduce((sum, l) => sum + (l.durationMinutes ?? 0), 0)
      const hrs = hoursFromMinutes(minutes)
      const meta = `${m.lessons.length} lesson${m.lessons.length === 1 ? "" : "s"}${hrs ? ` · ${hrs} hr${hrs === 1 ? "" : "s"}` : ""}`
      return { title: m.title, meta, lessons: m.lessons.map((l) => l.title) }
    }),
  }
}
