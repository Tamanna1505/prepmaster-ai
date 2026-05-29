import type { Metadata } from "next"
import { Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { PageHeader } from "@/components/layout/page-header"

export const metadata: Metadata = { title: "Admin · Questions" }

const SAMPLE_QUESTIONS = [
  {
    id: "q-1",
    stem: "Two point charges +q and -q are placed at distance 2a apart...",
    topic: "Electrostatics",
    difficulty: "Hard",
    type: "MCQ_SINGLE",
  },
  {
    id: "q-2",
    stem: "A wire of length L carries a current I in a uniform magnetic field...",
    topic: "Magnetism",
    difficulty: "Medium",
    type: "MCQ_SINGLE",
  },
  {
    id: "q-3",
    stem: "Calculate the de Broglie wavelength of an electron accelerated through...",
    topic: "Modern Physics",
    difficulty: "Medium",
    type: "NUMERIC",
  },
  {
    id: "q-4",
    stem: "Which of the following are isotopes of carbon?",
    topic: "Chemistry",
    difficulty: "Easy",
    type: "MCQ_MULTI",
  },
  {
    id: "q-5",
    stem: "A satellite orbits Earth at a height of 600 km. Find its orbital velocity...",
    topic: "Mechanics",
    difficulty: "Hard",
    type: "NUMERIC",
  },
]

export default function AdminQuestionsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Content"
        title="Question bank"
        description="Reusable questions across mock tests. Filtering and CRUD wire up in Phase 8."
        actions={
          <button type="button" className={buttonVariants({ size: "sm" })}>
            <Plus className="size-3.5" /> New question
          </button>
        }
      />
      <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-3">Stem</th>
              <th className="px-5 py-3">Topic</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Difficulty</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {SAMPLE_QUESTIONS.map((q) => (
              <tr key={q.id} className="hover:bg-muted/30">
                <td className="line-clamp-1 max-w-md px-5 py-3 font-medium">{q.stem}</td>
                <td className="px-5 py-3 text-muted-foreground">{q.topic}</td>
                <td className="px-5 py-3">
                  <Badge variant="outline">{q.type}</Badge>
                </td>
                <td className="px-5 py-3">
                  <Badge variant="secondary">{q.difficulty}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
