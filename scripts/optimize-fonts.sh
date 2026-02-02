#!/bin/bash

# Font Optimization Script
# Subsets fonts to Latin characters and converts to WOFF2

echo "🔤 Font Optimization Script"
echo "============================"

# Check if glyphhanger is installed
if ! command -v glyphhanger &> /dev/null; then
    echo "❌ glyphhanger not found. Installing..."
    npm install -g glyphhanger
fi

# Check if fonttools is installed
if ! command -v pyftsubset &> /dev/null; then
    echo "❌ fonttools not found. Installing..."
    pip install fonttools brotli
fi

# Create fonts directory if it doesn't exist
mkdir -p public/fonts

echo ""
echo "📁 Place your font files (.ttf, .otf, .woff, .woff2) in public/fonts/"
echo "Press Enter when ready..."
read

# Process each font file
for font in public/fonts/*.{ttf,otf,woff}; do
    if [ -f "$font" ]; then
        filename=$(basename "$font")
        name="${filename%.*}"
        
        echo ""
        echo "Processing: $filename"
        
        # Subset to Latin characters
        glyphhanger --subset="$font" \
            --formats=woff2 \
            --US_ASCII \
            --output=public/fonts/
        
        echo "✅ Optimized: ${name}.woff2"
    fi
done

echo ""
echo "✨ Font optimization complete!"
echo ""
echo "Next steps:"
echo "1. Add preload links to app/[locale]/layout.tsx:"
echo "   <link rel=\"preload\" href=\"/fonts/your-font.woff2\" as=\"font\" type=\"font/woff2\" crossorigin>"
echo ""
echo "2. Add @font-face declarations to app/globals.css:"
echo "   @font-face {"
echo "     font-family: 'YourFont';"
echo "     src: url('/fonts/your-font.woff2') format('woff2');"
echo "     font-display: swap;"
echo "     font-weight: 400;"
echo "     font-style: normal;"
echo "   }"
echo ""
echo "3. Update Tailwind config to use your font:"
echo "   fontFamily: { sans: ['YourFont', 'system-ui', ...] }"
