import type { Metadata } from 'next';
import Script from 'next/script';
import { I18nProvider } from '@/lib/i18n';
import { ScrollProvider } from '@/lib/scrollContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import '../globals.css';

export const metadata: Metadata = {
  title: 'AGS - Aviation Ground Solutions',
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
        {/* Optimize viewport for mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#0066CC" />
        
        {/* Preload critical hero image - mobile first */}
        <link
          rel="preload"
          as="image"
          href="/images/mobile/hero.webp"
          media="(max-width: 640px)"
          type="image/webp"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/images/tablet/hero.webp"
          media="(min-width: 641px) and (max-width: 1024px)"
          type="image/webp"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/images/desktop/hero.webp"
          media="(min-width: 1025px)"
          type="image/webp"
          fetchPriority="high"
        />
        
        {/* Preload logo */}
        <link
          rel="preload"
          as="image"
          href="/images/logo-mobile.png"
          media="(max-width: 768px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/images/logo.png"
          media="(min-width: 769px)"
          fetchPriority="high"
        />
        
        {/* Inline critical CSS - Animations on desktop, disabled on mobile */}
        <style dangerouslySetInnerHTML={{__html: `
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            margin: 0; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          /* Desktop: Full animations enabled */
          @media (min-width: 1025px) {
            html {
              scroll-behavior: smooth;
            }
          }
          /* Mobile/Tablet: Disable ALL animations for instant response */
          @media (max-width: 1024px) {
            *, *::before, *::after {
              animation-duration: 0s !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0s !important;
              scroll-behavior: auto !important;
            }
            html {
              scroll-behavior: auto !important;
            }
            body {
              text-rendering: optimizeSpeed;
            }
          }
          /* Hero skeleton for instant visual feedback */
          .hero-skeleton { 
            width: 100%; 
            height: 100vh; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
          }
          /* Optimize image rendering */
          img {
            content-visibility: auto;
          }
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
        
        {/* Load non-critical scripts after page load */}
        <Script
          id="performance-observer"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              // Monitor performance
              if ('PerformanceObserver' in window) {
                try {
                  const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                      if (entry.entryType === 'largest-contentful-paint') {
                        console.log('LCP:', entry.startTime);
                      }
                    }
                  });
                  observer.observe({ entryTypes: ['largest-contentful-paint'] });
                } catch (e) {}
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
