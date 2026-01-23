'use client';

import React from 'react';
import ImageWithFallback from '@/components/ImageWithFallback';
import Button from '@/components/Button';
import { useScroll } from '@/lib/scrollContext';

/**
 * HeroSection component
 * Creates impactful first impression with company branding and call-to-action
 * 
 * Features:
 * - Full viewport height (100vh)
 * - Background image with dark overlay for text readability
 * - Responsive text sizing
 * - Main heading with "GROUND" styled in brand blue
 * - Subheading with company tagline
 * - "Let's Chat!" call-to-action button
 * 
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5
 */

interface HeroSectionProps {
  locale?: string;
  translations?: {
    mainHeading?: string;
    groundWord?: string;
    subheading?: string;
    ctaButton?: string;
  };
  backgroundImage?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  locale = 'en',
  translations = {
    mainHeading: 'AVIATION GROUND SOLUTIONS',
    groundWord: 'GROUND',
    subheading: 'Your premier FBO ground service from Belize to Panama',
    ctaButton: "Let's Chat!",
  },
  backgroundImage = '/images/hero.png',
}) => {
  const { isVisible: isButtonVisible } = useScroll();
  const [isDarkBackground, setIsDarkBackground] = React.useState(true);

  // Detect background color for button based on bottom-right position
  React.useEffect(() => {
    const checkBackground = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Button is at bottom-right, so we check what section is at the bottom of viewport
      // We need to add viewportHeight to scrollY to get the bottom position
      const bottomPosition = scrollY + viewportHeight;
      
      // Hero section ends at ~100vh
      // Features section is from ~100vh to ~200vh
      // Mission/Vision section starts at ~200vh
      
      if (bottomPosition < viewportHeight * 1.15) {
        // Bottom of viewport is in hero section - dark background
        setIsDarkBackground(true);
      } else if (bottomPosition < viewportHeight * 2.15) {
        // Bottom of viewport is in features section - light background
        setIsDarkBackground(false);
      } else {
        // Bottom of viewport is in mission/vision section - dark background
        setIsDarkBackground(true);
      }
    };

    checkBackground();
    window.addEventListener('scroll', checkBackground, { passive: true });
    return () => window.removeEventListener('scroll', checkBackground);
  }, []);

  // WhatsApp contact handler
  const handleWhatsAppClick = () => {
    // Format: +502 4100 2147 -> 50241002147 (remove spaces and keep country code)
    const phoneNumber = '50241002147';
    
    // Contextual message based on locale
    const messages = {
      en: 'Hello! I would like to know more about your services.',
      es: '¡Hola! Me gustaría saber más sobre sus servicios.',
    };
    
    const message = encodeURIComponent(messages[locale as keyof typeof messages] || messages.en);
    
    // WhatsApp URL - will open app if installed, otherwise web.whatsapp.com
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Open in new tab
    window.open(whatsappUrl, '_blank');
  };

  // Split the main heading to style "GROUND" separately
  const renderMainHeading = () => {
    const heading = translations.mainHeading || 'AVIATION GROUND SOLUTIONS';
    const groundWord = translations.groundWord || 'GROUND';
    
    // Split the heading by the ground word
    const parts = heading.split(groundWord);
    
    if (parts.length === 2) {
      return (
        <>
          {parts[0]}
          <span className="text-brand-blue">{groundWord}</span>
          {parts[1]}
        </>
      );
    }
    
    // Fallback if the word isn't found
    return heading;
  };

  return (
    <header className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={backgroundImage}
          alt="Aviation Ground Solutions - Aircraft on tarmac"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover"
          showLoadingPlaceholder={true}
        />
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Main Heading - Requirements 3.1, 3.2, 4.1 */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg leading-tight">
          {renderMainHeading()}
        </h1>

        {/* Subheading - Requirements 3.2, 4.1 */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-8 sm:mb-12 drop-shadow-md max-w-3xl mx-auto leading-relaxed">
          {translations.subheading || 'Your premier FBO ground service from Belize to Panama'}
        </p>

        {/* CTA Button - Requirements 3.4, 4.2 - Centered on mobile in hero, hidden on tablet/desktop */}
        <div className="md:hidden">
          <Button 
            variant="glass" 
            size="lg"
            onClick={handleWhatsAppClick}
          >
            <span className="flex items-center gap-2">
              <svg 
                className="w-5 h-5" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              {translations.ctaButton || "Let's Chat!"}
            </span>
          </Button>
        </div>
      </div>

      {/* Floating Action Button - Mobile only - Fixed bottom-right with icon only */}
      <div className={`md:hidden fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out ${
        isButtonVisible ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'
      }`}>
        <button
          onClick={handleWhatsAppClick}
          className={`w-14 h-14 rounded-full font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-2xl border-2 hover:scale-110 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.2)] flex items-center justify-center ${
            isDarkBackground
              ? 'bg-white/10 text-white border-white/40 hover:bg-white/20 hover:border-white/60 focus:ring-white/50'
              : 'bg-gray-900/10 text-gray-900 border-gray-900/40 hover:bg-gray-900/20 hover:border-gray-900/60 focus:ring-gray-900/50'
          }`}
          aria-label={translations.ctaButton || "Let's Chat!"}
        >
          <svg 
            className="w-6 h-6" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>

      {/* CTA Button - Requirements 3.4, 4.2 - Positioned bottom-right on tablet/desktop, hidden on mobile */}
      <div className={`hidden md:block fixed bottom-8 right-8 lg:bottom-12 lg:right-12 z-50 transition-all duration-300 ease-in-out ${
        isButtonVisible ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'
      }`}>
        <button
          onClick={handleWhatsAppClick}
          className={`font-semibold rounded-lg px-8 py-4 text-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-2xl border-2 hover:scale-105 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.2)] flex items-center gap-3 ${
            isDarkBackground
              ? 'bg-white/10 text-white border-white/40 hover:bg-white/20 hover:border-white/60 focus:ring-white/50'
              : 'bg-gray-900/10 text-gray-900 border-gray-900/40 hover:bg-gray-900/20 hover:border-gray-900/60 focus:ring-gray-900/50'
          }`}
        >
          <svg 
            className="w-6 h-6" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          {translations.ctaButton || "Let's Chat!"}
        </button>
      </div>
    </header>
  );
};

export default HeroSection;
