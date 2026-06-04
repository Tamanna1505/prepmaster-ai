"use client"

import { useState } from "react"
import { ChevronDown, PlayCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export type SyllabusModule = {
  title: string
  meta: string
  lessons: string[]
}

export function CourseSyllabus({ modules }: { modules: SyllabusModule[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="divide-y divide-line overflow-hidden rounded-[20px] bg-surface shadow-[inset_0_0_0_1px_var(--color-line)]">
      {modules.map((m, i) => {
        const isOpen = open === i
        return (
          <div key={m.title}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
            >
              <span>
                <span className="block font-serif text-[18px] text-ink">{m.title}</span>
                <span className="mt-0.5 block font-ui text-[13px] text-taupe">{m.meta}</span>
              </span>
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
                <ul className="space-y-1 px-5 pb-4 sm:px-6">
                  {m.lessons.map((lesson) => (
                    <li
                      key={lesson}
                      className="flex items-center gap-2.5 rounded-lg px-2 py-2 font-ui text-[14px] text-cocoa"
                    >
                      <PlayCircle className="size-4 text-orange" strokeWidth={1.75} />
                      {lesson}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
