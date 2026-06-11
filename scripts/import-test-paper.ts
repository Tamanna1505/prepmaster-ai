/**
 * Import a full-paper JSON file into the database as a Test.
 * Validates with Zod, upserts the Test, creates embedded questions (and any
 * question sets) if not already present, and links them via TestQuestion in the
 * original order, preserving section information.
 *
 * Supports JEE sections (Physics / Chemistry / Mathematics) and CAT sections
 * (VARC / DILR / QA), including DILR/RC grouped sets.
 *
 * Usage:  npm run paper:import -- <path/to/full-paper.json>
 *     or: npx tsx scripts/import-test-paper.ts <path/to/full-paper.json>
 *
 * Requires DATABASE_URL and an up-to-date database schema (run prisma migrate first).
 */
import "dotenv/config"
import { readFileSync } from "node:fs"
import {
  fullPaperFileSchema,
  buildQuestionImportKey,
  buildSetImportKey,
  formatIssues,
} from "./schemas"
import { createPrismaClient, questionCreateData, questionSetCreateData } from "./db-helpers"

const prisma = createPrismaClient()

async function main() {
  const filePath = process.argv[2]
  if (!filePath) {
    console.error("✗ Provide a file path. Usage: paper:import -- <full-paper.json>")
    process.exit(1)
  }

  const json = JSON.parse(readFileSync(filePath, "utf8"))
  const parsed = fullPaperFileSchema.safeParse(json)
  if (!parsed.success) {
    console.error(`✗ Validation failed (${parsed.error.issues.length} issue(s)):`)
    formatIssues(parsed.error).forEach((l) => console.error(l))
    process.exit(1)
  }

  const { test, sections, questionSets } = parsed.data
  console.log(`Importing paper "${test.title}" (${test.slug}) — ${sections.length} section(s).`)

  // 1. Question sets → map key → id.
  const setIdByKey = new Map<string, string>()
  for (const s of questionSets) {
    const importKey = buildSetImportKey(s)
    const existing = await prisma.questionSet.findUnique({ where: { importKey } })
    setIdByKey.set(s.key, existing?.id ?? (await prisma.questionSet.create({ data: questionSetCreateData(s, importKey) })).id)
  }

  // 2. Upsert the Test.
  const testData = {
    title: test.title,
    description: test.description ?? "",
    exam: test.exam,
    examTag: test.exam,
    year: test.year ?? null,
    session: test.session ?? null,
    shift: test.shift ?? null,
    slot: test.slot ?? null,
    testType: test.testType,
    durationMinutes: test.durationMinutes,
    difficulty: test.difficulty,
    positiveMarks: test.positiveMarks,
    negativeMarks: -Math.abs(test.negativeMarks),
    status: test.status,
  }
  const testRow = await prisma.test.upsert({
    where: { slug: test.slug },
    update: testData,
    create: { slug: test.slug, ...testData },
  })

  // Rebuild the test's question links for idempotency.
  await prisma.testQuestion.deleteMany({ where: { testId: testRow.id } })

  // 3. Link questions in order, preserving sections.
  let order = 0
  let created = 0
  let reused = 0
  let linked = 0
  let errors = 0
  let totalMarks = 0
  const linkedQuestionIds = new Set<string>()

  for (const section of sections) {
    for (const item of section.questions) {
      try {
        let questionId: string
        let marks: number
        let negative: number

        if ("ref" in item) {
          const found = await prisma.question.findUnique({ where: { importKey: item.ref } })
          if (!found) {
            console.error(`  ✗ section "${section.name}": referenced question not found: ${item.ref}`)
            errors++
            continue
          }
          questionId = found.id
          marks = found.defaultPositiveMarks
          negative = found.defaultNegativeMarks
          reused++
        } else {
          const importKey = buildQuestionImportKey(item)
          const existing = await prisma.question.findUnique({ where: { importKey } })
          if (existing) {
            questionId = existing.id
            reused++
          } else {
            const setId = item.setKey ? setIdByKey.get(item.setKey) ?? null : null
            const q = await prisma.question.create({ data: questionCreateData(item, importKey, setId) })
            questionId = q.id
            created++
          }
          marks = item.marks
          negative = -Math.abs(item.negativeMarks)
        }

        if (linkedQuestionIds.has(questionId)) {
          console.warn(`  ! skipping duplicate question in paper (already linked): ${questionId}`)
          continue
        }
        linkedQuestionIds.add(questionId)

        await prisma.testQuestion.create({
          data: {
            testId: testRow.id,
            questionId,
            sectionName: section.name,
            orderIndex: order++,
            positiveMarksOverride: marks,
            negativeMarksOverride: negative,
          },
        })
        totalMarks += marks
        linked++
      } catch (e) {
        errors++
        console.error(`  ✗ section "${section.name}": ${(e as Error).message}`)
      }
    }
  }

  await prisma.test.update({ where: { id: testRow.id }, data: { totalMarks } })

  console.log("\nSummary")
  console.log(`  test:           ${test.slug}`)
  console.log(`  sections:       ${sections.length}`)
  console.log(`  questions linked:${linked}`)
  console.log(`  created:        ${created}`)
  console.log(`  reused:         ${reused}`)
  console.log(`  errors:         ${errors}`)
  console.log(`  total marks:    ${totalMarks}`)
}

main()
  .catch((e) => {
    console.error("Paper import failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
