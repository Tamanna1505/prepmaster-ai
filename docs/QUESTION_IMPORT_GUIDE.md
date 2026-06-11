# Question Import Guide

How to bring **officially sourced** JEE Main and CAT previous-year questions into the PrepMaster AI question bank — safely, in small validated batches — and how to assemble full papers.

See also: [`QUESTION_TAXONOMY.md`](./QUESTION_TAXONOMY.md) for allowed categories and naming rules, and [`../BACKEND_PLAN.md`](../BACKEND_PLAN.md) for the data model.

---

## 1. Sourcing rules (read first)

- ✅ Use **official previous-year papers** and **official answer keys** (e.g. the exam conducting body's released PDFs).
- ✅ Always record `sourceName` and `sourceUrl` pointing at the official source.
- ❌ Do **not** scrape websites.
- ❌ Do **not** copy paid or coaching-center material, solutions, or question wording from third-party books/portals.
- ❌ Do **not** commit large copyrighted datasets to the repo.
- When in doubt, rewrite the question in your own words from the official source, or skip it.

The `example-*.json` files under `data/imports/processed/` are **original demo questions**, not real exam questions — use them to learn the format only.

---

## 2. Folder layout

```
data/imports/
├── raw/{jee,cat}/        # your working notes from official papers (git-ignored content)
├── processed/{jee,cat}/  # validated, import-ready JSON
└── templates/            # blank templates to copy
```

Workflow per batch: **source → convert to JSON → validate → import.**

---

## 3. Two file formats

### a) Question bank (subject-wise / topic-wise)

`type: "question-bank"` — a flat list of categorized questions, optionally with grouped `questionSets` (for CAT RC/DILR). Use this for use cases like "practice only JEE Physics" or "CAT QA topic-wise".

Copy `templates/question-bank-template.json`. Each question carries its full metadata (exam, subject, topic, source, marks, etc.).

### b) Full paper

`type: "full-paper"` — a `test` plus ordered `sections`, each containing embedded questions (or `{ "ref": "<importKey>" }` references to already-imported questions). Use this for "attempt a full JEE paper" or "full CAT slot paper".

Copy `templates/full-paper-template.json`.
- **JEE** sections: `Physics`, `Chemistry`, `Mathematics`.
- **CAT** sections: `VARC`, `DILR`, `QA`.

---

## 4. Converting official questions to JSON

For each question, fill the fields from the official paper + answer key:

- `exam`, `subject`, `topic` (+ optional `subtopic`) — from [`QUESTION_TAXONOMY.md`](./QUESTION_TAXONOMY.md).
- `year`, `session`/`slot`, `shift`, `questionNumber`, `paperName` — paper provenance.
- `questionType`: `SINGLE_CORRECT` or `NUMERIC`.
- `questionText`, and for `SINGLE_CORRECT`: `optionA`–`optionD` + `correctAnswer` (`"A"`–`"D"`). For `NUMERIC`: `correctAnswer` is the value, with optional `tolerance`.
- `explanation`, `difficulty`, `marks`, `negativeMarks` (the penalty magnitude as a **positive** number; the importer stores it negated).
- `sourceName`, `sourceUrl` (required).

### Math: use LaTeX or Markdown

Write formulas as LaTeX inside the text, e.g. `"$v = u + at$"` or `"\\frac{1}{2}mv^2"`. Keep it as plain text in the JSON string. The UI can render LaTeX later.

### Images: only when necessary

Use `imageUrl` (and `solutionImageUrl`) **only** for genuine diagrams/figures that can't be expressed as text. Prefer text/LaTeX. Host images yourself or use the official URL — do not hotlink coaching content.

### CAT RC / DILR grouped sets

1. Define the shared passage/table once in top-level `questionSets` with a `key`, `setType` (`RC_PASSAGE` or `DILR_SET`), and `content`.
2. On each question in that set, add `"setKey": "<the set's key>"`.

See `data/imports/processed/cat/example-cat-dilr-set.json`.

---

## 5. Validate before importing

Always validate first — it never touches the database:

```bash
npm run questions:validate -- data/imports/processed/jee/example-jee-physics-questions.json
npm run questions:validate -- data/imports/processed/jee/example-jee-full-paper.json
```

Fix any reported issues (it prints `path: message` for each). Start with **small batches** (5–20 questions) so errors are easy to trace.

---

## 6. Import

> Requires `DATABASE_URL` set and the database migrated (`npx prisma migrate dev`). See [`DEPLOYMENT_GUIDE.md`](../DEPLOYMENT_GUIDE.md).

### Subject-wise questions

```bash
npm run questions:import -- data/imports/processed/jee/example-jee-physics-questions.json
npm run questions:import -- data/imports/processed/cat/example-cat-qa-questions.json
npm run questions:import -- data/imports/processed/cat/example-cat-dilr-set.json
```

Prints a summary: total read, imported, skipped (duplicates), errors. Re-running is safe — questions already present (same `importKey`) are skipped, not duplicated.

### Full papers

```bash
npm run paper:import -- data/imports/processed/jee/example-jee-full-paper.json
npm run paper:import -- data/imports/processed/cat/example-cat-full-paper.json
```

Creates/updates the `Test`, creates any embedded questions that don't exist yet, and links them in order with section info. Re-running rebuilds the paper's question links idempotently.

---

## 7. Recommended order for a real batch

1. Import subject-wise question banks first (Physics, Chemistry, Maths / VARC, DILR, QA). This populates the bank for topic-wise practice.
2. Import full papers. Embedded questions reuse anything already imported (matched by `importKey`); new ones are created.
3. Spot-check in Prisma Studio (`npm run db:studio`).

---

## 8. Troubleshooting

| Symptom | Fix |
| --- | --- |
| `Validation failed … correctAnswer must be one of A, B, C, D` | For `SINGLE_CORRECT`, `correctAnswer` must be a letter; options A–D required. |
| `correctAnswer must be a numeric string for NUMERIC` | For `NUMERIC`, set `correctAnswer` to a number like `"42"`. |
| `references unknown setKey` | The `setKey` on a question doesn't match any `questionSets[].key` in the same file. |
| `referenced question not found` (paper import) | A `{ "ref": ... }` points at an `importKey` that hasn't been imported yet — import that question first, or embed it. |
| `The table public.Question does not exist` | Run the migration first: `npx prisma migrate dev`. |
| `Connection url is empty` | Set `DATABASE_URL` in `.env` (see `.env.example`). |
