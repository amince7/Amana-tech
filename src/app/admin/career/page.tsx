"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditCareer() {
  const router = useRouter();
  const [careers, setCareers] = useState<{id:number,title:string,description:string}[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuth = localStorage.getItem('admin-auth');
      if (isAuth !== 'true') router.push('/admin/login');
    }
    fetch('/api/career').then(res => res.json()).then(setCareers);
  }, [router]);

  const addCareer = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/career', {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: { 'Content-Type': 'application/json' },
    });
    const newCareer = await res.json();
    setCareers([...careers, newCareer]);
    setTitle('');
    setDescription('');
  };

  const deleteCareer = async (id: number) => {
    await fetch('/api/career', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' },
    });
    setCareers(careers.filter(c => c.id !== id));
  };

  return (
    <main className="p-8">
      <h2 className="text-xl font-bold mb-4">Edit Career Opportunities</h2>
      <form onSubmit={addCareer} className="space-y-2 mb-6">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="border p-2 w-full" />
        <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="border p-2 w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Career</button>
      </form>
      <ul className="space-y-2">
        {careers.map((c: any) => (
          <li key={c.id} className="border p-2 flex justify-between items-center">
            <span>{c.title}: {c.description}</span>
            <button onClick={() => deleteCareer(c.id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
