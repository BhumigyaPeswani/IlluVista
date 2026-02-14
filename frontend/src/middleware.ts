import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secretKey = process.env.JWT_SECRET || 'fallback-secret-key-change-this-in-env';
const key = new TextEncoder().encode(secretKey);

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('auth-token')?.value;

    // Define protected routes
    const isAdminRoute = pathname.startsWith('/admin');
    const isDashboardRoute = pathname.startsWith('/dashboard');
    const isAccountRoute = pathname.startsWith('/account');

    if (isAdminRoute || isDashboardRoute || isAccountRoute) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            const { payload }: any = await jwtVerify(token, key, {
                algorithms: ['HS256'],
            });

            // Enforce RBAC
            if (isAdminRoute && payload.role !== 'ADMIN') {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }

            if (isDashboardRoute && payload.role !== 'ARTIST') {
                if (payload.role !== 'ADMIN') {
                    return NextResponse.redirect(new URL('/gallery', request.url));
                }
            }

            return NextResponse.next();
        } catch (error) {
            const response = NextResponse.redirect(new URL('/login', request.url));
            response.cookies.set('auth-token', '', { expires: new Date(0) });
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/dashboard/:path*',
        '/account/:path*',
    ],
};
