import { NextResponse, NextRequest } from "next/server";

export const config = {
  matcher: ["/admin/:path*"],
};

async function verifySession(session: string): Promise<boolean> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-session`,
      {
        headers: {
          Cookie: `laravel_session=${session}`,
          "Content-Type": "application/json",
        },
        credentials: "include", // مهم: برای ارسال کوکی‌ها
      }
    );

    if (!response.ok) return false;

    const data = await response.json();
    return data.valid === true;
  } catch (error) {
    console.error("Session verification error:", error);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const loginUrl = new URL("/admin/login", request.url);
  const dashUrl = new URL("/admin/dashboard", request.url);

  // مسیرهای عمومی
  if (["/admin/login", "/admin/register"].includes(pathname)) {
    if (
      request.cookies.has("laravel_session")
    ) {
      console.log("okkkkkkkkk");
      const redirectUrl = request.nextUrl.searchParams.get("redirect");
      if (redirectUrl) {
        return NextResponse.redirect(new URL(redirectUrl, request.url), {
          status: 303,
        });
      }
      return NextResponse.redirect(dashUrl, { status: 303 });
    }
    return NextResponse.next();
  }

  // اعتبارسنجی اولیه سشن
  const sessionCookie = request.cookies.get("laravel_session");
  if (!sessionCookie) {
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl, { status: 303 });
  }

  // اعتبارسنجی پیشرفته سشن
  const isValidSession = await verifySession(sessionCookie.value);

  // CSRF فقط برای سشن‌های معتبر
  if (isValidSession && !["GET", "HEAD"].includes(request.method)) {
    const csrf = request.cookies.get("XSRF-TOKEN")?.value;
    if (!csrf || csrf !== request.headers.get("x-xsrf-token")) {
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl, { status: 303 });
    }
  }

  if (!isValidSession) {
    loginUrl.searchParams.set("redirect", pathname);
    const response = NextResponse.redirect(loginUrl, { status: 303 });
    response.cookies.delete("laravel_session");
    response.cookies.delete("XSRF-TOKEN");
    return response;
  }

  return NextResponse.next();
}
