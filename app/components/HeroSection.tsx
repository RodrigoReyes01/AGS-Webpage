'use client';

import React from 'react';
import ImageWithFallback from '@/components/ImageWithFallback';
import Button from '@/components/Button';

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
  const [isButtonVisible, setIsButtonVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  // Handle scroll to show/hide button
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show button when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsButtonVisible(true);
      } 
      // Hide button when scrolling down (after 100px)
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsButtonVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

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

        {/* CTA Button - Requirements 3.4, 4.2 - Centered on mobile, hidden on tablet/desktop */}
        <div className="md:hidden">
          <Button 
            variant="glass" 
            size="lg"
            onClick={handleWhatsAppClick}
          >
            {translations.ctaButton || "Let's Chat!"}
          </Button>
        </div>
      </div>

      {/* CTA Button - Requirements 3.4, 4.2 - Positioned bottom-right on tablet/desktop, hidden on mobile */}
      <div className={`hidden md:block fixed bottom-8 right-8 lg:bottom-12 lg:right-12 z-50 transition-all duration-300 ease-in-out ${
        isButtonVisible ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'
      }`}>
        <Button 
          variant="glass" 
          size="lg"
          onClick={handleWhatsAppClick}
        >
          {translations.ctaButton || "Let's Chat!"}
        </Button>
      </div>
    </header>
  );
};

export default HeroSection;
