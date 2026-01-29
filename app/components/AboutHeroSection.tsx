'use client';

import React, { useState, useEffect } from 'react';
import ImageWithFallback from '@/components/ImageWithFallback';
import { useTranslation } from '@/lib/i18n';
import { useScroll } from '@/lib/scrollContext';
import FloatingContactMenu from './FloatingContactMenu';

/**
 * AboutHeroSection component
 * Hero section for the About Us page
 * 
 * Features:
 * - Full viewport height
 * - Gradient background (blue to pink/red)
 * - Airplane silhouette image
 * - Styled heading with highlighted text
 * - Bullet point with bold text emphasis
 * - Floating contact menu
 */
const AboutHeroSection: React.FC = () => {
  const { t } = useTranslation();
  const { isVisible: isButtonVisible } = useScroll();
  const [isDarkBackground, setIsDarkBackground] = useState(true);

  // Detect background color for floating button (bottom right corner)
  useEffect(() => {
    const checkBackground = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // The floating button is at the bottom right, so check that position
      // Button is typically at bottom: 24px, so check at viewport bottom - 100px
      const buttonVerticalPosition = scrollY + viewportHeight - 100;
      
      // Get actual section positions
      const sections = [
        { element: document.querySelector('header'), isDark: true }, // Hero - white text
        { element: document.querySelectorAll('section')[0], isDark: true }, // 4 Cards - white text
        { element: document.querySelectorAll('section')[1], isDark: false }, // Timeline - black text
        { element: document.querySelectorAll('section')[2], isDark: true }, // More in Depth - white text
        { element: document.querySelectorAll('section')[3], isDark: false }, // Map - black text
        { element: document.querySelectorAll('section')[4], isDark: true }, // Thanks to Partners - white text
        { element: document.querySelectorAll('section')[5], isDark: false }, // Get in Touch - black text
        { element: document.querySelector('footer'), isDark: true }, // Footer - white text
      ];
      
      let currentIsDark = true; // Default to dark (hero)
      
      // Find which section the button is currently over
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (!section.element) continue;
        
        const rect = section.element.getBoundingClientRect();
        const sectionTop = scrollY + rect.top;
        const sectionBottom = sectionTop + rect.height;
        
        // Check if the button position is in this section
        if (buttonVerticalPosition >= sectionTop && buttonVerticalPosition < sectionBottom) {
          currentIsDark = section.isDark;
          break;
        }
      }
      
      setIsDarkBackground(currentIsDark);
    };

    checkBackground();
    window.addEventListener('scroll', checkBackground, { passive: true });
    window.addEventListener('resize', checkBackground, { passive: true });
    return () => {
      window.removeEventListener('scroll', checkBackground);
      window.removeEventListener('resize', checkBackground);
    };
  }, []);

  return (
    <>
      <header className="relative w-full h-screen min-h-[600px] flex items-center justify-start overflow-hidden">
        {/* Gradient Background */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(135deg, #4A5FD9 0%, #7B5FB8 40%, #C85A8E 70%, #E85D75 100%)',
          }}
        />

        {/* Airplane Silhouette - Right Side */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="/images/about-hero.jpg"
            alt="Aircraft silhouette"
            fill
            priority
            quality={75}
            sizes="100vw"
            className="object-cover md:object-contain"
            style={{ objectPosition: 'bottom right' }}
            showLoadingPlaceholder={false}
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 w-full">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 sm:mb-12 leading-tight max-w-4xl">
            {t('about.hero.title')}{' '}
            <span className="text-cyan-300">{t('about.hero.titleHighlight')}</span>{' '}
            {t('about.hero.titleEnd')}
          </h1>

          {/* Bullet Point with Styled Text */}
          <div className="flex items-start gap-4 max-w-2xl">
            {/* Bullet Icon */}
            <div className="flex-shrink-0 mt-2">
              <svg 
                className="w-6 h-6 text-white" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>

            {/* Text Content */}
            <p className="text-lg sm:text-xl md:text-2xl text-white leading-relaxed">
              {t('about.hero.subtitle')}{' '}
              <span className="font-bold">{t('about.hero.subtitleBold')}</span>{' '}
              {t('about.hero.subtitleMid')}{' '}
              <span className="font-bold">{t('about.hero.subtitleBold2')}</span>{' '}
              {t('about.hero.subtitleEnd')}{' '}
              <span className="font-bold">{t('about.hero.subtitleBold3')}</span>{' '}
              {t('about.hero.subtitleFinal')}{' '}
              <span className="font-bold">{t('about.hero.subtitleBold4')}</span>
            </p>
          </div>
        </div>
      </header>

      {/* Floating Contact Menu */}
      <FloatingContactMenu
        isVisible={isButtonVisible}
        isDarkBackground={isDarkBackground}
        translations={{
          ctaButton: t('hero.ctaButton'),
        }}
      />
    </>
  );
};

export default AboutHeroSection;
