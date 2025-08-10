'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { clearToken } from '@/lib/auth';

export default function DonatePage({
  params,
}: {
  params: Promise<{ streamer: string }>;
}) {
  const router = useRouter();
  const [streamer, setStreamer] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    params.then((p) => setStreamer(p.streamer));
  }, [params]);

  const shareLink = useMemo(() => {
    if (typeof window === 'undefined' || !streamer) return '';
    return `${window.location.origin}/donate/${encodeURIComponent(streamer)}`;
  }, [streamer]);

  // WebSocket (напрямую к backend:5000)
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
    <div className="min-h-screen bg-gradient-to-b from-[#20003d] via-[#110022] to-[#090012] text-white">
      {/* Шапка страницы стримера */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-fuchsia-900/40 bg-[#140026]/60 backdrop-blur">
        <div className="text-lg font-semibold">
          Streamer:{' '}
          <span className="text-fuchsia-300">
            {streamer || '...'}
          </span>
        </div>
        <button
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white border-transparent shadow hover:opacity-95"
          onClick={onLogout}
          title="Выйти"
        >
          Выйти
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Support the stream */}
        <div className="rounded-2xl border border-fuchsia-900/40 p-4 bg-[#140026]/60 backdrop-blur">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="text-fuchsia-200/90">Support the stream:</div>

            <a
              className="text-fuchsia-300 hover:text-fuchsia-200 underline break-all"
              href={shareLink}
              target="_blank"
              rel="noreferrer"
            >
              {shareLink || '...'}
            </a>

            <button
              onClick={onCopy}
              className="ml-auto md:ml-0 px-3 py-2 rounded-xl bg-white/95 text-black hover:opacity-90 shadow"
            >
              {copied ? 'Скопировано!' : 'Copy Link'}
            </button>
          </div>
        </div>

        {/* Твой существующий контент/форма доната */}
        <div className="rounded-2xl border border-fuchsia-900/40 p-6 bg-[#140026]/40">
          <h2 className="text-xl font-semibold mb-4 text-fuchsia-200">Отправить донат</h2>
          {/* Оставляю блок пустым, чтобы не ломать твой текущий дизайн.
              Сюда подставь свою форму/контент, как и было. */}
          <div className="text-fuchsia-200/80">
            Здесь остаётся ваша текущая форма (имя донатора, сумма, валюта, сообщение).
          </div>
        </div>
      </div>
    </div>
  );
}
