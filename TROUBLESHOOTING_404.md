# Troubleshooting 404 Errors on Live Server

## Issue
Getting 404 errors when accessing `/es/about` or other clean URLs on the live cPanel server.

## Root Causes

### 1. .htaccess File Not Uploaded
**Most Common Issue**

The `.htaccess` file might not have been uploaded to the server because:
- It's a hidden file (starts with a dot)
- FTP client is not showing hidden files
- File was accidentally skipped during upload

**Solution:**
1. Enable "Show hidden files" in your FTP client or cPanel File Manager
2. Verify `.htaccess` exists in the root of `public_html`
3. Re-upload from `out/.htaccess` if missing

**cPanel File Manager:**
- Click Settings (top right)
- Check "Show Hidden Files (dotfiles)"
- Click Save
- Verify `.htaccess` is visible in `public_html`

### 2. mod_rewrite Not Enabled
Apache's `mod_rewrite` module might not be enabled on your hosting.

**Check if mod_rewrite is enabled:**
1. Create a file `test.php` in `public_html`:
```php
<?php
phpinfo();
?>
```
2. Visit `https://aviationgroundsolutions.com/test.php`
3. Search for "mod_rewrite" - should show as "Loaded Modules"
4. Delete `test.php` after checking

**If not enabled:**
- Contact your hosting provider to enable `mod_rewrite`
- Most cPanel hosts have it enabled by default

### 3. AllowOverride Not Enabled
Apache might not be configured to allow `.htaccess` overrides.

**Solution:**
- Contact your hosting provider
- Ask them to enable `AllowOverride All` for your domain
- This is required for `.htaccess` to work

### 4. Wrong File Permissions
The `.htaccess` file might have incorrect permissions.

**Correct permissions:**
- `.htaccess`: 644 (rw-r--r--)
- Folders: 755 (rwxr-xr-x)
- HTML files: 644 (rw-r--r--)

**Fix in cPanel File Manager:**
1. Right-click `.htaccess`
2. Select "Change Permissions"
3. Set to 644
4. Click "Change Permissions"

### 5. Files Not Uploaded Correctly
The actual HTML files might be missing.

**Verify these files exist:**
- `/public_html/en/about.html`
- `/public_html/es/about.html`
- `/public_html/index.html`
- `/public_html/es.html`

## Quick Fix: Test .htaccess

Add this at the very top of your `.htaccess` file to test if it's working:

```apache
# Test if .htaccess is working
RewriteEngine On
RewriteRule ^test-htaccess$ /index.html [L]
```

Then visit: `https://aviationgroundsolutions.com/test-htaccess`

- **If it loads the home page**: `.htaccess` is working, issue is with specific rules
- **If you get 404**: `.htaccess` is not being processed (see causes 2-4 above)

## Immediate Workaround

While troubleshooting, you can use direct `.html` URLs:
- `https://aviationgroundsolutions.com/es/about.html` (with .html)
- `https://aviationgroundsolutions.com/en/about.html` (with .html)

If these work, the issue is definitely with `.htaccess` not processing.

## Complete .htaccess Verification

Your `.htaccess` should look like this (first 30 lines):

```apache
# .htaccess for AGS Webpage - Static Next.js Export
# Handles routing for Apache/cPanel hosting

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Serve existing files and directories as-is
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Language root redirects
  RewriteRule ^en/?$ /index.html [L]
  RewriteRule ^es/?$ /es.html [L]

  # Specific rules for about pages
  RewriteRule ^en/about/?$ /en/about.html [L]
  RewriteRule ^es/about/?$ /es/about.html [L]

  # Generic clean URL mapping
  RewriteRule ^(.+)/$ $1.html [L]
  RewriteRule ^(.+)$ $1.html [L]

</IfModule>
```

## Step-by-Step Fix Process

### Step 1: Verify File Structure
```
public_html/
├── .htaccess          ← Must exist!
├── index.html         ← English home
├── es.html            ← Spanish home
├── 404.html
├── en/
│   └── about.html     ← Must exist!
├── es/
│   └── about.html     ← Must exist!
├── _next/
├── images/
└── ...
```

### Step 2: Check .htaccess Content
1. Open `.htaccess` in cPanel File Manager
2. Verify it contains the rewrite rules (see above)
3. Check for any syntax errors
4. Ensure no extra spaces or characters

### Step 3: Test Direct Access
Try accessing files directly:
- ✅ `https://aviationgroundsolutions.com/es/about.html`
- ✅ `https://aviationgroundsolutions.com/en/about.html`

If these work, `.htaccess` is the issue.

### Step 4: Check Apache Error Logs
In cPanel:
1. Go to "Errors" or "Error Log"
2. Look for recent errors related to `.htaccess`
3. Common errors:
   - "Invalid command 'RewriteEngine'" → mod_rewrite not enabled
   - "Options not allowed here" → AllowOverride issue

### Step 5: Contact Hosting Support
If nothing works, contact your hosting provider with:
- "I need mod_rewrite enabled"
- "I need AllowOverride All enabled for my domain"
- "My .htaccess file is not being processed"

## Alternative: Use .html Extensions

If you can't get `.htaccess` working, update the JavaScript to use `.html` extensions:

In `lib/i18n.tsx`, change the `setLocale` function to use `.html`:

```typescript
// Build the new path with .html extensions
let newPath;
if (newLocale === 'en') {
  if (isAboutPage) {
    newPath = '/en/about.html'; // With .html
  } else {
    newPath = '/index.html';
  }
} else {
  if (isAboutPage) {
    newPath = '/es/about.html'; // With .html
  } else {
    newPath = '/es.html';
  }
}
```

Then rebuild: `npm run build`

## Testing Checklist

After fixing:
- [ ] Visit `https://aviationgroundsolutions.com/es/about` (should work)
- [ ] Visit `https://aviationgroundsolutions.com/en/about` (should work)
- [ ] Visit `https://aviationgroundsolutions.com/es` (should load Spanish home)
- [ ] Visit `https://aviationgroundsolutions.com/en` (should load English home)
- [ ] Click language switcher on home page (should work)
- [ ] Click language switcher on about page (should work)
- [ ] Visit invalid URL like `/nonexistent` (should show 404.html)

## Need Help?

If you're still stuck, provide:
1. Screenshot of cPanel File Manager showing `public_html` contents
2. Screenshot of `.htaccess` file content
3. Apache error log entries (from cPanel → Errors)
4. Result of visiting `https://aviationgroundsolutions.com/es/about.html` (with .html)
