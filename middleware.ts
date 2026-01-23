import { NextRequest, NextResponse } from 'next/server';

// Supported locales
const locales = ['en', 'es'];
const defaultLocale = 'en';

// Get the preferred locale from the request
function getLocale(request: NextRequest): string {
  // Check if there's a locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameLocale) return pathnameLocale;

  // Check for locale in cookies
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
  if (localeCookie && locales.includes(localeCookie)) {
    return localeCookie;
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map((lang) => lang.split(';')[0].trim().toLowerCase())
      .find((lang) => {
        // Check for exact match or language prefix (e.g., 'es-MX' -> 'es')
        return locales.includes(lang) || locales.includes(lang.split('-')[0]);
      });

    if (preferredLocale) {
      // Return the full locale if it matches, or the prefix if it's a variant
      return locales.includes(preferredLocale) 
        ? preferredLocale 
        : preferredLocale.split('-')[0];
    }
  }

  // Default to English
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect to the appropriate locale
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  
  // Copy search params
  newUrl.search = request.nextUrl.search;

  const response = NextResponse.redirect(newUrl);
  
  // Set locale cookie for future requests
  response.cookies.set('NEXT_LOCALE', locale, {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: '/',
  });

  return response;
}

export const config = {
  // Match all pathnames except for:
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /images (static files in public/images)
  // - /favicon.ico, /robots.txt, etc. (static files)
  matcher: ['/((?!api|_next|images|favicon.ico|robots.txt|.*\\..*).*)'],
};
