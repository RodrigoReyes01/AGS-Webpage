#!/bin/bash

echo "🔧 Fixing About Us images with correct originals..."
echo ""

# Function to create responsive image set
create_responsive_set() {
    local input="$1"
    local output_name="$2"
    local quality=82
    
    echo "Processing: $output_name"
    
    # Mobile (max 768px width)
    echo "  📱 Mobile (768px)..."
    cwebp -q 80 -resize 768 0 "$input" -o "public/images/mobile/${output_name}.webp" 2>/dev/null
    size_mobile=$(stat -f%z "public/images/mobile/${output_name}.webp" 2>/dev/null)
    echo "     Size: $((size_mobile / 1024))KB"
    
    # Tablet (max 1280px width)
    echo "  📱 Tablet (1280px)..."
    cwebp -q 82 -resize 1280 0 "$input" -o "public/images/tablet/${output_name}.webp" 2>/dev/null
    size_tablet=$(stat -f%z "public/images/tablet/${output_name}.webp" 2>/dev/null)
    echo "     Size: $((size_tablet / 1024))KB"
    
    # Desktop (max 1920px width)
    echo "  💻 Desktop (1920px)..."
    cwebp -q 85 -resize 1920 0 "$input" -o "public/images/desktop/${output_name}.webp" 2>/dev/null
    size_desktop=$(stat -f%z "public/images/desktop/${output_name}.webp" 2>/dev/null)
    echo "     Size: $((size_desktop / 1024))KB"
    
    # Copy to out folder
    cp "public/images/mobile/${output_name}.webp" "out/images/mobile/${output_name}.webp"
    cp "public/images/tablet/${output_name}.webp" "out/images/tablet/${output_name}.webp"
    cp "public/images/desktop/${output_name}.webp" "out/images/desktop/${output_name}.webp"
    
    echo ""
}

echo "📸 About Page Images (Correct Originals):"
echo "=========================================="
create_responsive_set "Images/About Us/hero.png" "about-hero"
create_responsive_set "Images/About Us/4cardbackground.png" "about-cards-bg"

# Also update MissionVision from About Us folder
echo "📸 Mission Vision (Correct Original):"
echo "======================================"
create_responsive_set "Images/About Us/MissionVision.png" "MissionVision"

# Copy graphic (already optimized)
echo "📸 About Graphic:"
echo "================="
cp "Images/About Us/graphic.png" "public/images/about-graphic.png"
cp "public/images/about-graphic.png" "out/images/about-graphic.png"
echo "  about-graphic.png: Copied (19KB)"
echo ""

echo "✅ About Us images fixed!"
