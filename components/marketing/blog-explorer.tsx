"use client"

import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { blogPosts } from "@/lib/sample-data"
import { BlogCard } from "@/components/marketing/blog-card"

const CATEGORIES = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))]

export function BlogExplorer() {
  const [category, setCategory] = useState("All")

  // First post is the featured post; the rest are filterable.
  const [featured, ...rest] = blogPosts

  const filtered = useMemo(() => {
    if (category === "All") return rest
    return rest.filter((p) => p.category === category)
  }, [category, rest])

  return (
    <div className="space-y-12">
      {/* Featured post */}
      <BlogCard post={featured} index={0} featured />

      {/* Category chips */}
      <div className="flex flex-wrap items-center gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn(
              "focus-ring rounded-full px-4 py-2 font-ui text-[14px] font-medium transition-all duration-150",
              category === c
                ? "bg-ink text-cream-text"
                : "bg-surface text-cocoa shadow-[inset_0_0_0_1px_var(--color-line)] hover:bg-surface-muted"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i + 1} />
          ))}
        </div>
      ) : (
        <div className="rounded-[20px] bg-surface p-12 text-center shadow-[inset_0_0_0_1px_var(--color-line)]">
          <p className="font-serif text-[20px] text-ink">No posts in this category yet</p>
        </div>
      )}
    </div>
  )
}
