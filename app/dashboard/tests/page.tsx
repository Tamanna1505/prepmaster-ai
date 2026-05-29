import type { Metadata } from "next"
import { CheckCircle2, Hourglass } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/layout/page-header"
import { EmptyState } from "@/components/shared/empty-state"
import { MockTestCard } from "@/components/tests/mock-test-card"
import { mockTests } from "@/lib/sample-data"

export const metadata: Metadata = { title: "Mock tests" }

export default function MyTestsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Practice"
        title="Mock tests"
        description="Attempt full-length and topic-wise tests. Resume in-progress attempts where you left off."
      />
      <Tabs defaultValue="available">
        <TabsList>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="in-progress">In progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="available" className="mt-4">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {mockTests.map((t) => (
              <MockTestCard key={t.slug} test={t} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="in-progress" className="mt-4">
          <EmptyState
            icon={Hourglass}
            title="No tests in progress"
            description="When you start a test and leave it incomplete, it'll appear here so you can resume."
          />
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          <EmptyState
            icon={CheckCircle2}
            title="No completed tests yet"
            description="Your submitted attempts will appear here with score and AI feedback."
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
