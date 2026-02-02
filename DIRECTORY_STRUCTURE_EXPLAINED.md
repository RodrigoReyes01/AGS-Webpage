# Directory-Based URL Structure

## Problem Solved

Previously, clean URLs like `/about` required `.htaccess` rewrites to serve `about.html`. This caused issues on some Apache configurations and didn't work with Python's simple HTTP server for testing.

## Solution

We now use **directory-based URLs** with `index.html` files. Apache automatically serves `index.html` when you visit a directory, no rewrites needed!

## How It Works

### Old Structure (Required .htaccess rewrites)
```
out/
├── index.html          → /
├── about.html          → /about (needs rewrite)
└── en/
    └── about.html      → /en/about (needs rewrite)
```

**Problem**: Visiting `/about` returns 404 unless `.htaccess` rewrites it to `/about.html`

### New Structure (No rewrites needed!)
```
out/
├── index.html          → /
├── about/
│   └── index.html      → /about (automatic!)
└── en/
    ├── about.html      → /en/about.html (fallback)
    └── about/
        └── index.html  → /en/about (automatic!)
```

**Solution**: Apache automatically serves `index.html` from directories

## URL Mapping

| URL | File Served | How |
|-----|-------------|-----|
| `/` | `/index.html` | Direct file |
| `/about` | `/about/index.html` | Apache DirectoryIndex |
| `/about/` | `/about/index.html` | Apache DirectoryIndex |
| `/en/about` | `/en/about/index.html` | Apache DirectoryIndex |
| `/en/about/` | `/en/about/index.html` | Apache DirectoryIndex |

## Benefits

✅ **No .htaccess rewrites needed** - Works on any Apache server
✅ **More reliable** - Doesn't depend on `mod_rewrite` being enabled
✅ **Standard Apache behavior** - Uses built-in DirectoryIndex
✅ **Cleaner URLs** - `/about` instead of `/about.html`
✅ **Fallback files** - Original `.html` files kept as backup

## Build Process

The `scripts/postbuild.js` script automatically creates this structure:

1. **Build**: `npm run build` generates `en/about.html`
2. **Postbuild**: Script creates directories and copies files:
   - Creates `/about/` directory
   - Copies `en/about.html` → `/about/index.html`
   - Creates `/en/about/` directory
   - Copies `en/about.html` → `/en/about/index.html`
   - Keeps original `en/about.html` as fallback

## Testing

### Local Testing (Python Server)
```bash
cd out
python3 -m http.server 8080
```

**Note**: Python's server doesn't serve `index.html` automatically, so you need to visit:
- `http://localhost:8080/about/` (with trailing slash)
- Or `http://localhost:8080/about/index.html` (direct file)

### Apache Testing (cPanel/Live Server)
```
https://aviationgroundsolutions.com/about
```

**Works perfectly!** Apache serves `/about/index.html` automatically.

## Navigation Links

Navigation links use clean URLs without `.html`:

```tsx
<Link href="/">Home</Link>
<Link href="/about">About</Link>
```

These work because:
- `/` → serves `/index.html` (direct file)
- `/about` → serves `/about/index.html` (directory index)

## Deployment

When deploying to cPanel:

1. **Delete all files** from `public_html`
2. **Upload entire `out/` folder** including:
   - `index.html`
   - `about/` directory with `index.html`
   - `en/about/` directory with `index.html`
   - `.htaccess` (simplified, now optional)

## .htaccess Role

The `.htaccess` file is now **optional** for About pages but kept as:
1. **Safety net** - Fallback for any other pages
2. **Caching rules** - HTML max-age=0, assets max-age=1year
3. **Security headers** - X-Frame-Options, CSP, etc.

## File Structure After Build

```
out/
├── .htaccess                    ← Apache config (optional for About)
├── index.html                   ← Home page
├── 404.html                     ← Error page
├── about/
│   └── index.html              ← About page (clean URL: /about)
├── en/
│   ├── about.html              ← Fallback
│   └── about/
│       └── index.html          ← English About (clean URL: /en/about)
├── en.html                      ← Original export
├── _next/
│   └── static/
│       └── chunks/             ← JavaScript bundles
├── images/
│   ├── desktop/
│   ├── tablet/
│   └── mobile/
├── favicon.png
├── manifest.json
└── sw.js
```

## Why This Works

Apache has a built-in feature called **DirectoryIndex** that automatically serves `index.html` when you visit a directory:

```apache
# This is Apache's default behavior (no configuration needed)
DirectoryIndex index.html
```

When you visit `/about`:
1. Apache checks if `/about` is a file → No
2. Apache checks if `/about/` is a directory → Yes
3. Apache looks for `index.html` in that directory → Found!
4. Apache serves `/about/index.html` → Success!

## Troubleshooting

### `/about` returns 404

**Check:**
1. Does `/about/` directory exist in `public_html`?
2. Does `/about/index.html` file exist?
3. File permissions: 644 for files, 755 for directories

**Fix:**
```bash
# Verify structure
ls -la public_html/about/
# Should show: index.html

# Check permissions
chmod 755 public_html/about
chmod 644 public_html/about/index.html
```

### `/about/` works but `/about` doesn't

**Cause**: Apache DirectorySlash might be disabled

**Fix**: Add to `.htaccess`:
```apache
DirectorySlash On
```

### Language switching navigates to wrong page

**Check**: Navigation links should use clean URLs:
```tsx
// ✅ Correct
<Link href="/about">About</Link>

// ❌ Wrong
<Link href="/about.html">About</Link>
<Link href="/en/about.html">About</Link>
```

## Summary

- ✅ Clean URLs work without `.htaccess` rewrites
- ✅ Uses standard Apache DirectoryIndex feature
- ✅ More reliable across different server configurations
- ✅ Easier to test and deploy
- ✅ Fallback files kept for compatibility

**Result**: `/about` and `/en/about` now work perfectly on cPanel! 🎉
