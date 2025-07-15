import { NextResponse } from 'next/server';

// Dummy data for demonstration
let team = [
  { id: 1, name: 'Alice', role: 'Designer' },
  { id: 2, name: 'Bob', role: 'Developer' }
];

export async function GET() {
  return NextResponse.json(team);
}

export async function POST(request: Request) {
  const data = await request.json();
  const newMember = { id: Date.now(), ...data };
  team.push(newMember);
  return NextResponse.json(newMember);
}

export async function PUT(request: Request) {
  const data = await request.json();
  team = team.map(m => (m.id === data.id ? data : m));
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  team = team.filter(m => m.id !== id);
  return NextResponse.json({ success: true });
}
