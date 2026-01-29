#!/bin/bash

# High-Quality Image Optimization Script
# Converts images to WebP format with 85% quality
# Resizes to max 2500px width while maintaining aspect ratio
# Target: Under 500KB per image

echo "🎨 Starting high-quality image optimization..."
echo "Format: WebP | Quality: 85% | Max Width: 2500px"
echo ""

# Create output directories
mkdir -p public/images
mkdir -p out/images

# Counter for statistics
total_before=0
total_after=0
count=0

# Function to optimize and convert image
optimize_image() {
    local input="$1"
    local output_name="$2"
    local quality=85
    
    # Get original size
    original_size=$(stat -f%z "$input" 2>/dev/null || stat -c%s "$input" 2>/dev/null)
    total_before=$((total_before + original_size))
    
    # Get dimensions
    dimensions=$(identify -format "%wx%h" "$input" 2>/dev/null)
    width=$(echo $dimensions | cut -d'x' -f1)
    
    echo "Processing: $output_name"
    echo "  Original: ${dimensions} ($(numfmt --to=iec-i --suffix=B $original_size 2>/dev/null || echo $((original_size / 1024))K))"
    
    # Resize if width > 2500px, otherwise keep original size
    if [ "$width" -gt 2500 ]; then
        echo "  Resizing to max 2500px width..."
        cwebp -q $quality -resize 2500 0 "$input" -o "public/images/${output_name}.webp" 2>/dev/null
    else
        echo "  Keeping original dimensions..."
        cwebp -q $quality "$input" -o "public/images/${output_name}.webp" 2>/dev/null
    fi
    
    # Copy to out folder
    cp "public/images/${output_name}.webp" "out/images/${output_name}.webp"
    
    # Get new size
    new_size=$(stat -f%z "public/images/${output_name}.webp" 2>/dev/null || stat -c%s "public/images/${output_name}.webp" 2>/dev/null)
    total_after=$((total_after + new_size))
    count=$((count + 1))
    
    # Check if under 500KB
    size_kb=$((new_size / 1024))
    if [ $size_kb -lt 500 ]; then
        status="✅"
    else
        status="⚠️"
    fi
    
    echo "  Output: ${size_kb}KB $status"
    echo ""
}

# Optimize Landing Page images
echo "📸 Landing Page Images:"
echo "========================"
optimize_image "Images/Landing page/Hero.png" "hero"
optimize_image "Images/Landing page/CargoServices.png" "CargoServices"
optimize_image "Images/Landing page/PassengerServices.png" "PassengerServices"
optimize_image "Images/Landing page/CateringServices.png" "CateringServices"
optimize_image "Images/Landing page/GroundHandling.png" "GroundHandling"
optimize_image "Images/Landing page/FuelService.png" "FuelService"
optimize_image "Images/Landing page/DiscoverServices.png" "DiscoverServices"
optimize_image "Images/Landing page/DiffrentApproach.png" "DifferentApproach"
optimize_image "Images/Landing page/MissionVision.png" "MissionVision"

# Optimize About page images
echo "📸 About Page Images:"
echo "====================="
optimize_image "Images/ThroughCourtain.jpg" "about-hero"
optimize_image "Images/FlyingAbove.jpg" "about-cards-bg"

# Keep logo as PNG (transparency needed)
echo "📸 Logo (keeping as PNG):"
echo "========================="
cp "Images/Logo/LogoTransparentBG.png" "public/images/logo.png"
cp "public/images/logo.png" "out/images/logo.png"
echo "  logo.png: Copied (transparency preserved)"
echo ""

# Statistics
echo "📊 Optimization Results:"
echo "========================"
echo "Images processed: $count"
echo "Total before: $(numfmt --to=iec-i --suffix=B $total_before 2>/dev/null || echo $((total_before / 1024 / 1024))MB)"
echo "Total after: $(numfmt --to=iec-i --suffix=B $total_after 2>/dev/null || echo $((total_after / 1024 / 1024))MB)"

if [ $total_before -gt 0 ]; then
    reduction=$((100 - (total_after * 100 / total_before)))
    echo "Reduction: ${reduction}%"
fi

echo ""
echo "✅ Optimization complete!"
echo ""
echo "Next steps:"
echo "1. Update components to use .webp extensions"
echo "2. Rebuild the site: npm run build"
echo "3. Test image quality in browser"
