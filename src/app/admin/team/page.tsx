"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditTeam() {
  const router = useRouter();
  const [team, setTeam] = useState<{id:number,name:string,role:string}[]>([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuth = localStorage.getItem('admin-auth');
      if (isAuth !== 'true') router.push('/admin/login');
    }
    fetch('/api/team').then(res => res.json()).then(setTeam);
  }, [router]);

  const addMember = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/team', {
      method: 'POST',
      body: JSON.stringify({ name, role }),
      headers: { 'Content-Type': 'application/json' },
    });
    const newMember = await res.json();
    setTeam([...team, newMember]);
    setName('');
    setRole('');
  };

  const deleteMember = async (id: number) => {
    await fetch('/api/team', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' },
    });
    setTeam(team.filter(m => m.id !== id));
  };

  return (
    <main className="p-8">
      <h2 className="text-xl font-bold mb-4">Edit Team</h2>
      <form onSubmit={addMember} className="space-y-2 mb-6">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="border p-2 w-full" />
        <input value={role} onChange={e => setRole(e.target.value)} placeholder="Role" className="border p-2 w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Member</button>
      </form>
      <ul className="space-y-2">
        {team.map((m: any) => (
          <li key={m.id} className="border p-2 flex justify-between items-center">
            <span>{m.name} - {m.role}</span>
            <button onClick={() => deleteMember(m.id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
