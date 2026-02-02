# cPanel Deployment Guide - AGS Webpage

## Overview
This guide explains how to deploy your statically exported Next.js AGS Webpage to a cPanel hosting environment (Apache server).

## Prerequisites
- cPanel hosting account with Apache server
- FTP/SFTP access or cPanel File Manager access
- Domain configured to point to your cPanel hosting

## Files Structure

Your exported site (`out/` folder) contains:
```
out/
├── .htaccess              ← Apache configuration (routing, caching, security)
├── index.html             ← English home page
├── es.html                ← Spanish home page
├── 404.html               ← Custom 404 error page
├── sw.js                  ← Service worker
├── manifest.json          ← PWA manifest
├── favicon.png            ← Site icon
├── _next/                 ← Next.js assets (JS, CSS)
│   └── static/
│       ├── chunks/        ← JavaScript bundles
│       └── css/           ← Stylesheets
├── images/                ← Optimized images
│   ├── mobile/
│   ├── tablet/
│   └── desktop/
├── en/                    ← English pages
│   └── about.html
├── es/                    ← Spanish pages
│   └── about.html
└── workers/               ← Web workers
    └── image-processor.js
```

---

## Deployment Steps

### Step 1: Build the Site

On your local machine:

```bash
# Build the production site
npm run build

# Verify the build
ls -la out/

# Check that .htaccess exists
cat out/.htaccess
```

**Expected output**: `out/` folder with 72 files, including `.htaccess`

### Step 2: Upload to cPanel

#### Option A: Using cPanel File Manager (Recommended for beginners)

1. **Login to cPanel**
   - Go to your hosting provider's cPanel URL
   - Enter your username and password

2. **Open File Manager**
   - Find "File Manager" in the Files section
   - Click to open

3. **Navigate to public_html**
   - Click on `public_html` folder
   - This is your web root directory

4. **Clear existing files (if any)**
   - Select all files in `public_html`
   - Click "Delete" (be careful!)
   - Confirm deletion

5. **Upload your site**
   - Click "Upload" button
   - Select all files from your local `out/` folder
   - **Important**: Upload the `.htaccess` file too (it may be hidden)
   - Wait for upload to complete

6. **Verify .htaccess**
   - In File Manager, click "Settings" (top right)
   - Check "Show Hidden Files (dotfiles)"
   - Verify `.htaccess` is present in `public_html`

#### Option B: Using FTP/SFTP (Recommended for advanced users)

1. **Connect via FTP client** (FileZilla, Cyberduck, etc.)
   - Host: Your domain or server IP
   - Username: Your cPanel username
   - Password: Your cPanel password
   - Port: 21 (FTP) or 22 (SFTP)

2. **Navigate to public_html**
   - Remote directory: `/public_html/` or `/home/username/public_html/`

3. **Upload all files**
   - Select all files from local `out/` folder
   - Drag to remote `public_html` folder
   - Ensure `.htaccess` is uploaded (enable "Show hidden files" in FTP client)

4. **Set permissions** (if needed)
   - Files: 644
   - Folders: 755
   - `.htaccess`: 644

#### Option C: Using SSH/Terminal (Advanced)

```bash
# Connect to your server
ssh username@yourdomain.com

# Navigate to public_html
cd public_html

# Remove old files (be careful!)
rm -rf *
rm -rf .*

# Exit SSH
exit

# From your local machine, upload via SCP
scp -r out/* username@yourdomain.com:~/public_html/

# Upload .htaccess separately (hidden file)
scp out/.htaccess username@yourdomain.com:~/public_html/
```

### Step 3: Verify Deployment

1. **Check your domain**
   - Visit: `https://yourdomain.com`
   - Should load English home page

2. **Test routing**
   - Visit: `https://yourdomain.com/about`
   - Should load English about page (not 404)
   
   - Visit: `https://yourdomain.com/en/about`
   - Should load English about page
   
   - Visit: `https://yourdomain.com/es`
   - Should load Spanish home page
   
   - Visit: `https://yourdomain.com/es/about`
   - Should load Spanish about page

3. **Test 404 page**
   - Visit: `https://yourdomain.com/nonexistent-page`
   - Should show custom 404 page (not Apache default)

