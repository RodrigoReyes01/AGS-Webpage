'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Navigation from '@/app/components/Navigation';
import AboutHeroSection from '@/app/components/AboutHeroSection';
import Footer from '@/app/components/Footer';

// Lazy load all sections below the fold
const AboutCardsSection = dynamic(() => import('@/app/components/AboutCardsSection'));
const AboutTimelineSection = dynamic(() => import('@/app/components/AboutTimelineSection'));
const AboutStatsSection = dynamic(() => import('@/app/components/AboutStatsSection'));
const AboutLocationsSection = dynamic(() => import('@/app/components/AboutLocationsSection'));
const AboutPartnersSection = dynamic(() => import('@/app/components/AboutPartnersSection'));
const ContactFormSection = dynamic(() => import('@/app/components/ContactFormSection'));

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
