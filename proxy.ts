import { NextResponse, type NextRequest } from "next/server";

const APP_HOME = "https://app.colbe.cc/home";
const AUTH_PAGES = ["/login", "/register"];
const SESSION_COOKIES = [
  "better-auth.session_token",
  "__Secure-better-auth.session_token",
];

function withSecurityHeaders(res: NextResponse) {
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
  return res;
}

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  const isAuthPage = AUTH_PAGES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
  const hasSession = SESSION_COOKIES.some((n) => request.cookies.has(n));
  // The app sends users back with ?next= or ?expired=1 when their session is
  // invalid; skipping the redirect then prevents a redirect loop.
  const sentBack = searchParams.has("next") || searchParams.has("expired");

  if (isAuthPage && hasSession && !sentBack) {
    return withSecurityHeaders(NextResponse.redirect(APP_HOME));
  }

  return withSecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|gif|ico|css|js|woff2?)$).*)",
  ],
};