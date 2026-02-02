import type { Metadata, Viewport } from 'next';
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
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#0066CC',
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
        {/* DNS Prefetch & Preconnect for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        
        {/* PWA Meta Tags */}
        <meta name="application-name" content="AGS" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AGS" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Preload critical hero images with fetchpriority */}
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
        
        {/* Inline critical CSS - Animations on desktop, disabled on mobile */}
        <style dangerouslySetInnerHTML={{__html: `
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            margin: 0; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          /* Respect user's motion preferences */
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
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
        
        {/* Service Worker Registration */}
        <Script
          id="sw-register"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Service Worker Registration with graceful fallback
              // Works in normal browsing, fails gracefully in incognito/private mode
              (function() {
                // Check if service workers are supported and allowed
                if (!('serviceWorker' in navigator)) {
                  console.info('[SW] Service workers not supported in this browser');
                  return;
                }

                // Don't block page load - register after load event
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('[SW] Service worker registered successfully:', registration.scope);
                      
                      // Check for updates periodically
                      setInterval(function() {
                        registration.update().catch(function(err) {
                          console.warn('[SW] Update check failed:', err);
                        });
                      }, 60 * 60 * 1000); // Check every hour
                    })
                    .catch(function(err) {
                      // Service worker registration failed - this is OK in incognito mode
                      console.info('[SW] Service worker registration failed (this is normal in private/incognito mode):', err.message);
                    });
                });
              })();
            `,
          }}
        />
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
