#!/bin/bash

# Fix image paths to use just the name (ResponsiveImage handles the rest)

# Map of old paths to new names
declare -A image_map=(
  ["/images/hero.webp"]="hero"
  ["/images/CargoServices.webp"]="CargoServices"
  ["/images/PassengerServices.webp"]="PassengerServices"
  ["/images/CateringServices.webp"]="CateringServices"
  ["/images/GroundHandling.webp"]="GroundHandling"
  ["/images/FuelService.webp"]="FuelService"
  ["/images/DiscoverServices.webp"]="DiscoverServices"
  ["/images/DifferentApproach.webp"]="DifferentApproach"
  ["/images/MissionVision.webp"]="MissionVision"
  ["/images/about-hero.webp"]="about-hero"
  ["/images/about-cards-bg.webp"]="about-cards-bg"
)

for file in app/components/*.tsx; do
  for old_path in "${!image_map[@]}"; do
    new_name="${image_map[$old_path]}"
    sed -i '' "s|src=\"${old_path}\"|src=\"${new_name}\"|g" "$file"
  done
done

echo "✅ Image paths updated!"
