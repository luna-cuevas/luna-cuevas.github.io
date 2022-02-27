import { getToken } from 'next-auth/jwt';
import { NextResponse } from "next/server";


export async function middleware(req) {

    const token = await getToken({ req, secret: process.env.JWT_SECRET })
    const { pathname } = req.nextUrl;

    if (pathname.includes("/api/auth") || token) {
        return NextResponse.next();
    }

    if (!token && pathname !== '/login') {
        //Next now requires an absolute url for redirecting which means no '/login' but instead need to clone the url and mutate it. 
        const url = req.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url);
        //Another way of writing this would be NextResponse.rewrite(new URL('/login', request.url))
    }
}