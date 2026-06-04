import { CheckCircle2, Circle, FileText, Lock, PlayCircle, Video } from "lucide-react"
import type { UiLessonStatus } from "@/lib/dashboard-data"
import type { CourseLessonKind } from "@/lib/sample-data"
import { cn } from "@/lib/utils"

/* Status dot — teal for completed (progress), orange for the active lesson. */
export function LessonStatusIcon({
  status,
  className,
}: {
  status: UiLessonStatus
  className?: string
}) {
  if (status === "completed")
    return <CheckCircle2 className={cn("size-[18px] text-teal", className)} strokeWidth={2} />
  if (status === "in-progress")
    return <PlayCircle className={cn("size-[18px] text-orange", className)} strokeWidth={2} />
  if (status === "locked")
    return <Lock className={cn("size-[18px] text-taupe", className)} strokeWidth={1.75} />
  return <Circle className={cn("size-[18px] text-taupe/60", className)} strokeWidth={1.75} />
}

export function LessonKindIcon({
  kind,
  className,
  strokeWidth = 1.75,
}: {
  kind: CourseLessonKind
  className?: string
  strokeWidth?: number
}) {
  if (kind === "video") return <Video className={className} strokeWidth={strokeWidth} />
  return <FileText className={className} strokeWidth={strokeWidth} />
}

export const lessonKindLabel: Record<CourseLessonKind, string> = {
  video: "Video",
  reading: "Reading",
}
