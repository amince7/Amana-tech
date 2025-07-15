import { NextResponse } from 'next/server';

// Dummy data for demonstration
let contact = {
  email: 'info@agency.com',
  phone: '+1234567890',
  address: '123 Main St, City'
};

export async function GET() {
  return NextResponse.json(contact);
}

export async function PUT(request: Request) {
  contact = await request.json();
  return NextResponse.json(contact);
}
