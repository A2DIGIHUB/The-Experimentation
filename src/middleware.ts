import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /admin, /admin/dashboard)
  const path = request.nextUrl.pathname;

  // Define paths that are considered admin routes
  const isAdminPath = path.startsWith('/admin');

  // Get the token from the session
  const token = request.cookies.get('admin-token')?.value;

  // If it's an admin path and there's no token, redirect to login
  if (isAdminPath && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If trying to access login page with a valid token, redirect to dashboard
  if (path === '/admin/login' && token) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configure paths that should be protected
export const config = {
  matcher: ['/admin/:path*']
}
