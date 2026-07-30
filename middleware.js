import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/trener") && pathname !== "/trener/login") {
    const session = request.cookies.get("coach_session");
    if (!session || session.value !== "authenticated") {
      const loginUrl = new URL("/trener/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/trener/:path*"],
};
