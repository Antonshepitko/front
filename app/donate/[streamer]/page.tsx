'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { clearToken } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Heart, Music, DollarSign, CreditCard, Wallet, ArrowLeft, Volume2, Star, Info } from 'lucide-react';
import LogoutButton from '@/components/LogoutButton';


export default function DonatePage({
  params,
}: {
  params: Promise<{ streamer: string }>;
}) {
  const router = useRouter();
  const [streamer, setStreamer] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // получаем сегмент маршрута (Next 15 — params как Promise)
  useEffect(() => {
    params.then((p) => setStreamer(p.streamer));
  }, [params]);

  // ссылка «поделиться» на эту же страницу
  const shareLink = useMemo(() => {
    if (typeof window === 'undefined' || !streamer) return '';
    return `${window.location.origin}/donate/${encodeURIComponent(streamer)}`;
  }, [streamer]);

  // WebSocket (бьём в backend:5000)
  useEffect(() => {
    if (!streamer) return;
    const wsUrl = `ws://${window.location.hostname}:5000/api/ws`;
    const socket = new WebSocket(wsUrl);
    socket.onopen = () => console.log('WS connected');
    socket.onmessage = (e) => console.log('WS message:', e.data);
    socket.onerror = (e) => console.error('WS error', e);
    socket.onclose = () => console.log('WS closed');
    return () => socket.close();
  }, [streamer]);

  const onCopy = async () => {
    if (!shareLink) return;
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert('Не удалось скопировать ссылку');
    }
  };

  const onLogout = () => {
    clearToken();
    router.replace('/auth');
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Фон и фиолетовые «подсветки» */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a0052] via-[#1b0036] to-[#0b0017]" />
      <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-fuchsia-600/30 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full bg-purple-700/30 blur-3xl" />

      {/* Верхняя панель/шапка */}
      <div className="relative border-b border-fuchsia-900/30 bg-[#120024]/60 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-1 ring-fuchsia-800/50">
              <AvatarImage src="/images/avatar.png" alt={streamer} />
              <AvatarFallback className="bg-fuchsia-700/30 text-white">{(streamer || 'S').slice(0, 1).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-white font-semibold leading-tight">{streamer || '...'}</div>
              <div className="text-xs text-fuchsia-200/80">Live • Community</div>
            </div>
          </div>

          {/* Кнопка Выйти */}
          <Button
            onClick={onLogout}
            className="rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white border-0 shadow hover:opacity-95"
          >
            Выйти
          </Button>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-6 grid gap-6 md:grid-cols-[2fr_1fr]">
        {/* Левая большая колонка — форма доната, оформление как в твоей версии */}
        <div className="space-y-6">
          <Card className="border border-fuchsia-900/30 bg-[#120024]/60 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Heart className="h-5 w-5 text-fuchsia-300" />
                Поддержать стримера
              </CardTitle>
              <CardDescription className="text-fuchsia-200/80">
                Оставьте сообщение и выберите сумму, чтобы поддержать {streamer || 'стримера'}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-fuchsia-200" htmlFor="donorName">Ваше имя</Label>
                  <Input id="donorName" placeholder="Anon" className="mt-1 bg-slate-800/60 border-fuchsia-900/30 text-white placeholder:text-fuchsia-300" />
                </div>
                <div>
                  <Label className="text-fuchsia-200" htmlFor="amount">Сумма</Label>
                  <div className="flex gap-2">
                    <Input id="amount" placeholder="100" className="mt-1 bg-slate-800/60 border-fuchsia-900/30 text-white placeholder:text-fuchsia-300" />
                    <Select defaultValue="RUB">
                      <SelectTrigger className="w-[110px] bg-slate-800/60 border-fuchsia-900/30 text-white">
                        <SelectValue placeholder="Валюта" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="RUB">RUB</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-fuchsia-200" htmlFor="message">Сообщение</Label>
                <Textarea id="message" rows={4} placeholder="Напишите что-нибудь приятное…" className="mt-1 bg-slate-800/60 border-fuchsia-900/30 text-white placeholder:text-fuchsia-300" />
                <div className="mt-2 flex items-center gap-2 text-xs text-fuchsia-200/70">
                  <Info className="h-4 w-4" />
                  Сообщения проходят модерацию.
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <label className="flex items-center gap-2">
                  <Checkbox className="border-fuchsia-800/50" />
                  <span className="text-sm text-fuchsia-200/80">Показать донат на экране</span>
                </label>
                <label className="flex items-center gap-2">
                  <Checkbox className="border-fuchsia-800/50" />
                  <span className="text-sm text-fuchsia-200/80">Проиграть звук</span>
                </label>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Бургер', icon: <DollarSign className="h-4 w-4" /> },
                  { label: 'Музыка', icon: <Music className="h-4 w-4" /> },
                  { label: 'Апплодисменты', icon: <Volume2 className="h-4 w-4" /> },
                  { label: 'Звезда', icon: <Star className="h-4 w-4" /> },
                ].map((p) => (
                  <Badge key={p.label} className="bg-fuchsia-700/30 text-fuchsia-100 border border-fuchsia-900/40 gap-1">
                    {p.icon}
                    {p.label}
                  </Badge>
                ))}
              </div>

              <div className="grid md:grid-cols-3 gap-3">
                <Button className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white gap-2">
                  <CreditCard className="h-4 w-4" />
                  Оплатить картой
                </Button>
                <Button variant="secondary" className="bg-purple-700/50 hover:bg-purple-700/70 text-white gap-2">
                  <Wallet className="h-4 w-4" />
                  Криптой
                </Button>
                <Button variant="outline" className="border-fuchsia-900/40 bg-slate-800/40 text-white hover:bg-slate-800/60">
                  Другой способ
                </Button>
              </div>

              <Alert className="border-fuchsia-900/40 bg-[#1a0033]/50 text-fuchsia-100">
                <AlertDescription>
                  Транзакции сейчас **тестовые** — списаний денег нет. Мы просто сохраняем запись о донате.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* блок истории/последних донатов — можно оставить как было у тебя */}
          <Card className="border border-fuchsia-900/30 bg-[#120024]/60 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">Последние донаты</CardTitle>
              <CardDescription className="text-fuchsia-200/80">Появляются в режиме реального времени</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-fuchsia-200/70 text-sm">Здесь будет список (WS уже подключён).</div>
            </CardContent>
          </Card>
        </div>

        {/* Правая колонка — профиль/сайдбар */}
        <div className="space-y-6">
          {/* Support the stream — делаем реальную ссылку и Copy */}
          <Card className="border border-fuchsia-900/30 bg-[#120024]/60 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">Support the stream</CardTitle>
              <CardDescription className="text-fuchsia-200/80">Поделись ссылкой на страницу доната</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input
                  readOnly
                  value={shareLink || '...'}
                  className="bg-slate-800/60 border-fuchsia-900/30 text-white"
                />
                <Button onClick={onCopy} className="bg-white text-black hover:opacity-90">
                  {copied ? 'Скопировано!' : 'Copy'}
                </Button>
              </div>
              <Button asChild variant="secondary" className="bg-purple-700/60 hover:bg-purple-700/70 text-white">
                <a href={shareLink} target="_blank" rel="noreferrer">Открыть страницу доната</a>
              </Button>
            </CardContent>
          </Card>

          {/* Плашка профиля/статуса */}
          <Card className="border border-fuchsia-900/30 bg-[#120024]/60 backdrop-blur">
            <CardHeader className="flex flex-row items-center gap-3">
              <Avatar className="h-12 w-12 ring-1 ring-fuchsia-800/50">
                <AvatarImage src="/images/avatar.png" alt={streamer} />
                <AvatarFallback className="bg-fuchsia-700/30 text-white">{(streamer || 'S').slice(0, 1).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-white">{streamer || '...'}</CardTitle>
                <CardDescription className="text-fuchsia-200/80">Онлайн • 123 зрителя</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-fuchsia-700/30 text-fuchsia-100 border border-fuchsia-900/40">Gaming</Badge>
                <Badge className="bg-fuchsia-700/30 text-fuchsia-100 border border-fuchsia-900/40">IRL</Badge>
                <Badge className="bg-fuchsia-700/30 text-fuchsia-100 border border-fuchsia-900/40">Music</Badge>
              </div>
              <div className="text-sm text-fuchsia-200/80">
                Описание канала. Здесь можно рассказать о себе и целях на стриме.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
