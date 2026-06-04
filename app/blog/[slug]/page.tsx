import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Newspaper } from "lucide-react"
import { SiteShell } from "@/components/layout/site-shell"
import { Container, LearnMore, Photo, Tag } from "@/components/marketing/primitives"
import { BlogCard } from "@/components/marketing/blog-card"
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

const COVER_TONES = ["gold", "teal", "cream", "ink"] as const

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const index = blogPosts.findIndex((p) => p.slug === slug)
  const post = blogPosts[index]
  if (!post) notFound()

  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3)

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
            <Photo
              tone={COVER_TONES[index % COVER_TONES.length]}
              icon={Newspaper}
              label={post.category}
              ratio="aspect-[16/9]"
            />
          </div>

          {/* Body — sample content; live markdown rendering lands with the
              content system (PRD §13). */}
          <div className="mt-10 space-y-5 text-[17px] leading-[1.7] text-cocoa">
            <p>{post.summary}</p>
            <p>
              This is a sample article body that demonstrates the reading layout — typography,
              measure, and spacing are final, while the words here stand in for real content that
              the blog system will render once it is live.
            </p>

            <blockquote className="my-8 border-l-2 border-orange pl-5 font-serif text-[22px] italic leading-[1.4] text-ink">
              The students who improve fastest aren&apos;t the ones who study the most — they&apos;re
              the ones who know exactly what to fix next.
            </blockquote>

            <h2 className="mt-10 font-serif text-[26px] tracking-[-0.02em] text-ink">
              What actually moves scores
            </h2>
            <p>
              A good revision loop is short and specific: attempt, review, fix one named weakness,
              repeat. The aim of every section below is to make that loop tighter and less
              dependent on guesswork.
            </p>
            <ul className="ml-5 list-disc space-y-2 marker:text-orange">
              <li>Long-form, no fluff</li>
              <li>Examples drawn from real student data</li>
              <li>Concrete next steps at the end</li>
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Tag key={tag} tone="outline">
                #{tag}
              </Tag>
            ))}
          </div>
        </Container>
      </article>

      {/* Related posts */}
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
    </SiteShell>
  )
}
