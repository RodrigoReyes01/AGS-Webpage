import { render, screen, fireEvent } from '@testing-library/react';
import LanguageSelector from '@/components/LanguageSelector';
import { I18nProvider } from '@/lib/i18n';

// Helper to render component with I18nProvider
const renderWithI18n = (initialLocale: 'en' | 'es' = 'en') => {
  return render(
    <I18nProvider initialLocale={initialLocale}>
      <LanguageSelector />
    </I18nProvider>
  );
};

describe('LanguageSelector Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should render both language buttons', () => {
    renderWithI18n();
    
    const englishButton = screen.getByLabelText(/switch to english/i);
    const spanishButton = screen.getByLabelText(/switch to spanish/i);
    
    expect(englishButton).toBeInTheDocument();
    expect(spanishButton).toBeInTheDocument();
  });

  it('should highlight English button when English is selected', () => {
    renderWithI18n('en');
    
    const englishButton = screen.getByLabelText(/switch to english/i);
    const spanishButton = screen.getByLabelText(/switch to spanish/i);
    
    expect(englishButton).toHaveAttribute('aria-pressed', 'true');
    expect(spanishButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('should highlight Spanish button when Spanish is selected', () => {
    renderWithI18n('es');
    
    const englishButton = screen.getByLabelText(/switch to english/i);
    const spanishButton = screen.getByLabelText(/switch to spanish/i);
    
    expect(englishButton).toHaveAttribute('aria-pressed', 'false');
    expect(spanishButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('should switch to Spanish when Spanish button is clicked', () => {
    renderWithI18n('en');
    
    const spanishButton = screen.getByLabelText(/switch to spanish/i);
    fireEvent.click(spanishButton);
    
    expect(spanishButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('should switch to English when English button is clicked', () => {
    renderWithI18n('es');
    
    const englishButton = screen.getByLabelText(/switch to english/i);
    fireEvent.click(englishButton);
    
    expect(englishButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('should have proper ARIA attributes for accessibility', () => {
    renderWithI18n();
    
    const group = screen.getByRole('group', { name: /language selector/i });
    expect(group).toBeInTheDocument();
    
    const englishButton = screen.getByLabelText(/switch to english/i);
    const spanishButton = screen.getByLabelText(/switch to spanish/i);
    
    expect(englishButton).toHaveAttribute('aria-label', 'Switch to English');
    expect(spanishButton).toHaveAttribute('aria-label', 'Switch to Spanish');
  });

  it('should have title attributes for tooltips', () => {
    renderWithI18n();
    
    const englishButton = screen.getByLabelText(/switch to english/i);
    const spanishButton = screen.getByLabelText(/switch to spanish/i);
    
    expect(englishButton).toHaveAttribute('title', 'English');
    expect(spanishButton).toHaveAttribute('title', 'Español');
  });

  it('should apply custom className', () => {
    render(
      <I18nProvider>
        <LanguageSelector className="custom-class" />
      </I18nProvider>
    );
    
    const group = screen.getByRole('group', { name: /language selector/i });
    expect(group).toHaveClass('custom-class');
  });

  it('should have transition classes for smooth state changes', () => {
    renderWithI18n();
    
    const englishButton = screen.getByLabelText(/switch to english/i);
    const spanishButton = screen.getByLabelText(/switch to spanish/i);
    
    expect(englishButton).toHaveClass('transition-all');
    expect(englishButton).toHaveClass('duration-300');
    expect(spanishButton).toHaveClass('transition-all');
    expect(spanishButton).toHaveClass('duration-300');
  });

  it('should have hover state classes', () => {
    renderWithI18n('es'); // Start with Spanish so English button is not selected
    
    const englishButton = screen.getByLabelText(/switch to english/i);
    
    expect(englishButton).toHaveClass('hover:scale-110');
    expect(englishButton).toHaveClass('hover:opacity-75');
  });

  it('should have focus ring classes for keyboard navigation', () => {
    renderWithI18n();
    
    const englishButton = screen.getByLabelText(/switch to english/i);
    
    expect(englishButton).toHaveClass('focus:outline-none');
    expect(englishButton).toHaveClass('focus:ring-2');
    expect(englishButton).toHaveClass('focus:ring-brand-blue');
  });
});
