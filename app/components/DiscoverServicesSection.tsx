'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import ImageWithFallback from '@/components/ImageWithFallback';

const DiscoverServicesSection: React.FC = () => {
  const { t } = useTranslation();
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const sectionStart = viewportHeight * 8;
      const relativeScroll = scrollY - sectionStart;
      const isMobile = window.innerWidth < 768;
      const multiplier = isMobile ? 0.06 : 0.25; // More aggressive on desktop
      const offset = relativeScroll * multiplier;
      setParallaxOffset(offset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col md:flex-row bg-white">
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
          <ImageWithFallback
            src="/images/DiscoverServices.png"
            alt="Aviation Ground Solutions - Discover Our Services"
            fill
            priority
            quality={85}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            showLoadingPlaceholder={false}
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center p-8 md:p-16 relative order-1 md:order-2">
        <div className="absolute left-8 md:left-16 top-1/4 bottom-1/4 w-1 bg-black" />

        <div className="max-w-xl ml-8 md:ml-16 relative z-10 w-full">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
            <span className="text-gray-900">{t('discoverServices.titlePart1')}</span>
            <br />
            <span className="text-brand-blue">{t('discoverServices.titlePart2')}</span>
          </h3>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
            {t('discoverServices.description')}
          </p>

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
    </section>
  );
};

export default DiscoverServicesSection;
