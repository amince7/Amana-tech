import { NextResponse } from 'next/server';
import { signJwt } from './jwt';

const ADMIN_USER = {
  username: 'admin',
  password: 'password123',
};

export async function POST(request: Request) {
  const { username, password } = await request.json();
  if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
    const token = signJwt({ username });
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60, // 1 hour
    });
    return response;
  }
  return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
}
