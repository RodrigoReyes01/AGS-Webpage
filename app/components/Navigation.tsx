'use client';

import React, { useState, useRef, useEffect } from 'react';
import ImageWithFallback from '@/components/ImageWithFallback';
import Link from 'next/link';
import Button from '@/components/Button';
import LanguageSelector from '@/components/LanguageSelector';
import { useTranslation } from '@/lib/i18n';
import { useScroll } from '@/lib/scrollContext';

/**
 * Navigation component
 * Provides site-wide navigation with responsive behavior and language selection
 * 
 * Features:
 * - AGS logo on the left
 * - Navigation links ("About us", "Our Services")
 * - "Request Us" call-to-action button
 * - Language selector with flag icons
 * - Sticky positioning on scroll
 * - Transparent background with backdrop blur
 * - Mobile hamburger menu with slide-out drawer
 * - Full keyboard navigation support with focus management
 * 
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.4, 2.5, 7.3
 */
const Navigation: React.FC = () => {
  const { t } = useTranslation();
  const { isVisible } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const firstFocusableElementRef = useRef<HTMLAnchorElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Handle Escape key to close mobile menu and return focus
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
        // Return focus to toggle button
        toggleButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen]);

  // Focus management: move focus to first element when menu opens
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Small delay to ensure the menu is rendered
      setTimeout(() => {
        firstFocusableElementRef.current?.focus();
      }, 100);
    }
  }, [isMobileMenuOpen]);

  // Trap focus within mobile menu when open
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const mobileMenu = mobileMenuRef.current;
      if (!mobileMenu) return;

      const focusableElements = mobileMenu.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // If shift+tab on first element, move to last
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      }
      // If tab on last element, move to first
      else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{
        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      }}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Section - Left */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <ImageWithFallback
                src="/images/logo.png"
                alt="Aviation Ground Solutions Logo"
                width={180}
                height={60}
                priority
                sizes="(max-width: 768px) 120px, 180px"
                className="h-10 sm:h-12 w-auto"
                showLoadingPlaceholder={false}
              />
            </Link>
          </div>

          {/* Navigation Links - Center (Desktop only) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#about"
              className="text-white hover:text-brand-blue font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 rounded px-2 py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-blue after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-in-out drop-shadow-lg"
            >
              {t('navigation.aboutUs')}
            </Link>
            <Link
              href="#services"
              className="text-white hover:text-brand-blue font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 rounded px-2 py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-blue after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-in-out drop-shadow-lg"
            >
              {t('navigation.ourServices')}
            </Link>
          </div>

          {/* Right Section - Request Button and Language Selector (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                // TODO: Implement request flow
                console.log('Request Us clicked');
              }}
            >
              {t('navigation.requestUs')}
            </Button>
            <LanguageSelector />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSelector />
            <button
              ref={toggleButtonRef}
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-brand-blue hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-blue transition-all duration-300 ease-in-out hover:scale-110 drop-shadow-lg"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {/* Hamburger Icon */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isMobileMenuOpen ? (
                  // X icon when menu is open
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  // Hamburger icon when menu is closed
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className={`md:hidden fixed inset-y-0 right-0 w-64 bg-white/40 backdrop-blur-xl shadow-2xl border-l border-white/20 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          background: 'linear-gradient(to left, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3))',
        }}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex flex-col h-full pt-16 sm:pt-20 pb-6 px-6">
          {/* Mobile Navigation Links */}
          <div className="flex flex-col space-y-4">
            <Link
              ref={firstFocusableElementRef}
              href="#about"
              onClick={closeMobileMenu}
              className="text-gray-800 hover:text-brand-blue font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 rounded px-3 py-2 text-base relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-blue after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-in-out bg-white/20 hover:bg-white/40"
              tabIndex={isMobileMenuOpen ? 0 : -1}
            >
              {t('navigation.aboutUs')}
            </Link>
            <Link
              href="#services"
              onClick={closeMobileMenu}
              className="text-gray-800 hover:text-brand-blue font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 rounded px-3 py-2 text-base relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-blue after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-in-out bg-white/20 hover:bg-white/40"
              tabIndex={isMobileMenuOpen ? 0 : -1}
            >
              {t('navigation.ourServices')}
            </Link>
            
            {/* Request Us Button in Mobile Menu */}
            <div className="pt-4">
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  closeMobileMenu();
                  // TODO: Implement request flow
                  console.log('Request Us clicked');
                }}
                className="w-full"
              >
                {t('navigation.requestUs')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-[-1] transition-opacity duration-300 ease-in-out"
          onClick={closeMobileMenu}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              closeMobileMenu();
            }
          }}
          role="button"
          tabIndex={-1}
          aria-label="Close menu overlay"
        />
      )}
    </nav>
  );
};

export default Navigation;
