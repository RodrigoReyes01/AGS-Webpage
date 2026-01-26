'use client';

import React from 'react';
import ImageWithFallback from '@/components/ImageWithFallback';
import Button from '@/components/Button';
import { useScroll } from '@/lib/scrollContext';
import FloatingContactMenu from './FloatingContactMenu';

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
      const documentHeight = document.documentElement.scrollHeight;
      
      // Button is at bottom-right, so we check what section is at the bottom of viewport
      // We need to add viewportHeight to scrollY to get the bottom position
      const bottomPosition = scrollY + viewportHeight;
      
      // Calculate approximate section positions
      // Hero: 0 to 100vh (dark)
      // Features: 100vh to ~120vh (light)
      // Mission/Vision: ~200vh to 300vh (dark)
      // Services sections: 300vh to ~900vh (white backgrounds)
      // Why AGS: ~900vh to 1000vh (dark with image)
      // Contact Form: ~1000vh+ (white)
      // Footer: last section (black)
      
      const heroEnd = viewportHeight * 1.1;
      const featuresEnd = viewportHeight * 1.3;
      const missionEnd = viewportHeight * 2.1;
      
      // Check if we're near the bottom (footer area)
      const distanceFromBottom = documentHeight - bottomPosition;
      const isNearFooter = distanceFromBottom < viewportHeight * 0.3; // Within 30% of viewport height from bottom
      
      if (isNearFooter) {
        // In footer section - black background
        setIsDarkBackground(true);
      } else if (bottomPosition < heroEnd) {
        // In hero section - dark background
        setIsDarkBackground(true);
      } else if (bottomPosition < featuresEnd) {
        // In features section - light background
        setIsDarkBackground(false);
      } else if (bottomPosition < missionEnd) {
        // In mission/vision section - dark background
        setIsDarkBackground(true);
      } else {
        // All other sections (services, contact) - light/white background
        setIsDarkBackground(false);
      }
    };

    checkBackground();
    window.addEventListener('scroll', checkBackground, { passive: true });
    window.addEventListener('resize', checkBackground, { passive: true });
    return () => {
      window.removeEventListener('scroll', checkBackground);
      window.removeEventListener('resize', checkBackground);
    };
  }, []);

  // WhatsApp contact handler (for mobile hero button only)
  const handleWhatsAppClick = () => {
    const phoneNumber = '50241002147';
    const messages = {
      en: 'Hello! I would like to know more about your services.',
      es: '¡Hola! Me gustaría saber más sobre sus servicios.',
    };
    const message = encodeURIComponent(messages[locale as keyof typeof messages] || messages.en);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
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
      <FloatingContactMenu
        isVisible={isButtonVisible}
        isDarkBackground={isDarkBackground}
        translations={translations}
      />
    </header>
  );
};

export default HeroSection;
