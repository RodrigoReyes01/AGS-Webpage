#!/bin/bash

echo "⚡ EXTREME MOBILE/TABLET OPTIMIZATION"
echo "====================================="
echo ""

# 1. Create even smaller mobile images (480px, 50% quality)
echo "📱 Creating ultra-compressed mobile images..."
for img in Images/Landing\ page/*.png; do
    name=$(basename "$img" .png)
    cwebp -q 50 -resize 480 0 "$img" -o "public/images/mobile/${name}.webp" 2>/dev/null
done

cwebp -q 50 -resize 480 0 "Images/About Us/hero.png" -o "public/images/mobile/about-hero.webp" 2>/dev/null
cwebp -q 50 -resize 480 0 "Images/About Us/4cardbackground.png" -o "public/images/mobile/about-cards-bg.webp" 2>/dev/null
cwebp -q 50 -resize 480 0 "Images/About Us/MissionVision.png" -o "public/images/mobile/MissionVision.webp" 2>/dev/null

echo "  ✅ Mobile images: 480px, 50% quality"

# 2. Optimize tablet images (1024px, 70% quality)
echo ""
echo "📱 Optimizing tablet images..."
for img in Images/Landing\ page/*.png; do
    name=$(basename "$img" .png)
    cwebp -q 70 -resize 1024 0 "$img" -o "public/images/tablet/${name}.webp" 2>/dev/null
done

cwebp -q 70 -resize 1024 0 "Images/About Us/hero.png" -o "public/images/tablet/about-hero.webp" 2>/dev/null
cwebp -q 70 -resize 1024 0 "Images/About Us/4cardbackground.png" -o "public/images/tablet/about-cards-bg.webp" 2>/dev/null
cwebp -q 70 -resize 1024 0 "Images/About Us/MissionVision.png" -o "public/images/tablet/MissionVision.webp" 2>/dev/null

echo "  ✅ Tablet images: 1024px, 70% quality"

# 3. Create tiny logo for mobile
echo ""
echo "🖼️  Creating tiny mobile logo..."
magick Images/Logo/LogoTransparentBG.png -resize 150x150\> -strip -quality 75 public/images/logo-mobile.png
echo "  ✅ Mobile logo: 150px"

# Copy to out
cp -r public/images/mobile/* out/images/mobile/ 2>/dev/null
cp -r public/images/tablet/* out/images/tablet/ 2>/dev/null
cp public/images/logo-mobile.png out/images/logo-mobile.png 2>/dev/null

echo ""
echo "📊 New sizes:"
echo "  Mobile:  $(du -sh out/images/mobile/ | awk '{print $1}')"
echo "  Tablet:  $(du -sh out/images/tablet/ | awk '{print $1}')"
echo "  Logo:    $(ls -lh out/images/logo-mobile.png | awk '{print $5}')"
echo ""
echo "✅ Images optimized!"
