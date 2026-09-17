import { NextRequest, NextResponse } from 'next/server';
import {
  verifyAdminCredentials,
  generateToken,
  initializeAdminAccounts,
} from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    // Initialize admin accounts if needed
    await initializeAdminAccounts();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const account = await verifyAdminCredentials(email, password);

    if (!account) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = generateToken({
      email: account.email,
      id: account.id,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: account.id,
        email: account.email,
        name: account.name,
      },
    });

    // Set HTTP-only cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
