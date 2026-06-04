import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAdminBlog } from "@/lib/admin-data"
import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { BlogForm } from "@/components/admin/blog-form"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const post = getAdminBlog(id)
  return { title: post ? `Admin · Edit ${post.title}` : "Admin · Edit post" }
}

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = getAdminBlog(id)
  if (!post) notFound()

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Content"
        title={`Edit · ${post.title}`}
        description={`${post.category} · by ${post.author}`}
        backHref="/admin/blog"
        backLabel="Blog"
      />
      <BlogForm mode="edit" initial={post} />
    </div>
  )
}
