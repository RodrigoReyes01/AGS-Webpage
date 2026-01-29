#!/bin/bash

echo "🚀 EXTREME MOBILE OPTIMIZATION"
echo "================================"
echo ""

# Create ultra-optimized mobile images (quality 60%, smaller dimensions)
echo "📱 Creating ultra-light mobile images..."

for img in Images/Landing\ page/*.png; do
    name=$(basename "$img" .png)
    # Mobile: 640px width, 60% quality for ultra-small files
    cwebp -q 60 -resize 640 0 "$img" -o "public/images/mobile/${name}.webp" 2>/dev/null
    size=$(stat -f%z "public/images/mobile/${name}.webp" 2>/dev/null)
    echo "  ${name}: $((size / 1024))KB"
done

# About Us images
cwebp -q 60 -resize 640 0 "Images/About Us/hero.png" -o "public/images/mobile/about-hero.webp" 2>/dev/null
cwebp -q 60 -resize 640 0 "Images/About Us/4cardbackground.png" -o "public/images/mobile/about-cards-bg.webp" 2>/dev/null
cwebp -q 60 -resize 640 0 "Images/About Us/MissionVision.png" -o "public/images/mobile/MissionVision.webp" 2>/dev/null

# Copy to out
cp -r public/images/mobile/* out/images/mobile/

echo ""
echo "�� New mobile image sizes:"
du -sh out/images/mobile/
echo ""
echo "✅ Mobile images optimized for speed!"
