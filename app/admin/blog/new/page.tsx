import type { Metadata } from "next"
import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { BlogForm } from "@/components/admin/blog-form"

export const metadata: Metadata = { title: "Admin · New blog post" }

export default function NewBlogPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Content"
        title="Write blog post"
        description="Compose a new article, set its SEO metadata, and publish when ready."
        backHref="/admin/blog"
        backLabel="Blog"
      />
      <BlogForm mode="new" />
    </div>
  )
}
