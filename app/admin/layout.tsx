import { AdminSidebar } from "@/components/layout/admin-sidebar"
import { getCurrentUser } from "@/lib/auth"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()
  return (
    <div className="min-h-screen bg-cream-100 font-ui text-ink lg:flex">
      <AdminSidebar user={user?.name ? { name: user.name } : undefined} />
      <div className="min-w-0 flex-1">
        <main className="mx-auto max-w-[1200px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  )
}
