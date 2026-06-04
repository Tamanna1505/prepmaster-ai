/* ──────────────────────────────────────────────────────────────────────────
   Phase 6 — Mock test engine sample data. Sample/static only; no DB, no auth.
   Mirrors DATABASE_MODELS.md (Question / Test / TestQuestion) with an added
   TestSection grouping (noted there as a future addition). The answer key lives
   here for the sample result analytics; `toPublicTest()` strips it before the
   attempt UI sees it, mirroring the `toPublicQuestion()` projection.
   ────────────────────────────────────────────────────────────────────────── */

export type QuestionType = "MCQ_SINGLE" | "MCQ_MULTI" | "NUMERIC"
export type Difficulty = "Easy" | "Medium" | "Hard"
export type TestType = "Full-length" | "Sectional" | "Topic drill"

export type QuestionOption = { id: string; text: string }

export type TestQuestion = {
  id: string
  sectionId: string
  type: QuestionType
  stem: string
  options?: QuestionOption[]
  correctOptionIds?: string[]
  correctNumeric?: number
  tolerance?: number
  explanation: string
  topic: string
  difficulty: Difficulty
  positiveMarks: number
  negativeMarks: number
}

/* Same shape minus the answer key — what the attempt client is allowed to see. */
export type PublicQuestion = Omit<
  TestQuestion,
  "correctOptionIds" | "correctNumeric" | "tolerance"
>

export type TestSection = {
  id: string
  name: string
  questionIds: string[]
}

export type ExamTest = {
  id: string
  title: string
  examTag: string
  testType: TestType
  difficulty: Difficulty
  durationMinutes: number
  positiveMarks: number
  negativeMarks: number
  attempts: number
  instructions: string[]
  sections: TestSection[]
  questions: TestQuestion[]
}

export type PublicTest = Omit<ExamTest, "questions" | "sections"> & {
  sections: TestSection[]
  questions: PublicQuestion[]
}

/* ── Question pool (authored once, cloned into tests with per-test ids) ─────── */

type PoolQuestion = Omit<TestQuestion, "id" | "sectionId" | "positiveMarks" | "negativeMarks">

const o = (...texts: string[]): QuestionOption[] =>
  texts.map((text, i) => ({ id: "abcd"[i], text }))

