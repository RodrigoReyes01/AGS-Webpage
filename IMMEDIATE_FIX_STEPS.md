# Immediate Fix Steps for 404 Error

## Problem
`https://aviationgroundsolutions.com/es/about` returns 404 error

## Most Likely Cause
The `.htaccess` file is not uploaded or not working on your server.

---

## Quick Fix - Option 1: Upload Diagnostic Script

1. **Upload the diagnostic script:**
   - File: `out/test-server.php`
   - Upload to: `public_html/test-server.php`

2. **Visit the diagnostic page:**
   - Go to: `https://aviationgroundsolutions.com/test-server.php`
   - This will show you exactly what's wrong

3. **Follow the recommendations** shown on the diagnostic page

4. **Delete the test file** after fixing: `public_html/test-server.php`

---

## Quick Fix - Option 2: Verify .htaccess

### Step 1: Check if .htaccess exists
1. Login to cPanel
2. Open File Manager
3. Click "Settings" (top right)
4. Check "Show Hidden Files (dotfiles)"
5. Click "Save"
6. Look for `.htaccess` in `public_html` folder

### Step 2: If .htaccess is missing
1. Go to your local project folder
2. Find `out/.htaccess`
3. Upload it to `public_html/.htaccess` on the server

### Step 3: Verify .htaccess content
Open `.htaccess` and verify it contains these lines:

```apache
RewriteEngine On
RewriteBase /

# Specific rules for about pages
RewriteRule ^en/about/?$ /en/about.html [L]
RewriteRule ^es/about/?$ /es/about.html [L]
```

### Step 4: Check file permissions
- Right-click `.htaccess`
- Select "Change Permissions"
- Set to: 644
- Click "Change Permissions"

---

## Quick Fix - Option 3: Test Direct URLs

Try accessing the files directly with `.html` extension:

✅ **This should work:**
- `https://aviationgroundsolutions.com/es/about.html`
- `https://aviationgroundsolutions.com/en/about.html`

❌ **This gives 404:**
- `https://aviationgroundsolutions.com/es/about`
- `https://aviationgroundsolutions.com/en/about`

**If direct URLs work but clean URLs don't:**
→ The `.htaccess` file is not being processed by Apache

---

## Quick Fix - Option 4: Contact Hosting Support

If nothing above works, contact your hosting provider and say:

> "I need mod_rewrite enabled and AllowOverride All configured for my domain aviationgroundsolutions.com. My .htaccess file is not being processed."

---

## Temporary Workaround

While fixing the server, you can update the code to use `.html` extensions:

1. Open `lib/i18n.tsx`
2. Find the `setLocale` function (around line 110)
3. Change these lines:

**FROM:**
```typescript
newPath = '/en/about'; // English about page
newPath = '/es/about'; // Spanish about page
```

**TO:**
```typescript
newPath = '/en/about.html'; // English about page
newPath = '/es/about.html'; // Spanish about page
```

4. Rebuild: `npm run build`
5. Re-upload the `out/` folder

This will make the language switcher use direct `.html` URLs that work without `.htaccess`.

---

## Files to Check on Server

Make sure these files exist in `public_html`:

```
public_html/
├── .htaccess          ← MUST EXIST (hidden file)
├── index.html
├── es.html
├── en/
│   └── about.html     ← MUST EXIST
└── es/
    └── about.html     ← MUST EXIST
```

---

## After Fixing

Test these URLs (all should work):
- ✅ `https://aviationgroundsolutions.com/`
- ✅ `https://aviationgroundsolutions.com/es`
- ✅ `https://aviationgroundsolutions.com/en/about`
- ✅ `https://aviationgroundsolutions.com/es/about`
- ✅ Language switcher on home page
- ✅ Language switcher on about page

---

## Need More Help?

See `TROUBLESHOOTING_404.md` for detailed troubleshooting steps.
