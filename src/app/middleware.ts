import { COOKIE_ACCESS_TOKEN } from "@/config/cookies";
import { pages } from "@/utils/pages";
import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(COOKIE_ACCESS_TOKEN)?.value;

  if (!token) {
    return NextResponse.redirect(new URL(pages.login, req.url));
  }
  try {
    await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET || "")
    );
    return NextResponse.next();
  } catch {
    const res = NextResponse.redirect(new URL(pages.logout, req.url));
  }
}

export const config = {
  matcher: ["/applications/:path*"],
};