const POOL: PoolQuestion[] = [
  // Arithmetic
  {
    type: "NUMERIC",
    stem: "A train covers 60 km at 40 km/h and returns over the same route at 60 km/h. What is its average speed for the whole journey (in km/h)?",
    correctNumeric: 48,
    tolerance: 0.5,
    explanation:
      "Average speed = 2ab/(a+b) = 2·40·60 / (40+60) = 4800/100 = 48 km/h. Use the harmonic mean for equal distances, never the arithmetic mean.",
    topic: "Arithmetic",
    difficulty: "Medium",
  },
  {
    type: "MCQ_SINGLE",
    stem: "The compound interest on ₹10,000 at 10% per annum for 2 years (compounded annually) is:",
    options: o("₹2,100", "₹2,000", "₹2,200", "₹1,100"),
    correctOptionIds: ["a"],
    explanation: "A = 10000·(1.1)² = 12,100, so CI = 12,100 − 10,000 = ₹2,100.",
    topic: "Arithmetic",
    difficulty: "Easy",
  },
  {
    type: "MCQ_SINGLE",
    stem: "If 35% of a number is 84, what is the number?",
    options: o("240", "210", "260", "294"),
    correctOptionIds: ["a"],
    explanation: "Number = 84 / 0.35 = 240.",
    topic: "Arithmetic",
    difficulty: "Easy",
  },
  // Algebra
  {
    type: "MCQ_SINGLE",
    stem: "If x + 1/x = 3, then x² + 1/x² equals:",
    options: o("7", "9", "11", "5"),
    correctOptionIds: ["a"],
    explanation: "(x + 1/x)² = x² + 1/x² + 2, so x² + 1/x² = 3² − 2 = 7.",
    topic: "Algebra",
    difficulty: "Medium",
  },
  {
    type: "MCQ_SINGLE",
    stem: "The roots of x² − 5x + 6 = 0 are:",
    options: o("2 and 3", "1 and 6", "−2 and −3", "2 and −3"),
    correctOptionIds: ["a"],
    explanation: "x² − 5x + 6 = (x − 2)(x − 3), so the roots are 2 and 3.",
    topic: "Algebra",
    difficulty: "Easy",
  },
  // Number System
  {
    type: "MCQ_MULTI",
    stem: "Which of the following numbers are prime? (Select all that apply.)",
    options: o("51", "53", "57", "59"),
    correctOptionIds: ["b", "d"],
    explanation: "51 = 3·17 and 57 = 3·19 are composite. 53 and 59 are prime.",
    topic: "Number System",
    difficulty: "Medium",
  },
  {
    type: "NUMERIC",
    stem: "What is the remainder when 7^100 is divided by 4?",
    correctNumeric: 1,
    tolerance: 0,
    explanation: "7 ≡ −1 (mod 4), so 7^100 ≡ (−1)^100 = 1 (mod 4). The remainder is 1.",
    topic: "Number System",
    difficulty: "Hard",
  },
  // Data Interpretation
  {
    type: "NUMERIC",
    stem: "In a class of 40 students, 25 play cricket, 20 play football, and 10 play both. How many play neither sport?",
    correctNumeric: 5,
    tolerance: 0,
    explanation: "Played at least one = 25 + 20 − 10 = 35. Neither = 40 − 35 = 5.",
    topic: "Data Interpretation",
    difficulty: "Medium",
  },
  {
    type: "MCQ_SINGLE",
    stem: "A pie chart shows a category at 90°. What percentage of the total does it represent?",
    options: o("25%", "30%", "20%", "15%"),
    correctOptionIds: ["a"],
    explanation: "90° / 360° = 0.25 = 25%.",
    topic: "Data Interpretation",
    difficulty: "Easy",
  },
  // Logical Reasoning
  {
    type: "MCQ_SINGLE",
    stem: "A is taller than B but shorter than C. D is taller than C. Who is the tallest?",
    options: o("D", "C", "A", "B"),
    correctOptionIds: ["a"],
    explanation: "Order (tallest first): D > C > A > B, so D is the tallest.",
    topic: "Logical Reasoning",
    difficulty: "Easy",
  },
  {
    type: "NUMERIC",
    stem: "Find the next number in the series: 2, 6, 12, 20, 30, ?",
    correctNumeric: 42,
    tolerance: 0,
    explanation: "Differences are 4, 6, 8, 10, 12. So 30 + 12 = 42 (also n²+n).",
    topic: "Logical Reasoning",
    difficulty: "Medium",
  },
  {
    type: "MCQ_SINGLE",
    stem: "If 'CAT' is coded as 'DBU', how is 'DOG' coded?",
    options: o("EPH", "EPF", "CPH", "FQI"),
    correctOptionIds: ["a"],
    explanation: "Each letter shifts forward by 1: D→E, O→P, G→H, giving 'EPH'.",
    topic: "Logical Reasoning",
    difficulty: "Easy",
  },
  // Vocabulary
  {
    type: "MCQ_SINGLE",
    stem: "Choose the word most nearly OPPOSITE in meaning to 'AUGMENT':",
    options: o("Diminish", "Expand", "Enhance", "Bolster"),
    correctOptionIds: ["a"],
    explanation: "Augment means to increase. Its antonym is 'diminish'. The others are synonyms.",
    topic: "Vocabulary",
    difficulty: "Medium",
  },
  {
    type: "MCQ_SINGLE",
    stem: "Select the synonym of 'METICULOUS':",
    options: o("Careful", "Careless", "Hasty", "Vague"),
    correctOptionIds: ["a"],
    explanation: "Meticulous means showing great attention to detail — i.e. 'careful'.",
    topic: "Vocabulary",
    difficulty: "Easy",
  },
  // Grammar
  {
    type: "MCQ_SINGLE",
    stem: "Choose the grammatically correct sentence:",
    options: o(
      "Neither of the answers is correct.",
      "Neither of the answers are correct.",
      "Neither of the answer is correct.",
      "Neither of the answers were correct."
    ),
    correctOptionIds: ["a"],
    explanation: "'Neither' is singular, so it takes a singular verb: 'is'.",
    topic: "Grammar",
    difficulty: "Medium",
  },
  // Reading
  {
    type: "MCQ_SINGLE",
    stem: "Read: 'The policy, though well-intentioned, ultimately failed.' The tone of the sentence is best described as:",
    options: o("Critical", "Celebratory", "Indifferent", "Ironic"),
    correctOptionIds: ["a"],
    explanation: "Acknowledging good intent but noting failure conveys a measured, critical tone.",
    topic: "Reading",
    difficulty: "Medium",
  },
  // Physics
  {
    type: "MCQ_SINGLE",
    stem: "A point charge Q is placed at the centre of a cube. The electric flux through one face is:",
    options: o("Q / 6ε₀", "Q / ε₀", "Q / 8ε₀", "Q / 2ε₀"),
    correctOptionIds: ["a"],
    explanation: "Total flux through the cube is Q/ε₀ (Gauss's law). By symmetry each of the 6 faces gets Q/6ε₀.",
    topic: "Physics",
    difficulty: "Medium",
  },
  {
    type: "MCQ_SINGLE",
    stem: "The SI unit of magnetic flux is the:",
    options: o("Weber", "Tesla", "Henry", "Gauss"),
    correctOptionIds: ["a"],
    explanation: "Magnetic flux is measured in webers (Wb). Tesla is flux density; henry is inductance.",
    topic: "Physics",
    difficulty: "Easy",
  },
  {
    type: "NUMERIC",
    stem: "A body starts from rest and accelerates uniformly at 2 m/s². How far does it travel in 5 seconds (in metres)?",
    correctNumeric: 25,
    tolerance: 0,
    explanation: "s = ut + ½at² = 0 + ½·2·25 = 25 m.",
    topic: "Physics",
    difficulty: "Easy",
  },
  // Chemistry
  {
    type: "MCQ_MULTI",
    stem: "Which of the following are noble gases? (Select all that apply.)",
    options: o("Helium", "Nitrogen", "Argon", "Neon"),
    correctOptionIds: ["a", "c", "d"],
    explanation: "Helium, Argon and Neon are noble gases (Group 18). Nitrogen is not.",
    topic: "Chemistry",
    difficulty: "Easy",
  },
  {
    type: "MCQ_SINGLE",
    stem: "The pH of a neutral aqueous solution at 25°C is:",
    options: o("7", "0", "14", "1"),
    correctOptionIds: ["a"],
    explanation: "At 25°C a neutral solution has equal H⁺ and OH⁻, giving a pH of 7.",
    topic: "Chemistry",
    difficulty: "Easy",
  },
  {
    type: "MCQ_SINGLE",
    stem: "Which gas is released when a metal reacts with a dilute acid?",
    options: o("Hydrogen", "Oxygen", "Carbon dioxide", "Nitrogen"),
    correctOptionIds: ["a"],
    explanation: "Metal + dilute acid → salt + hydrogen gas.",
    topic: "Chemistry",
    difficulty: "Easy",
  },
  // Calculus
  {
    type: "MCQ_SINGLE",
    stem: "The derivative of sin(x) with respect to x is:",
    options: o("cos(x)", "−cos(x)", "−sin(x)", "sec²(x)"),
    correctOptionIds: ["a"],
    explanation: "d/dx [sin x] = cos x.",
    topic: "Calculus",
    difficulty: "Easy",
  },
  {
    type: "NUMERIC",
    stem: "Evaluate the definite integral of 2x from x = 0 to x = 3.",
    correctNumeric: 9,
    tolerance: 0,
    explanation: "∫2x dx = x². Evaluated from 0 to 3: 3² − 0² = 9.",
    topic: "Calculus",
    difficulty: "Medium",
  },
  // General Knowledge
  {
    type: "MCQ_SINGLE",
    stem: "The Preamble to the Indian Constitution was amended by which amendment?",
    options: o("42nd Amendment", "44th Amendment", "1st Amendment", "73rd Amendment"),
    correctOptionIds: ["a"],
    explanation: "The 42nd Amendment (1976) added 'Socialist', 'Secular' and 'Integrity' to the Preamble.",
    topic: "General Knowledge",
    difficulty: "Medium",
  },
  {
    type: "MCQ_SINGLE",
    stem: "Which planet is known as the Red Planet?",
    options: o("Mars", "Jupiter", "Venus", "Mercury"),
    correctOptionIds: ["a"],
    explanation: "Iron-oxide dust gives Mars its reddish appearance.",
    topic: "General Knowledge",
    difficulty: "Easy",
  },
]

