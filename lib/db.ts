import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

/**
 * Prisma client singleton.
 *
 * Prisma 7 requires a driver adapter at runtime. We use `@prisma/adapter-pg`
 * (node-postgres), which works with any standard PostgreSQL provider —
 * including Neon and Supabase — via the `DATABASE_URL` connection string.
 *
 * In development we cache the client on `globalThis` so Next.js hot-reload
 * doesn't spawn a new client (and a new connection pool) on every reload.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

function createPrismaClient() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
