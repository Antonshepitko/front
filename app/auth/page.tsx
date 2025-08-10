'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE, setAuth } from '@/lib/auth';

type Mode = 'login' | 'register';

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const u = localStorage.getItem('username');
      if (token && u) router.replace(`/donate/${u}`);
    } catch {}
  }, [router]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const url = mode === 'login' ? '/api/login' : '/api/register';
      const res = await fetch(`${API_BASE}${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || 'Request failed');
        return;
      }

      if (mode === 'register') {
        // авто-логин
        const loginRes = await fetch(`${API_BASE}/api/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        const loginData = await loginRes.json();
        if (!loginRes.ok || !loginData?.token) {
          setError(loginData?.error || 'Login after register failed');
          return;
        }
        setAuth(loginData.token, username);
        router.replace(`/donate/${username}`);
        return;
      }

      if (data?.token) {
        setAuth(data.token, username);
        router.replace(`/donate/${username}`);
      } else {
        setError('No token in response');
      }
    } catch (err: any) {
      setError(err?.message || 'Network error');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
      <div className="w-full max-w-md p-6">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#0b0217] to-[#15002c] shadow-xl">
          <div className="p-6 border-b border-white/10">
            <h1 className="text-2xl font-semibold bg-gradient-to-r from-[#7c3aed] to-[#a855f7] bg-clip-text text-transparent">
              {mode === 'login' ? 'Sign in' : 'Create account'}
            </h1>
            <p className="text-sm text-white/60 mt-1">
              {mode === 'login'
                ? 'Welcome back! Enter your credentials.'
                : 'Pick a username and password to get started.'}
            </p>
          </div>

          <form onSubmit={submit} className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-white/80">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2 outline-none focus:border-[#7c3aed]"
                placeholder="your_nickname"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/80">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2 outline-none focus:border-[#7c3aed]"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="text-sm text-red-400 bg-red-950/40 border border-red-900/50 rounded-xl px-3 py-2">
                {error}
              </div>
            )}

            <button
              disabled={busy}
              className="w-full rounded-xl px-4 py-2 font-medium bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white shadow hover:opacity-90 transition disabled:opacity-50"
            >
              {busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Sign up'}
            </button>
          </form>

          <div className="p-6 border-t border-white/10 text-center">
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-sm text-white/80 hover:text-white"
            >
              {mode === 'login'
                ? "Don't have an account? "
                : 'Already have an account? '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#a855f7] font-medium">
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
