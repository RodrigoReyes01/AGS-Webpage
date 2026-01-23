'use client';

import React from 'react';
import { useLocale } from '@/lib/i18n';

export interface LanguageSelectorProps {
  className?: string;
}

/**
 * LanguageSelector component
 * Enables users to switch between English and Spanish languages
 * 
 * Features:
 * - Displays US and Spanish flags as clickable buttons
 * - Highlights currently selected language
 * - Persists selection to localStorage via i18n context
 * - Integrates with i18n context for language management
 * 
 * Requirements: 1.4, 2.3, 5.1, 5.2
 */
const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className = '' }) => {
  const { locale, setLocale } = useLocale();

  const handleLanguageChange = (newLocale: 'en' | 'es') => {
    setLocale(newLocale);
  };

  return (
    <div className={`flex gap-2 items-center ${className}`} role="group" aria-label="Language selector">
      {/* English (US) Flag Button */}
      <button
        onClick={() => handleLanguageChange('en')}
        className={`
          text-2xl transition-all duration-300 ease-in-out
          hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 rounded
          ${locale === 'en' ? 'opacity-100 scale-110' : 'opacity-50 hover:opacity-75'}
        `}
        aria-label="Switch to English"
        aria-pressed={locale === 'en'}
        title="English"
      >
        🇺🇸
      </button>

      {/* Spanish Flag Button */}
      <button
        onClick={() => handleLanguageChange('es')}
        className={`
          text-2xl transition-all duration-300 ease-in-out
          hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 rounded
          ${locale === 'es' ? 'opacity-100 scale-110' : 'opacity-50 hover:opacity-75'}
        `}
        aria-label="Switch to Spanish"
        aria-pressed={locale === 'es'}
        title="Español"
      >
        🇪🇸
      </button>
    </div>
  );
};

export default LanguageSelector;
