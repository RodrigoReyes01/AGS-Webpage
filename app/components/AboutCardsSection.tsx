'use client';

import React from 'react';
import ImageWithFallback from '@/components/ImageWithFallback';
import { useTranslation } from '@/lib/i18n';

/**
 * AboutCardsSection component
 * Displays four information cards with background image
 * 
 * Features:
 * - Background image with dark overlay
 * - Four cards in a 2x2 grid
 * - Each card has an icon, title with highlighted text, and description
 * - Responsive layout
 */
const AboutCardsSection: React.FC = () => {
  const { t } = useTranslation();

  const cards = [
    {
      key: 'coverage',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      key: 'operations',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      key: 'experience',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      key: 'team',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="/images/about-cards-bg.png"
          alt="Aviation background"
          fill
          quality={85}
          sizes="100vw"
          className="object-cover"
          showLoadingPlaceholder={false}
        />
        {/* Dark dimming overlay */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {cards.map((card) => (
            <div
              key={card.key}
              className="bg-transparent text-white"
            >
              {/* Icon and Title */}
              <div className="flex items-start gap-4 mb-4">
                {/* Icon */}
                <div className="flex-shrink-0 text-cyan-400 mt-1">
                  {card.icon}
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-xl md:text-2xl font-bold leading-tight">
                    {t(`about.cards.${card.key}.title`)}{' '}
                    <span className="text-cyan-400">
                      {t(`about.cards.${card.key}.titleHighlight`)}
                    </span>
                  </h3>
                  
                  {/* Decorative underline */}
                  <div className="flex items-center gap-2 mt-3">
                    <div className="h-0.5 w-16 bg-white" />
                    <div className="h-0.5 w-8 bg-cyan-400" />
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm md:text-base leading-relaxed pl-10">
                {t(`about.cards.${card.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutCardsSection;
