import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { prisma } from "@/lib/db"

/* Phase 11 — Auth.js (NextAuth) credentials auth backed by the Prisma User model.
   JWT session strategy; the user id + role are baked into the token + session. */

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(raw) {
        const parsed = credentialsSchema.safeParse(raw)
        if (!parsed.success) return null

        const email = parsed.data.email.toLowerCase()
        const user = await prisma.user.findUnique({ where: { email } })
        // Reject unknown or deactivated accounts.
        if (!user || !user.isActive) return null

        const valid = await bcrypt.compare(parsed.data.password, user.passwordHash)
        if (!valid) return null

        // Best-effort last-login stamp; never block sign-in on it.
        await prisma.user
          .update({ where: { id: user.id }, data: { lastLoginAt: new Date() } })
          .catch(() => undefined)

        // Only safe fields are returned — passwordHash never leaves the server.
        return { id: user.id, name: user.name, email: user.email, role: user.role }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.role = token.role
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

// ── Server helpers ───────────────────────────────────────────────────────────

/** Returns the current session user (id, name, email, role) or null. */
export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  return session?.user ?? null
}

/** Requires any signed-in user; redirects to /login otherwise. */
export async function requireUser() {
  const user = await getCurrentUser()
  if (!user) redirect("/login")
  return user
}

/** Requires an ADMIN; redirects guests to /login and students to /dashboard. */
export async function requireAdmin() {
  const user = await getCurrentUser()
  if (!user) redirect("/login")
  if (user.role !== "ADMIN") redirect("/dashboard")
  return user
}