function poolByTopics(topics: string[]): PoolQuestion[] {
  const pick = POOL.filter((q) => topics.includes(q.topic))
  return pick.length ? pick : POOL
}

/* ── Test specs → generated tests ──────────────────────────────────────────── */

type SectionSpec = { name: string; topics: string[]; count: number }
type TestSpec = {
  id: string
  title: string
  examTag: string
  testType: TestType
  difficulty: Difficulty
  durationMinutes: number
  positiveMarks: number
  negativeMarks: number
  attempts: number
  sections: SectionSpec[]
}

const DEFAULT_INSTRUCTIONS = (test: { durationMinutes: number; negativeMarks: number }) => [
  `The test is ${test.durationMinutes} minutes long. The timer starts the moment you begin and the test auto-submits when it ends.`,
  "Each question carries the marks shown in its section. Incorrect answers attract negative marking where indicated.",
  `Negative marking: ${test.negativeMarks < 0 ? `${test.negativeMarks} for a wrong answer` : "none for this test"}. Unattempted questions score zero.`,
  "Use the question palette to navigate. Save & Next records your answer; Mark for Review flags a question to revisit.",
  "Do not refresh or close the tab during the attempt — your progress is auto-saved every few seconds (simulated in this build).",
  "Once you submit, the attempt is final and an AI analysis is generated instantly.",
]

