import type { Metadata } from "next"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PageHeader } from "@/components/layout/page-header"

export const metadata: Metadata = { title: "Profile" }

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Account"
        title="Profile"
        description="Manage your name, target exam, and password. Live form actions wire up in Phase 4."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <form className="space-y-4 rounded-xl border border-border/60 bg-card p-6">
          <h3 className="text-sm font-semibold">Account details</h3>
          <div className="space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Rajan" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" defaultValue="rajan@whilter.ai" disabled />
            <p className="text-xs text-muted-foreground">Email cannot be changed in MVP.</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="targetExam">Target exam</Label>
            <Input id="targetExam" defaultValue="JEE Main 2027" />
          </div>
          <button type="submit" className={buttonVariants()}>
            Save changes
          </button>
        </form>

        <form className="space-y-4 rounded-xl border border-border/60 bg-card p-6">
          <h3 className="text-sm font-semibold">Change password</h3>
          <div className="space-y-1.5">
            <Label htmlFor="currentPassword">Current password</Label>
            <Input id="currentPassword" type="password" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="newPassword">New password</Label>
            <Input id="newPassword" type="password" />
          </div>
          <button type="submit" className={buttonVariants({ variant: "outline" })}>
            Update password
          </button>
        </form>
      </div>
    </div>
  )
}
