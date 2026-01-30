# Testing Your Site Locally

## ❌ The 403 Forbidden Error

The "403 Forbidden" error happens when you try to open the HTML files directly (double-clicking them). This is because:

1. **File Protocol**: Opening `file:///path/to/index.html` doesn't allow loading images from different folders
2. **CORS Policy**: Browsers block cross-origin requests for security
3. **No Server**: Static files need a web server to work properly

---

## ✅ Solution: Use a Local Web Server

### Option 1: Python Server (Easiest)

```bash
# Run this command from your project root:
./serve-local.sh

# Or manually:
cd out
python3 -m http.server 8000
```

Then open: **http://localhost:8000**

### Option 2: Node.js Server

```bash
# Install serve globally
npm install -g serve

# Serve the out folder
serve out -p 8000
```

Then open: **http://localhost:8000**

### Option 3: PHP Server

```bash
cd out
php -S localhost:8000
```

Then open: **http://localhost:8000**

---

## 🧪 Testing on Your iPhone/iPad

### Method 1: Same WiFi Network

1. Start local server on your computer:
   ```bash
   ./serve-local.sh
   ```

2. Find your computer's IP address:
   ```bash
   # On Mac:
   ifconfig | grep "inet " | grep -v 127.0.0.1
   
   # Example output: 192.168.1.100
   ```

3. On your iPhone/iPad, open Safari and go to:
   ```
   http://192.168.1.100:8000
   ```

### Method 2: Deploy to Free Hosting

**Netlify (Recommended):**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd out
netlify deploy --prod
```

You'll get a URL like: `https://your-site.netlify.app`

**Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**GitHub Pages:**
```bash
# Push out folder to gh-pages branch
git subtree push --prefix out origin gh-pages
```

---

## 🔍 Why You're Seeing 403 Forbidden

### What's Happening:
```
❌ file:///Users/you/project/out/index.html
   └─ Tries to load: file:///Users/you/project/out/images/hero.webp
   └─ Browser blocks it (security policy)

✅ http://localhost:8000/index.html
   └─ Loads: http://localhost:8000/images/hero.webp
   └─ Works perfectly!
```

### The Fix:
**Always use a web server** (even for local testing)

---

## 📊 Testing Performance

### 1. Chrome DevTools (Desktop)

1. Open site in Chrome
2. Press F12 (DevTools)
3. Go to "Network" tab
4. Reload page
5. Check:
   - Total size downloaded
   - Load time
   - Which images loaded

### 2. Lighthouse (Desktop)

1. Open site in Chrome
2. Press F12 (DevTools)
3. Go to "Lighthouse" tab
4. Click "Analyze page load"
5. Check scores:
   - Performance
   - Accessibility
   - Best Practices
   - SEO

### 3. Mobile Testing

**On Real Device:**
1. Deploy to Netlify/Vercel
2. Open on your iPhone/iPad
3. Check load time
4. Check image quality

**Chrome DevTools Mobile Emulation:**
1. Open DevTools (F12)
2. Click device icon (top-left)
3. Select "iPhone 12 Pro" or "iPad"
4. Reload page
5. Check performance

### 4. Network Throttling

Test slow connections:
1. Open DevTools
2. Go to "Network" tab
3. Select throttling:
   - Fast 3G
   - Slow 3G
   - 4G
4. Reload and check load time

---

## 🚀 Recommended Testing Flow

### Step 1: Local Testing
```bash
# Start server
./serve-local.sh

# Open in browser
open http://localhost:8000
```

**Check:**
- ✅ All images load
- ✅ Navigation works
- ✅ No console errors
- ✅ Mobile responsive

### Step 2: Network Testing
```bash
# Test with throttling
# Chrome DevTools > Network > Throttling > Fast 3G
```

**Check:**
- ✅ Load time < 3 seconds
- ✅ Images load progressively
- ✅ No layout shift

### Step 3: Mobile Device Testing
```bash
# Deploy to Netlify
netlify deploy --prod
```

**Check on iPhone/iPad:**
- ✅ Fast load time
- ✅ Sharp images
- ✅ Smooth scrolling
- ✅ No lag

### Step 4: Performance Audit
```bash
# Run Lighthouse
# Chrome DevTools > Lighthouse > Analyze
```

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+

---

## 🐛 Common Issues & Fixes

### Issue 1: Images Don't Load
**Symptom**: Broken image icons
**Cause**: Wrong file paths or missing files
**Fix**:
```bash
# Check if images exist
ls out/images/mobile/
ls out/images/tablet/
ls out/images/desktop/

# Rebuild if needed
npm run build
```

### Issue 2: 403 Forbidden
**Symptom**: "You don't have permission to access this resource"
**Cause**: Opening HTML file directly (not using web server)
**Fix**:
```bash
# Use web server
./serve-local.sh
```

### Issue 3: Slow Load Time
**Symptom**: Takes >5 seconds to load
**Cause**: Not deployed to CDN
**Fix**:
```bash
# Deploy to CDN
netlify deploy --prod
```

### Issue 4: Blurry Images
**Symptom**: Images look pixelated
**Cause**: Wrong image version loading
**Fix**:
```bash
# Check browser width
# Mobile should load 480px images
# Tablet should load 1024px images
# Desktop should load 1920px images
```

---

## ✅ Quick Start Guide

### For Local Testing:
```bash
# 1. Start server
./serve-local.sh

# 2. Open browser
open http://localhost:8000

# 3. Test on mobile (same WiFi)
# Find your IP: ifconfig | grep "inet "
# Open on phone: http://YOUR_IP:8000
```

### For Production:
```bash
# 1. Deploy to Netlify
npm install -g netlify-cli
cd out
netlify deploy --prod

# 2. Test on real devices
# Open the Netlify URL on your iPhone/iPad

# 3. Check performance
# Run Lighthouse audit
```

---

## 📱 Expected Results

### After Deploying to CDN:

**iPhone:**
- Load time: 0.7-1.8 seconds
- Images: Sharp and clear
- No lag or jank
- Smooth experience

**iPad:**
- Load time: 0.8-2.1 seconds
- Images: High quality
- Fast scrolling
- Professional feel

**Desktop:**
- Load time: 1.1-2.2 seconds
- Images: Full resolution
- Smooth animations
- Perfect quality

---

## 🎯 Summary

### The Problem:
❌ Opening HTML files directly causes 403 errors

### The Solution:
✅ Use a web server (even for local testing)

### Quick Fix:
```bash
./serve-local.sh
```

### Best Solution:
```bash
netlify deploy --prod
```

---

**Remember**: Always test through a web server, never by opening HTML files directly!

