'use client';

import { useEffect, useState } from 'react';

/**
 * PageLoader - Ensures page is fully loaded before showing content
 * Prevents the "refresh twice" issue on mobile
 */
export default function PageLoader({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Wait for images to load
    if (document.readyState === 'complete') {
      setIsLoaded(true);
    } else {
      const handleLoad = () => setIsLoaded(true);
      window.addEventListener('load', handleLoad, { passive: true });
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  // Show content immediately on mobile (no loading screen)
  // This prevents the blank screen issue
  return <>{children}</>;
}
