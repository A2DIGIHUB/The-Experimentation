import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { sign } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// In a real application, you would validate against a database
const ADMIN_CREDENTIALS = {
  email: 'admin@example.com',
  // In production, this would be hashed
  password: 'admin123',
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate credentials
    if (
      email !== ADMIN_CREDENTIALS.email ||
      password !== ADMIN_CREDENTIALS.password
    ) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = sign(
      { email, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Set cookie
    cookies().set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 1 day
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
