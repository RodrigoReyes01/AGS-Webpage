'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import SimpleResponsiveImage from '@/components/SimpleResponsiveImage';

/**
 * PassengerServicesSection component
 * Displays passenger services with parallax image effect
 * 
 * Features:
 * - Split layout: image on left, text on right (reversed from cargo)
 * - Vertical accent line
 * - Parallax effect on image
 * - "Read More" call-to-action button
 */
const PassengerServicesSection: React.FC = () => {
  const { t } = useTranslation();
  const [parallaxOffset, setParallaxOffset] = useState(0);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Calculate parallax offset relative to when the section is in view
      // Section starts at ~400vh (after hero + features + mission/vision + cargo)
      const sectionStart = viewportHeight * 4;
      const relativeScroll = scrollY - sectionStart;
      
      // Apply parallax effect with different multipliers for mobile vs desktop
      // Mobile: 0.06 (subtle), Desktop: 0.15 (subtle)
      const isMobile = window.innerWidth < 768;
      const multiplier = isMobile ? 0.06 : 0.15;
      const offset = relativeScroll * multiplier;
      setParallaxOffset(offset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Side - Image with Parallax (Desktop: left, Mobile: bottom) */}
      <div className="w-full md:w-1/2 relative bg-gray-100 overflow-hidden h-[50vh] md:h-auto order-2 md:order-1">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translate3d(0, ${parallaxOffset}px, 0) scale(1.15)`,
            willChange: 'transform',
            top: '-7.5%',
            left: '-7.5%',
            width: '115%',
            height: '115%',
          }}
        >
          <SimpleResponsiveImage
            src="PassengerServices"
            alt="Aviation Ground Solutions - Passenger Services"
            fill
            priority
          />
        </div>
      </div>

      {/* Right Side - Text Content (Desktop: right, Mobile: top) */}
      <div className="w-full md:w-1/2 flex items-center p-8 md:p-16 relative order-1 md:order-2">
        {/* Vertical accent line */}
        <div className="absolute left-8 md:left-16 top-1/4 bottom-1/4 w-1 bg-black" />

        {/* Content Container */}
        <div className="max-w-xl ml-8 md:ml-16 relative z-10 w-full">
          {/* Service Title */}
          <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
            <span className="text-gray-900">{t('services.passenger.titlePart1')}</span>
            <br />
            <span className="text-brand-blue">{t('services.passenger.titlePart2')}</span>
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            {t('services.passenger.description')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PassengerServicesSection;
