import type { Metadata } from "next"
import { Plus } from "lucide-react"
import { PageHeader } from "@/components/layout/page-header"
import { AdminTable } from "@/components/admin/admin-table"
import { LearnMore, PillButton, Tag } from "@/components/marketing/primitives"
import { adminBlog } from "@/lib/admin-data"

export const metadata: Metadata = { title: "Admin · Blog" }

export default function AdminBlogPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Content"
        title="Blog"
        description="Author articles and toggle their publish state."
        actions={
          <PillButton type="button" variant="ink" size="md">
            <Plus className="size-4" strokeWidth={2} /> New post
          </PillButton>
        }
      />
      <AdminTable
        columns={[
          { header: "Title" },
          { header: "Category" },
          { header: "Author" },
          { header: "Published" },
          { header: "Status" },
          { header: "", align: "right" },
        ]}
        rows={adminBlog.map((p) => ({
          key: p.title,
          cells: [
            <span key="t" className="font-medium text-ink">
              {p.title}
            </span>,
            p.category,
            p.author,
            p.publishedAt
              ? new Date(p.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "—",
            <Tag key="st" tone={p.status === "Published" ? "teal" : "outline"}>
              {p.status}
            </Tag>,
            <span key="a" className="inline-flex justify-end">
              <LearnMore label="Edit" href="/admin/blog" />
            </span>,
          ],
        }))}
      />
    </div>
  )
}
