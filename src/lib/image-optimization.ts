import { ImageProps } from "next/image";

/**
 * Generates optimized image attributes for responsive design
 *
 * @param src The image source URL
 * @param sizes Responsive size attribute for the image
 * @param priority Whether this is a high priority image that should be preloaded
 * @param quality Image quality (1-100)
 * @returns Optimized image props for Next.js Image component
 */
export function getOptimizedImageProps(
  src: string,
  sizes: string = "100vw",
  priority: boolean = false,
  quality: number = 80
): Partial<ImageProps> {
  return {
    src,
    sizes,
    priority,
    quality,
    loading: priority ? "eager" : "lazy",
    // Add modern image format preference
    style: { objectFit: "cover" },
    // Set width and height as undefined to let the CSS determine the size
    // for better responsive behavior
    width: undefined,
    height: undefined,
    // Use BlurUp placeholder for better user experience
    placeholder: "blur",
    blurDataURL:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyIi8+PC9zdmc+",
  };
}

/**
 * Calculate aspect ratio based CSS to maintain proper image dimensions
 * This helps prevent layout shifts during image loading
 *
 * @param width Original image width
 * @param height Original image height
 * @returns CSS object with proper aspect ratio
 */
export function getAspectRatioCss(
  width: number,
  height: number
): React.CSSProperties {
  return {
    position: "relative",
    aspectRatio: `${width} / ${height}`,
    width: "100%",
  };
}

/**
 * Generate an appropriate 'sizes' attribute for responsive images
 *
 * @param defaultSize Default size in viewport width units
 * @param breakpoints Custom breakpoints for responsive sizing
 * @returns Properly formatted sizes attribute string
 */
export function getResponsiveSizes(
  defaultSize: string = "100vw",
  breakpoints?: { [key: string]: string }
): string {
  if (!breakpoints) return defaultSize;

  // Convert breakpoints object to sizes string
  // e.g. { sm: '50vw', md: '33vw', lg: '25vw' } becomes
  // '(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw'
  const bpMap = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  };

  const sizesArray = Object.entries(breakpoints)
    .map(([bp, size]) => {
      const width = bpMap[bp as keyof typeof bpMap];
      return width ? `(min-width: ${width}px) ${size}` : "";
    })
    .filter(Boolean);

  // Add default size last
  return sizesArray.length > 0
    ? `${sizesArray.join(", ")}, ${defaultSize}`
    : defaultSize;
}
