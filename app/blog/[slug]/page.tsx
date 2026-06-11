import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Newspaper } from "lucide-react"
import { SiteShell } from "@/components/layout/site-shell"
import { Container, LearnMore, Photo, Tag } from "@/components/marketing/primitives"
import { BlogCard } from "@/components/marketing/blog-card"
import { getBlogPostBySlug, getPublishedBlogPosts } from "@/lib/data/blogs"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  return {
    title: post?.title ?? "Post",
    description: post?.summary,
  }
}

const COVER_TONES = ["gold", "teal", "cream", "ink"] as const

function toneForSlug(slug: string) {
  const sum = slug.split("").reduce((s, ch) => s + ch.charCodeAt(0), 0)
  return COVER_TONES[sum % COVER_TONES.length]
}

/* Minimal markdown-ish renderer for the stored body: headings (#/##), bullet
   lists (- ), and paragraphs. Keeps the existing reading layout. */
function renderBody(body: string) {
  const blocks = body.trim().split(/\n{2,}/)
  return blocks.map((block, i) => {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean)
    if (lines.length === 0) return null

    if (/^#{1,3}\s/.test(lines[0])) {
      return (
        <h2 key={i} className="mt-10 font-serif text-[26px] tracking-[-0.02em] text-ink">
          {lines[0].replace(/^#{1,3}\s/, "")}
        </h2>
      )
    }
    if (lines.every((l) => /^[-*]\s/.test(l))) {
      return (
        <ul key={i} className="ml-5 list-disc space-y-2 marker:text-orange">
          {lines.map((l, j) => (
            <li key={j}>{l.replace(/^[-*]\s/, "")}</li>
          ))}
        </ul>
      )
    }
    return <p key={i}>{lines.join(" ")}</p>
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) notFound()

  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
  const related = (await getPublishedBlogPosts()).filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <SiteShell>
      <article className="bg-cream-100 py-12 sm:py-16">
        <Container className="max-w-[760px]">
          <LearnMore label="All articles" href="/blog" />

          <header className="mt-8 text-center">
            <Tag tone="gold" className="mx-auto">
              {post.category}
            </Tag>
            <h1 className="mx-auto mt-5 max-w-[18ch] font-serif text-[34px] leading-[1.08] tracking-[-0.02em] text-ink sm:text-[46px]">
              {post.title}
            </h1>
            <p className="mt-4 font-ui text-[14px] text-taupe">
              By {post.author} · {date} · {post.readMinutes} min read
            </p>
          </header>

          <div className="mt-8">
            <Photo tone={toneForSlug(slug)} icon={Newspaper} label={post.category} ratio="aspect-[16/9]" />
          </div>

          <div className="mt-10 space-y-5 text-[17px] leading-[1.7] text-cocoa">
            <p className="text-[19px] leading-[1.6] text-ink">{post.summary}</p>
            {renderBody(post.body)}
          </div>

          {post.tags.length > 0 ? (
            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Tag key={tag} tone="outline">
                  #{tag}
                </Tag>
              ))}
            </div>
          ) : null}
        </Container>
      </article>

      {/* Related posts */}
      {related.length > 0 ? (
        <section className="border-t border-line bg-cream-50 py-12 sm:py-16">
          <Container wide>
            <h2 className="font-serif text-[26px] tracking-[-0.02em] text-ink">Keep reading</h2>
            <div className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <BlogCard key={p.slug} post={p} index={i} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </SiteShell>
  )
}
