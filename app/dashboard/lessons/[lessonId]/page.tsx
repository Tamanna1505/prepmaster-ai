import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getLessonContext, studyTipFor } from "@/lib/dashboard-data"
import { LessonViewer } from "@/components/courses/lesson-viewer"
import { LessonSidebar } from "@/components/courses/lesson-sidebar"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lessonId: string }>
}): Promise<Metadata> {
  const { lessonId } = await params
  const ctx = getLessonContext(lessonId)
  return { title: ctx ? ctx.lesson.title : "Lesson" }
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>
}) {
  const { lessonId } = await params
  const ctx = getLessonContext(lessonId)
  if (!ctx) notFound()

  const { course, moduleTitle, lesson, status, prev, next, studentCourse } = ctx

  const notes = [
    `In this lesson we work through ${lesson.title.toLowerCase()} as part of ${moduleTitle}. Make sure the core idea is clear before moving on to the worked examples.`,
    `The examples here are chosen to mirror the question patterns ${course.examTag} tends to repeat. Try each one yourself before reading the solution — recall is what makes it stick.`,
    `Common mistake: rushing the setup. Most lost marks on this topic come from misreading the question, not from the maths. Slow down on the first read and note exactly what's being asked.`,
    `When you're confident, mark the lesson complete and attempt a few mixed problems on this topic to lock it into long-term memory.`,
  ]

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_330px] lg:gap-10">
      <LessonViewer
        courseTitle={course.title}
        courseId={course.slug}
        moduleTitle={moduleTitle}
        lesson={lesson}
        notes={notes}
        initialCompleted={status === "completed"}
        prevHref={prev ? `/dashboard/lessons/${prev.id}` : undefined}
        nextHref={next ? `/dashboard/lessons/${next.id}` : undefined}
      />

      <LessonSidebar
        courseTitle={course.title}
        courseId={course.slug}
        modules={studentCourse.modules}
        currentLessonId={lesson.id}
        aiTip={studyTipFor(lesson.id)}
        progressPct={studentCourse.progressPct}
        completedCount={studentCourse.completedCount}
        totalLessons={studentCourse.totalLessons}
      />
    </div>
  )
}
