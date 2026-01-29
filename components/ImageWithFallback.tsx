'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError' | 'onLoad'> {
  fallbackSrc?: string;
  showLoadingPlaceholder?: boolean;
}

/**
 * ImageWithFallback component
 * Wraps Next.js Image component with loading states and error handling
 * 
 * Features:
 * - Displays loading placeholder while image loads
 * - Shows fallback image if primary image fails to load
 * - Smooth fade-in transition when image loads
 * - Maintains all Next.js Image optimization features
 * - Optimized for fast loading with reduced timeout
 * 
 * Requirements: 7.5
 */
const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc = '/images/placeholder.svg',
  showLoadingPlaceholder = false, // Disabled by default for faster perceived load
  className = '',
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(false); // Start as NOT loading
  const [hasError, setHasError] = useState(false);

  // No timeout needed - images load immediately
  const handleError = () => {
    console.warn(`Failed to load image: ${imgSrc}`);
    setHasError(true);
    setIsLoading(false);
    
    // Try fallback image if available and not already using it
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  return (
    <>
      {/* Error State - only show if no fallback */}
      {hasError && !fallbackSrc && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
          <div className="text-center text-gray-500">
            <svg
              className="w-12 h-12 mx-auto mb-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      )}

      {/* Actual Image - no loading spinner */}
      <Image
        src={imgSrc}
        alt={alt}
        className={`${className}`}
        onError={handleError}
        onLoad={handleLoad}
        loading="eager"
        {...props}
      />
    </>
  );
};

export default ImageWithFallback;
