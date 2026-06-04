"use client"

import { useEffect, useRef, useState } from "react"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"

function format(seconds: number) {
  const s = Math.max(0, seconds)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  const pad = (n: number) => String(n).padStart(2, "0")
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`
}

export function TestTimer({
  durationSeconds,
  onExpire,
}: {
  durationSeconds: number
  onExpire?: () => void
}) {
  const [remaining, setRemaining] = useState(durationSeconds)
  const expiredRef = useRef(false)
  const onExpireRef = useRef(onExpire)

  useEffect(() => {
    onExpireRef.current = onExpire
  }, [onExpire])

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(id)
          if (!expiredRef.current) {
            expiredRef.current = true
            onExpireRef.current?.()
          }
          return 0
        }
        return r - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const warning = remaining <= 300 && remaining > 60
  const critical = remaining <= 60

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-2 font-data text-[15px] font-semibold tabular-nums tracking-[-0.02em] shadow-[inset_0_0_0_1px_var(--color-line)]",
        critical
          ? "bg-live-tint text-live-deep"
          : warning
            ? "bg-[rgba(216,145,71,0.14)] text-orange"
            : "bg-teal-tint text-teal-deep"
      )}
      role="timer"
      aria-live="off"
    >
      <Clock className="size-4" strokeWidth={2} />
      {format(remaining)}
    </div>
  )
}
