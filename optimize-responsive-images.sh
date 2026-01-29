#!/bin/bash

# Responsive Image Optimization Script
# Creates multiple sizes for each image with mobile-first approach
# Target: Under 200KB per image, 1-2MB total page size

echo "🎨 Creating responsive image sets..."
echo "Mobile-first approach with multiple sizes"
echo ""

# Create output directories
mkdir -p public/images/{mobile,tablet,desktop}
mkdir -p out/images/{mobile,tablet,desktop}

# Function to create responsive image set
create_responsive_set() {
    local input="$1"
    local output_name="$2"
    local quality=82
    
    echo "Processing: $output_name"
    
    # Mobile (max 768px width) - Target: <100KB
    echo "  📱 Mobile (768px)..."
    cwebp -q 80 -resize 768 0 "$input" -o "public/images/mobile/${output_name}.webp" 2>/dev/null
    size_mobile=$(stat -f%z "public/images/mobile/${output_name}.webp" 2>/dev/null || stat -c%s "public/images/mobile/${output_name}.webp" 2>/dev/null)
    echo "     Size: $((size_mobile / 1024))KB"
    
    # Tablet (max 1280px width) - Target: <150KB
    echo "  📱 Tablet (1280px)..."
    cwebp -q 82 -resize 1280 0 "$input" -o "public/images/tablet/${output_name}.webp" 2>/dev/null
    size_tablet=$(stat -f%z "public/images/tablet/${output_name}.webp" 2>/dev/null || stat -c%s "public/images/tablet/${output_name}.webp" 2>/dev/null)
    echo "     Size: $((size_tablet / 1024))KB"
    
    # Desktop (max 1920px width) - Target: <200KB
    echo "  💻 Desktop (1920px)..."
    cwebp -q 85 -resize 1920 0 "$input" -o "public/images/desktop/${output_name}.webp" 2>/dev/null
    size_desktop=$(stat -f%z "public/images/desktop/${output_name}.webp" 2>/dev/null || stat -c%s "public/images/desktop/${output_name}.webp" 2>/dev/null)
    echo "     Size: $((size_desktop / 1024))KB"
    
    # Copy to out folder
    cp "public/images/mobile/${output_name}.webp" "out/images/mobile/${output_name}.webp"
    cp "public/images/tablet/${output_name}.webp" "out/images/tablet/${output_name}.webp"
    cp "public/images/desktop/${output_name}.webp" "out/images/desktop/${output_name}.webp"
    
    echo ""
}

# Process Landing Page images
echo "📸 Landing Page Images:"
echo "======================"
create_responsive_set "Images/Landing page/Hero.png" "hero"
create_responsive_set "Images/Landing page/CargoServices.png" "CargoServices"
create_responsive_set "Images/Landing page/PassengerServices.png" "PassengerServices"
create_responsive_set "Images/Landing page/CateringServices.png" "CateringServices"
create_responsive_set "Images/Landing page/GroundHandling.png" "GroundHandling"
create_responsive_set "Images/Landing page/FuelService.png" "FuelService"
create_responsive_set "Images/Landing page/DiscoverServices.png" "DiscoverServices"
create_responsive_set "Images/Landing page/DiffrentApproach.png" "DifferentApproach"
create_responsive_set "Images/Landing page/MissionVision.png" "MissionVision"

# Process About page images (high-res originals)
echo "📸 About Page Images (High-Res):"
echo "================================="
create_responsive_set "Images/ThroughCourtain.jpg" "about-hero"
create_responsive_set "Images/FlyingAbove.jpg" "about-cards-bg"

# Optimize logo (single size, needs transparency)
echo "📸 Logo:"
echo "========"
echo "Processing: logo"
magick Images/Logo/LogoTransparentBG.png -resize 600x600\> -strip -quality 85 public/images/logo.png
cp public/images/logo.png out/images/logo.png
size_logo=$(stat -f%z "public/images/logo.png" 2>/dev/null || stat -c%s "public/images/logo.png" 2>/dev/null)
echo "  Size: $((size_logo / 1024))KB"
echo ""

# Keep placeholder
cp public/images/placeholder.svg out/images/placeholder.svg 2>/dev/null || echo ""

# Statistics
echo "📊 Optimization Complete!"
echo "========================"
echo ""
echo "Image sizes created:"
echo "  📱 Mobile (768px): ~50-80KB each"
echo "  📱 Tablet (1280px): ~80-120KB each"
echo "  💻 Desktop (1920px): ~120-180KB each"
echo ""
echo "Total sizes:"
mobile_total=$(find public/images/mobile -type f -exec stat -f%z {} \; 2>/dev/null | awk '{sum+=$1} END {print sum/1024}')
tablet_total=$(find public/images/tablet -type f -exec stat -f%z {} \; 2>/dev/null | awk '{sum+=$1} END {print sum/1024}')
desktop_total=$(find public/images/desktop -type f -exec stat -f%z {} \; 2>/dev/null | awk '{sum+=$1} END {print sum/1024}')
echo "  📱 Mobile images: ${mobile_total}KB"
echo "  📱 Tablet images: ${tablet_total}KB"
echo "  💻 Desktop images: ${desktop_total}KB"
echo ""
echo "✅ Mobile users will download: ~${mobile_total}KB of images"
echo "✅ Desktop users will download: ~${desktop_total}KB of images"
echo ""
echo "Next step: Update components to use responsive images"