const SPECS: TestSpec[] = [
  {
    id: "cat-quant-full-01",
    title: "CAT Quant — Full Mock #01",
    examTag: "CAT",
    testType: "Full-length",
    difficulty: "Hard",
    durationMinutes: 40,
    positiveMarks: 3,
    negativeMarks: -1,
    attempts: 4120,
    sections: [
      { name: "Quantitative Aptitude", topics: ["Arithmetic", "Algebra", "Number System"], count: 4 },
      { name: "Data Interpretation & LR", topics: ["Data Interpretation", "Logical Reasoning"], count: 4 },
    ],
  },
  {
    id: "cat-varc-sectional",
    title: "CAT VARC — Sectional #03",
    examTag: "CAT",
    testType: "Sectional",
    difficulty: "Medium",
    durationMinutes: 40,
    positiveMarks: 3,
    negativeMarks: -1,
    attempts: 2890,
    sections: [{ name: "Verbal Ability & RC", topics: ["Vocabulary", "Grammar", "Reading"], count: 4 }],
  },
  {
    id: "aptitude-speed-drill",
    title: "Aptitude — Speed Drill #09",
    examTag: "Aptitude",
    testType: "Topic drill",
    difficulty: "Easy",
    durationMinutes: 20,
    positiveMarks: 1,
    negativeMarks: 0,
    attempts: 5310,
    sections: [{ name: "Mixed Aptitude", topics: ["Arithmetic", "Logical Reasoning", "Number System"], count: 5 }],
  },
  {
    id: "jee-main-full-01",
    title: "JEE Main — Full Mock #01",
    examTag: "JEE",
    testType: "Full-length",
    difficulty: "Hard",
    durationMinutes: 60,
    positiveMarks: 4,
    negativeMarks: -1,
    attempts: 3412,
    sections: [
      { name: "Physics", topics: ["Physics"], count: 3 },
      { name: "Chemistry", topics: ["Chemistry"], count: 3 },
      { name: "Mathematics", topics: ["Calculus", "Algebra"], count: 3 },
    ],
  },
  {
    id: "cuet-general-01",
    title: "CUET — General Test #02",
    examTag: "CUET",
    testType: "Full-length",
    difficulty: "Medium",
    durationMinutes: 45,
    positiveMarks: 5,
    negativeMarks: -1,
    attempts: 1980,
    sections: [
      { name: "General Test", topics: ["General Knowledge", "Arithmetic"], count: 4 },
      { name: "Reasoning", topics: ["Logical Reasoning", "Data Interpretation"], count: 3 },
    ],
  },
  {
    id: "mba-reasoning-sectional",
    title: "MBA Entrance — Reasoning #05",
    examTag: "MBA Entrance",
    testType: "Sectional",
    difficulty: "Medium",
    durationMinutes: 30,
    positiveMarks: 2,
    negativeMarks: -0.5,
    attempts: 1240,
    sections: [{ name: "Logical Reasoning", topics: ["Logical Reasoning", "Data Interpretation"], count: 5 }],
  },
]

