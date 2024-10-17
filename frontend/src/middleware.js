import { NextResponse, NextRequest } from "next/server";
import { jwtDecode } from 'jwt-decode';

const isTokenExpired = (request) => {
    const token = request.cookies.get("token")?.value;
    if (token) {
        const { exp } = jwtDecode(token);
        return Date.now() >= exp * 1000;
    }
    return true;
};

export function middleware(request) {
    const authToken = isTokenExpired(request);
    const loginUserNotAccessPaths = request.nextUrl.pathname === "/login";

    if (loginUserNotAccessPaths) {
        if (!authToken) {
            return NextResponse.redirect(new URL("/", request.url))
        }
    } else {
        if (authToken) {
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }
    console.log("auth Token", authToken);
}

export const config = {
    matcher: ['/products/:path*', '/cart', "/", "/login", "/user-profile",'/checkout', '/thank-you'],
}