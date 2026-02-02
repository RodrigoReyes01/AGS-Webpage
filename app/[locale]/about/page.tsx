'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Navigation from '@/app/components/Navigation';
import AboutHeroSection from '@/app/components/AboutHeroSection';
import AboutCardsSection from '@/app/components/AboutCardsSection';
import AboutStatsSection from '@/app/components/AboutStatsSection';
import ContactFormSection from '@/app/components/ContactFormSection';
import Footer from '@/app/components/Footer';

// Lazy load components with framer-motion (heavy dependency)
const AboutTimelineSection = dynamic(() => import('@/app/components/AboutTimelineSection'), {
  loading: () => <div className="min-h-screen" />,
});
const AboutLocationsSection = dynamic(() => import('@/app/components/AboutLocationsSection'), {
  loading: () => <div className="min-h-screen" />,
});
const AboutPartnersSection = dynamic(() => import('@/app/components/AboutPartnersSection'), {
  loading: () => <div className="min-h-screen" />,
});

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <AboutHeroSection />
      <AboutCardsSection />
      <AboutTimelineSection />
      <AboutStatsSection />
      <AboutLocationsSection />
      <AboutPartnersSection />
      <ContactFormSection />
      <Footer />
    </main>
  );
}
