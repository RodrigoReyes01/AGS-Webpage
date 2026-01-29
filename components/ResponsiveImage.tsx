'use client';

import React from 'react';
import Image from 'next/image';

interface ResponsiveImageProps {
  src: string; // Base name without path (e.g., "hero")
  alt: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  style?: React.CSSProperties;
}

/**
 * ResponsiveImage component
 * Mobile-first responsive images with srcset
 * 
 * Automatically serves:
 * - Mobile (768px): ~50-80KB
 * - Tablet (1280px): ~80-120KB  
 * - Desktop (1920px): ~120-180KB
 * 
 * Features:
 * - WebP format for modern browsers
 * - Lazy loading by default
 * - Optimized for SEO and performance
 * - Keeps page size under 1-2MB
 */
const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  fill = false,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 768px, (max-width: 1280px) 1280px, 1920px',
  quality = 85,
  style,
}) => {
  // Extract image name from src (remove /images/ prefix and extension)
  const imageName = src.replace('/images/', '').replace(/\.(jpg|png|webp)$/, '');
  
  // Build srcset for responsive images
  const mobileSrc = `/images/mobile/${imageName}.webp`;
  const tabletSrc = `/images/tablet/${imageName}.webp`;
  const desktopSrc = `/images/desktop/${imageName}.webp`;

  if (fill) {
    return (
      <picture>
        <source
          media="(max-width: 768px)"
          srcSet={mobileSrc}
          type="image/webp"
        />
        <source
          media="(max-width: 1280px)"
          srcSet={tabletSrc}
          type="image/webp"
        />
        <source
          media="(min-width: 1281px)"
          srcSet={desktopSrc}
          type="image/webp"
        />
        <Image
          src={desktopSrc}
          alt={alt}
          fill
          priority={priority}
          quality={quality}
          sizes={sizes}
          className={className}
          style={style}
          loading={priority ? 'eager' : 'lazy'}
        />
      </picture>
    );
  }

  return (
    <picture>
      <source
        media="(max-width: 768px)"
        srcSet={mobileSrc}
        type="image/webp"
      />
      <source
        media="(max-width: 1280px)"
        srcSet={tabletSrc}
        type="image/webp"
      />
      <source
        media="(min-width: 1281px)"
        srcSet={desktopSrc}
        type="image/webp"
      />
      <Image
        src={desktopSrc}
        alt={alt}
        priority={priority}
        quality={quality}
        sizes={sizes}
        className={className}
        style={style}
        loading={priority ? 'eager' : 'lazy'}
        width={1920}
        height={1080}
      />
    </picture>
  );
};

export default ResponsiveImage;
