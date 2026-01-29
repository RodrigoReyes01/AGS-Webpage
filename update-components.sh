#!/bin/bash

# Update all components to use ResponsiveImage

components=(
  "AboutHeroSection"
  "AboutCardsSection"
  "ServicesSection"
  "PassengerServicesSection"
  "CateringSection"
  "GroundHandlingSection"
  "FuelServicesSection"
  "DiscoverServicesSection"
  "WhyAGSSection"
  "MissionVisionSection"
)

for comp in "${components[@]}"; do
  file="app/components/${comp}.tsx"
  if [ -f "$file" ]; then
    echo "Updating $comp..."
    # Replace import
    sed -i '' 's/import ImageWithFallback from/import ResponsiveImage from/g' "$file"
    sed -i '' "s/@\/components\/ImageWithFallback/@\/components\/ResponsiveImage/g" "$file"
    # Replace component usage
    sed -i '' 's/<ImageWithFallback/<ResponsiveImage/g' "$file"
    sed -i '' 's/<\/ImageWithFallback>/<\/ResponsiveImage>/g' "$file"
    # Remove showLoadingPlaceholder prop
    sed -i '' '/showLoadingPlaceholder/d' "$file"
    # Remove quality prop (ResponsiveImage handles it)
    sed -i '' '/quality={[0-9]*}/d' "$file"
  fi
done

echo "✅ All components updated!"
