const KEY = 'auth_token';
const isBrowser = typeof window !== 'undefined';

function setCookie(name: string, value: string, days = 7) {
  if (!isBrowser) return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}
function deleteCookie(name: string) {
  if (!isBrowser) return;
  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export function saveToken(token: string) {
  if (isBrowser) localStorage.setItem(KEY, token);
  setCookie(KEY, token, 7);
}

export function getToken(): string | null {
  if (!isBrowser) return null;
  const m = document.cookie.match(new RegExp(`(?:^|; )${KEY}=([^;]*)`));
  const fromCookie = m ? decodeURIComponent(m[1]) : null;
  const fromLS = localStorage.getItem(KEY);
  return fromCookie || fromLS;
}

export function clearToken() {
  if (isBrowser) localStorage.removeItem(KEY);
  deleteCookie(KEY);
}
