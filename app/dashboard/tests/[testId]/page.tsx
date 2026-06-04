import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { getTest } from "@/lib/test-data"
import { PageHeader } from "@/components/layout/page-header"
import { PillLink, Tag } from "@/components/marketing/primitives"
import { TestInstructions } from "@/components/tests/test-instructions"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ testId: string }>
}): Promise<Metadata> {
  const { testId } = await params
  const test = getTest(testId)
  return { title: test ? test.title : "Test" }
}

export default async function TestInstructionsPage({
  params,
}: {
  params: Promise<{ testId: string }>
}) {
  const { testId } = await params
  const test = getTest(testId)
  if (!test) notFound()

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/dashboard/tests"
          className="focus-ring inline-flex items-center gap-1 rounded font-ui text-[13px] font-medium text-cocoa transition-colors hover:text-ink"
        >
          <ChevronLeft className="size-4" strokeWidth={2} /> Mock tests
        </Link>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Tag tone="outline">{test.examTag}</Tag>
          <Tag tone="gold">{test.testType}</Tag>
          <Tag tone="teal">{test.difficulty}</Tag>
        </div>
        <div className="mt-3">
          <PageHeader
            eyebrow="Before you begin"
            title={test.title}
            description="Read the instructions and marking scheme, then start when you're ready. The timer begins the moment you start."
          />
        </div>
      </div>

      <TestInstructions test={test} />

      <div className="flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <PillLink href="/dashboard/tests" variant="outline" size="lg">
          Back to tests
        </PillLink>
        <PillLink href={`/dashboard/tests/${test.id}/attempt`} variant="gold" size="lg">
          Start test
        </PillLink>
      </div>
    </div>
  )
}
