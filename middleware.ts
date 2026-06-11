import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

/* Phase 11 — role-based route protection.
   - Guests on /dashboard/* or /admin/* are sent to /login (with callbackUrl).
   - Students on /admin/* are sent to /dashboard.
   - Admins may use both /admin/* and /dashboard/*. */
export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth
    const path = req.nextUrl.pathname

    if (path.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    return NextResponse.next()
  },
  {
    pages: { signIn: "/login" },
    callbacks: {
      // Any signed-in user passes here; fine-grained role check is above.
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
}
