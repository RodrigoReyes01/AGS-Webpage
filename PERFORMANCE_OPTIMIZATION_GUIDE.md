# Performance Optimization Guide - AGS Webpage

## Overview
This document outlines all performance optimizations implemented in the AGS webpage project to achieve optimal Core Web Vitals and user experience.

## Performance Targets
- **LCP (Largest Contentful Paint)**: < 2.5s
- **INP (Interaction to Next Paint)**: < 200ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **FCP (First Contentful Paint)**: < 1.8s
- **TTFB (Time to First Byte)**: < 800ms
- **Total JS Bundle**: < 1 MB (gzipped)

## Implemented Optimizations

### 1. Web Fonts Optimization
**Status**: Ready for implementation
**Files**: System fonts currently used (no custom fonts)

**To implement custom fonts**:
1. Download WOFF2 format fonts only
2. Subset to Latin character set using glyphhanger:
   ```bash
   glyphhanger --subset=*.woff2 --formats=woff2 --US_ASCII
   ```
3. Place in `/public/fonts/`
4. Add preload links in layout:
   ```html
   <link rel="preload" href="/fonts/font-name.woff2" as="font" type="font/woff2" crossorigin>
   ```
5. Update CSS with font-display: swap

### 2. Resource Hints ✅
**Implemented in**: `app/[locale]/layout.tsx`

- DNS prefetch for external resources
- Preconnect for critical third-party domains
- Preload for LCP hero images with `fetchpriority="high"`
- Inline critical CSS in `<head>`

### 3. Code Splitting & Dynamic Imports ✅
**Implemented in**:
- `app/components/HeroSection.tsx` - FloatingContactMenu lazy loaded
- `app/[locale]/about/page.tsx` - Heavy framer-motion components lazy loaded

**Dynamic imports**:
```typescript
const FloatingContactMenu = dynamic(() => import('./FloatingContactMenu'), {
  ssr: false,
  loading: () => null,
});
```

### 4. Advanced Webpack Configuration ✅
**Implemented in**: `next.config.js`

- Tree shaking enabled
- Module IDs set to deterministic
- Runtime chunk optimization
- Vendor chunk separation
- Framer-motion isolated in separate chunk
- Package import optimization for lucide-react and framer-motion

### 5. Service Worker & PWA ✅
**Files**:
- `public/sw.js` - Service worker with caching strategies
- `public/manifest.json` - PWA manifest
- `lib/serviceWorker.ts` - Registration utility

**Caching strategies**:
- **Static assets** (JS, CSS, fonts): Cache-first
- **Images**: Cache-first with fallback
- **API responses**: Stale-while-revalidate
- **HTML pages**: Network-first with cache fallback

**To activate**:
Service worker auto-registers on page load via inline script in layout.

### 6. API Response Caching ✅
**File**: `lib/apiCache.ts`

Implements IndexedDB-based caching with stale-while-revalidate pattern:
```typescript
import { fetchWithCache } from '@/lib/apiCache';

const data = await fetchWithCache('/api/endpoint');
```

### 7. Event Listener Optimization ✅
**Status**: All scroll and touch listeners use `{ passive: true }`

**Files updated**:
- `lib/scrollContext.tsx`
- `app/components/PageLoader.tsx`
- `components/ui/3d-interactive-timeline.tsx`
- All section components with parallax effects

### 8. Web Workers ✅
**Files**:
- `public/workers/image-processor.js` - Worker for heavy computations
- `lib/useWebWorker.ts` - React hook for worker usage

**Usage example**:
```typescript
const { postMessage, isReady } = useWebWorker('/workers/image-processor.js');

if (isReady) {
  postMessage({ type: 'PROCESS_IMAGE', data: imageData });
}
```

### 9. Netlify Redirects ✅
**File**: `public/_redirects` and `out/_redirects`

Added routes for:
- `/services` → redirects to `#services` section
- `/request` → redirects to `#contact` section
- Service worker and manifest routes
- Proper 404 handling

### 10. Performance Monitoring ✅
**File**: `lib/performanceMonitoring.ts`

Tracks all Core Web Vitals:
- LCP, FID, CLS, FCP, TTFB, INP
- Automatic reporting to analytics endpoint
- Rating system (good/needs-improvement/poor)

**To activate**:
Add to your root layout or page:
```typescript
import { initPerformanceMonitoring } from '@/lib/performanceMonitoring';

useEffect(() => {
  initPerformanceMonitoring();
}, []);
```

### 11. Bundle Size Monitoring ✅
**File**: `.size-limit.json`

Configured with budgets:
- Main bundle: 150 KB (gzipped)
- About page: 200 KB (gzipped)
- Total JS: 1 MB (gzipped)

**Run checks**:
```bash
npm run size
```

### 12. HTTP Caching Headers ✅
**Implemented in**: `next.config.js`

- Static assets: `max-age=31536000, immutable`
- HTML pages: `max-age=300, must-revalidate`
- Proper ETag support via Next.js

