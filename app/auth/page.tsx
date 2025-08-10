'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { apiLogin, apiRegister } from '@/lib/api';
import { saveToken } from '@/lib/auth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.username || !form.password) {
      setError('Введите логин и пароль');
      return;
    }

    setLoading(true);
    try {
      if (!isLogin) {
        // регистрация
        await apiRegister(form.username, form.password);
      }
      // логин
      const token = await apiLogin(form.username, form.password);
      saveToken(token);
      router.replace('/donate/test'); // временно отправляем на тестовую страницу стримера
    } catch (err: any) {
      setError(err?.message || 'Ошибка запроса');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Фон и градиенты */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a0052] via-[#1b0036] to-[#0b0017]" />
      <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-fuchsia-600/30 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full bg-purple-700/30 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-8">
        <Card className="border border-fuchsia-900/30 bg-[#120024]/70 backdrop-blur-xl overflow-hidden">
          <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2">
            {/* Левая фиолетовая панель с иллюстрацией */}
            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/40 via-purple-700/30 to-transparent" />
              <div className="p-8 h-full flex flex-col">
                <div className="mb-6">
                  <div className="text-white text-2xl font-bold">StreamDonate</div>
                  <div className="text-fuchsia-200/80">Support your favorite streamers</div>
                </div>
                <div className="relative mt-auto">
                  <Image
                    src="/images/mountain-bg.png"
                    alt="Decor"
                    width={800}
                    height={600}
                    className="rounded-2xl object-cover w-full h-[360px] ring-1 ring-fuchsia-900/30"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#1b0036]/60 to-transparent" />
                </div>
              </div>
            </div>

            {/* Правая часть — форма */}
            <div className="p-6 md:p-10">
              <div className="flex items-center gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className={`px-4 py-2 rounded-xl border text-sm transition ${
                    isLogin
                      ? 'bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white border-transparent shadow'
                      : 'bg-transparent text-fuchsia-200 border-fuchsia-700 hover:border-fuchsia-500'
                  }`}
                >
                  Войти
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className={`px-4 py-2 rounded-xl border text-sm transition ${
                    !isLogin
                      ? 'bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white border-transparent shadow'
                      : 'bg-transparent text-fuchsia-200 border-fuchsia-700 hover:border-fuchsia-500'
                  }`}
                >
                  Регистрация
                </button>
              </div>

              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="username" className="text-fuchsia-200">
                    Логин
                  </Label>
                  <Input
                    id="username"
                    placeholder="username"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    className="mt-1 bg-slate-800/60 border-fuchsia-900/30 text-white placeholder:text-fuchsia-300"
                    autoComplete="username"
                  />
                </div>

                <div className="relative">
                  <Label htmlFor="password" className="text-fuchsia-200">
                    Пароль
                  </Label>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="mt-1 pr-10 bg-slate-800/60 border-fuchsia-900/30 text-white placeholder:text-fuchsia-300"
                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 bottom-[10px] text-fuchsia-300 hover:text-fuchsia-100"
                    title={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <Checkbox className="border-fuchsia-800/50" />
                    <span className="text-sm text-fuchsia-200/80">Запомнить меня</span>
                  </label>
                </div>

                {error && <div className="text-pink-300 text-sm">{error}</div>}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-medium hover:opacity-95 disabled:opacity-60 shadow"
                >
                  {loading ? 'Обработка…' : isLogin ? 'Войти' : 'Зарегистрироваться'}
                </Button>
              </form>

              {/* Соц-кнопки/прелоад — оставляю «для вида», можно убрать */}
              <div className="mt-6">
                <div className="text-center text-xs text-fuchsia-200/70 mb-3">или продолжить через</div>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-fuchsia-900/30 bg-slate-800/30 text-white hover:bg-slate-800/50">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.06 2.53-2.26 3.31v2.75h3.64c2.13-1.96 3.36-4.86 3.36-8.07z"/></svg>
                    Google
                  </Button>
                  <Button variant="outline" className="border-fuchsia-900/30 bg-slate-800/30 text-white hover:bg-slate-800/50">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.33-3.52 2.33-1.53 0-2.56-1-4-1-1.48 0-2.19.97-3.56 1-1.36.02-2.39-1.34-3.23-2.58C.62 15.7.25 12.46 1.64 10.45c.91-1.33 2.36-2.17 3.98-2.2 1.56-.03 3.03 1.05 4 1.05 1 0 2.79-1.3 4.71-1.11.8.03 3.05.32 4.5 2.4-3.85 2.19-3.23 7.9-.12 8.91z"/></svg>
                    Apple
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
