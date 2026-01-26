'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';

/**
 * AboutPartnersSection component
 * Displays partners acknowledgment section
 */

const AboutPartnersSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative w-full bg-black text-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          {t('about.partners.title')}{' '}
          <span className="text-cyan-400">{t('about.partners.titleHighlight')}</span>
        </h2>

        {/* Description */}
        <p className="text-gray-300 text-base md:text-lg leading-relaxed">
          {t('about.partners.description')}
        </p>
      </div>
    </section>
  );
};

export default AboutPartnersSection;
