"use client"

import { useState } from "react"
import { Bold, Heading, ImageIcon, Italic, Link2, List } from "lucide-react"
import { BLOG_CATEGORIES, type AdminBlogRow } from "@/lib/admin-data"
import { PillButton } from "@/components/marketing/primitives"
import {
  AdminFormSection,
  AdminInput,
  AdminSelect,
  AdminTextarea,
  AdminToggle,
} from "@/components/admin/admin-form-section"
import { fieldLabelClass } from "@/components/auth/auth-shell"

const TOOLBAR = [Bold, Italic, Heading, List, Link2, ImageIcon]

export function BlogForm({ mode, initial }: { mode: "new" | "edit"; initial?: AdminBlogRow }) {
  const [published, setPublished] = useState(initial?.status === "Published")
  const [featured, setFeatured] = useState(initial?.featured ?? false)

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <AdminFormSection title="Post details">
        <AdminInput id="title" label="Title" full placeholder="An attention-grabbing headline" defaultValue={initial?.title} />
        <AdminInput id="slug" label="Slug" placeholder="post-url-slug" defaultValue={initial?.slug} />
        <AdminSelect id="category" label="Category" options={BLOG_CATEGORIES} defaultValue={initial?.category} />
        <AdminInput id="author" label="Author" placeholder="Author name" defaultValue={initial?.author} />
        <AdminTextarea id="excerpt" label="Excerpt" rows={2} placeholder="A one or two line summary used in cards and previews." defaultValue={initial?.excerpt} />
      </AdminFormSection>

      {/* Content editor */}
      <AdminFormSection title="Content" description="Markdown supported. This is a sample editor — formatting buttons are visual only." cols={1}>
        <div>
          <label htmlFor="content" className={fieldLabelClass}>
            Body
          </label>
          <div className="mt-1.5 overflow-hidden rounded-[14px] shadow-[inset_0_0_0_1px_var(--color-line)]">
            <div className="flex items-center gap-1 border-b border-line bg-surface-muted px-2 py-1.5">
              {TOOLBAR.map((Icon, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label="Formatting"
                  className="focus-ring grid size-8 place-items-center rounded-[8px] text-cocoa transition-colors hover:bg-surface hover:text-ink"
                >
                  <Icon className="size-4" strokeWidth={1.75} />
                </button>
              ))}
            </div>
            <textarea
              id="content"
              name="content"
              rows={12}
              placeholder="Write your post in markdown…"
              defaultValue={initial?.content}
              className="w-full resize-y bg-surface px-4 py-3 font-data text-[14px] leading-[1.7] text-ink outline-none placeholder:font-ui placeholder:text-taupe"
            />
          </div>
        </div>
      </AdminFormSection>

      {/* Featured image */}
      <AdminFormSection title="Featured image" cols={1}>
        <AdminInput id="featuredImage" label="Image URL" placeholder="https://…" defaultValue={initial?.featuredImage} hint="External URL — no upload pipeline in the MVP." />
        <div className="grid aspect-[16/7] max-w-md place-items-center rounded-[14px] bg-surface-muted text-taupe shadow-[inset_0_0_0_1px_var(--color-line)]">
          <span className="flex flex-col items-center gap-2">
            <ImageIcon className="size-7" strokeWidth={1.5} />
            <span className="font-ui text-[12px]">Cover preview</span>
          </span>
        </div>
      </AdminFormSection>

      {/* SEO */}
      <AdminFormSection title="SEO" description="Used for search engines and social previews.">
        <AdminInput id="seoTitle" label="SEO title" full placeholder="≤ 60 characters" defaultValue={initial?.seoTitle} />
        <AdminTextarea id="seoDescription" label="SEO description" rows={2} placeholder="≤ 160 characters" defaultValue={initial?.seoDescription} />
      </AdminFormSection>

      {/* Publishing */}
      <AdminFormSection title="Publishing" cols={1}>
        <AdminToggle
          label="Published"
          description="Only published posts appear on the public blog."
          checked={published}
          onChange={() => setPublished((v) => !v)}
        />
        <AdminToggle
          label="Featured"
          description="Surfaced in the homepage carousel."
          checked={featured}
          onChange={() => setFeatured((v) => !v)}
        />
      </AdminFormSection>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <PillButton type="submit" variant="outline" size="lg">
          Save draft
        </PillButton>
        <PillButton type="submit" variant="ink" size="lg">
          {mode === "edit" ? "Save & publish" : "Publish post"}
        </PillButton>
      </div>
      <p className="text-right font-ui text-[12px] text-taupe">
        Form is visual only — no data is saved in this phase.
      </p>
    </form>
  )
}
