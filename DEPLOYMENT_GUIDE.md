# PrepMaster AI — Deployment Guide

This guide covers deploying the PrepMaster AI prototype to **Vercel**, the local/build commands, the GitHub workflow, and notes for adding a database later.

> **Prototype note.** This build runs entirely on sample/static data. It needs **no environment variables and no database** to deploy — `npm run build` is fully self-contained.

---

## 1. Prerequisites

- **Node.js** 18.18+ (Node 20+ recommended) and **npm**.
- A **GitHub** account (to host the repo).
- A **Vercel** account (free Hobby tier is sufficient).

---

## 2. Commands

| Command | Purpose |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Run locally at `http://localhost:3000` |
| `npm run build` | Production build (the command Vercel runs) |
| `npm run start` | Serve the production build locally |
| `npm run lint` | ESLint check |

**Local run:**
```bash
npm install
npm run dev
# open http://localhost:3000
```

**Verify a production build locally before deploying:**
```bash
npm run build
npm run start
```

---

## 3. GitHub Push Workflow

```bash
# First time: initialize and push
git init
git add .
git commit -m "PrepMaster AI — prototype"
git branch -M main
git remote add origin https://github.com/<your-username>/prepmaster-ai.git
git push -u origin main
```

```bash
# Ongoing changes
git checkout -b feature/my-change   # work on a branch
# ...edit...
git add .
git commit -m "Describe the change"
git push -u origin feature/my-change
# open a Pull Request on GitHub, review, then merge to main
```

Pushing to `main` (or merging a PR) triggers a Vercel production deploy; pushes to other branches create preview deploys.

> A `.gitignore` is already present and excludes `node_modules`, `.next`, and local env files.

---

## 4. Vercel Deployment Steps

### Option A — Dashboard (recommended)

1. Push the repo to GitHub (section 3).
2. Go to **vercel.com → Add New… → Project**.
3. **Import** your `prepmaster-ai` GitHub repository.
4. Vercel auto-detects **Next.js**. Leave the defaults:
   - **Framework Preset:** Next.js
   - **Build Command:** `next build` (or `npm run build`)
   - **Output:** managed automatically by Next.js
   - **Install Command:** `npm install`
5. **Environment Variables:** none required for the prototype — leave empty.
6. Click **Deploy**. The first build takes ~1–2 minutes.
7. Visit the generated `*.vercel.app` URL.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel          # preview deploy (follow the prompts)
vercel --prod   # promote to production
```

---

## 5. Environment Variable Notes

**Now (prototype):** no variables are required.

**Later (when the backend is wired)** you would add these in Vercel → Project → Settings → Environment Variables:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string (Prisma) |
| `NEXTAUTH_SECRET` | NextAuth session/JWT signing secret |
| `NEXTAUTH_URL` | Canonical app URL (e.g. `https://your-app.vercel.app`) |
| `ANTHROPIC_API_KEY` | Claude API key for AI feedback |

Keep secrets in Vercel's encrypted env store and in a local `.env.local` (git-ignored) — never commit them.

---

## 6. Build Configuration

- **Framework:** Next.js 16 (App Router, Turbopack).
- **Build command:** `next build`.
- **Node version:** set to 20.x in Vercel → Settings → General if you want to pin it.
- **Caching:** Vercel caches `.next/cache` between builds automatically.

> **Repository note:** there is a second `package-lock.json` one directory above the project, which produces a harmless "multiple lockfiles" warning during build. To silence it, remove the stray lockfile or set `turbopack.root` in `next.config.ts`. It does not affect the deploy.

---

## 7. Future Database Deployment Notes

When migrating from sample data to a live backend:

1. **Provision PostgreSQL** — Vercel Postgres, Neon, or Supabase. Copy the connection string into `DATABASE_URL`.
2. **Prisma** — finalize `prisma/schema.prisma` from `DATABASE_MODELS.md`, then:
   ```bash
   npx prisma generate
   npx prisma migrate deploy   # in CI/production; use `migrate dev` locally
   ```
   Run `prisma generate` as part of the build (e.g. a `postinstall` or `build` step) so the client is available on Vercel.
3. **Seed** — add a seed script to populate initial courses, questions, tests, and an admin user.
4. **Auth** — configure NextAuth with `NEXTAUTH_SECRET` / `NEXTAUTH_URL`; add `middleware.ts` to gate `/dashboard/*` and `/admin/*` by role.
5. **AI** — set `ANTHROPIC_API_KEY`; generate feedback server-side with prompt caching and a per-user quota; never block the result page on the AI call.
6. **Migrations policy** — use `prisma migrate deploy` (never `db push`) in shared environments; back up the database before any destructive migration.
7. **Observability** — enable Vercel Analytics/logs and an error tracker before inviting a pilot cohort.

---

## 8. Post-Deploy Smoke Check

After deploying, confirm a few routes return 200 and render:

- `/` (home), `/courses`, `/mock-tests`, `/blog`, `/pricing`
- `/dashboard`, `/dashboard/analytics`, `/dashboard/tests/cat-quant-full-01/attempt`
- `/admin`, `/admin/courses`, `/admin/tests/new`

If the build fails, run `npm run build` locally to reproduce — the local build mirrors Vercel's.
