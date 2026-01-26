'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import ImageWithFallback from '@/components/ImageWithFallback';
import { Users, UserCheck, MapPin, Award } from 'lucide-react';

/**
 * AboutStatsSection component
 * Displays company statistics with graphic connector
 */

const AboutStatsSection: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      number: '126',
      label: t('about.stats.employees'),
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      number: '05',
      label: t('about.stats.coreEmployees'),
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      number: '07',
      label: t('about.stats.locations'),
    },
    {
      icon: <Award className="w-8 h-8" />,
      number: '20',
      label: t('about.stats.experience'),
    },
  ];

  return (
    <section className="relative w-full bg-black text-white overflow-visible">
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-white" />

            {/* Content */}
            <div className="pl-8">
              {/* Label */}
              <p className="text-sm uppercase tracking-wider mb-4 text-gray-400">
                {t('about.stats.label')}
              </p>

              {/* Title */}
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t('about.stats.title')}{' '}
                <span className="text-cyan-400">{t('about.stats.titleHighlight')}</span>
              </h2>

              {/* Description */}
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                {t('about.stats.description')}
              </p>
            </div>
          </div>

          {/* Right Side - Stats */}
          <div className="relative">
            {/* Stats Grid */}
            <div className="relative z-10 space-y-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center gap-6"
                >
                  {/* Icon Circle */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white flex items-center justify-center text-cyan-400">
                    {stat.icon}
                  </div>

                  {/* Number and Label */}
                  <div>
                    <div className="text-5xl md:text-6xl font-bold">
                      {stat.number}
                    </div>
                    <div className="text-sm md:text-base text-gray-400 uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStatsSection;