function buildTest(spec: TestSpec): ExamTest {
  const questions: TestQuestion[] = []
  const sections: TestSection[] = spec.sections.map((s, si) => {
    const sectionId = `${spec.id}-s${si + 1}`
    const pool = poolByTopics(s.topics)
    const questionIds: string[] = []
    for (let n = 0; n < s.count; n++) {
      const base = pool[n % pool.length]
      const id = `${sectionId}-q${n + 1}`
      questions.push({
        ...base,
        id,
        sectionId,
        positiveMarks: spec.positiveMarks,
        negativeMarks: spec.negativeMarks,
      })
      questionIds.push(id)
    }
    return { id: sectionId, name: s.name, questionIds }
  })

  return {
    id: spec.id,
    title: spec.title,
    examTag: spec.examTag,
    testType: spec.testType,
    difficulty: spec.difficulty,
    durationMinutes: spec.durationMinutes,
    positiveMarks: spec.positiveMarks,
    negativeMarks: spec.negativeMarks,
    attempts: spec.attempts,
    instructions: DEFAULT_INSTRUCTIONS(spec),
    sections,
    questions,
  }
}

export const examTests: ExamTest[] = SPECS.map(buildTest)

export function getTest(id: string): ExamTest | undefined {
  return examTests.find((t) => t.id === id)
}

export function testTotals(test: ExamTest) {
  const totalQuestions = test.questions.length
  const totalMarks = test.questions.reduce((s, q) => s + q.positiveMarks, 0)
  return { totalQuestions, totalMarks, sectionCount: test.sections.length }
}

export function questionsForSection(test: ExamTest, sectionId: string): TestQuestion[] {
  return test.questions.filter((q) => q.sectionId === sectionId)
}

/* Strip the answer key before handing a test to the attempt client. */
export function toPublicTest(test: ExamTest): PublicTest {
  return {
    ...test,
    questions: test.questions.map(
      (q): PublicQuestion => ({
        id: q.id,
        sectionId: q.sectionId,
        type: q.type,
        stem: q.stem,
        options: q.options,
        explanation: q.explanation,
        topic: q.topic,
        difficulty: q.difficulty,
        positiveMarks: q.positiveMarks,
        negativeMarks: q.negativeMarks,
      })
    ),
  }
}

/* Filter option lists (derived). */
export const EXAM_TYPES = ["All", ...Array.from(new Set(examTests.map((t) => t.examTag)))]
export const TEST_TYPES: ("All" | TestType)[] = ["All", "Full-length", "Sectional", "Topic drill"]
export const DIFFICULTIES: ("All" | Difficulty)[] = ["All", "Easy", "Medium", "Hard"]
