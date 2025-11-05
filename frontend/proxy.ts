import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import {auth} from "@/app/lib/auth"

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: request.headers
    })

    const pathname = request.nextUrl.pathname;

    if(!session) {
        console.log('user is not logged in , not allowing access to ' , pathname );
        return NextResponse.redirect(new URL("/login", request.url));
    }

    console.log('user is loggend in , allowing access to ' , pathname );
    return NextResponse.next();
}

export const config = {
  matcher: ["/games/:path*"]
};  