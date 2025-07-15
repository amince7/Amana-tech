import { cookies } from 'next/headers';
import { verifyJwt } from '../login/jwt';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-token')?.value;
  if (token && verifyJwt(token)) {
    return NextResponse.json({ auth: true });
  }
  return NextResponse.json({ auth: false }, { status: 401 });
}
