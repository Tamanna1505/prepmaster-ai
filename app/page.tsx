import Link from "next/link"
import {
  ArrowRight,
  Brain,
  GraduationCap,
  LineChart,
  Sparkles,
  Target,
  Timer,
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { CourseCard } from "@/components/courses/course-card"
import { FeatureCard } from "@/components/marketing/feature-card"
import { TestimonialCard } from "@/components/marketing/testimonial-card"
import { SiteShell } from "@/components/layout/site-shell"
import { courses, faqs, testimonials, whyChoose } from "@/lib/sample-data"

export default function HomePage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-20 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-6">
            <Badge variant="secondary" className="gap-1.5">
              <Sparkles className="size-3.5" /> AI-powered exam prep
            </Badge>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              Stop revising.{" "}
              <span className="text-primary">Start improving.</span>
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              PrepMaster AI bundles structured courses, exam-grade mock tests, and AI feedback that
              turns every attempt into a clear, named next step.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/register" className={buttonVariants({ size: "lg" })}>
                Get started free
              </Link>
              <Link
                href="/courses"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                Browse courses
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <GraduationCap className="size-4" /> JEE · NEET · UPSC · GATE
              </span>
              <span className="flex items-center gap-2">
                <Timer className="size-4" /> Realistic test UI
              </span>
              <span className="flex items-center gap-2">
                <Brain className="size-4" /> AI-driven feedback
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
            <div className="rounded-xl bg-muted/30 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Mock attempt · JEE Physics #14
                </p>
                <Badge variant="outline">Submitted</Badge>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg border border-border/60 bg-background p-3">
                  <p className="text-xs text-muted-foreground">Score</p>
                  <p className="mt-1 text-xl font-semibold">182 / 240</p>
                </div>
                <div className="rounded-lg border border-border/60 bg-background p-3">
                  <p className="text-xs text-muted-foreground">Accuracy</p>
                  <p className="mt-1 text-xl font-semibold">76%</p>
                </div>
                <div className="rounded-lg border border-border/60 bg-background p-3">
                  <p className="text-xs text-muted-foreground">Time used</p>
                  <p className="mt-1 text-xl font-semibold">154m</p>
                </div>
              </div>
              <div className="mt-4 rounded-lg border border-border/60 bg-background p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  AI feedback
                </p>
                <p className="mt-2 text-sm leading-relaxed">
                  Strong on mechanics (84% accuracy). Lost most points in{" "}
                  <span className="font-medium text-foreground">
                    Electrostatics — Gauss law
                  </span>
                  . Next: revise Lesson 4.3, then retake the topic test.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured courses */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Featured
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Courses built around the syllabus
            </h2>
          </div>
          <Link
            href="/courses"
            className="hidden text-sm font-medium text-primary hover:underline sm:inline-flex sm:items-center sm:gap-1"
          >
            View all <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 3).map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      </section>

      {/* Mock test CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-16">
        <div className="flex flex-col items-start gap-6 rounded-2xl border border-border/60 bg-gradient-to-br from-primary/5 via-background to-background p-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2 md:max-w-xl">
            <Badge variant="outline" className="gap-1.5">
              <Target className="size-3.5" /> Exam-grade mock UI
            </Badge>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Practice on the same UI you&apos;ll see on exam day
            </h2>
            <p className="text-sm text-muted-foreground sm:text-base">
              Global timer, navigation grid, mark-for-review, auto-submit — the affordances you
              actually need under pressure.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/mock-tests" className={buttonVariants({ size: "lg" })}>
              Browse mock tests
            </Link>
            <Link
              href="/register"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Create account
            </Link>
          </div>
        </div>
      </section>

      {/* AI analytics */}
      <section className="border-y border-border/60 bg-muted/20">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Analytics + AI
            </p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Know exactly where you&apos;re losing marks
            </h2>
            <p className="text-base text-muted-foreground">
              Topic-wise accuracy, time per question, and trend over the last 10 attempts — followed
              by a short, actionable plan written by Claude for that exact attempt.
            </p>
            <ul className="space-y-2 text-sm">
              {[
                "Topic mastery heatmap",
                "Question-by-question review with explanations",
                "Time-management chart per section",
                "AI-named weak topics with revision links",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <span className="mt-1 grid size-4 place-items-center rounded-full bg-primary/15 text-primary">
                    <span className="size-1.5 rounded-full bg-primary" />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <div className="space-y-3">
              <div className="rounded-lg border border-border/60 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Topic mastery
                  </p>
                  <LineChart className="size-4 text-muted-foreground" />
                </div>
                {[
                  { topic: "Mechanics", pct: 84 },
                  { topic: "Thermodynamics", pct: 71 },
                  { topic: "Electrostatics", pct: 52 },
                  { topic: "Modern Physics", pct: 66 },
                ].map((t) => (
                  <div key={t.topic} className="mb-2 last:mb-0">
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="font-medium">{t.topic}</span>
                      <span className="text-muted-foreground">{t.pct}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${t.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-border/60 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Suggested next step
                </p>
                <p className="mt-2 text-sm">
                  Take{" "}
                  <span className="font-medium">Electrostatics — Topic Test #3</span> after revising
                  Lesson 4.3 (Gauss law).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16">
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Why PrepMaster AI
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            What makes the difference
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {whyChoose.map((w) => (
            <FeatureCard
              key={w.title}
              icon={w.icon}
              title={w.title}
              description={w.description}
            />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border/60 bg-muted/20">
        <div className="mx-auto w-full max-w-6xl px-4 py-16">
          <div className="mb-8">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Students
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              From plateau to placement
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-3xl px-4 py-16">
        <div className="mb-6 text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            FAQ
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Common questions
          </h2>
        </div>
        <Accordion className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={f.question} value={`q-${i}`}>
              <AccordionTrigger className="text-left text-sm sm:text-base">
                {f.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {f.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </SiteShell>
  )
}
