import { notFound } from "next/navigation"
import { getTest, toPublicTest } from "@/lib/test-data"
import { resultIdForTest } from "@/lib/result-data"
import { TestRunner } from "@/components/tests/test-runner"

export default async function TestAttemptPage({
  params,
}: {
  params: Promise<{ testId: string }>
}) {
  const { testId } = await params
  const test = getTest(testId)
  if (!test) notFound()

  // Strip the answer key before the attempt UI sees the test.
  const publicTest = toPublicTest(test)
  const resultHref = `/dashboard/results/${resultIdForTest(test.id)}`

  return <TestRunner test={publicTest} resultHref={resultHref} />
}
