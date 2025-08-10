import { NextResponse, NextRequest } from 'next/server';

export const config = {
  matcher: [
    '/',              // корень
    '/donate/:path*', // страница стримера
    '/donations',     // если есть список донатов
  ],
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value || '';

  // нет токена — на /auth
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = '/auth';
    url.search = '';
    return NextResponse.redirect(url);
  }

  // есть токен — пускаем дальше
  return NextResponse.next();
}
