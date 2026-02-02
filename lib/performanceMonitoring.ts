// Performance Monitoring Utility
// Tracks Core Web Vitals and custom metrics

export interface PerformanceMetrics {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
  inp?: number; // Interaction to Next Paint
}

// Report to analytics endpoint
function sendToAnalytics(metric: { name: string; value: number; rating: string }) {
  if (typeof window === 'undefined') return;

  // Send to your analytics service (e.g., Google Analytics, Sentry, etc.)
  console.log('Performance Metric:', metric);

  // Example: Send to custom endpoint
  if (navigator.sendBeacon) {
    const body = JSON.stringify(metric);
    navigator.sendBeacon('/api/analytics', body);
  }
}

// Get rating based on thresholds
function getRating(name: string, value: number): string {
  const thresholds: Record<string, { good: number; needsImprovement: number }> = {
    LCP: { good: 2500, needsImprovement: 4000 },
    FID: { good: 100, needsImprovement: 300 },
    CLS: { good: 0.1, needsImprovement: 0.25 },
    FCP: { good: 1800, needsImprovement: 3000 },
    TTFB: { good: 800, needsImprovement: 1800 },
    INP: { good: 200, needsImprovement: 500 },
  };

  const threshold = thresholds[name];
  if (!threshold) return 'unknown';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.needsImprovement) return 'needs-improvement';
  return 'poor';
}

// Measure Largest Contentful Paint (LCP)
export function measureLCP() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;

      const value = lastEntry.renderTime || lastEntry.loadTime;
      const rating = getRating('LCP', value);

      sendToAnalytics({ name: 'LCP', value, rating });
    });

    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (error) {
    console.error('Error measuring LCP:', error);
  }
}

// Measure First Input Delay (FID)
export function measureFID() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        const value = entry.processingStart - entry.startTime;
        const rating = getRating('FID', value);

        sendToAnalytics({ name: 'FID', value, rating });
      });
    });

    observer.observe({ type: 'first-input', buffered: true });
  } catch (error) {
    console.error('Error measuring FID:', error);
  }
}

// Measure Cumulative Layout Shift (CLS)
export function measureCLS() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  let clsValue = 0;
  let clsEntries: any[] = [];

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          clsEntries.push(entry);
        }
      });
    });

    observer.observe({ type: 'layout-shift', buffered: true });

    // Report CLS when page is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        const rating = getRating('CLS', clsValue);
        sendToAnalytics({ name: 'CLS', value: clsValue, rating });
      }
    }, { passive: true });
  } catch (error) {
    console.error('Error measuring CLS:', error);
  }
}

// Measure First Contentful Paint (FCP)
export function measureFCP() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (entry.name === 'first-contentful-paint') {
          const value = entry.startTime;
          const rating = getRating('FCP', value);

          sendToAnalytics({ name: 'FCP', value, rating });
        }
      });
    });

    observer.observe({ type: 'paint', buffered: true });
  } catch (error) {
    console.error('Error measuring FCP:', error);
  }
}

// Measure Time to First Byte (TTFB)
export function measureTTFB() {
  if (typeof window === 'undefined' || !window.performance) return;

  try {
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      const value = navigationEntry.responseStart - navigationEntry.requestStart;
      const rating = getRating('TTFB', value);

      sendToAnalytics({ name: 'TTFB', value, rating });
    }
  } catch (error) {
    console.error('Error measuring TTFB:', error);
  }
}

// Measure Interaction to Next Paint (INP)
export function measureINP() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  let maxDuration = 0;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (entry.duration > maxDuration) {
          maxDuration = entry.duration;
        }
      });
    });

    // Use 'event' type for INP measurement
    observer.observe({ type: 'event', buffered: true } as PerformanceObserverInit);

    // Report INP when page is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden' && maxDuration > 0) {
        const rating = getRating('INP', maxDuration);
        sendToAnalytics({ name: 'INP', value: maxDuration, rating });
      }
    }, { passive: true });
  } catch (error) {
    console.error('Error measuring INP:', error);
  }
}

// Initialize all performance monitoring
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return;

  measureLCP();
  measureFID();
  measureCLS();
  measureFCP();
  measureTTFB();
  measureINP();
}

// Get current performance metrics
export function getPerformanceMetrics(): PerformanceMetrics {
  if (typeof window === 'undefined' || !window.performance) {
    return {};
  }

  const metrics: PerformanceMetrics = {};

  try {
    // Get navigation timing
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
    }

    // Get paint timing
    const paintEntries = performance.getEntriesByType('paint');
    paintEntries.forEach((entry: any) => {
      if (entry.name === 'first-contentful-paint') {
        metrics.fcp = entry.startTime;
      }
    });
  } catch (error) {
    console.error('Error getting performance metrics:', error);
  }

  return metrics;
}
