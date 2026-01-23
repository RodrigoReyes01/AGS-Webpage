'use client';

import { useTranslation } from '@/lib/i18n';
import ErrorBoundary from '@/components/ErrorBoundary';
import Navigation from '@/app/components/Navigation';
import HeroSection from '@/app/components/HeroSection';
import FeaturesSection from '@/app/components/FeaturesSection';
import MissionVisionSection from '@/app/components/MissionVisionSection';
import ServicesSection from '@/app/components/ServicesSection';
import PassengerServicesSection from '@/app/components/PassengerServicesSection';

export default function Home() {
  const { t, locale } = useTranslation();

  return (
    <main className="min-h-screen">
      <ErrorBoundary
        fallback={
          <div className="fixed top-0 left-0 right-0 z-50 bg-red-50 border-b border-red-200 p-4 text-center">
            <p className="text-red-800 text-sm">Navigation temporarily unavailable</p>
          </div>
        }
      >
        <Navigation />
      </ErrorBoundary>
      
      <ErrorBoundary
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Content Unavailable</h2>
              <p className="text-gray-600">We&apos;re having trouble loading the page content.</p>
            </div>
          </div>
        }
      >
        <HeroSection 
          locale={locale}
          translations={{
            mainHeading: t('hero.mainHeading'),
            groundWord: t('hero.groundWord'),
            subheading: t('hero.subheading'),
            ctaButton: t('hero.ctaButton'),
          }}
        />
        <FeaturesSection />
        <MissionVisionSection />
        <ServicesSection />
        <PassengerServicesSection />
      </ErrorBoundary>
    </main>
  );
}
