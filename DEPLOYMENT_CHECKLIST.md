# Deployment Checklist for cPanel

## ⚠️ Critical Steps to Prevent Stale Bundle Issues

Follow these steps **exactly** every time you deploy to prevent the infinite loading issue.

## Pre-Deployment

- [ ] All changes committed to git
- [ ] Code tested locally
- [ ] Language switching works
- [ ] All images load correctly

## Build

```bash
# 1. Build the production site
npm run build

# 2. Verify build succeeded
ls -la out/

# 3. Check .htaccess exists and has correct caching
grep "max-age=0" out/.htaccess
# Should see: Header set Cache-Control "public, max-age=0, must-revalidate"
```

## Deploy to cPanel

### Step 1: Delete ALL Old Files

**⚠️ CRITICAL**: This prevents stale HTML from referencing deleted JS bundles

**Via cPanel File Manager:**
1. Login to cPanel
2. Open File Manager
3. Go to `public_html`
4. Settings → Check "Show Hidden Files"
5. Select ALL files (Ctrl+A)
6. Delete → Confirm

**Via SSH:**
```bash
ssh username@yourdomain.com
cd public_html
rm -rf *
rm -rf .*
exit
```

### Step 2: Upload New Files

**Via cPanel File Manager:**
1. Click "Upload"
2. Select ALL files from `out/` folder
3. Wait for upload to complete
4. Verify `.htaccess` is uploaded

**Via SCP:**
```bash
scp -r out/* username@yourdomain.com:~/public_html/
scp out/.htaccess username@yourdomain.com:~/public_html/
```

## Post-Deployment Verification

### 1. Check Site Loads
- [ ] Visit: `https://aviationgroundsolutions.com`
- [ ] Hard refresh (Ctrl+Shift+R)
- [ ] Site loads completely (no skeleton)

### 2. Verify HTML Caching
- [ ] Open DevTools (F12) → Network tab
- [ ] Refresh page
- [ ] Click on HTML file in Network tab
- [ ] Check Response Headers:
  - Should see: `Cache-Control: public, max-age=0, must-revalidate`

### 3. Check JavaScript Bundles
- [ ] Open DevTools → Network tab
- [ ] Filter by "JS"
- [ ] All JavaScript files should return 200 (not 404)
- [ ] No errors in Console tab

### 4. Test Language Switching
- [ ] Click Spanish flag 🇪🇸
- [ ] Text changes instantly to Spanish
- [ ] Click English flag 🇺🇸
- [ ] Text changes back to English
- [ ] No page reload or navigation

### 5. Test Navigation
- [ ] Click "About Us" link
- [ ] About page loads correctly
- [ ] Language persists
- [ ] No 404 errors

### 6. Test on Different Devices
- [ ] Desktop browser
- [ ] Mobile browser
- [ ] Incognito/Private mode
- [ ] Different browser (Chrome, Firefox, Safari)

## If Something Goes Wrong

### Infinite Loading / Skeleton Stuck

**Symptoms:**
- Page shows loading skeleton forever
- Console shows 404 errors for JS bundles
- Example: `runtime-b7ef8a85c14fc302.js 404`

**Fix:**
1. Delete ALL files from `public_html` again
2. Re-upload entire `out/` folder
3. Clear browser cache (Ctrl+Shift+R)
4. If using Cloudflare, purge cache

### 404 on About Page

**Symptoms:**
- `/about` returns 404
- `/about.html` works

**Fix:**
1. Verify `.htaccess` is uploaded
2. Check file permissions (644)
3. Contact hosting to enable `mod_rewrite`

### Language Switching Not Working

**Symptoms:**
- Clicking flags does nothing
- Or causes navigation/404

**Fix:**
1. Hard refresh (Ctrl+Shift+R)
2. Clear browser cache
3. Check Console for JavaScript errors
4. Verify all JS bundles loaded (200 status)

## Why These Steps Matter

### Why Delete All Files?

Next.js generates new bundle names on each build:
- Old build: `runtime-b7ef8a85c14fc302.js`
- New build: `runtime-0230e2dcd4837936.js`

If you don't delete old files:
1. Old HTML might be cached (even for 5 minutes)
2. Old HTML references `runtime-b7ef8a85c14fc302.js`
3. That file no longer exists → 404 → infinite loading

### Why max-age=0 for HTML?

- HTML now has `Cache-Control: max-age=0`
- Browser always checks server for latest HTML
- HTML always matches current JS bundles
- No more stale bundle references

### Why Keep Long Cache for JS/CSS?

- JS/CSS files have hashed names (e.g., `vendor-07bb2aba66a42433.js`)
- Hash changes when content changes
- Safe to cache forever (`max-age=31536000, immutable`)
- Improves performance

## Quick Reference

### File Permissions
- Files: 644
- Folders: 755
- `.htaccess`: 644

### Cache Headers
- HTML: `max-age=0, must-revalidate` (always fresh)
- JS/CSS: `max-age=31536000, immutable` (1 year)
- Images: `max-age=31536000, immutable` (1 year)
- Service Worker: `max-age=0, must-revalidate` (always fresh)

### Important Files
- `index.html` - Home page
- `about.html` - About page
- `.htaccess` - Routing and caching rules
- `_next/static/chunks/*` - JavaScript bundles
- `images/*` - Optimized images

## Deployment Frequency

- **After code changes**: Always deploy
- **After content updates**: Always deploy
- **After dependency updates**: Always deploy
- **Routine**: Not needed (static site)

## Rollback Procedure

If deployment breaks the site:

1. **Quick fix**: Re-upload previous `out/` folder
2. **From git**: 
   ```bash
   git checkout <previous-commit>
   npm run build
   # Upload out/ folder
   ```
3. **Contact support**: If `.htaccess` or server issues

---

**Last Updated**: February 2, 2026
**Deployment Method**: Manual upload to cPanel
**Caching Strategy**: HTML max-age=0, assets max-age=1year
