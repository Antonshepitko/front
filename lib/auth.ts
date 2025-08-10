export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || 'http://45.144.52.219:5000';

export function setAuth(token: string, username: string) {
  // localStorage для фронта
  localStorage.setItem('token', token);
  localStorage.setItem('username', username);

  // cookie для middleware (redir на серверной стороне)
  document.cookie = `token=${token}; Max-Age=${60 * 60}; Path=/; SameSite=Lax`;
}

export function clearAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  document.cookie = `token=; Max-Age=0; Path=/`;
}

export function getUsernameClient(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('username');
}