4. **Test service worker**
   - Open DevTools (F12)
   - Go to Application → Service Workers
   - Should see service worker registered and active

5. **Test caching**
   - Open DevTools → Network tab
   - Refresh page
   - Check response headers for `Cache-Control`
   - JS/CSS should have `max-age=31536000`
   - HTML should have `max-age=300`

---

## Troubleshooting

### Issue: 404 errors on page refresh

**Symptom**: Visiting `/about` directly shows 404 error

**Solution**:
1. Verify `.htaccess` exists in `public_html`
2. Check if mod_rewrite is enabled (contact hosting support)
3. Verify `.htaccess` permissions are 644
4. Check Apache error logs in cPanel

**Test mod_rewrite**:
Create a test file `test.php` in `public_html`:
```php
<?php
phpinfo();
?>
```
Visit `yourdomain.com/test.php` and search for "mod_rewrite" - should be enabled.

### Issue: .htaccess not working

**Symptom**: Rules in `.htaccess` are ignored

**Possible causes**:
1. **AllowOverride not enabled**
   - Contact hosting support to enable `AllowOverride All`
   - This is required for `.htaccess` to work

2. **Wrong file location**
   - `.htaccess` must be in `public_html` root
   - Not in subdirectories

3. **Syntax errors**
   - Check Apache error logs
   - Validate `.htaccess` syntax

### Issue: Images not loading

**Symptom**: Broken image icons

**Solution**:
1. Verify `images/` folder uploaded correctly
2. Check file permissions (644 for files, 755 for folders)
3. Verify image paths in HTML are correct
4. Check browser console for 404 errors

### Issue: Service worker not registering

**Symptom**: SW not showing in DevTools

**Solution**:
1. Verify `sw.js` exists in root of `public_html`
2. Check that site is served over HTTPS (required for SW)
3. Clear browser cache and hard refresh (Ctrl+Shift+R)
4. Check browser console for errors

### Issue: Styles not loading

**Symptom**: Page loads but looks unstyled

**Solution**:
1. Verify `_next/static/css/` folder uploaded
2. Check CSS file permissions (644)
3. View page source, verify CSS `<link>` tags are correct
4. Check browser console for 404 errors on CSS files

### Issue: JavaScript errors

**Symptom**: Interactive features not working

**Solution**:
1. Verify `_next/static/chunks/` folder uploaded
2. Check all JS files uploaded correctly
3. Open browser console, check for errors
4. Verify file permissions (644)

### Issue: Language switching not working

**Symptom**: Clicking language flags shows 404

**Solution**:
1. Verify `es.html` exists in root
2. Verify `en/about.html` and `es/about.html` exist
3. Check `.htaccess` language redirect rules
4. Test URLs manually:
   - `/es` → should load `es.html`
   - `/en` → should load `index.html`

---

## Performance Optimization

### Enable Gzip Compression

Your `.htaccess` already includes gzip rules, but verify it's working:

1. **Test compression**:
   ```bash
   curl -H "Accept-Encoding: gzip" -I https://yourdomain.com
   ```
   Look for: `Content-Encoding: gzip`

2. **If not working**:
   - Contact hosting support to enable `mod_deflate`
   - Some hosts disable it by default

### Enable Browser Caching

Your `.htaccess` includes caching headers. Verify:

1. **Test caching**:
   - Open DevTools → Network
   - Refresh page
   - Check response headers for `Cache-Control`

2. **Expected values**:
   - Images/CSS/JS: `max-age=31536000, immutable`
   - HTML: `max-age=300, must-revalidate`
   - Service Worker: `max-age=0, must-revalidate`

### Enable HTTP/2

Most modern cPanel hosts support HTTP/2 automatically over HTTPS. To verify:

1. Open DevTools → Network
2. Check "Protocol" column
3. Should show "h2" for HTTP/2

If not enabled, contact hosting support.

---

## Security Considerations

### Force HTTPS

Add to top of `.htaccess` (if not already redirecting):

