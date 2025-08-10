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
        // после регистрации сразу логиним
      }
      const token = await apiLogin(form.username, form.password);
      saveToken(token);

      // ВРЕМЕННО: редирект на страницу стримера с тестовыми данными
      // позже подставим реального стримера/кабинет
      router.replace('/donate/test');
    } catch (err: any) {
      setError(err?.message || 'Ошибка запроса');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-neutral-900/60 rounded-2xl p-6 shadow-xl border border-neutral-800">
        <h1 className="text-2xl font-semibold text-center mb-6">
          {mode === 'login' ? 'Вход' : 'Регистрация'}
        </h1>

        <div className="flex gap-2 mb-6">
          <button
            className={`flex-1 py-2 rounded-xl border ${mode === 'login' ? 'bg-white text-black' : 'bg-transparent text-neutral-300'} border-neutral-700`}
            onClick={() => setMode('login')}
            type="button"
          >
            Войти
          </button>
          <button
            className={`flex-1 py-2 rounded-xl border ${mode === 'register' ? 'bg-white text-black' : 'bg-transparent text-neutral-300'} border-neutral-700`}
            onClick={() => setMode('register')}
            type="button"
          >
            Зарегистрироваться
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-sm text-neutral-300">Логин</label>
            <input
              className="mt-1 w-full rounded-xl bg-neutral-800 border border-neutral-700 px-3 py-2 outline-none focus:border-neutral-500"
              placeholder="username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              autoComplete="username"
            />
          </div>

          <div>
            <label className="text-sm text-neutral-300">Пароль</label>
            <input
              type="password"
              className="mt-1 w-full rounded-xl bg-neutral-800 border border-neutral-700 px-3 py-2 outline-none focus:border-neutral-500"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-xl bg-white text-black font-medium hover:opacity-90 disabled:opacity-60"
          >
            {loading ? 'Обработка…' : (mode === 'login' ? 'Войти' : 'Зарегистрироваться')}
          </button>
        </form>

        <p className="text-center text-neutral-400 text-sm mt-6">
          {mode === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
          <button
            className="underline hover:text-white"
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          >
            {mode === 'login' ? 'Зарегистрируйтесь' : 'Войдите'}
          </button>
        </p>
      </div>
    </div>
  );
}
