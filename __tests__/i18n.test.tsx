import { render, screen, waitFor, act } from '@testing-library/react';
import { I18nProvider, useTranslation, useLocale } from '@/lib/i18n';
import { ReactNode } from 'react';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Test component that uses useTranslation
function TestComponent() {
  const { t, locale, setLocale } = useTranslation();

  return (
    <div>
      <div data-testid="locale">{locale}</div>
      <div data-testid="translation">{t('navigation.aboutUs')}</div>
      <button onClick={() => setLocale('es')} data-testid="switch-to-spanish">
        Switch to Spanish
      </button>
      <button onClick={() => setLocale('en')} data-testid="switch-to-english">
        Switch to English
      </button>
    </div>
  );
}

// Test component for missing translations
function TestMissingTranslation() {
  const { t } = useTranslation();

  return (
    <div>
      <div data-testid="missing-key">{t('nonexistent.key')}</div>
    </div>
  );
}

// Test component for useLocale hook
function TestLocaleComponent() {
  const { locale, setLocale } = useLocale();

  return (
    <div>
      <div data-testid="locale-only">{locale}</div>
      <button onClick={() => setLocale('es')} data-testid="change-locale">
        Change Locale
      </button>
    </div>
  );
}

describe('I18nProvider', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('should provide default English locale', async () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('locale')).toHaveTextContent('en');
    });
  });

  it('should load and display English translations', async () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('translation')).toHaveTextContent('About us');
    });
  });

  it('should switch to Spanish locale and update translations', async () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );

    // Wait for initial English translations to load
    await waitFor(() => {
      expect(screen.getByTestId('translation')).toHaveTextContent('About us');
    });

    // Switch to Spanish
    const switchButton = screen.getByTestId('switch-to-spanish');
    await act(async () => {
      switchButton.click();
    });

    // Wait for Spanish translations to load
    await waitFor(() => {
      expect(screen.getByTestId('locale')).toHaveTextContent('es');
      expect(screen.getByTestId('translation')).toHaveTextContent('Sobre nosotros');
    });
  });

  it('should persist locale to localStorage', async () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('locale')).toHaveTextContent('en');
    });

    // Switch to Spanish
    const switchButton = screen.getByTestId('switch-to-spanish');
    await act(async () => {
      switchButton.click();
    });

    await waitFor(() => {
      expect(localStorageMock.getItem('preferredLanguage')).toBe('es');
    });
  });

  it('should load locale from localStorage on mount', async () => {
    localStorageMock.setItem('preferredLanguage', 'es');

    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('locale')).toHaveTextContent('es');
    });
  });

  it('should handle missing translation keys with fallback', async () => {
    render(
      <I18nProvider>
        <TestMissingTranslation />
      </I18nProvider>
    );

    await waitFor(() => {
      // Should display the key in brackets when translation is missing
      expect(screen.getByTestId('missing-key')).toHaveTextContent('[nonexistent.key]');
    });
  });

  it('should accept initialLocale prop', async () => {
    render(
      <I18nProvider initialLocale="es">
        <TestComponent />
      </I18nProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('locale')).toHaveTextContent('es');
    });
  });
});

describe('useTranslation hook', () => {
  it('should throw error when used outside I18nProvider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useTranslation must be used within an I18nProvider');

    consoleSpy.mockRestore();
  });

  it('should provide translation function', async () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('translation')).toBeInTheDocument();
    });
  });
});

describe('useLocale hook', () => {
  beforeEach(() => {
    // Clear localStorage before each test in this block
    localStorageMock.clear();
  });

  it('should throw error when used outside I18nProvider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestLocaleComponent />);
    }).toThrow('useLocale must be used within an I18nProvider');

    consoleSpy.mockRestore();
  });

  it('should provide locale and setLocale', async () => {
    render(
      <I18nProvider>
        <TestLocaleComponent />
      </I18nProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('locale-only')).toHaveTextContent('en');
    });

    const changeButton = screen.getByTestId('change-locale');
    await act(async () => {
      changeButton.click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('locale-only')).toHaveTextContent('es');
    });
  });
});

describe('Translation fallback behavior', () => {
  it('should fall back to English for missing Spanish translations', async () => {
    // Clear localStorage to ensure we start with English
    localStorageMock.clear();
    
    // Create a test component that tries to access a key that might be missing in Spanish
    function TestFallback() {
      const { t, setLocale, locale } = useTranslation();

      return (
        <div>
          <div data-testid="current-locale">{locale}</div>
          <div data-testid="fallback-translation">{t('navigation.aboutUs')}</div>
          <button onClick={() => setLocale('es')} data-testid="switch-lang">
            Switch
          </button>
        </div>
      );
    }

    render(
      <I18nProvider initialLocale="en">
        <TestFallback />
      </I18nProvider>
    );

    // Wait for English to load
    await waitFor(() => {
      expect(screen.getByTestId('current-locale')).toHaveTextContent('en');
      expect(screen.getByTestId('fallback-translation')).toHaveTextContent('About us');
    }, { timeout: 2000 });

    // Switch to Spanish - should show Spanish translation (since it exists)
    const switchButton = screen.getByTestId('switch-lang');
    await act(async () => {
      switchButton.click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('current-locale')).toHaveTextContent('es');
      expect(screen.getByTestId('fallback-translation')).toHaveTextContent('Sobre nosotros');
    }, { timeout: 2000 });
  });
});
