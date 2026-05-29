import { AdminSidebar } from "@/components/layout/admin-sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-border/60 bg-background px-4 lg:px-8">
          <p className="text-sm text-muted-foreground">Admin</p>
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-full bg-muted text-xs font-medium">
              AD
            </span>
            <span className="hidden text-sm sm:inline">Admin</span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-muted/10 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
