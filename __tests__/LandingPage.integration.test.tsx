/**
 * Integration test for Landing Page
 * Verifies that the landing page properly integrates Navigation and HeroSection components
 * with translations
 * 
 * Requirements: 1.1, 3.1, 11.2
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { I18nProvider } from '@/lib/i18n';
import Home from '@/app/[locale]/page';

describe('Landing Page Integration', () => {
  describe('English locale', () => {
    it('should render Navigation component with English translations', () => {
      render(
        <I18nProvider initialLocale="en">
          <Home />
        </I18nProvider>
      );

      // Check navigation links - use getAllByText because links appear in both desktop and mobile menus
      expect(screen.getAllByText('About us').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Our Services').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Request Us').length).toBeGreaterThan(0);
    });

    it('should render HeroSection component with English translations', () => {
      render(
        <I18nProvider initialLocale="en">
          <Home />
        </I18nProvider>
      );

      // Check hero heading - should contain "AVIATION" and "GROUND" and "SOLUTIONS"
      expect(screen.getByText(/AVIATION/)).toBeInTheDocument();
      expect(screen.getByText(/GROUND/)).toBeInTheDocument();
      expect(screen.getByText(/SOLUTIONS/)).toBeInTheDocument();

      // Check subheading
      expect(screen.getByText(/Your premier FBO ground service from Belize to Panama/)).toBeInTheDocument();

      // Check CTA button - there should be two (one for mobile, one for desktop)
      const ctaButtons = screen.getAllByText("Let's Chat!");
      expect(ctaButtons).toHaveLength(2);
    });

    it('should render both Navigation and HeroSection together', () => {
      render(
        <I18nProvider initialLocale="en">
          <Home />
        </I18nProvider>
      );

      // Verify both components are present - use getAllByText for navigation links
      expect(screen.getAllByText('About us').length).toBeGreaterThan(0);
      expect(screen.getByText(/AVIATION/)).toBeInTheDocument();
    });
  });

  describe('Spanish locale', () => {
    it('should render Navigation component with Spanish translations', () => {
      render(
        <I18nProvider initialLocale="es">
          <Home />
        </I18nProvider>
      );

      // Check navigation links in Spanish - use getAllByText because links appear in both desktop and mobile menus
      expect(screen.getAllByText('Sobre nosotros').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Nuestros Servicios').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Solicítanos').length).toBeGreaterThan(0);
    });

    it('should render HeroSection component with Spanish translations', () => {
      render(
        <I18nProvider initialLocale="es">
          <Home />
        </I18nProvider>
      );

      // Check hero heading - should still be in English (brand name)
      expect(screen.getByText(/AVIATION/)).toBeInTheDocument();
      expect(screen.getByText(/GROUND/)).toBeInTheDocument();
      expect(screen.getByText(/SOLUTIONS/)).toBeInTheDocument();

      // Check subheading in Spanish
      expect(screen.getByText(/Su servicio FBO terrestre premier desde Belice hasta Panamá/)).toBeInTheDocument();

      // Check CTA button in Spanish - there should be two (one for mobile, one for desktop)
      const ctaButtons = screen.getAllByText('¡Hablemos!');
      expect(ctaButtons).toHaveLength(2);
    });
  });

  describe('Component structure', () => {
    it('should have proper semantic HTML structure', () => {
      const { container } = render(
        <I18nProvider initialLocale="en">
          <Home />
        </I18nProvider>
      );

      // Check for main element
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();

      // Check for nav element (from Navigation component)
      const nav = container.querySelector('nav');
      expect(nav).toBeInTheDocument();

      // Check for header element (from HeroSection component)
      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
    });

    it('should render AGS logo with proper alt text', () => {
      render(
        <I18nProvider initialLocale="en">
          <Home />
        </I18nProvider>
      );

      const logo = screen.getByAltText('Aviation Ground Solutions Logo');
      expect(logo).toBeInTheDocument();
    });

    it('should render hero background image with proper alt text', () => {
      render(
        <I18nProvider initialLocale="en">
          <Home />
        </I18nProvider>
      );

      const heroImage = screen.getByAltText('Aviation Ground Solutions - Aircraft on tarmac');
      expect(heroImage).toBeInTheDocument();
    });
  });
});
