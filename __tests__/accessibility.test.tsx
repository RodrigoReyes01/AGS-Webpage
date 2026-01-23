/**
 * Accessibility Tests for Task 9.1
 * Verifies semantic HTML and ARIA labels implementation
 * 
 * Requirements: 7.3
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Navigation from '@/app/components/Navigation';
import HeroSection from '@/app/components/HeroSection';
import { I18nProvider } from '@/lib/i18n';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

describe('Accessibility - Task 9.1: Semantic HTML and ARIA Labels', () => {
  describe('Navigation Component', () => {
    it('should use nav element with aria-label', () => {
      render(
        <I18nProvider initialLocale="en">
          <Navigation />
        </I18nProvider>
      );

      const nav = screen.getByRole('navigation', { name: /main navigation/i });
      expect(nav).toBeInTheDocument();
      expect(nav.tagName).toBe('NAV');
    });

    it('should have aria-label on mobile menu toggle button', () => {
      render(
        <I18nProvider initialLocale="en">
          <Navigation />
        </I18nProvider>
      );

      const toggleButton = screen.getByRole('button', { name: /toggle menu/i });
      expect(toggleButton).toBeInTheDocument();
      expect(toggleButton).toHaveAttribute('aria-label', 'Toggle menu');
    });

    it('should have aria-expanded state on hamburger menu', () => {
      render(
        <I18nProvider initialLocale="en">
          <Navigation />
        </I18nProvider>
      );

      const toggleButton = screen.getByRole('button', { name: /toggle menu/i });
      expect(toggleButton).toHaveAttribute('aria-expanded');
      
      // Initially should be false (menu closed)
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('HeroSection Component', () => {
    it('should use header element', () => {
      const { container } = render(
        <HeroSection
          locale="en"
          translations={{
            mainHeading: 'AVIATION GROUND SOLUTIONS',
            groundWord: 'GROUND',
            subheading: 'Your premier FBO ground service from Belize to Panama',
            ctaButton: "Let's Chat!",
          }}
        />
      );

      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
      expect(header?.tagName).toBe('HEADER');
    });

    it('should have proper heading hierarchy with h1', () => {
      render(
        <HeroSection
          locale="en"
          translations={{
            mainHeading: 'AVIATION GROUND SOLUTIONS',
            groundWord: 'GROUND',
            subheading: 'Your premier FBO ground service from Belize to Panama',
            ctaButton: "Let's Chat!",
          }}
        />
      );

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H1');
    });

    it('should have descriptive alt text for background image', () => {
      const { container } = render(
        <HeroSection
          locale="en"
          translations={{
            mainHeading: 'AVIATION GROUND SOLUTIONS',
            groundWord: 'GROUND',
            subheading: 'Your premier FBO ground service from Belize to Panama',
            ctaButton: "Let's Chat!",
          }}
        />
      );

      const image = container.querySelector('img[alt*="Aviation Ground Solutions"]');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('alt');
      expect(image?.getAttribute('alt')).not.toBe('');
    });
  });

  describe('Overall Semantic Structure', () => {
    it('should use semantic HTML elements appropriately', () => {
      const { container } = render(
        <I18nProvider initialLocale="en">
          <div>
            <Navigation />
            <HeroSection
              locale="en"
              translations={{
                mainHeading: 'AVIATION GROUND SOLUTIONS',
                groundWord: 'GROUND',
                subheading: 'Your premier FBO ground service from Belize to Panama',
                ctaButton: "Let's Chat!",
              }}
            />
          </div>
        </I18nProvider>
      );

      // Verify semantic elements exist
      expect(container.querySelector('nav')).toBeInTheDocument();
      expect(container.querySelector('header')).toBeInTheDocument();
      expect(container.querySelector('h1')).toBeInTheDocument();
    });

    it('should have all interactive elements with proper ARIA attributes', () => {
      render(
        <I18nProvider initialLocale="en">
          <Navigation />
        </I18nProvider>
      );

      // Check that all buttons have proper attributes
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        // Each button should have either aria-label or accessible text content
        const hasAriaLabel = button.hasAttribute('aria-label');
        const hasTextContent = button.textContent && button.textContent.trim().length > 0;
        
        expect(hasAriaLabel || hasTextContent).toBe(true);
      });
    });
  });
});
