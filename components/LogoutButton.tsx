'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

type Props = {
  className?: string;
};

export default function LogoutButton({ className = '' }: Props) {
  const router = useRouter();

  const onLogout = useCallback(() => {
    try {
      // чистим localStorage и cookie
      localStorage.removeItem('token');
      localStorage.removeItem('username');

      // гасим cookie с токеном (для middleware)
      document.cookie = `token=; Max-Age=0; path=/`;

      router.push('/auth');
    } catch {
      router.push('/auth');
    }
  }, [router]);

  return (
    <button
      onClick={onLogout}
      className={`rounded-xl px-4 py-2 text-sm font-medium 
      bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white 
      shadow hover:opacity-90 transition ${className}`}
      aria-label="Logout"
    >
      Logout
    </button>
  );
}
