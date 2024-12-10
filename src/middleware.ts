import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Add security headers
    const headers = new Headers(req.headers)
    headers.set("x-frame-options", "DENY")
    headers.set("x-content-type-options", "nosniff")
    headers.set("referrer-policy", "strict-origin-when-cross-origin")

    return NextResponse.next({
      headers,
    })
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
)

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/settings/:path*",
    "/api/protected/:path*",
  ],
}
