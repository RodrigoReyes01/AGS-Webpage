#!/bin/bash

# Deployment Verification Script for AGS Webpage
# Run this before uploading to cPanel

echo "🔍 AGS Webpage - Deployment Verification"
echo "========================================"
echo ""

# Check if out folder exists
if [ ! -d "out" ]; then
    echo "❌ Error: 'out' folder not found. Run 'npm run build' first."
    exit 1
fi

echo "✅ out/ folder exists"

# Check critical files
echo ""
echo "📄 Checking critical files..."

files=(
    "out/.htaccess"
    "out/index.html"
    "out/es.html"
    "out/404.html"
    "out/sw.js"
    "out/manifest.json"
    "out/favicon.png"
    "out/en/about.html"
    "out/es/about.html"
)

missing_files=0
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        size=$(du -h "$file" | cut -f1)
        echo "  ✅ $file ($size)"
    else
        echo "  ❌ Missing: $file"
        missing_files=$((missing_files + 1))
    fi
done

if [ $missing_files -gt 0 ]; then
    echo ""
    echo "❌ $missing_files critical file(s) missing!"
    exit 1
fi

# Check .htaccess content
echo ""
echo "🔧 Verifying .htaccess configuration..."

if grep -q "RewriteEngine On" out/.htaccess; then
    echo "  ✅ mod_rewrite enabled"
else
    echo "  ❌ mod_rewrite not found in .htaccess"
    exit 1
fi

if grep -q "ErrorDocument 404" out/.htaccess; then
    echo "  ✅ Custom 404 page configured"
else
    echo "  ❌ Custom 404 not configured"
fi

if grep -q "mod_deflate" out/.htaccess; then
    echo "  ✅ Gzip compression configured"
else
    echo "  ⚠️  Gzip compression not found"
fi

# Check folder structure
echo ""
echo "📁 Checking folder structure..."

folders=(
    "out/_next"
    "out/_next/static"
    "out/_next/static/chunks"
    "out/_next/static/css"
    "out/images"
    "out/images/mobile"
    "out/images/tablet"
    "out/images/desktop"
    "out/en"
    "out/es"
)

for folder in "${folders[@]}"; do
    if [ -d "$folder" ]; then
        count=$(find "$folder" -type f | wc -l | tr -d ' ')
        echo "  ✅ $folder ($count files)"
    else
        echo "  ❌ Missing: $folder"
    fi
done

# Count total files
echo ""
echo "📊 Site Statistics..."
total_files=$(find out -type f | wc -l | tr -d ' ')
total_size=$(du -sh out | cut -f1)
echo "  Total files: $total_files"
echo "  Total size: $total_size"

# Check JavaScript bundles
echo ""
echo "📦 JavaScript Bundles..."
js_count=$(find out/_next/static/chunks -name "*.js" | wc -l | tr -d ' ')
echo "  JS files: $js_count"

if [ -f "out/_next/static/chunks/vendor-e9d69e359d37eff3.js" ]; then
    vendor_size=$(du -h "out/_next/static/chunks/vendor-e9d69e359d37eff3.js" | cut -f1)
    echo "  ✅ Vendor bundle: $vendor_size"
else
    echo "  ⚠️  Vendor bundle not found (may have different hash)"
fi

# Check images
echo ""
echo "🖼️  Images..."
mobile_images=$(find out/images/mobile -name "*.webp" 2>/dev/null | wc -l | tr -d ' ')
tablet_images=$(find out/images/tablet -name "*.webp" 2>/dev/null | wc -l | tr -d ' ')
desktop_images=$(find out/images/desktop -name "*.webp" 2>/dev/null | wc -l | tr -d ' ')

echo "  Mobile: $mobile_images WebP images"
echo "  Tablet: $tablet_images WebP images"
echo "  Desktop: $desktop_images WebP images"

# Final summary
echo ""
echo "========================================"
echo "✅ Deployment verification complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Upload entire 'out/' folder to cPanel public_html"
echo "2. Ensure .htaccess is uploaded (enable 'Show hidden files')"
echo "3. Set file permissions: 644 for files, 755 for folders"
echo "4. Test these URLs after deployment:"
echo "   - https://yourdomain.com"
echo "   - https://yourdomain.com/about"
echo "   - https://yourdomain.com/es"
echo "   - https://yourdomain.com/es/about"
echo "   - https://yourdomain.com/nonexistent (should show 404)"
echo ""
echo "📖 See CPANEL_DEPLOYMENT_GUIDE.md for detailed instructions"
echo ""
