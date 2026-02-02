# Performance Testing Checklist

## Pre-Deployment Testing

### Build & Bundle Analysis
- [ ] Run `npm run build` successfully
- [ ] Run `npm run analyze` and review bundle sizes
- [ ] Run `npm run size` to check size limits
- [ ] Verify no console errors in build output
- [ ] Check that all dynamic imports are working

### Local Performance Testing
```bash
# Build the project
npm run build

# Serve locally
cd out && python3 -m http.server 8080

# Run Lighthouse (in another terminal)
npm run lighthouse
npm run lighthouse:mobile
```

### Lighthouse Targets
- [ ] Performance Score: > 90
- [ ] Accessibility Score: > 90
- [ ] Best Practices Score: > 90
- [ ] SEO Score: > 90
- [ ] LCP: < 2.5s
- [ ] FID/INP: < 200ms
- [ ] CLS: < 0.1

### Chrome DevTools Checks

#### Performance Tab
- [ ] No long tasks (> 50ms)
- [ ] Main thread not blocked
- [ ] Smooth 60fps scrolling
- [ ] No layout thrashing

#### Network Tab
- [ ] Total page size < 2 MB
- [ ] JS bundle < 1 MB (gzipped)
- [ ] Images properly compressed
- [ ] Brotli compression active
- [ ] Proper cache headers

#### Coverage Tab
- [ ] CSS coverage > 70%
- [ ] JS coverage > 60%
- [ ] No large unused chunks

#### Application Tab
- [ ] Service Worker registered
- [ ] Cache Storage populated
- [ ] IndexedDB working (if using API cache)
- [ ] Manifest.json valid

### WebPageTest
Run test at: https://www.webpagetest.org/

Test Configuration:
- Location: Multiple (US, Europe, Asia)
- Browser: Chrome
- Connection: 3G, 4G, Cable
- Repeat View: Yes

Targets:
- [ ] First Byte Time: < 800ms
- [ ] Start Render: < 1.5s
- [ ] Speed Index: < 3s
- [ ] Fully Loaded: < 5s

## Device Testing

### Mobile Devices
- [ ] iPhone 12/13/14 (Safari)
- [ ] iPhone SE (Safari)
- [ ] Samsung Galaxy S21/S22 (Chrome)
- [ ] Google Pixel 6/7 (Chrome)

### Tablet Devices
- [ ] iPad Air (Safari)
- [ ] iPad Pro (Safari)
- [ ] Samsung Galaxy Tab (Chrome)

### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Test Scenarios

#### Navigation
- [ ] Home to About page
- [ ] About to Home page
- [ ] Language switching (EN ↔ ES)
- [ ] Anchor links (#services, #contact)
- [ ] Back/forward browser buttons

#### Performance
- [ ] Page loads in < 3s on 3G
- [ ] Smooth scrolling (no jank)
- [ ] Images load progressively
- [ ] No layout shifts during load
- [ ] Animations smooth on desktop
- [ ] No animations on mobile (instant response)

#### PWA Features
- [ ] Install prompt appears on mobile
- [ ] App installs successfully
- [ ] Works offline (cached pages)
- [ ] Service worker updates properly

#### Forms & Interactions
- [ ] Contact form works
- [ ] Form validation works
- [ ] Offline form submission queued
- [ ] All buttons clickable
- [ ] Hover states work (desktop)

#### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Focus indicators visible
- [ ] Color contrast sufficient
- [ ] Alt text on all images

## Post-Deployment Testing

### Production URLs
- [ ] https://aviationgroundsolutions.com
- [ ] https://aviationgroundsolutions.com/es.html
- [ ] https://aviationgroundsolutions.com/en/about.html
- [ ] https://aviationgroundsolutions.com/es/about.html

### Redirects
- [ ] /en/ → /
- [ ] /en/about → /en/about.html
- [ ] /es/ → /es.html
- [ ] /es/about → /es/about.html
- [ ] /services → /#services
- [ ] /request → /#contact

### CDN & Caching
- [ ] Static assets served from CDN
- [ ] Brotli compression active
- [ ] Cache headers correct
- [ ] Images served with long cache
- [ ] HTML served with short cache

### Service Worker
- [ ] SW registered on first visit
- [ ] Assets cached properly
- [ ] Offline mode works
- [ ] Updates work correctly

### Real User Monitoring
- [ ] Analytics tracking works
- [ ] Core Web Vitals reported
- [ ] Error tracking active
- [ ] Performance metrics logged

## Monitoring Setup

### Tools to Configure
- [ ] Google Analytics 4
- [ ] Google Search Console
- [ ] Sentry (error tracking)
- [ ] Vercel/Netlify Analytics
- [ ] Uptime monitoring

### Alerts to Set Up
- [ ] Performance degradation (LCP > 3s)
- [ ] Error rate spike
- [ ] Downtime alert
- [ ] Bundle size increase
- [ ] Core Web Vitals failing

## Regression Testing

### After Each Deployment
- [ ] Run Lighthouse audit
- [ ] Check bundle sizes
- [ ] Verify Core Web Vitals
- [ ] Test on real devices
- [ ] Check error logs

### Weekly
- [ ] Review performance metrics
- [ ] Check for new errors
- [ ] Verify uptime
- [ ] Review user feedback

### Monthly
- [ ] Full performance audit
- [ ] Update dependencies
- [ ] Review and optimize largest bundles
- [ ] Test on new devices/browsers

## Performance Budget Enforcement

### Automated Checks (CI/CD)
```yaml
# Add to GitHub Actions
- name: Check bundle size
  run: npm run size
  
- name: Lighthouse CI
  run: npm run lighthouse:ci
```

### Manual Reviews
- [ ] Review bundle analyzer report
- [ ] Check for duplicate dependencies
- [ ] Identify optimization opportunities
- [ ] Update performance documentation

## Issue Tracking

### Common Issues & Solutions

**Slow LCP**
- Check hero image optimization
- Verify preload tags
- Check server response time

**High CLS**
- Add dimensions to images
- Reserve space for dynamic content
- Avoid inserting content above fold

**Poor INP**
- Check for long-running JS
- Use Web Workers for heavy tasks
- Optimize event handlers

**Large Bundle**
- Review bundle analyzer
- Check for duplicate dependencies
- Increase code splitting

**Service Worker Issues**
- Clear cache and re-register
- Check SW version
- Verify cache strategies

## Sign-Off

### Before Production Release
- [ ] All tests passing
- [ ] Performance targets met
- [ ] No critical errors
- [ ] Accessibility compliant
- [ ] SEO optimized
- [ ] Documentation updated

**Tested By**: _________________
**Date**: _________________
**Approved By**: _________________
**Date**: _________________

---

## Quick Test Commands

```bash
# Build and test locally
npm run build
cd out && python3 -m http.server 8080

# In another terminal
npm run lighthouse
npm run lighthouse:mobile
npm run size

# Analyze bundle
npm run analyze

# Check for errors
npm run lint
npm run test
```

## Resources

- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [WebPageTest](https://www.webpagetest.org/)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [Web Vitals Extension](https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma)
