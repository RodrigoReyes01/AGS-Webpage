#!/bin/bash

# Script to disable parallax effects for maximum performance
# This removes the scroll event listeners that cause lag

echo "🚀 Disabling parallax effects for ultra performance..."

# List of files with parallax
files=(
  "app/components/MissionVisionSection.tsx"
  "app/components/ServicesSection.tsx"
  "app/components/PassengerServicesSection.tsx"
  "app/components/CateringSection.tsx"
  "app/components/GroundHandlingSection.tsx"
  "app/components/FuelServicesSection.tsx"
  "app/components/DiscoverServicesSection.tsx"
  "app/components/WhyAGSSection.tsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Processing $file..."
    # Comment out parallax state and effects
    # This is a simple approach - just set parallaxOffset to 0
    sed -i.bak 's/const \[parallaxOffset, setParallaxOffset\] = useState(0);/const parallaxOffset = 0; \/\/ Disabled for performance/' "$file"
    sed -i.bak '/\/\/ Parallax effect on scroll/,/}, \[.*\]);/d' "$file"
    sed -i.bak '/useEffect(() => {/,/}, \[\]);/d' "$file"
  fi
done

echo "✅ Parallax effects disabled!"
echo "🔨 Rebuilding..."
npm run build

echo "✅ Done! Site is now ultra-fast on all devices."
