import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navigation from '@/app/components/Navigation';
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
  default: ({ children, href }: any) => {
    return <a href={href}>{children}</a>;
  },
}));

describe('Navigation Component', () => {
  const renderNavigation = async () => {
    const result = render(
      <I18nProvider initialLocale="en">
        <Navigation />
      </I18nProvider>
    );
    
    // Wait for translations to load
    await waitFor(() => {
      expect(screen.queryByText(/\[navigation\./)).not.toBeInTheDocument();
    }, { timeout: 3000 });
    
    return result;
  };

  it('renders the navigation component', async () => {
    await renderNavigation();
    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(nav).toBeInTheDocument();
  });

  it('renders the AGS logo', async () => {
    await renderNavigation();
    const logo = screen.getByAltText(/aviation ground solutions logo/i);
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/images/logo.png');
  });

  it('renders navigation links with correct text', async () => {
    await renderNavigation();
    
    // Check for "About us" links (both desktop and mobile)
    const aboutLinks = screen.getAllByRole('link', { name: /about us/i });
    expect(aboutLinks.length).toBeGreaterThanOrEqual(1);
    aboutLinks.forEach(link => {
      expect(link).toHaveAttribute('href', '#about');
    });
    
    // Check for "Our Services" links (both desktop and mobile)
    const servicesLinks = screen.getAllByRole('link', { name: /our services/i });
    expect(servicesLinks.length).toBeGreaterThanOrEqual(1);
    servicesLinks.forEach(link => {
      expect(link).toHaveAttribute('href', '#services');
    });
  });

  it('renders the Request Us button', async () => {
    await renderNavigation();
    const requestButtons = screen.getAllByRole('button', { name: /request us/i });
    expect(requestButtons.length).toBeGreaterThanOrEqual(1);
  });

  it('renders the language selector', async () => {
    await renderNavigation();
    const languageSelectors = screen.getAllByRole('group', { name: /language selector/i });
    expect(languageSelectors.length).toBeGreaterThanOrEqual(1);
  });

  it('has sticky positioning classes', async () => {
    await renderNavigation();
    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(nav).toHaveClass('fixed', 'top-0', 'left-0', 'right-0', 'z-50');
  });

  it('has backdrop blur styling', async () => {
    await renderNavigation();
    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(nav).toHaveClass('backdrop-blur-xl');
  });

  it('renders hamburger menu button', async () => {
    await renderNavigation();
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('mobile menu drawer is hidden by default', async () => {
    const { container } = await renderNavigation();
    const drawer = container.querySelector('.translate-x-full');
    expect(drawer).toBeInTheDocument();
  });
});
