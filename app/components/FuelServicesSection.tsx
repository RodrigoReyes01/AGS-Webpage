'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import ImageWithFallback from '@/components/ImageWithFallback';

/**
 * FuelServicesSection component
 * Displays fuel services with parallax image effect
 * 
 * Features:
 * - Split layout: text on left, image on right
 * - Vertical accent line
 * - Parallax effect on image
 * - "Read More" call-to-action button
 */
const FuelServicesSection: React.FC = () => {
  const { t } = useTranslation();
  const [parallaxOffset, setParallaxOffset] = useState(0);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Calculate parallax offset relative to when the section is in view
      // Section starts at ~700vh (after hero + features + mission/vision + cargo + passenger + catering + ground)
      const sectionStart = viewportHeight * 7;
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
      {/* Left Side - Text Content */}
      <div className="w-full md:w-1/2 flex items-center p-8 md:p-16 relative">
        {/* Vertical accent line */}
        <div className="absolute left-8 md:left-16 top-1/4 bottom-1/4 w-1 bg-black" />

        {/* Content Container */}
        <div className="max-w-xl ml-8 md:ml-16 relative z-10 w-full">
          {/* Service Title */}
          <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
            <span className="text-gray-900">{t('services.fuel.titlePart1')}</span>
            <br />
            <span className="text-brand-blue">{t('services.fuel.titlePart2')}</span>
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
            {t('services.fuel.description')}
          </p>

          {/* Read More Button */}
          <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
            {t('services.readMore')}
            <svg 
              className="w-5 h-5" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>

      {/* Right Side - Image with Parallax */}
      <div className="w-full md:w-1/2 relative bg-gray-100 overflow-hidden h-[50vh] md:h-auto">
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
          <ImageWithFallback
            src="/images/FuelService.png"
            alt="Aviation Ground Solutions - Fuel Services"
            fill
            priority
            quality={85}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            showLoadingPlaceholder={false}
          />
        </div>
      </div>
    </section>
  );
};

export default FuelServicesSection;
