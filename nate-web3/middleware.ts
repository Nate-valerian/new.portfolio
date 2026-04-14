import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["ru", "en"];
const defaultLocale = "ru";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if path already has locale
  const hasLocale = locales.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
  if (hasLocale) return NextResponse.next();

  // Skip static files
  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon") || pathname.includes(".")) {
    return NextResponse.next();
  }

  // Detect locale from cookie or Accept-Language
  const cookieLocale = request.cookies.get("locale")?.value;
  const acceptLanguage = request.headers.get("accept-language") || "";

  let locale = defaultLocale;
  if (cookieLocale && locales.includes(cookieLocale)) {
    locale = cookieLocale;
  } else if (acceptLanguage.toLowerCase().startsWith("en")) {
    locale = "en";
  }

  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
  matcher: ["/((?!_next|favicon|api).*)"],
};
