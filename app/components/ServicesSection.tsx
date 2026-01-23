'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import ImageWithFallback from '@/components/ImageWithFallback';

/**
 * ServicesSection component
 * Displays cargo services with parallax image effect
 * 
 * Features:
 * - Split layout: text on left, image on right
 * - Vertical accent line
 * - Parallax effect on image
 * - "Read More" call-to-action button
 */
const ServicesSection: React.FC = () => {
  const { t } = useTranslation();
  const [parallaxOffset, setParallaxOffset] = useState(0);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Calculate parallax offset relative to when the section is in view
      // Section starts at ~300vh (after hero + features + mission/vision)
      const sectionStart = viewportHeight * 3;
      const relativeScroll = scrollY - sectionStart;
      
      // Apply parallax effect with a subtle multiplier (0.15)
      const offset = relativeScroll * 0.15;
      setParallaxOffset(offset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex bg-white">
      {/* Left Side - Text Content */}
      <div className="w-full md:w-1/2 flex items-center p-8 md:p-16 relative">
        {/* Vertical accent line */}
        <div className="absolute left-8 md:left-16 top-1/4 bottom-1/4 w-1 bg-black" />

        {/* Content Container */}
        <div className="max-w-xl ml-8 md:ml-16 relative z-10 w-full">
          {/* Label */}
          <p className="text-sm uppercase tracking-wider mb-6 text-gray-500">
            {t('services.label')}
          </p>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight text-gray-900">
            {t('services.title')}
          </h2>

          {/* Service Title */}
          <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
            <span className="text-gray-900">{t('services.cargo.titlePart1')}</span>
            <br />
            <span className="text-brand-blue">{t('services.cargo.titlePart2')}</span>
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
            {t('services.cargo.description')}
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
      <div className="hidden md:block w-1/2 relative bg-gray-100 overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translate3d(0, ${parallaxOffset}px, 0) scale(1.15)`,
            willChange: 'transform',
            top: '-7.5%',
            left: '0%',
            width: '115%',
            height: '115%',
          }}
        >
          <ImageWithFallback
            src="/images/CargoServices.png"
            alt="Aviation Ground Solutions - Cargo Services"
            fill
            priority
            quality={85}
            sizes="50vw"
            className="object-cover object-right"
            showLoadingPlaceholder={false}
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
