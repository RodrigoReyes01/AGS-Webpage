'use client';

import React from 'react';
import Navigation from '@/app/components/Navigation';
import AboutHeroSection from '@/app/components/AboutHeroSection';
import AboutCardsSection from '@/app/components/AboutCardsSection';
import AboutTimelineSection from '@/app/components/AboutTimelineSection';
import AboutStatsSection from '@/app/components/AboutStatsSection';
import AboutLocationsSection from '@/app/components/AboutLocationsSection';
import AboutPartnersSection from '@/app/components/AboutPartnersSection';
import ContactFormSection from '@/app/components/ContactFormSection';
import Footer from '@/app/components/Footer';

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
