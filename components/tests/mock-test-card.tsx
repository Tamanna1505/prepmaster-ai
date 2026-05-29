import Link from "next/link"
import { Clock, FileText, Gauge } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import type { MockTest } from "@/lib/sample-data"

export function MockTestCard({ test }: { test: MockTest }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border/60 bg-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {test.examTag}
          </p>
          <h3 className="mt-1 text-base font-semibold leading-snug">{test.title}</h3>
        </div>
        <Badge variant="outline">{test.difficulty}</Badge>
      </div>
      <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="size-3.5" /> {test.durationMinutes} min
        </span>
        <span className="flex items-center gap-1">
          <FileText className="size-3.5" /> {test.questionCount} qs
        </span>
        <span className="flex items-center gap-1">
          <Gauge className="size-3.5" /> avg {test.averageScorePct}%
        </span>
      </div>
      <div className="flex items-center justify-between border-t border-border/60 pt-3 text-sm">
        <span className="text-muted-foreground">{test.attempts.toLocaleString()} attempts</span>
        <Link href="/mock-tests" className={buttonVariants({ variant: "outline", size: "sm" })}>
          Preview
        </Link>
      </div>
    </div>
  )
}
