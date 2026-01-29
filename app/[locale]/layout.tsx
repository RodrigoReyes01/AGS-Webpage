import type { Metadata } from 'next';
import { I18nProvider } from '@/lib/i18n';
import { ScrollProvider } from '@/lib/scrollContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import '../globals.css';

export const metadata: Metadata = {
  title: 'AGS',
  description: 'Your premier FBO ground service from Belize to Panama',
  applicationName: 'AGS',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};

// Generate static params for supported locales
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'es' },
  ];
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate locale and default to 'en' if invalid
  const locale = params.locale === 'es' ? 'es' : 'en';

  return (
    <html lang={locale}>
      <head>
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        
        {/* Preload critical mobile hero image */}
        <link
          rel="preload"
          as="image"
          href="/images/mobile/hero.webp"
          media="(max-width: 768px)"
          type="image/webp"
        />
        <link
          rel="preload"
          as="image"
          href="/images/tablet/hero.webp"
          media="(min-width: 769px) and (max-width: 1280px)"
          type="image/webp"
        />
        <link
          rel="preload"
          as="image"
          href="/images/desktop/hero.webp"
          media="(min-width: 1281px)"
          type="image/webp"
        />
        
        {/* Optimize viewport for mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#0066CC" />
        
        {/* Inline critical CSS for instant render */}
        <style dangerouslySetInnerHTML={{__html: `
          body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
          .hero-skeleton { width: 100%; height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        `}} />
      </head>
      <body>
        <ErrorBoundary>
          <I18nProvider initialLocale={locale}>
            <ScrollProvider>
              {children}
            </ScrollProvider>
          </I18nProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
