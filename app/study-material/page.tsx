import type { Metadata } from "next"
import { BookOpen, Download, FileText, Notebook } from "lucide-react"
import { PageHeader } from "@/components/layout/page-header"
import { SiteShell } from "@/components/layout/site-shell"

export const metadata: Metadata = {
  title: "Study material",
  description: "Curated free notes, formula sheets, and PDFs.",
}

const RESOURCES = [
  {
    title: "Physics formula sheet — JEE",
    desc: "All mechanics, EM, and thermo formulas on a single printable PDF.",
    icon: FileText,
    kind: "PDF · 12 pages",
  },
  {
    title: "Biology diagrams — NEET",
    desc: "High-yield labelled diagrams covering plant and animal physiology.",
    icon: Notebook,
    kind: "PDF · 38 pages",
  },
  {
    title: "UPSC polity quick revision",
    desc: "Articles, schedules, and amendments — one-page summaries per chapter.",
    icon: BookOpen,
    kind: "PDF · 24 pages",
  },
  {
    title: "Quant shortcuts — SSC",
    desc: "20 arithmetic shortcuts with proof and applicability conditions.",
    icon: FileText,
    kind: "PDF · 10 pages",
  },
  {
    title: "GATE CS cheatsheet",
    desc: "Complexity classes, common recurrences, and standard algorithms.",
    icon: Notebook,
    kind: "PDF · 8 pages",
  },
  {
    title: "Banking reasoning patterns",
    desc: "Every IBPS/SBI reasoning puzzle pattern from the last 5 years.",
    icon: FileText,
    kind: "PDF · 16 pages",
  },
]

export default function StudyMaterialPage() {
  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <PageHeader
          eyebrow="Free resources"
          title="Study material"
          description="Notes, formula sheets, and PDFs hand-picked by our content team. Free to download — no sign-up required."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((r) => {
            const Icon = r.icon
            return (
              <div
                key={r.title}
                className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card p-5"
              >
                <div className="flex items-start justify-between">
                  <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-xs text-muted-foreground">{r.kind}</span>
                </div>
                <h3 className="text-base font-semibold leading-snug">{r.title}</h3>
                <p className="text-sm text-muted-foreground">{r.desc}</p>
                <button
                  type="button"
                  className="mt-auto inline-flex items-center justify-center gap-2 rounded-md border border-border/60 px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  <Download className="size-4" /> Download
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </SiteShell>
  )
}
