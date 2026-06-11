/**
 * Import a question-bank JSON file into the database.
 * Validates with Zod, then inserts questions (and any question sets) via Prisma.
 * Existing questions (matched by importKey) are skipped, not overwritten.
 *
 * Usage:  npm run questions:import -- <path/to/question-bank.json>
 *     or: npx tsx scripts/import-questions.ts <path/to/question-bank.json>
 *
 * Requires DATABASE_URL and an up-to-date database schema (run prisma migrate first).
 */
import "dotenv/config"
import { readFileSync } from "node:fs"
import { questionBankFileSchema, buildQuestionImportKey, buildSetImportKey, formatIssues } from "./schemas"
import { createPrismaClient, questionCreateData, questionSetCreateData } from "./db-helpers"

const prisma = createPrismaClient()

async function main() {
  const filePath = process.argv[2]
  if (!filePath) {
    console.error("✗ Provide a file path. Usage: questions:import -- <question-bank.json>")
    process.exit(1)
  }

  const json = JSON.parse(readFileSync(filePath, "utf8"))
  const parsed = questionBankFileSchema.safeParse(json)
  if (!parsed.success) {
    console.error(`✗ Validation failed (${parsed.error.issues.length} issue(s)):`)
    formatIssues(parsed.error).forEach((l) => console.error(l))
    process.exit(1)
  }

  const { questions, questionSets } = parsed.data
  console.log(`Importing from ${filePath}: ${questions.length} question(s), ${questionSets.length} set(s).`)

  // 1. Question sets → map key → id.
  const setIdByKey = new Map<string, string>()
  let setsCreated = 0
  let setsSkipped = 0
  for (const s of questionSets) {
    const importKey = buildSetImportKey(s)
    const existing = await prisma.questionSet.findUnique({ where: { importKey } })
    if (existing) {
      setIdByKey.set(s.key, existing.id)
      setsSkipped++
    } else {
      const created = await prisma.questionSet.create({ data: questionSetCreateData(s, importKey) })
      setIdByKey.set(s.key, created.id)
      setsCreated++
    }
  }

  // 2. Questions.
  let imported = 0
  let skipped = 0
  let errors = 0
  for (const q of questions) {
    try {
      const importKey = buildQuestionImportKey(q)
      const existing = await prisma.question.findUnique({ where: { importKey } })
      if (existing) {
        skipped++
        continue
      }
      const setId = q.setKey ? setIdByKey.get(q.setKey) ?? null : null
      if (q.setKey && !setId) {
        console.warn(`  ! question "${q.questionText.slice(0, 40)}…" references unknown setKey "${q.setKey}"`)
      }
      await prisma.question.create({ data: questionCreateData(q, importKey, setId) })
      imported++
    } catch (e) {
      errors++
      console.error(`  ✗ failed: ${(e as Error).message}`)
    }
  }

  console.log("\nSummary")
  console.log(`  total read:   ${questions.length}`)
  console.log(`  imported:     ${imported}`)
  console.log(`  skipped (dup):${skipped}`)
  console.log(`  errors:       ${errors}`)
  console.log(`  sets created: ${setsCreated} (skipped ${setsSkipped})`)
}

main()
  .catch((e) => {
    console.error("Import failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
