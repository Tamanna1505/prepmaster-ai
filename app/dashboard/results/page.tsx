import type { Metadata } from "next"
import { Trophy } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/layout/page-header"

export const metadata: Metadata = { title: "Results" }

const SAMPLE_RESULTS = [
  {
    id: "att-1",
    test: "JEE Physics — Full Mock #14",
    date: "2026-05-22",
    score: "182 / 240",
    accuracy: "76%",
    status: "Submitted",
  },
  {
    id: "att-2",
    test: "NEET Biology — Topic Test",
    date: "2026-05-19",
    score: "68 / 90",
    accuracy: "75%",
    status: "Submitted",
  },
  {
    id: "att-3",
    test: "JEE Main — Full Mock #01",
    date: "2026-05-16",
    score: "158 / 240",
    accuracy: "66%",
    status: "Auto-submitted",
  },
]

export default function ResultsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="History"
        title="Results"
        description="All your submitted mock tests with score and AI feedback. Live data lands in Phase 7."
      />
      <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Test</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Accuracy</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {SAMPLE_RESULTS.map((r) => (
              <tr key={r.id} className="hover:bg-muted/30">
                <td className="px-4 py-3 font-medium">{r.test}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.date}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1">
                    <Trophy className="size-3.5 text-amber-500" /> {r.score}
                  </span>
                </td>
                <td className="px-4 py-3">{r.accuracy}</td>
                <td className="px-4 py-3">
                  <Badge variant="outline">{r.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
