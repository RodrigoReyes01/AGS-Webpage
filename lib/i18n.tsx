'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import enTranslations from '@/translations/en.json';
import esTranslations from '@/translations/es.json';

// Type definitions for translations
export type TranslationKey = string;
export type Translations = Record<string, any>;

// Supported locales
export type Locale = 'en' | 'es';

// Translation map
const translationsMap: Record<Locale, Translations> = {
  en: enTranslations,
  es: esTranslations,
};

// Safe localStorage wrapper for incognito/private browsing
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem(key);
      }
    } catch (error) {
      console.warn('[Storage] localStorage.getItem failed (private browsing?):', error);
    }
    return null;
  },
  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(key, value);
      }
    } catch (error) {
      console.warn('[Storage] localStorage.setItem failed (private browsing?):', error);
    }
  },
};

// I18n Context type
interface I18nContextType {
  locale: Locale;
  translations: Translations;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  isLoading: boolean;
}

// Create the context
const I18nContext = createContext<I18nContextType | undefined>(undefined);

// I18nProvider props
interface I18nProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

/**
 * I18nProvider component that manages internationalization state
 * Provides locale, translations, and translation function to all children
 */
export function I18nProvider({ children, initialLocale }: I18nProviderProps) {
  // Always use initialLocale for SSR/SSG to prevent hydration mismatch
  // Default to 'en' if not provided
  const initialLocaleValue = initialLocale || 'en';
  
  const [locale, setLocaleState] = useState<Locale>(initialLocaleValue);
  const [translations, setTranslations] = useState<Translations>(translationsMap[initialLocaleValue]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load translations when locale changes
  useEffect(() => {
    setIsLoading(true);
    setTranslations(translationsMap[locale]);
    setIsLoading(false);
  }, [locale]);

  // Sync locale with initialLocale prop (from URL) - only when initialLocale is provided and changes
  useEffect(() => {
    if (initialLocale !== undefined && initialLocale !== locale) {
      setLocaleState(initialLocale);
    }
  }, [initialLocale, locale]);

  // Initialize locale from localStorage on mount (client-side only)
  // This is secondary to the URL-based locale
  useEffect(() => {
    if (typeof window !== 'undefined' && initialLocale !== undefined) {
      const savedLocale = safeLocalStorage.getItem('preferredLanguage') as Locale;
      if (savedLocale && (savedLocale === 'en' || savedLocale === 'es')) {
        // Only use saved locale if it matches the initial locale
        // The URL is the source of truth
        if (savedLocale !== initialLocale) {
          // Update localStorage to match URL
          safeLocalStorage.setItem('preferredLanguage', initialLocale);
        }
      } else {
        // Save the initial locale to localStorage
        safeLocalStorage.setItem('preferredLanguage', initialLocale);
      }
    }
  }, [initialLocale]);

  // Update locale and persist to localStorage
  const setLocale = (newLocale: Locale) => {
    // Don't navigate if already on the requested locale
    if (locale === newLocale) {
      return;
    }
    
    // Always update the state immediately
    setLocaleState(newLocale);
    
    if (typeof window !== 'undefined') {
      safeLocalStorage.setItem('preferredLanguage', newLocale);
      
      // In static export, navigate to the actual HTML files
      if (window.location && window.location.pathname) {
        const currentPath = window.location.pathname;
        
        // Determine if we're on the about page
        const isAboutPage = currentPath.includes('about');
        
        // Build the new path for static export
        let newPath;
        if (newLocale === 'en') {
          if (isAboutPage) {
            newPath = '/en/about.html'; // English about page
          } else {
            newPath = '/'; // English home is at root (index.html)
          }
        } else {
          if (isAboutPage) {
            newPath = '/es/about.html'; // Spanish about page
          } else {
            newPath = '/es.html'; // Spanish home
          }
        }
        
        // Only navigate if we're in a real browser (not jsdom test environment)
        if (window.location.href && !window.navigator.userAgent.includes('jsdom')) {
          window.location.href = newPath;
        }
      }
    }
  };

  /**
   * Translation function with fallback logic
   * Supports nested keys using dot notation (e.g., 'navigation.aboutUs')
   * Falls back to English if translation is missing in current locale
   * Falls back to key name if translation is missing in both locales
   */
  const t = (key: string): string => {
    // Helper function to get nested value from object using dot notation
    const getNestedValue = (obj: any, path: string): any => {
      return path.split('.').reduce((current, part) => {
        return current?.[part];
      }, obj);
    };

    // Try to get translation in current locale
    let value = getNestedValue(translations, key);

    // If not found and not in English, try fallback English translations
    if (value === undefined && locale !== 'en') {
      value = getNestedValue(translationsMap.en, key);
      
      if (value !== undefined && process.env.NODE_ENV === 'development') {
        console.warn(`Translation missing for key "${key}" in locale "${locale}", using English fallback`);
      }
    }

    // If still not found, return the key itself as fallback
    if (value === undefined) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Translation missing for key "${key}" in all locales`);
      }
      return `[${key}]`;
    }

    return String(value);
  };

  const contextValue: I18nContextType = {
    locale,
    translations,
    setLocale,
    t,
    isLoading,
  };

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
}

/**
 * Hook to access translation functionality
 * Must be used within an I18nProvider
 * 
 * @returns Object containing:
 *   - t: Translation function
 *   - locale: Current locale
 *   - setLocale: Function to change locale
 *   - translations: Raw translations object
 */
export function useTranslation() {
  const context = useContext(I18nContext);
  
  if (context === undefined) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  
  return context;
}

/**
 * Hook to access only the locale and setLocale function
 * Useful for components that only need to change language without translations
 */
export function useLocale() {
  const context = useContext(I18nContext);
  
  if (context === undefined) {
    throw new Error('useLocale must be used within an I18nProvider');
  }
  
  return {
    locale: context.locale,
    setLocale: context.setLocale,
  };
}
