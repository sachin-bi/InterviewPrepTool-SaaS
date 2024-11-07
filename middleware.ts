// export { auth as middleware } from "@/auth"

// import type { NextRequest } from 'next/server'
import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware"; // by default attach mw to all pages
import { getToken } from "next-auth/jwt"; // to get token

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/",
    "/get-my-questions",
    "/dashboard/:path*",
    "/verify/:path*",
  ],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl; //current url

  if (
    token &&
    (url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/get-my-questions", request.url));
  }

  if (
    (!token && url.pathname.startsWith("/dashboard")) ||
    url.pathname.startsWith("/get-my-questions")
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}
