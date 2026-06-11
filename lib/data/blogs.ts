import { prisma } from "@/lib/db"
import type { BlogPost } from "@/lib/sample-data"

/* Phase 12 — DB-backed public blog data. Reuses the BlogPost card type so the
   existing cards render unchanged. Read time is derived from the body. */

export type PublicBlogPost = BlogPost & { body: string }

function readMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

function tagsOf(raw: unknown): string[] {
  return Array.isArray(raw) ? raw.map((t) => String(t)) : []
}

const listSelect = {
  slug: true,
  title: true,
  excerpt: true,
  body: true,
  category: true,
  tags: true,
  publishedAt: true,
  createdAt: true,
  author: { select: { name: true } },
}

function toListItem(p: {
  slug: string
  title: string
  excerpt: string
  body: string
  category: string
  tags: unknown
  publishedAt: Date | null
  createdAt: Date
  author: { name: string } | null
}): BlogPost {
  return {
    slug: p.slug,
    title: p.title,
    summary: p.excerpt,
    category: p.category,
    tags: tagsOf(p.tags),
    author: p.author?.name ?? "PrepMaster AI",
    publishedAt: (p.publishedAt ?? p.createdAt).toISOString(),
    readMinutes: readMinutes(p.body),
    coverGradient: "",
  }
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const posts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ isFeatured: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }],
    select: listSelect,
  })
  return posts.map(toListItem)
}

export async function getBlogPostBySlug(slug: string): Promise<PublicBlogPost | null> {
  const post = await prisma.blogPost.findFirst({
    where: { slug, status: "PUBLISHED" },
    select: listSelect,
  })
  if (!post) return null
  return { ...toListItem(post), body: post.body }
}
