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
// Error handling ensures page works even if imports fail (e.g., in strict privacy mode)
const AboutTimelineSection = dynamic(() => import('@/app/components/AboutTimelineSection').catch((err) => {
  console.warn('[Dynamic Import] AboutTimelineSection failed to load:', err);
  return { default: () => <div className="min-h-screen flex items-center justify-center"><p>Content unavailable</p></div> };
}), {
  loading: () => <div className="min-h-screen" />,
});

const AboutLocationsSection = dynamic(() => import('@/app/components/AboutLocationsSection').catch((err) => {
  console.warn('[Dynamic Import] AboutLocationsSection failed to load:', err);
  return { default: () => <div className="min-h-screen flex items-center justify-center"><p>Content unavailable</p></div> };
}), {
  loading: () => <div className="min-h-screen" />,
});

const AboutPartnersSection = dynamic(() => import('@/app/components/AboutPartnersSection').catch((err) => {
  console.warn('[Dynamic Import] AboutPartnersSection failed to load:', err);
  return { default: () => <div className="min-h-screen flex items-center justify-center"><p>Content unavailable</p></div> };
}), {
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
