'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import ResponsiveImage from '@/components/ResponsiveImage';
import Link from 'next/link';

const WhyAGSSection: React.FC = () => {
  const { t, locale } = useTranslation();
  const [parallaxOffset, setParallaxOffset] = useState(0);

  // Get the base path - no locale prefix needed anymore
  const getLocalePath = (path: string) => {
    // Simple paths - no locale prefix, no .html extension
    // Just use the path as-is
    return path;
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const sectionStart = viewportHeight * 9;
      const relativeScroll = scrollY - sectionStart;
      const isMobile = window.innerWidth < 768;
      const multiplier = isMobile ? 0.06 : 0.15;
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
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 w-full h-full">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translate3d(0, ${parallaxOffset}px, 0) scale(1.15)`,
            willChange: 'transform',
            top: '0%',
            left: '-7.5%',
            width: '115%',
            height: '115%',
          }}
        >
          <ResponsiveImage
            src="DifferentApproach"
            alt="Aviation Ground Solutions - Why Choose Us"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* Black Container Overlay - Positioned Left */}
      <div className="relative z-10 w-full max-w-md mx-8 md:ml-16 md:mr-auto bg-black text-white p-6 md:p-8 rounded-lg">
        {/* Vertical accent line */}
        <div className="absolute left-0 top-8 bottom-8 w-1 bg-white" />

        {/* Content */}
        <div className="ml-6">
          {/* Label */}
          <p className="text-xs uppercase tracking-wider mb-4 text-gray-400">
            {t('whyAGS.label')}
          </p>

          {/* Title */}
          <h2 className="text-xl md:text-2xl font-bold mb-4 leading-tight">
            {t('whyAGS.title')}{' '}
            <span className="text-brand-blue">{t('whyAGS.highlight')}</span>
            {t('whyAGS.titleEnd')}
          </h2>

          {/* Description Paragraphs */}
          <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-3">
            {t('whyAGS.paragraph1')}
          </p>

          <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-3">
            {t('whyAGS.paragraph2')}
          </p>

          <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-6">
            {t('whyAGS.paragraph3')}
          </p>

          {/* Read More Button */}
          <Link href={getLocalePath('/about')}>
            <button className="inline-flex items-center gap-2 px-4 py-2 border-2 border-white text-white text-sm font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black">
              {t('services.readMore')}
              <svg 
                className="w-4 h-4" 
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
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyAGSSection;
