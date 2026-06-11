/**
 * Promote an existing user to ADMIN by email.
 *
 * Usage:  npm run admin:promote -- you@example.com
 *
 * Register the account through the normal sign-up flow first, then run this to
 * grant it admin access. It will NOT create a user that does not exist.
 */
import "dotenv/config"
import { createPrismaClient } from "./db-helpers"

const prisma = createPrismaClient()

async function main() {
  const email = process.argv[2]?.trim().toLowerCase()
  if (!email) {
    console.error("✗ Provide an email. Usage: npm run admin:promote -- you@example.com")
    process.exit(1)
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    console.error(`✗ No user found with email "${email}". Register that account first, then promote it.`)
    process.exit(1)
  }

  if (user.role === "ADMIN") {
    console.log(`✓ ${email} is already an ADMIN. Nothing to do.`)
    return
  }

  await prisma.user.update({ where: { email }, data: { role: "ADMIN" } })
  console.log(`✓ Promoted ${email} to ADMIN. Log out and back in for the change to take effect.`)
}

main()
  .catch((e) => {
    console.error("Promotion failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
