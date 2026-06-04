import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-cream-100 font-ui text-ink">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
