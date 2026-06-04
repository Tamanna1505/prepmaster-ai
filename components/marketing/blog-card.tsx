import Link from "next/link"
import { ArrowUpRight, Newspaper } from "lucide-react"
import type { BlogPost } from "@/lib/sample-data"
import { Eyebrow, Photo } from "@/components/marketing/primitives"

/* Cover tints are brand-toned (the sample data's coverGradient is intentionally
   ignored — it uses off-brand blue/purple gradients). */
const TONES = ["gold", "teal", "cream", "ink"] as const

export function BlogCard({
  post,
  index = 0,
  featured = false,
}: {
  post: BlogPost
  index?: number
  featured?: boolean
}) {
  const tone = TONES[index % TONES.length]
  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`focus-ring group flex h-full flex-col rounded-[20px] transition-all duration-200 ease-out hover:-translate-y-[3px] ${
        featured ? "gap-6 lg:flex-row lg:items-center" : ""
      }`}
    >
      <Photo
        tone={tone}
        icon={Newspaper}
        label={post.category}
        ratio={featured ? "aspect-[16/10] lg:aspect-[4/3]" : "aspect-[16/10]"}
        className={featured ? "lg:w-1/2" : "w-full"}
      />
      <div className={featured ? "lg:w-1/2" : "pt-4"}>
        <Eyebrow tone="taupe">{post.category}</Eyebrow>
        <h3
          className={`mt-2 font-serif leading-[1.18] text-ink ${
            featured ? "text-[26px] sm:text-[30px]" : "text-[20px]"
          }`}
        >
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[14px] leading-[1.55] text-cocoa">{post.summary}</p>
        <div className="mt-4 flex items-center justify-between font-ui text-[13px] text-taupe">
          <span>
            {date} · {post.readMinutes} min read
          </span>
          <ArrowUpRight className="size-4 text-ink transition-transform duration-150 ease-out group-hover:translate-x-px group-hover:-translate-y-px" />
        </div>
      </div>
    </Link>
  )
}
