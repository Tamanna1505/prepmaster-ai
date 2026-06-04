import { Tag } from "@/components/marketing/primitives"

type Tone = "gold" | "teal" | "ink" | "live" | "outline"

/* Central mapping so every admin table speaks the same visual language. */
const TONE_MAP: Record<string, Tone> = {
  // publish state
  Published: "teal",
  Draft: "outline",
  // account state
  Active: "teal",
  Inactive: "live",
  // roles
  ADMIN: "ink",
  STUDENT: "outline",
  // difficulty
  Easy: "teal",
  Medium: "gold",
  Hard: "live",
  // misc
  Featured: "gold",
}

export function StatusBadge({
  status,
  tone,
  dot = false,
}: {
  status: string
  tone?: Tone
  dot?: boolean
}) {
  const resolved = tone ?? TONE_MAP[status] ?? "outline"
  return (
    <Tag tone={resolved}>
      {dot ? <span className="size-1.5 rounded-full bg-current opacity-70" /> : null}
      {status}
    </Tag>
  )
}