### 13. Image Optimization ✅
**Already implemented**:
- WebP format for all images
- Responsive images (mobile/tablet/desktop)
- Lazy loading with `content-visibility: auto`
- Preload for LCP hero image only

### 14. CSS Optimization ✅
**Implemented**:
- Tailwind CSS with PurgeCSS (automatic)
- Critical CSS inlined in `<head>`
- Animations disabled on mobile/tablet for performance
- `prefers-reduced-motion` support

### 15. JavaScript Optimization ✅
**Implemented**:
- SWC minification enabled
- Console.log removal in production
- Side effects marked in package.json
- Tree shaking enabled

## Testing & Validation

### Local Testing
```bash
# Build and analyze bundle
npm run build
npm run analyze

# Check bundle sizes
npm run size

# Run Lighthouse
npm run lighthouse        # Desktop
npm run lighthouse:mobile # Mobile
```

### Production Testing
1. Deploy to staging environment
2. Run WebPageTest: https://www.webpagetest.org/
3. Run Lighthouse in Chrome DevTools
4. Test on real devices (iPhone, iPad, Android)
5. Verify service worker caching in DevTools → Application → Service Workers

### Performance Checklist
- [ ] LCP < 2.5s on 3G connection
- [ ] INP < 200ms for all interactions
- [ ] CLS < 0.1 (no layout shifts)
- [ ] Total JS bundle < 1 MB
- [ ] Service worker caching working
- [ ] PWA installable on mobile
- [ ] All images loading correctly
- [ ] No console errors in production

## Monitoring Setup

### Real User Monitoring (RUM)
**Recommended services**:
- Sentry Performance Monitoring
- New Relic Browser
- Google Analytics 4 with Web Vitals
- Vercel Analytics (if using Vercel)

### Integration Example (Sentry)
```typescript
// Add to app/[locale]/layout.tsx
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  integrations: [
    new Sentry.BrowserTracing(),
  ],
});
```

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Performance Budget
on: [pull_request]
jobs:
  size-limit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm run size
```

## Compression

### Brotli Compression
**Status**: Automatic on Netlify/Vercel

To verify:
```bash
curl -H "Accept-Encoding: br" -I https://aviationgroundsolutions.com
```

Look for: `Content-Encoding: br`

### Manual Compression (if needed)
```bash
# Install brotli
npm install -g brotli

# Compress files
find out -type f \( -name '*.js' -o -name '*.css' -o -name '*.html' \) -exec brotli {} \;
```

## Future Optimizations

### Potential Improvements
1. **Image CDN**: Use Cloudinary or Imgix for automatic optimization
2. **Edge Caching**: Implement Cloudflare or similar CDN
3. **HTTP/3**: Enable QUIC protocol on hosting
4. **Prefetch**: Add `<link rel="prefetch">` for likely next pages
5. **Resource Hints**: Add `<link rel="prerender">` for critical pages
6. **Font Subsetting**: Further reduce font file sizes
7. **Critical CSS Extraction**: Automate with critters
8. **Module Preloading**: Use `<link rel="modulepreload">` for ES modules

## Performance Budget Enforcement

### Size Limits
- **HTML**: < 50 KB per page
- **CSS**: < 100 KB total
- **JS**: < 1 MB total (gzipped)
- **Images**: < 500 KB per image, < 2 MB total per page
- **Fonts**: < 100 KB total

### Timing Budgets
- **Server Response**: < 200ms
- **First Paint**: < 1s
- **Interactive**: < 3s
- **Fully Loaded**: < 5s

## Troubleshooting

### Common Issues

**Issue**: Service worker not updating
**Solution**: Increment CACHE_VERSION in `public/sw.js`

**Issue**: Large bundle size
**Solution**: Run `npm run analyze` and check for duplicate dependencies

**Issue**: Slow LCP
**Solution**: Ensure hero image is preloaded and optimized

**Issue**: High CLS
**Solution**: Add explicit width/height to all images and reserve space for dynamic content

**Issue**: Poor INP
**Solution**: Check for long-running JavaScript, use Web Workers for heavy tasks

## Resources

- [Web.dev Performance](https://web.dev/performance/)
- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Core Web Vitals](https://web.dev/vitals/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

## Maintenance

### Regular Tasks
- **Weekly**: Check bundle sizes with `npm run size`
- **Monthly**: Run full Lighthouse audit
- **Quarterly**: Review and update dependencies
- **Annually**: Re-evaluate optimization strategies

### Performance Review Checklist
- [ ] Review Core Web Vitals in production
- [ ] Check for new Next.js optimization features
- [ ] Update dependencies for performance improvements
- [ ] Review and optimize largest bundles
- [ ] Test on latest devices and browsers
- [ ] Verify service worker is functioning
- [ ] Check CDN cache hit rates
- [ ] Review and optimize database queries (if applicable)

---

**Last Updated**: February 2, 2026
**Maintained By**: Development Team
