import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { SiteShell } from "@/components/layout/site-shell"
import { blogPosts } from "@/lib/sample-data"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  return {
    title: post?.title ?? "Post",
    description: post?.summary,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  return (
    <SiteShell>
      <article className="mx-auto w-full max-w-3xl px-4 py-10">
        <Link
          href="/blog"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> All articles
        </Link>
        <div className={`h-48 w-full rounded-2xl bg-gradient-to-br ${post.coverGradient}`} />
        <header className="mt-6 space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="secondary">{post.category}</Badge>
            <span className="flex items-center gap-1">
              <Calendar className="size-3.5" /> {post.publishedAt}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" /> {post.readMinutes}m read
            </span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{post.title}</h1>
          <p className="text-base text-muted-foreground">{post.summary}</p>
          <p className="text-sm text-muted-foreground">By {post.author}</p>
        </header>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-foreground/90">
          <p>
            This is a placeholder body for the post. The blog system will render markdown content
            from the database in Phase 8 once the BlogPost model is live and the admin editor is
            built.
          </p>
          <p>
            In the meantime, treat this layout as the visual reference: typography, spacing, and
            metadata are final; the body content is not.
          </p>
          <h2 className="mt-8 text-xl font-semibold">Key points</h2>
          <ul className="ml-6 list-disc space-y-1">
            <li>Long-form, no fluff</li>
            <li>Examples from real student data</li>
            <li>Concrete next steps at the end</li>
          </ul>
        </div>
        <div className="mt-10 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              #{tag}
            </Badge>
          ))}
        </div>
      </article>
    </SiteShell>
  )
}
