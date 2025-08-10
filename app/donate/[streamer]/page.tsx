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
  const [copied, setCopied] = useState(false);
  const [streamer, setStreamer] = useState<string>('');

  useEffect(() => {
    params.then((p) => setStreamer(p.streamer));
  }, [params]);

  const shareLink = useMemo(() => {
    if (typeof window === 'undefined' || !streamer) return '';
    return `${window.location.origin}/donate/${encodeURIComponent(streamer)}`;
  }, [streamer]);

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
    <div className="min-h-screen bg-black text-white">
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800">
        <div className="text-lg font-semibold">
          Streamer:{' '}
          <span className="text-neutral-300">
            {streamer || '...'}
          </span>
        </div>
        <button
          className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700"
          onClick={onLogout}
        >
          Выйти
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6 rounded-2xl border border-neutral-800 p-4 bg-neutral-900/50">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="text-neutral-300">Support the stream:</div>
            <a
              className="text-blue-400 hover:text-blue-300 underline break-all"
              href={shareLink}
              target="_blank"
              rel="noreferrer"
            >
              {shareLink}
            </a>
            <button
              onClick={onCopy}
              className="ml-auto md:ml-0 px-3 py-2 rounded-xl bg-white text-black hover:opacity-90"
            >
              {copied ? 'Скопировано!' : 'Copy Link'}
            </button>
          </div>
        </div>
        <div className="rounded-2xl border border-neutral-800 p-6 bg-neutral-900/40">
          <h2 className="text-xl font-semibold mb-4">Отправить донат</h2>
          <p className="text-neutral-400">
            Здесь остаётся твоя текущая форма (имя донатора, сумма, валюта,
            сообщение) — её не менял.
          </p>
        </div>
      </div>
    </div>
  );
}
