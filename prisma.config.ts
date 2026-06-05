import "dotenv/config"
import { defineConfig, env } from "prisma/config"

/**
 * Prisma 7 configuration.
 *
 * In Prisma 7 the connection URL is no longer declared in `schema.prisma`.
 * Migrate / introspection read it from here, while the runtime client uses a
 * driver adapter (see `lib/db.ts`).
 *
 * NOTE: when a `prisma.config.ts` exists, Prisma 7 no longer auto-loads `.env`,
 * so we import `dotenv/config` first to populate `process.env` from `.env`.
 * `env("DATABASE_URL")` then resolves the loaded value.
 */
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
})
