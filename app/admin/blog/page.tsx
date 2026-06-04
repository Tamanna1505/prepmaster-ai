import type { Metadata } from "next"
import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { BlogManager } from "@/components/admin/blog-manager"

export const metadata: Metadata = { title: "Admin · Blog" }

export default function AdminBlogPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Content"
        title="Blog"
        description="Author articles, manage SEO and featured posts, and toggle publish state."
      />
      <BlogManager />
    </div>
  )
}
