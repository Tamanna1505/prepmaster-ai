import type { Metadata } from "next"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/layout/page-header"
import { SiteShell } from "@/components/layout/site-shell"
import { blogPosts } from "@/lib/sample-data"

export const metadata: Metadata = {
  title: "Blog",
  description: "Strategy, study hacks, and success stories from PrepMaster AI.",
}

export default function BlogIndexPage() {
  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <PageHeader
          eyebrow="Articles"
          title="Blog"
          description="Long-form strategy, study hacks, and student stories — no fluff."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-colors hover:border-foreground/30"
            >
              <div className={`h-32 w-full bg-gradient-to-br ${post.coverGradient}`} />
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3.5" /> {post.publishedAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3.5" /> {post.readMinutes}m
                  </span>
                </div>
                <h3 className="text-base font-semibold leading-snug">{post.title}</h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">{post.summary}</p>
                <p className="mt-auto text-xs text-muted-foreground">By {post.author}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SiteShell>
  )
}
