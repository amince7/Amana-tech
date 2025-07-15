"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditServices() {
  const router = useRouter();
  const [services, setServices] = useState<{id:number,name:string,description:string}[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuth = localStorage.getItem('admin-auth');
      if (isAuth !== 'true') router.push('/admin/login');
    }
    fetch('/api/services').then(res => res.json()).then(setServices);
  }, [router]);

  const addService = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/services', {
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: { 'Content-Type': 'application/json' },
    });
    const newService = await res.json();
    setServices([...services, newService]);
    setName('');
    setDescription('');
  };

  const deleteService = async (id: number) => {
    await fetch('/api/services', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' },
    });
    setServices(services.filter(s => s.id !== id));
  };

  return (
    <main className="p-8">
      <h2 className="text-xl font-bold mb-4">Edit Services</h2>
      <form onSubmit={addService} className="space-y-2 mb-6">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Service Name" className="border p-2 w-full" />
        <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="border p-2 w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Service</button>
      </form>
      <ul className="space-y-2">
        {services.map((s: any) => (
          <li key={s.id} className="border p-2 flex justify-between items-center">
            <span>{s.name}: {s.description}</span>
            <button onClick={() => deleteService(s.id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
