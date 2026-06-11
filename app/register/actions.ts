"use server"

import bcrypt from "bcryptjs"
import { z } from "zod"
import { prisma } from "@/lib/db"

/* Phase 11 — public registration. Always creates a STUDENT; the role can never
   be chosen by the client. passwordHash is never returned. */

const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Please enter your full name."),
    email: z.string().trim().toLowerCase().email("Please enter a valid email address."),
    phone: z.string().trim().optional(),
    targetExam: z.string().trim().optional(),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  })

export type RegisterResult =
  | { ok: true; email: string }
  | { ok: false; fieldErrors?: Record<string, string>; formError?: string }

export async function registerUser(input: unknown): Promise<RegisterResult> {
  const parsed = registerSchema.safeParse(input)
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]
      if (typeof key === "string" && !fieldErrors[key]) fieldErrors[key] = issue.message
    }
    return { ok: false, fieldErrors }
  }

  const { name, email, targetExam, password } = parsed.data

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return { ok: false, formError: "An account with this email already exists." }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: "STUDENT", // public registrations are always students
      targetExam: targetExam && targetExam.length > 0 ? targetExam : null,
    },
  })

  return { ok: true, email }
}
