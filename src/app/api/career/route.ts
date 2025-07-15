import { NextResponse } from 'next/server';

// Dummy data for demonstration
let careers = [
  { id: 1, title: 'Frontend Developer', description: 'Join our web agency as a frontend developer.' },
  { id: 2, title: 'Project Manager', description: 'Lead projects and manage client relationships.' }
];

export async function GET() {
  return NextResponse.json(careers);
}

export async function POST(request: Request) {
  const data = await request.json();
  const newCareer = { id: Date.now(), ...data };
  careers.push(newCareer);
  return NextResponse.json(newCareer);
}

export async function PUT(request: Request) {
  const data = await request.json();
  careers = careers.map(c => (c.id === data.id ? data : c));
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  careers = careers.filter(c => c.id !== id);
  return NextResponse.json({ success: true });
}
