'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiLogin, apiRegister } from '@/lib/api';
import { saveToken } from '@/lib/auth';

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.username || !form.password) {
      setError('Введите логин и пароль');
      return;
    }
    setLoading(true);
    try {
      if (mode === 'register') {
        await apiRegister(form.username, form.password);
      }
      const token = await apiLogin(form.username, form.password);
      saveToken(token);
      router.replace('/donate/test'); // временно ведём на тестового стримера
    } catch (err: any) {
      setError(err?.message || 'Ошибка запроса');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#20003d] via-[#110022] to-[#090012] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl p-6 shadow-[0_10px_40px_rgba(124,58,237,0.25)] border border-[#3b0a77] bg-[#120024]/80 backdrop-blur">
        <h1 className="text-3xl font-semibold text-center mb-6">
          {mode === 'login' ? 'Вход' : 'Регистрация'}
        </h1>

        <div className="flex gap-2 mb-6">
          <button
            className={`flex-1 py-2 rounded-xl border transition ${
              mode === 'login'
                ? 'bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white border-transparent shadow'
                : 'bg-transparent text-fuchsia-200 border-fuchsia-700 hover:border-fuchsia-500'
            }`}
            onClick={() => setMode('login')}
            type="button"
          >
            Войти
          </button>
          <button
            className={`flex-1 py-2 rounded-xl border transition ${
              mode === 'register'
                ? 'bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white border-transparent shadow'
                : 'bg-transparent text-fuchsia-200 border-fuchsia-700 hover:border-fuchsia-500'
            }`}
            onClick={() => setMode('register')}
            type="button"
          >
            Зарегистрироваться
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-sm text-fuchsia-200">Логин</label>
            <input
              className="mt-1 w-full rounded-xl bg-[#1a0333] border border-fuchsia-800/70 px-3 py-2 outline-none focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-600/40 transition"
              placeholder="username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              autoComplete="username"
            />
          </div>

          <div>
            <label className="text-sm text-fuchsia-200">Пароль</label>
            <input
              type="password"
              className="mt-1 w-full rounded-xl bg-[#1a0333] border border-fuchsia-800/70 px-3 py-2 outline-none focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-600/40 transition"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          {error && <div className="text-pink-300 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-medium hover:opacity-95 disabled:opacity-60 shadow"
          >
            {loading ? 'Обработка…' : (mode === 'login' ? 'Войти' : 'Зарегистрироваться')}
          </button>
        </form>

        <p className="text-center text-fuchsia-200/80 text-sm mt-6">
          {mode === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
          <button
            className="underline hover:text-fuchsia-100"
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          >
            {mode === 'login' ? 'Зарегистрируйтесь' : 'Войдите'}
          </button>
        </p>
      </div>
    </div>
  );
}
