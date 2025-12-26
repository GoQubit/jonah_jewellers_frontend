import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const buildLoginURL = (request: NextRequest): URL => {
  const loginURL = new URL("/login", request.nextUrl.origin);
  const redirectToURL = request.nextUrl.pathname;

  loginURL.searchParams.set('redirect', redirectToURL);

  request.nextUrl.searchParams.forEach((value, key) => {
    loginURL.searchParams.set(key, value);
  });

  return loginURL;
};

const createRedirectResponse = (url: string | URL, clearAuth = false): NextResponse => {
  const response = NextResponse.redirect(url.toString());

  if (clearAuth) {
    response.cookies.set('authToken', '', {
      expires: new Date(0),
      path: '/'
    });
  }
  return response;
};


// Define your protected routes
const protectedRoutes = [
  "/checkout",
  "/profile",
  "/orders",
  "/kitty-dashboard",
  "/seller-dashboard",
  "/payment"
] // require login

const authRoutes = ["/login", "/register"] // should not be accessible if already logged in

export function middleware(req: NextRequest) {
  const isAuthenticated = req.cookies.get('authToken');
  const { pathname } = req.nextUrl


  // Handle protected routes
  if (!isAuthenticated && protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    return createRedirectResponse(buildLoginURL(req));
  }

  // Handle authenticated users trying to access login
  if (isAuthenticated && req.nextUrl.pathname === '/login') {
    return createRedirectResponse(new URL("/", req.nextUrl.origin));
  }

  // If user is logged in and tries to access login/register → redirect to homepage
  // if (authRoutes.some(route => pathname.startsWith(route))) {
  //   if (token) {
  //     return NextResponse.redirect(new URL("/", req.url))
  //   }
  // }

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
