import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // кука с JWT, устанавливаем её на /auth
  const token = req.cookies.get('auth_token')?.value;

  const isAuthPage = pathname.startsWith('/auth');
  const isApi = pathname.startsWith('/api'); // проксируем — не трогаем
  const isStatic = pathname.startsWith('/_next') || pathname.startsWith('/favicon') || pathname.startsWith('/assets');

  if (isApi || isStatic) return NextResponse.next();

  // Если нет токена — гоняем на /auth для защищённых страниц
  const protectedPaths = ['/donate']; // можно добавлять потом: '/dashboard', и т.п.
  const isProtected = protectedPaths.some((p) => pathname === p || pathname.startsWith(p + '/'));

  if (isProtected && !token) {
    const url = req.nextUrl.clone();
    url.pathname = '/auth';
    return NextResponse.redirect(url);
  }

  // Если уже авторизован и заходит на /auth — отправим на донаты
  if (isAuthPage && token) {
    const url = req.nextUrl.clone();
    url.pathname = '/donate/test'; // позже сделаем персональную страницу
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Ограничим зоны применения
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|assets).*)',
  ],
};
