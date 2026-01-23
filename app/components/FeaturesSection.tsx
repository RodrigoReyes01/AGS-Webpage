'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';

/**
 * FeaturesSection component
 * Displays key features/benefits with interactive hover effects
 * 
 * Features:
 * - Four feature cards with icons
 * - Expanding dark mode effect on hover
 * - Responsive grid layout
 * - Smooth transitions
 */
const FeaturesSection: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      ),
      title: t('features.coverage.title'),
      description: t('features.coverage.description'),
    },
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      title: t('features.operations.title'),
      description: t('features.operations.description'),
    },
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
      title: t('features.experience.title'),
      description: t('features.experience.description'),
    },
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
      title: t('features.support.title'),
      description: t('features.support.description'),
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-lg p-8 transition-all duration-500 ease-in-out overflow-hidden hover:shadow-2xl"
            >
              {/* Expanding dark background on hover */}
              <div className="absolute inset-0 bg-black transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-in-out origin-center rounded-lg" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon container with expanding effect */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    {/* Black circle background that expands */}
                    <div className="absolute inset-0 bg-black rounded-full transform scale-100 group-hover:scale-[8] transition-transform duration-500 ease-in-out -z-10" />
                    
                    {/* Icon */}
                    <div className="relative z-10 w-16 h-16 bg-black rounded-full flex items-center justify-center text-white group-hover:text-white transition-colors duration-500">
                      {feature.icon}
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="relative z-20 text-xl font-semibold text-center mb-3 text-brand-blue group-hover:text-white transition-colors duration-500">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="relative z-20 text-gray-600 text-center text-sm leading-relaxed group-hover:text-white transition-colors duration-500">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
