import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define your routes
const protectedRoutes = ["/checkout", "/profile", "/my-orders"] // require login
const authRoutes = ["/login", "/register"] // should not be accessible if already logged in

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value // 👈 your auth token key in cookies
  const { pathname } = req.nextUrl

  // If user tries to access protected route without token → redirect to login
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      const loginUrl = new URL("/login", req.url)
      loginUrl.searchParams.set("from", pathname) // optional: to redirect back
      return NextResponse.redirect(loginUrl)
    }
  }

  // If user is logged in and tries to access login/register → redirect to homepage
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (token) {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }

  return NextResponse.next()
}

// ✅ Only match required routes
export const config = {
  matcher: [
    "/checkout/:path*", 
    "/profile/:path*", 
    "/orders/:path*", 
    "/login", 
    "/register"
  ],
}