```apache
# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### Protect Sensitive Files

Your `.htaccess` already protects:
- `.htaccess` itself
- `.txt` files
- `.md` files

### Security Headers

Your `.htaccess` includes:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

Verify with: https://securityheaders.com/

---

## Updating Your Site

### Quick Update Process

1. **Make changes locally**
   ```bash
   # Edit your code
   # Test locally
   npm run dev
   ```

2. **Build new version**
   ```bash
   npm run build
   ```

3. **Upload only changed files**
   - Use FTP to upload only modified files
   - Or upload entire `out/` folder to replace everything

4. **Clear caches**
   - Browser cache: Hard refresh (Ctrl+Shift+R)
   - Service worker: Update version in `sw.js`
   - CDN cache: If using Cloudflare, purge cache

### Automated Deployment (Advanced)

Consider using:
- **GitHub Actions** + FTP deploy
- **Netlify** (easier than cPanel)
- **Vercel** (easiest for Next.js)

---

## Monitoring & Maintenance

### Check Site Health

1. **Google Search Console**
   - Add your site
   - Monitor crawl errors
   - Check Core Web Vitals

2. **Google Analytics**
   - Track visitor behavior
   - Monitor page load times
   - Check bounce rates

3. **Uptime Monitoring**
   - Use UptimeRobot (free)
   - Get alerts if site goes down

### Regular Maintenance

**Weekly**:
- Check error logs in cPanel
- Verify site loads correctly
- Test all pages and links

**Monthly**:
- Update dependencies: `npm update`
- Rebuild and redeploy
- Check Google Search Console for issues

**Quarterly**:
- Review and optimize images
- Check for broken links
- Update content

---

## cPanel Specific Tips

### Finding Error Logs

1. Login to cPanel
2. Go to "Errors" or "Error Log"
3. Check for Apache errors related to `.htaccess`

### Checking Disk Space

1. cPanel → "Disk Usage"
2. Your site should use ~3.4 MB
3. Monitor if adding more content

### Setting Up Email

1. cPanel → "Email Accounts"
2. Create: info@yourdomain.com
3. Use for contact form submissions

### SSL Certificate

1. cPanel → "SSL/TLS Status"
2. Enable AutoSSL (free Let's Encrypt)
3. Verify HTTPS works

### Backup Your Site

1. cPanel → "Backup"
2. Download full backup regularly
3. Store locally and in cloud

---

## Testing Checklist

After deployment, test:

- [ ] Home page loads (/)
- [ ] Spanish home loads (/es)
- [ ] About page loads (/about or /en/about)
- [ ] Spanish about loads (/es/about)
- [ ] Language switching works
- [ ] Images load correctly
- [ ] Navigation works
- [ ] Contact form works (if implemented)
- [ ] 404 page shows for invalid URLs
- [ ] Service worker registers
- [ ] Site works offline (after first visit)
- [ ] Mobile responsive
- [ ] HTTPS enabled
- [ ] No console errors
- [ ] Fast page load (< 3s)

---

## Support Resources

### cPanel Documentation
- https://docs.cpanel.net/

### Apache mod_rewrite
- https://httpd.apache.org/docs/current/mod/mod_rewrite.html

### Next.js Static Export
- https://nextjs.org/docs/app/building-your-application/deploying/static-exports

### Contact Your Host
If issues persist, contact your hosting provider's support with:
- Description of the issue
- Error messages from browser console
- Error messages from Apache logs
- Steps to reproduce

---

## Quick Reference

### Important URLs
- Home (EN): `https://yourdomain.com`
- Home (ES): `https://yourdomain.com/es`
- About (EN): `https://yourdomain.com/en/about`
- About (ES): `https://yourdomain.com/es/about`

### Important Files
- `.htaccess` - Routing and configuration
- `index.html` - English home
- `es.html` - Spanish home
- `404.html` - Error page
- `sw.js` - Service worker
- `manifest.json` - PWA manifest

### File Permissions
- Files: 644 (rw-r--r--)
- Folders: 755 (rwxr-xr-x)
- `.htaccess`: 644

### Build Commands
```bash
npm run build          # Build production site
npm run analyze        # Analyze bundle sizes
npm run size           # Check size limits
```

---

**Deployment Status**: Ready ✅

Your site is fully configured for cPanel deployment with:
- ✅ Apache routing via `.htaccess`
- ✅ Custom 404 error page
- ✅ Gzip compression
- ✅ Browser caching
- ✅ Security headers
- ✅ Service worker support
- ✅ PWA manifest

**Next Step**: Upload `out/` folder to cPanel `public_html` directory!
