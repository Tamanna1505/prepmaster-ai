/**
 * Validate a question-bank or full-paper JSON file against the import schemas.
 * No database access.
 *
 * Usage:  npm run questions:validate -- <path/to/file.json>
 *     or: npx tsx scripts/validate-question-json.ts <path/to/file.json>
 */
import { readFileSync } from "node:fs"
import {
  fullPaperFileSchema,
  questionBankFileSchema,
  formatIssues,
} from "./schemas"

function fail(message: string): never {
  console.error(`✗ ${message}`)
  process.exit(1)
}

function main() {
  const filePath = process.argv[2]
  if (!filePath) fail("Provide a file path. Usage: questions:validate -- <file.json>")

  let raw: string
  try {
    raw = readFileSync(filePath, "utf8")
  } catch {
    fail(`Could not read file: ${filePath}`)
  }

  let json: unknown
  try {
    json = JSON.parse(raw)
  } catch (e) {
    fail(`Invalid JSON: ${(e as Error).message}`)
  }

  const type = (json as { type?: string })?.type
  if (type !== "question-bank" && type !== "full-paper") {
    fail(`Missing or unknown "type". Expected "question-bank" or "full-paper", got: ${String(type)}`)
  }

  console.log(`Validating ${filePath}  (type: ${type})`)

  if (type === "question-bank") {
    const result = questionBankFileSchema.safeParse(json)
    if (!result.success) {
      console.error(`✗ Validation failed with ${result.error.issues.length} issue(s):`)
      formatIssues(result.error).forEach((l) => console.error(l))
      process.exit(1)
    }
    const { questions, questionSets } = result.data
    console.log(`✓ Valid question bank: ${questions.length} question(s), ${questionSets.length} set(s).`)
  } else {
    const result = fullPaperFileSchema.safeParse(json)
    if (!result.success) {
      console.error(`✗ Validation failed with ${result.error.issues.length} issue(s):`)
      formatIssues(result.error).forEach((l) => console.error(l))
      process.exit(1)
    }
    const { test, sections, questionSets } = result.data
    const total = sections.reduce((n, s) => n + s.questions.length, 0)
    console.log(
      `✓ Valid full paper "${test.title}": ${sections.length} section(s), ${total} question(s), ${questionSets.length} set(s).`
    )
    sections.forEach((s) => console.log(`    - ${s.name}: ${s.questions.length} question(s)`))
  }
}

main()
