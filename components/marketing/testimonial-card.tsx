import { Quote } from "lucide-react"

export function TestimonialCard({
  quote,
  name,
  role,
}: {
  quote: string
  name: string
  role: string
}) {
  return (
    <figure className="flex h-full flex-col gap-4 rounded-xl border border-border/60 bg-card p-6">
      <Quote className="size-5 text-muted-foreground" />
      <blockquote className="text-sm leading-relaxed">{quote}</blockquote>
      <figcaption className="mt-auto">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">{role}</p>
      </figcaption>
    </figure>
  )
}
