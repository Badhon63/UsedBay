import { NextResponse } from "next/server";

export function proxy(request) {
  const sessionCookie = request.cookies.get(
    "__Secure-better-auth.session_token",
  );

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
