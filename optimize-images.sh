#!/bin/bash

# Image Optimization Script for out/images folder
# Reduces image file sizes while maintaining acceptable quality

echo "🖼️  Starting image optimization..."
echo "📁 Target folder: out/images/"
echo ""

# Get initial size
INITIAL_SIZE=$(du -sh out/images/ | cut -f1)
echo "Initial size: $INITIAL_SIZE"
echo ""

# Counter for optimized files
COUNT=0

# Optimize PNG files
echo "Optimizing PNG files..."
for img in out/images/*.png; do
    if [ -f "$img" ]; then
        echo "  Processing: $(basename "$img")"
        # Use sips (macOS built-in) to reduce quality and size
        sips -s format png -s formatOptions 70 "$img" --out "$img" > /dev/null 2>&1
        COUNT=$((COUNT + 1))
    fi
done

# Optimize JPG/JPEG files
echo ""
echo "Optimizing JPG/JPEG files..."
for img in out/images/*.jpg out/images/*.jpeg; do
    if [ -f "$img" ]; then
        echo "  Processing: $(basename "$img")"
        # Use sips to reduce quality
        sips -s format jpeg -s formatOptions 70 "$img" --out "$img" > /dev/null 2>&1
        COUNT=$((COUNT + 1))
    fi
done

# Get final size
FINAL_SIZE=$(du -sh out/images/ | cut -f1)

echo ""
echo "✅ Optimization complete!"
echo "📊 Results:"
echo "  - Files optimized: $COUNT"
echo "  - Initial size: $INITIAL_SIZE"
echo "  - Final size: $FINAL_SIZE"
echo ""
echo "🚀 Your images are now optimized for faster loading!"
