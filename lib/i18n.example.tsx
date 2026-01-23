/**
 * Example usage of the i18n system
 * 
 * This file demonstrates how to use the I18nProvider and useTranslation hook
 * in your components.
 */

import { I18nProvider, useTranslation, useLocale } from './i18n';

// Example 1: Basic usage with useTranslation
function MyComponent() {
  const { t, locale, setLocale } = useTranslation();

  return (
    <div>
      <h1>{t('hero.mainHeading')}</h1>
      <p>{t('hero.subheading')}</p>
      <button onClick={() => setLocale(locale === 'en' ? 'es' : 'en')}>
        Switch Language
      </button>
    </div>
  );
}

// Example 2: Using only locale without translations
function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div>
      <button 
        onClick={() => setLocale('en')}
        className={locale === 'en' ? 'active' : ''}
      >
        English
      </button>
      <button 
        onClick={() => setLocale('es')}
        className={locale === 'es' ? 'active' : ''}
      >
        Español
      </button>
    </div>
  );
}

// Example 3: App setup with I18nProvider
export function App() {
  return (
    <I18nProvider initialLocale="en">
      <MyComponent />
      <LanguageSwitcher />
    </I18nProvider>
  );
}

// Example 4: Nested translation keys
function NavigationExample() {
  const { t } = useTranslation();

  return (
    <nav>
      <a href="#about">{t('navigation.aboutUs')}</a>
      <a href="#services">{t('navigation.ourServices')}</a>
      <button>{t('navigation.requestUs')}</button>
    </nav>
  );
}

// Example 5: Handling missing translations
function SafeTranslation() {
  const { t } = useTranslation();

  // If the key doesn't exist, it will:
  // 1. Try to fall back to English
  // 2. If still not found, return [key.name]
  const text = t('some.missing.key'); // Returns "[some.missing.key]"

  return <div>{text}</div>;
}
