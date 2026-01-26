'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AboutLocationsSection component
 * Displays company locations with embedded Google Maps and collapsible info card
 */

const AboutLocationsSection: React.FC = () => {
  const { t } = useTranslation();
  const [isCardVisible, setIsCardVisible] = useState(true);

  return (
    <section className="relative w-full bg-white">
      {/* Top Section - Title and Description */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Title */}
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {t('about.locations.title')}
            </h2>
          </div>

          {/* Right Side - Description with vertical line */}
          <div className="flex items-start gap-6">
            <div className="h-full w-1 bg-gray-900 flex-shrink-0 min-h-[100px]" />
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              {t('about.locations.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Map Section with Overlay Card */}
      <div className="w-full h-[500px] md:h-[600px] relative">
        {/* Google Map */}
        <iframe
          src="https://www.google.com/maps/d/u/0/embed?mid=13yCGpVHLDgEBrzCeukf9lQYqxOXTw3A&ehbc=2E312F&noprof=1"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="AGS Locations Map"
        />

        {/* Stay Connected Card - Overlaying the map */}
        <AnimatePresence>
          {isCardVisible && (
            <motion.div
              initial={{ x: -400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -400, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute top-1/2 left-6 transform -translate-y-1/2 z-30 bg-white rounded-2xl shadow-2xl p-8 max-w-sm"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsCardVisible(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close card"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Card Content */}
              <div>
                {/* Label */}
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                  {t('about.locations.contactLabel')}
                </p>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  {t('about.locations.contactTitle')}{' '}
                  <span className="text-cyan-400">{t('about.locations.contactHighlight')}</span>
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t('about.locations.contactDescription')}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Show Card Button - Only visible when card is hidden */}
        <AnimatePresence>
          {!isCardVisible && (
            <motion.button
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -60, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              onClick={() => setIsCardVisible(true)}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 z-30 bg-white rounded-r-lg shadow-lg p-3 hover:bg-gray-50 transition-colors"
              aria-label="Show card"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AboutLocationsSection;
