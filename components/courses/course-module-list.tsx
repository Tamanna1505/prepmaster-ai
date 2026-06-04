"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Clock, FileDown, Lock } from "lucide-react"
import type { AnnotatedModule } from "@/lib/dashboard-data"
import { cn } from "@/lib/utils"
import { Tag } from "@/components/marketing/primitives"
import { LessonStatusIcon, LessonKindIcon, lessonKindLabel } from "@/components/courses/lesson-status"

function moduleProgress(m: AnnotatedModule) {
  const done = m.lessons.filter((l) => l.status === "completed").length
  return { done, total: m.lessons.length }
}

export function CourseModuleList({
  modules,
  defaultOpenModuleId,
}: {
  modules: AnnotatedModule[]
  defaultOpenModuleId?: string
}) {
  const initial =
    defaultOpenModuleId ??
    modules.find((m) => m.lessons.some((l) => l.status === "in-progress"))?.id ??
    modules[0]?.id
  const [openId, setOpenId] = useState<string | undefined>(initial)

  return (
    <div className="space-y-3">
      {modules.map((m) => {
        const isOpen = openId === m.id
        const { done, total } = moduleProgress(m)
        return (
          <div
            key={m.id}
            className="overflow-hidden rounded-[18px] bg-surface shadow-[inset_0_0_0_1px_var(--color-line)]"
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? undefined : m.id)}
              aria-expanded={isOpen}
              className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-[18px] text-ink">{m.title}</span>
                  {!m.unlocked ? <Lock className="size-3.5 text-taupe" strokeWidth={1.75} /> : null}
                </div>
                <p className="mt-0.5 font-ui text-[13px] text-taupe">
                  {m.summary} · {done}/{total} done
                </p>
              </div>
              <ChevronDown
                className={cn(
                  "size-5 shrink-0 text-taupe transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </button>

            <div
              className={cn(
                "grid transition-all duration-200 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <ul className="divide-y divide-line border-t border-line">
                  {m.lessons.map((l) => {
                    const locked = l.status === "locked"
                    const inner = (
                      <div
                        className={cn(
                          "flex items-center gap-3 px-5 py-3.5",
                          locked ? "opacity-60" : "transition-colors hover:bg-surface-muted"
                        )}
                      >
                        <LessonStatusIcon status={l.status} />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-ui text-[14px] font-medium text-ink">
                            {l.title}
                          </p>
                          <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-ui text-[12px] text-taupe">
                            <span className="flex items-center gap-1">
                              <LessonKindIcon kind={l.kind} className="size-3.5" />
                              {lessonKindLabel[l.kind]}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="size-3.5" strokeWidth={1.75} />
                              {l.durationMinutes} min
                            </span>
                            {l.hasResource ? (
                              <span className="flex items-center gap-1">
                                <FileDown className="size-3.5" strokeWidth={1.75} /> PDF
                              </span>
                            ) : null}
                          </p>
                        </div>
                        {l.isFreePreview ? <Tag tone="teal">Free preview</Tag> : null}
                      </div>
                    )
                    return (
                      <li key={l.id}>
                        {locked ? (
                          <div aria-disabled>{inner}</div>
                        ) : (
                          <Link href={l.href} className="focus-ring block">
                            {inner}
                          </Link>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
