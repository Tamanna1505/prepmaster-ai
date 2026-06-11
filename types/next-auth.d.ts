import type { DefaultSession } from "next-auth"

/* Augment NextAuth types so the session/token safely carry id + role. */

type Role = "STUDENT" | "ADMIN"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: Role
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    role: Role
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: Role
  }
}
