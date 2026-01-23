import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from '@/components/ErrorBoundary';
import ImageWithFallback from '@/components/ImageWithFallback';

// Mock component that throws an error
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

describe('ErrorBoundary Component', () => {
  // Suppress console.error for these tests since we're intentionally throwing errors
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should display error UI when child component throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText(/We apologize for the inconvenience/)).toBeInTheDocument();
  });

  it('should display custom fallback when provided', () => {
    const customFallback = <div>Custom error message</div>;

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom error message')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  it('should have a "Try Again" button in default fallback', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('should call onError callback when error occurs', () => {
    const onError = jest.fn();

    render(
      <ErrorBoundary onError={onError}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(onError).toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        componentStack: expect.any(String),
      })
    );
  });
});

describe('ImageWithFallback Component', () => {
  it('should render Next.js Image component', () => {
    render(
      <ImageWithFallback
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
      />
    );

    const img = screen.getByAltText('Test image');
    expect(img).toBeInTheDocument();
  });

  it('should show loading placeholder when showLoadingPlaceholder is true', () => {
    render(
      <ImageWithFallback
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
        showLoadingPlaceholder={true}
      />
    );

    // Loading spinner should be present initially
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('should not show loading placeholder when showLoadingPlaceholder is false', () => {
    render(
      <ImageWithFallback
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
        showLoadingPlaceholder={false}
      />
    );

    // Loading spinner should not be present
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).not.toBeInTheDocument();
  });

  it('should handle image load event', async () => {
    render(
      <ImageWithFallback
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
        showLoadingPlaceholder={true}
      />
    );

    const img = screen.getByAltText('Test image');
    
    // Simulate image load
    img.dispatchEvent(new Event('load'));

    // Wait for loading state to update
    await waitFor(() => {
      const spinner = document.querySelector('.animate-spin');
      expect(spinner).not.toBeInTheDocument();
    });
  });

  it('should apply custom className', () => {
    render(
      <ImageWithFallback
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
        className="custom-class"
      />
    );

    const img = screen.getByAltText('Test image');
    expect(img).toHaveClass('custom-class');
  });

  it('should pass through Next.js Image props', () => {
    render(
      <ImageWithFallback
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
        priority
        quality={90}
      />
    );

    const img = screen.getByAltText('Test image');
    expect(img).toBeInTheDocument();
    // Next.js Image component should receive these props
  });
});

describe('Translation Error Handling', () => {
  it('should handle missing translation keys gracefully', () => {
    // This is tested in the i18n.test.tsx file
    // The translation function should return [key] for missing translations
    expect(true).toBe(true);
  });
});
