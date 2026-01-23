import type { Metadata } from 'next';
import { I18nProvider } from '@/lib/i18n';
import { ScrollProvider } from '@/lib/scrollContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Aviation Ground Solutions',
  description: 'Your premier FBO ground service from Belize to Panama',
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
