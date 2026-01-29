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
  backgroundImage = '/images/hero.jpg',
}) => {
  const { isVisible: isButtonVisible } = useScroll();
  const [isDarkBackground, setIsDarkBackground] = React.useState(true);

  // Detect background color for button based on bottom-right position
  React.useEffect(() => {
    const checkBackground = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // The floating button is at the bottom right, so check that position
      // Button is typically at bottom: 24px, so check at viewport bottom - 100px
      const buttonVerticalPosition = scrollY + viewportHeight - 100;
      
      // Get all sections on the home page
      const sections = document.querySelectorAll('main > *');
      let currentIsDark = true; // Default to dark (hero)
      
      // Find which section the button is currently over
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        const sectionTop = scrollY + rect.top;
        const sectionBottom = sectionTop + rect.height;
        
        // Check if the button position is in this section
        if (buttonVerticalPosition >= sectionTop && buttonVerticalPosition < sectionBottom) {
          // Check the background color of this section
          const bgColor = window.getComputedStyle(section).backgroundColor;
          const classList = section.className;
          
          // Check for explicit dark/light classes
          if (classList.includes('bg-black')) {
            currentIsDark = true;
            break;
          } else if (classList.includes('bg-white')) {
            currentIsDark = false;
            break;
          }
          
          // Check if background is transparent
          if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
            currentIsDark = false;
            break;
          }
          
          // Parse RGB values to determine brightness
          const rgbMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (rgbMatch) {
            const r = parseInt(rgbMatch[1]);
            const g = parseInt(rgbMatch[2]);
            const b = parseInt(rgbMatch[3]);
            
            // Calculate brightness (perceived luminance)
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            
            // If brightness is low (dark background), use white text
            currentIsDark = brightness < 128;
          }
          
          // Check for background images with dark overlays
          const hasBackgroundImage = window.getComputedStyle(section).backgroundImage !== 'none';
          if (hasBackgroundImage) {
            const overlay = section.querySelector('[class*="bg-black"], [class*="bg-opacity"]');
            if (overlay) {
              currentIsDark = true;
            }
          }
          
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
          quality={75}
          sizes="100vw"
          className="object-cover"
          showLoadingPlaceholder={false}
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
