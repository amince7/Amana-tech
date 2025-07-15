import { NextResponse } from 'next/server';

// Dummy data for demonstration
let services = [
  { id: 1, name: 'Web Design', description: 'Professional web design services.' },
  { id: 2, name: 'SEO', description: 'Search engine optimization.' }
];

export async function GET() {
  return NextResponse.json(services);
}

export async function POST(request: Request) {
  const data = await request.json();
  const newService = { id: Date.now(), ...data };
  services.push(newService);
  return NextResponse.json(newService);
}

export async function PUT(request: Request) {
  const data = await request.json();
  services = services.map(s => (s.id === data.id ? data : s));
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  services = services.filter(s => s.id !== id);
  return NextResponse.json({ success: true });
}
