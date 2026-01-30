'use client';

import dynamic from 'next/dynamic';
import { useTranslation } from '@/lib/i18n';
import ErrorBoundary from '@/components/ErrorBoundary';
import Navigation from '@/app/components/Navigation';
import HeroSection from '@/app/components/HeroSection';
import Footer from '@/app/components/Footer';

// Lazy load ALL sections below the fold
const FeaturesSection = dynamic(() => import('@/app/components/FeaturesSection'));
const MissionVisionSection = dynamic(() => import('@/app/components/MissionVisionSection'));
const ServicesSection = dynamic(() => import('@/app/components/ServicesSection'));
const PassengerServicesSection = dynamic(() => import('@/app/components/PassengerServicesSection'));
const CateringSection = dynamic(() => import('@/app/components/CateringSection'));
const GroundHandlingSection = dynamic(() => import('@/app/components/GroundHandlingSection'));
const FuelServicesSection = dynamic(() => import('@/app/components/FuelServicesSection'));
const DiscoverServicesSection = dynamic(() => import('@/app/components/DiscoverServicesSection'));
const WhyAGSSection = dynamic(() => import('@/app/components/WhyAGSSection'));
const ContactFormSection = dynamic(() => import('@/app/components/ContactFormSection'));

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
        <CateringSection />
        <GroundHandlingSection />
        <FuelServicesSection />
        <DiscoverServicesSection />
        <WhyAGSSection />
        <ContactFormSection />
      </ErrorBoundary>
      
      <Footer />
    </main>
  );
}
