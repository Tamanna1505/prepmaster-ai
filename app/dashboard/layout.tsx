import { DashboardSidebar } from "@/components/layout/dashboard-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-border/60 bg-background px-4 lg:px-8">
          <p className="text-sm text-muted-foreground">Student dashboard</p>
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-full bg-muted text-xs font-medium">
              RJ
            </span>
            <span className="hidden text-sm sm:inline">Rajan</span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-muted/10 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
