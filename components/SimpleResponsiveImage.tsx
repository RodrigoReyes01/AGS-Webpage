import React from 'react';

interface SimpleResponsiveImageProps {
  src: string; // Base name without path (e.g., "hero")
  alt: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
}

/**
 * SimpleResponsiveImage - Plain HTML implementation
 * Works better with static export than Next.js Image
 */
const SimpleResponsiveImage: React.FC<SimpleResponsiveImageProps> = ({
  src,
  alt,
  fill = false,
  priority = false,
  className = '',
}) => {
  // Extract image name from src (remove /images/ prefix and extension)
  const imageName = src.replace('/images/', '').replace(/\.(jpg|png|webp)$/, '');
  
  // Build srcset for responsive images
  const mobileSrc = `/images/mobile/${imageName}.webp`;
  const tabletSrc = `/images/tablet/${imageName}.webp`;
  const desktopSrc = `/images/desktop/${imageName}.webp`;

  if (fill) {
    return (
      <picture className={className}>
        <source
          media="(max-width: 640px)"
          srcSet={mobileSrc}
          type="image/webp"
        />
        <source
          media="(max-width: 1024px)"
          srcSet={tabletSrc}
          type="image/webp"
        />
        <source
          media="(min-width: 1025px)"
          srcSet={desktopSrc}
          type="image/webp"
        />
        <img
          src={desktopSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            objectFit: 'cover',
          }}
        />
      </picture>
    );
  }

  return (
    <picture className={className}>
      <source
        media="(max-width: 640px)"
        srcSet={mobileSrc}
        type="image/webp"
      />
      <source
        media="(max-width: 1024px)"
        srcSet={tabletSrc}
        type="image/webp"
      />
      <source
        media="(min-width: 1025px)"
        srcSet={desktopSrc}
        type="image/webp"
      />
      <img
        src={desktopSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        width="1920"
        height="1080"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </picture>
  );
};

export default SimpleResponsiveImage;
