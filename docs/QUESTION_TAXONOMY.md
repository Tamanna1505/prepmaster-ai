# Question Taxonomy

The allowed categorization for the PrepMaster AI question bank. Keep `exam`, `subject`, `questionType`, and `difficulty` to the exact enum values below (the importer rejects anything else). `topic` is free text but should be picked from the suggested lists for consistency; `subtopic` is optional and free text.

---

## Exams (`exam`)

| Value | Exam |
| --- | --- |
| `JEE_MAIN` | JEE Main |
| `CAT` | CAT |

## Subjects / sections (`subject`)

| Value | Used by |
| --- | --- |
| `PHYSICS` | JEE_MAIN |
| `CHEMISTRY` | JEE_MAIN |
| `MATHEMATICS` | JEE_MAIN |
| `VARC` | CAT — Verbal Ability & Reading Comprehension |
| `DILR` | CAT — Data Interpretation & Logical Reasoning |
| `QA` | CAT — Quantitative Ability |

## Question types (`questionType`)

| Value | Meaning |
| --- | --- |
| `SINGLE_CORRECT` | One correct option (A–D). |
| `NUMERIC` | Numeric answer (integer/decimal); `correctAnswer` is the value, optional `tolerance`. |

## Difficulty (`difficulty`)

`EASY` · `MEDIUM` · `HARD`

---

## JEE topics

### PHYSICS
- Mechanics
- Thermodynamics
- Waves and Oscillations
- Electromagnetism
- Optics
- Modern Physics
- Electrostatics
- Current Electricity

### CHEMISTRY
- Physical Chemistry
- Organic Chemistry
- Inorganic Chemistry
- Atomic Structure
- Chemical Bonding
- Thermodynamics
- Equilibrium
- Periodic Table

### MATHEMATICS
- Algebra
- Calculus
- Coordinate Geometry
- Trigonometry
- Vectors and 3D Geometry
- Probability and Statistics
- Sequences and Series
- Matrices and Determinants

---

## CAT topics

### VARC
- Reading Comprehension
- Para Jumbles
- Para Summary
- Sentence Completion
- Vocabulary
- Grammar
- Critical Reasoning

### DILR
- Data Interpretation
- Logical Reasoning
- Arrangements
- Puzzles
- Tables and Graphs
- Games and Tournaments

### QA
- Arithmetic
- Algebra
- Geometry
- Number System
- Modern Maths
- Mensuration

> CAT **RC passages** and **DILR sets** that share a passage / table must be grouped using a `QuestionSet` (`setType` = `RC_PASSAGE` or `DILR_SET`) and referenced from each question via `setKey`. Standalone questions use no set (or `STANDALONE`).

---

## Naming rules for source / paper metadata

Use these consistently so dedupe keys and filters work well. All are optional except where a script needs them, but fill in as many as you can.

| Field | Rule | Examples |
| --- | --- | --- |
| `year` | 4-digit integer of the exam year. | `2024`, `2023` |
| `session` | JEE sitting month, UPPERCASE. Use `DEMO` for non-official demo content. | `JANUARY`, `APRIL`, `DEMO` |
| `shift` | JEE shift label, title case. | `Shift 1`, `Shift 2` |
| `slot` | CAT slot label, title case. | `Slot 1`, `Slot 2`, `Slot 3` |
| `paperName` | Optional human-readable paper name. | `JEE Main 2024 January Shift 1` |
| `questionNumber` | Integer position in the official paper. Used for dedupe; include it when known. | `12`, `34` |
| `sourceName` | Name of the **official** source. Never a coaching brand. | `Official JEE Main Question Paper`, `Official CAT Question Paper` |
| `sourceUrl` | URL of the official source (paper / answer key). | `https://jeemain.nta.ac.in/...` |
| `sourceYear` | Optional; year of the source if different from `year`. | `2024` |

### Dedupe key (informational)

The importer derives a stable `importKey` per question from:

```
exam | year | (session or slot) | shift | subject | Q<questionNumber>
```

If `questionNumber` is missing, a short hash of the question text is used instead. Keep your metadata consistent so re-imports skip duplicates instead of creating them.
