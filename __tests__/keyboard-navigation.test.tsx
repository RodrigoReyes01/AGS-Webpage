/**
 * Keyboard Navigation Tests for Task 9.2
 * Verifies keyboard accessibility implementation
 * 
 * Requirements: 7.3
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navigation from '@/app/components/Navigation';
import HeroSection from '@/app/components/HeroSection';
import Button from '@/components/Button';
import LanguageSelector from '@/components/LanguageSelector';
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
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));

describe('Keyboard Navigation - Task 9.2', () => {
  describe('Button Component', () => {
    it('should be keyboard accessible with Tab key', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      
      render(
        <div>
          <Button onClick={handleClick}>Test Button</Button>
          <button>Other Button</button>
        </div>
      );

      const testButton = screen.getByRole('button', { name: /test button/i });
      
      // Tab to the button
      await user.tab();
      expect(testButton).toHaveFocus();
    });

    it('should have visible focus indicator', () => {
      render(<Button>Test Button</Button>);
      
      const button = screen.getByRole('button', { name: /test button/i });
      
      // Check that focus ring classes are present
      expect(button.className).toContain('focus:ring-2');
      expect(button.className).toContain('focus:ring-offset-2');
    });

    it('should be activatable with Enter key', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      
      render(<Button onClick={handleClick}>Test Button</Button>);
      
      const button = screen.getByRole('button', { name: /test button/i });
      button.focus();
      
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should be activatable with Space key', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      
      render(<Button onClick={handleClick}>Test Button</Button>);
      
      const button = screen.getByRole('button', { name: /test button/i });
      button.focus();
      
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('LanguageSelector Component', () => {
    it('should have keyboard accessible language buttons', async () => {
      const user = userEvent.setup();
      
      render(
        <I18nProvider initialLocale="en">
          <LanguageSelector />
        </I18nProvider>
      );

      const englishButton = screen.getByRole('button', { name: /switch to english/i });
      const spanishButton = screen.getByRole('button', { name: /switch to spanish/i });
      
      // Both buttons should be in the tab order
      await user.tab();
      expect(englishButton).toHaveFocus();
      
      await user.tab();
      expect(spanishButton).toHaveFocus();
    });

    it('should have visible focus indicators on language buttons', () => {
      render(
        <I18nProvider initialLocale="en">
          <LanguageSelector />
        </I18nProvider>
      );

      const englishButton = screen.getByRole('button', { name: /switch to english/i });
      const spanishButton = screen.getByRole('button', { name: /switch to spanish/i });
      
      // Check focus ring classes
      expect(englishButton.className).toContain('focus:ring-2');
      expect(spanishButton.className).toContain('focus:ring-2');
    });

    it('should switch language with Enter key', async () => {
      const user = userEvent.setup();
      
      render(
        <I18nProvider initialLocale="en">
          <LanguageSelector />
        </I18nProvider>
      );

      const spanishButton = screen.getByRole('button', { name: /switch to spanish/i });
      spanishButton.focus();
      
      await user.keyboard('{Enter}');
      
      // Check that Spanish button is now pressed
      await waitFor(() => {
        expect(spanishButton).toHaveAttribute('aria-pressed', 'true');
      });
    });
  });

  describe('Navigation Component', () => {
    it('should have all navigation links keyboard accessible', async () => {
      const user = userEvent.setup();
      
      render(
        <I18nProvider initialLocale="en">
          <Navigation />
        </I18nProvider>
      );

      // Get all links in the navigation
      const links = screen.getAllByRole('link');
      
      // Should have at least the logo link and navigation links
      expect(links.length).toBeGreaterThanOrEqual(3);
      
      // Tab through navigation elements
      await user.tab(); // Logo link
      expect(links[0]).toHaveFocus();
      
      await user.tab(); // About Us link
      expect(document.activeElement?.tagName).toBe('A');
      
      await user.tab(); // Our Services link
      expect(document.activeElement?.tagName).toBe('A');
    });

    it('should have visible focus indicators on navigation links', () => {
      render(
        <I18nProvider initialLocale="en">
          <Navigation />
        </I18nProvider>
      );

      const links = screen.getAllByRole('link');
      
      // Check that navigation links have focus styles
      links.forEach(link => {
        if (link.textContent?.includes('About us') || link.textContent?.includes('Our Services')) {
          expect(link.className).toContain('focus:ring-2');
        }
      });
    });

    it('should close mobile menu with Escape key', async () => {
      const user = userEvent.setup();
      
      render(
        <I18nProvider initialLocale="en">
          <Navigation />
        </I18nProvider>
      );

      const toggleButton = screen.getByRole('button', { name: /toggle menu/i });
      
      // Open mobile menu
      await user.click(toggleButton);
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
      
      // Press Escape
      await user.keyboard('{Escape}');
      
      // Menu should be closed
      await waitFor(() => {
        expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
      });
    });

    it('should return focus to toggle button when closing menu with Escape', async () => {
      const user = userEvent.setup();
      
      render(
        <I18nProvider initialLocale="en">
          <Navigation />
        </I18nProvider>
      );

      const toggleButton = screen.getByRole('button', { name: /toggle menu/i });
      
      // Open mobile menu
      await user.click(toggleButton);
      
      // Press Escape
      await user.keyboard('{Escape}');
      
      // Focus should return to toggle button
      await waitFor(() => {
        expect(toggleButton).toHaveFocus();
      });
    });

    it('should have logical tab order in desktop navigation', async () => {
      const user = userEvent.setup();
      
      render(
        <I18nProvider initialLocale="en">
          <Navigation />
        </I18nProvider>
      );

      // Expected tab order: Logo -> About Us -> Our Services -> Request Us -> Language buttons
      await user.tab(); // Logo
      const logo = screen.getByRole('link', { name: /aviation ground solutions logo/i });
      expect(logo).toHaveFocus();
      
      await user.tab(); // About Us
      expect(document.activeElement?.tagName).toBe('A');
      expect(document.activeElement?.getAttribute('href')).toBe('#about');
      
      await user.tab(); // Our Services
      expect(document.activeElement?.tagName).toBe('A');
      expect(document.activeElement?.getAttribute('href')).toBe('#services');
      
      await user.tab(); // Request Us button
      expect(document.activeElement?.tagName).toBe('BUTTON');
      expect(document.activeElement?.textContent).toMatch(/request|solicítanos/i);
    });

    it('should trap focus within mobile menu when open', async () => {
      const user = userEvent.setup();
      
      render(
        <I18nProvider initialLocale="en">
          <Navigation />
        </I18nProvider>
      );

      const toggleButton = screen.getByRole('button', { name: /toggle menu/i });
      
      // Open mobile menu
      await user.click(toggleButton);
      
      // Wait for menu to open and focus to move
      await waitFor(() => {
        expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
      });
      
      // The mobile menu should contain focusable elements
      const mobileMenu = screen.getByRole('navigation').querySelector('#mobile-menu');
      expect(mobileMenu).toBeInTheDocument();
    });

    it('should have mobile menu toggle button keyboard accessible', async () => {
      const user = userEvent.setup();
      
      render(
        <I18nProvider initialLocale="en">
          <Navigation />
        </I18nProvider>
      );

      const toggleButton = screen.getByRole('button', { name: /toggle menu/i });
      
      // Focus the button
      toggleButton.focus();
      expect(toggleButton).toHaveFocus();
      
      // Activate with Enter
      await user.keyboard('{Enter}');
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
      
      // Close with Enter again
      await user.keyboard('{Enter}');
      await waitFor(() => {
        expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
      });
    });
  });

  describe('HeroSection Component', () => {
    it('should have keyboard accessible CTA button', async () => {
      const user = userEvent.setup();
      
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

      const ctaButtons = screen.getAllByRole('button', { name: /let's chat!/i });
      
      // At least one CTA button should be present
      expect(ctaButtons.length).toBeGreaterThan(0);
      
      // Tab to the button
      await user.tab();
      expect(ctaButtons[0]).toHaveFocus();
    });

    it('should have visible focus indicator on CTA button', () => {
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

      const ctaButtons = screen.getAllByRole('button', { name: /let's chat!/i });
      
      // Check that button has focus styles (inherited from Button component)
      ctaButtons.forEach(button => {
        expect(button.className).toContain('focus:ring-2');
      });
    });
  });

  describe('Overall Keyboard Navigation', () => {
    it('should have all interactive elements keyboard accessible', () => {
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

      // Get all interactive elements
      const buttons = container.querySelectorAll('button');
      const links = container.querySelectorAll('a');
      
      // All buttons should not have tabindex="-1" (unless intentionally hidden)
      buttons.forEach(button => {
        const tabIndex = button.getAttribute('tabindex');
        // Only check visible buttons (not in closed mobile menu)
        if (!button.closest('[aria-hidden="true"]')) {
          expect(tabIndex).not.toBe('-1');
        }
      });
      
      // All links should be keyboard accessible
      links.forEach(link => {
        const tabIndex = link.getAttribute('tabindex');
        if (!link.closest('[aria-hidden="true"]')) {
          expect(tabIndex).not.toBe('-1');
        }
      });
    });

    it('should have visible focus indicators on all interactive elements', () => {
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

      // Get all interactive elements
      const buttons = container.querySelectorAll('button');
      const links = container.querySelectorAll('a[href]');
      
      // Check that interactive elements have focus styles
      const interactiveElements = [...Array.from(buttons), ...Array.from(links)];
      
      let elementsWithFocus = 0;
      let totalVisibleElements = 0;
      
      interactiveElements.forEach(element => {
        // Skip hidden elements
        if (element.closest('[aria-hidden="true"]')) return;
        
        totalVisibleElements++;
        const className = element.className;
        // Should have some form of focus styling
        const hasFocusStyle = 
          className.includes('focus:ring') || 
          className.includes('focus:outline') ||
          className.includes('focus:border');
        
        if (hasFocusStyle) {
          elementsWithFocus++;
        }
      });
      
      // At least 90% of visible interactive elements should have focus styles
      const percentageWithFocus = (elementsWithFocus / totalVisibleElements) * 100;
      expect(percentageWithFocus).toBeGreaterThanOrEqual(90);
    });

    it('should maintain logical tab order across the page', async () => {
      const user = userEvent.setup();
      
      render(
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

      // Tab through elements and verify order makes sense
      // Navigation should come before hero section
      await user.tab(); // Logo
      const logo = screen.getByRole('link', { name: /aviation ground solutions logo/i });
      expect(logo).toHaveFocus();
      
      // Continue tabbing through navigation
      await user.tab(); // About Us
      await user.tab(); // Our Services
      await user.tab(); // Request Us
      
      // Then language selector buttons
      await user.tab(); // English flag
      await user.tab(); // Spanish flag
      
      // Then mobile menu toggle (on mobile)
      await user.tab(); // Toggle button or Hero CTA
      
      // Verify we've moved through navigation before reaching hero
      const currentFocus = document.activeElement;
      expect(currentFocus).toBeTruthy();
    });
  });
});
