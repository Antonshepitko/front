const KEY = 'auth_token';

const isBrowser = typeof window !== 'undefined';

export function saveToken(token: string) {
  if (isBrowser) localStorage.setItem(KEY, token);
}

export function getToken(): string | null {
  return isBrowser ? localStorage.getItem(KEY) : null;
}

export function clearToken() {
  if (isBrowser) localStorage.removeItem(KEY);
}
