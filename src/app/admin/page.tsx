"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

async function isAuthenticated() {
  // Try to fetch a protected resource to check cookie
  const res = await fetch('/api/auth/check', { credentials: 'include' });
  if (!res.ok) return false;
  const data = await res.json();
  return data.auth === true;
}

export default function AdminPanel() {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      if (!(await isAuthenticated())) {
        router.push('/admin/login');
      }
    })();
  }, [router]);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <ul className="space-y-2">
        <li><Link href="/admin/services">Edit Services</Link></li>
        <li><Link href="/admin/team">Edit Team</Link></li>
        <li><Link href="/admin/contact">Edit Contact Info</Link></li>
        <li><Link href="/admin/career">Edit Career Opportunities</Link></li>
      </ul>
    </main>
  );
}
