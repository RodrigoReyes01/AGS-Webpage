'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import ImageWithFallback from '@/components/ImageWithFallback';

/**
 * MissionVisionSection component
 * Automatic carousel that alternates between Mission and Vision
 * 
 * Features:
 * - Auto-rotates every 5 seconds
 * - Manual navigation with indicator dots
 * - Split layout: text on left (black background), image on right
 * - Smooth transitions between slides
 */
const MissionVisionSection: React.FC = () => {
  const { t } = useTranslation();
  const [activeSlide, setActiveSlide] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  const slides = [
    {
      id: 'mission',
      label: t('missionVision.mission.label'),
      title: t('missionVision.mission.title'),
      highlight: t('missionVision.mission.highlight'),
      description: t('missionVision.mission.description'),
    },
    {
      id: 'vision',
      label: t('missionVision.vision.label'),
      title: t('missionVision.vision.title'),
      highlight: t('missionVision.vision.highlight'),
      description: t('missionVision.vision.description'),
    },
  ];

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Calculate parallax offset relative to when the section is in view
      // Section starts at ~200vh (after hero + features)
      const sectionStart = viewportHeight * 2;
      const relativeScroll = scrollY - sectionStart;
      
      // Apply parallax effect with a smaller multiplier (0.15 for subtle effect)
      const offset = relativeScroll * 0.15;
      setParallaxOffset(offset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDotClick = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <section className="relative w-full h-screen min-h-[600px] flex">
      {/* Left Side - Text Content (Black Background) */}
      <div className="w-full md:w-1/2 bg-black text-white flex items-center p-8 md:p-16 relative overflow-hidden">
        {/* Vertical accent line */}
        <div className="absolute left-8 md:left-16 top-1/4 bottom-1/4 w-1 bg-white" />

        {/* Content Container */}
        <div className="max-w-xl ml-8 md:ml-16 relative z-10 w-full">
          <div className="relative" style={{ minHeight: '350px' }}>
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute top-0 left-0 right-0 transition-opacity duration-1000 ease-in-out ${
                  index === activeSlide
                    ? 'opacity-100 z-10'
                    : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {/* Label */}
                <p className="text-sm uppercase tracking-wider mb-6 text-gray-400">
                  {slide.label}
                </p>

                {/* Title with highlight */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  {slide.title}{' '}
                  <span className="text-brand-blue block md:inline">{slide.highlight}</span>
                </h2>

                {/* Description */}
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  {slide.description}
                </p>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex gap-3 mt-12">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeSlide
                    ? 'bg-white w-8'
                    : 'bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Image with Parallax */}
      <div className="hidden md:block w-1/2 relative bg-gray-900 overflow-hidden">
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
            src="/images/MissionVision.png"
            alt="Aviation Ground Solutions - Mission and Vision"
            fill
            priority
            quality={85}
            sizes="50vw"
            className="object-cover"
            showLoadingPlaceholder={false}
          />
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
