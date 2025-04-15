import { auth } from "@/server/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const session = await auth();
  
    if (!session) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  
    return NextResponse.next();
  }
  
  export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*'],
  };