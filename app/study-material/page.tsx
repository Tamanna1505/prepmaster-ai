import type { Metadata } from "next"
import { BookOpen, Download, FileText, Notebook, type LucideIcon } from "lucide-react"
import { SiteShell } from "@/components/layout/site-shell"
import { Container, Eyebrow, LearnMore, SectionHead } from "@/components/marketing/primitives"

export const metadata: Metadata = {
  title: "Study material",
  description:
    "Curated free notes, formula sheets, and PDFs hand-picked by our content team — grouped by subject, no sign-up required.",
}

type Resource = { title: string; desc: string; icon: LucideIcon; kind: string }
type Group = { subject: string; resources: Resource[] }

const GROUPS: Group[] = [
  {
    subject: "Physics & Chemistry",
    resources: [
      {
        title: "Physics formula sheet — JEE",
        desc: "All mechanics, EM, and thermo formulas on a single printable PDF.",
        icon: FileText,
        kind: "PDF · 12 pages",
      },
      {
        title: "Organic reaction map — NEET",
        desc: "Named reactions and mechanisms arranged as a single flow map.",
        icon: Notebook,
        kind: "PDF · 18 pages",
      },
    ],
  },
  {
    subject: "Biology",
    resources: [
      {
        title: "Biology diagrams — NEET",
        desc: "High-yield labelled diagrams covering plant and animal physiology.",
        icon: Notebook,
        kind: "PDF · 38 pages",
      },
      {
        title: "Genetics quick revision",
        desc: "Inheritance patterns, problems, and shortcuts in one place.",
        icon: BookOpen,
        kind: "PDF · 14 pages",
      },
    ],
  },
  {
    subject: "Aptitude & Reasoning",
    resources: [
      {
        title: "Quant shortcuts — SSC",
        desc: "20 arithmetic shortcuts with proof and applicability conditions.",
        icon: FileText,
        kind: "PDF · 10 pages",
      },
      {
        title: "Banking reasoning patterns",
        desc: "Every IBPS/SBI reasoning puzzle pattern from the last five years.",
        icon: Notebook,
        kind: "PDF · 16 pages",
      },
      {
        title: "GATE CS cheatsheet",
        desc: "Complexity classes, common recurrences, and standard algorithms.",
        icon: FileText,
        kind: "PDF · 8 pages",
      },
    ],
  },
  {
    subject: "General Studies",
    resources: [
      {
        title: "UPSC polity quick revision",
        desc: "Articles, schedules, and amendments — one-page summaries per chapter.",
        icon: BookOpen,
        kind: "PDF · 24 pages",
      },
      {
        title: "Modern history timeline",
        desc: "1857 to 1947 as a single annotated timeline with key events.",
        icon: Notebook,
        kind: "PDF · 20 pages",
      },
    ],
  },
]

function ResourceCard({ r }: { r: Resource }) {
  const Icon = r.icon
  return (
    <div className="group flex h-full flex-col rounded-[20px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)] transition-all duration-200 ease-out hover:-translate-y-[3px] hover:shadow-card-hover">
      <div className="flex items-start justify-between">
        <span className="grid size-11 place-items-center rounded-xl bg-surface-muted text-brown">
          <Icon className="size-5" strokeWidth={1.75} />
        </span>
        <span className="font-data text-[12px] tracking-[-0.02em] text-taupe">{r.kind}</span>
      </div>
      <h3 className="mt-4 font-serif text-[19px] leading-[1.2] text-ink">{r.title}</h3>
      <p className="mt-2 flex-1 text-[14px] leading-[1.55] text-cocoa">{r.desc}</p>
      <div className="mt-5">
        <LearnMore label="Download" />
      </div>
    </div>
  )
}

export default function StudyMaterialPage() {
  return (
    <SiteShell>
      <section className="border-b border-line bg-cream-100 py-14 sm:py-16">
        <Container wide>
          <Eyebrow>Free resources</Eyebrow>
          <h1 className="mt-3 max-w-3xl font-serif text-[40px] leading-[1.04] tracking-[-0.02em] text-ink sm:text-[52px]">
            Study material, hand-picked
          </h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-[1.6] text-cocoa">
            Notes, formula sheets, and PDFs our content team actually uses. Free to download — no
            sign-up required.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 font-ui text-[14px] text-taupe">
            <Download className="size-4 text-orange" strokeWidth={1.75} /> Sample resources — live
            downloads land alongside the content system.
          </p>
        </Container>
      </section>

      <section className="bg-cream-100 py-12 sm:py-16">
        <Container wide className="space-y-14">
          {GROUPS.map((g) => (
            <div key={g.subject}>
              <SectionHead eyebrow="Subject" title={g.subject} />
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {g.resources.map((r) => (
                  <ResourceCard key={r.title} r={r} />
                ))}
              </div>
            </div>
          ))}
        </Container>
      </section>
    </SiteShell>
  )
}
