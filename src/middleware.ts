import { NextResponse, NextRequest } from "next/server";
export const config = {
    matcher: ["/admin/:path*"],
  };
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const loginUrl = new URL('/admin/login', request.url);
  const dashUrl = new URL('/admin/dashboard', request.url);

  // مسیرهای عمومی
  if (["/admin/login", "/admin/register"].includes(pathname)) {
    if (request.cookies.has("laravel_session") && request.cookies.has("XSRF-TOKEN")) {
      return NextResponse.redirect(dashUrl, { status: 303 });
    }
    return NextResponse.next();
  }

  // مسیرهای محافظت‌شده
  if (!request.cookies.has("laravel_session")) {
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl, { status: 303 });
  }

  // CSRF برای درخواست‌های غیر GET/HEAD
  if (!["GET", "HEAD"].includes(request.method)) {
    const csrf = request.cookies.get("XSRF-TOKEN")?.value;
    if (!csrf || csrf !== request.headers.get("x-xsrf-token")) {
      return NextResponse.redirect(loginUrl, { status: 303 });
    }
  }

  return NextResponse.next();
}
