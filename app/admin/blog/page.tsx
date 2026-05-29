import type { Metadata } from "next"
import { Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { PageHeader } from "@/components/layout/page-header"
import { blogPosts } from "@/lib/sample-data"

export const metadata: Metadata = { title: "Admin · Blog" }

export default function AdminBlogPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Content"
        title="Blog"
        description="Author articles and toggle publish state. Editor wires up in Phase 8."
        actions={
          <button type="button" className={buttonVariants({ size: "sm" })}>
            <Plus className="size-3.5" /> New post
          </button>
        }
      />
      <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Author</th>
              <th className="px-5 py-3">Published</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {blogPosts.map((p) => (
              <tr key={p.slug} className="hover:bg-muted/30">
                <td className="px-5 py-3 font-medium">{p.title}</td>
                <td className="px-5 py-3 text-muted-foreground">{p.category}</td>
                <td className="px-5 py-3 text-muted-foreground">{p.author}</td>
                <td className="px-5 py-3 text-muted-foreground">{p.publishedAt}</td>
                <td className="px-5 py-3">
                  <Badge variant="secondary">Published</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
