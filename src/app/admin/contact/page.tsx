"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditContact() {
  const router = useRouter();
  const [contact, setContact] = useState({ email: '', phone: '', address: '' });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuth = localStorage.getItem('admin-auth');
      if (isAuth !== 'true') router.push('/admin/login');
    }
    fetch('/api/contact').then(res => res.json()).then(setContact);
  }, [router]);

  const updateContact = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/contact', {
      method: 'PUT',
      body: JSON.stringify(contact),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  return (
    <main className="p-8">
      <h2 className="text-xl font-bold mb-4">Edit Contact Info</h2>
      <form onSubmit={updateContact} className="space-y-2 mb-6">
        <input value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} placeholder="Email" className="border p-2 w-full" />
        <input value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} placeholder="Phone" className="border p-2 w-full" />
        <input value={contact.address} onChange={e => setContact({ ...contact, address: e.target.value })} placeholder="Address" className="border p-2 w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update Contact</button>
      </form>
    </main>
  );
}
