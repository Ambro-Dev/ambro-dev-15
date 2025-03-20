"use client";

import { useEffect } from "react";

/**
 * AssetPreloader Component
 *
 * Preloads critical assets like fonts, images, and scripts to improve
 * First Contentful Paint (FCP) and Largest Contentful Paint (LCP) metrics.
 *
 * @param {Object} props Component properties
 * @param {string[]} props.fonts Array of font URLs to preload
 * @param {string[]} props.images Array of critical image URLs to preload
 */
export default function AssetPreloader({
  fonts = [],
  images = [],
}: {
  fonts?: string[];
  images?: string[];
}) {
  // Add runtime preloading for dynamic content
  useEffect(() => {
    // Preload fonts via DOM
    fonts.forEach((fontUrl) => {
      const linkElement = document.createElement("link");
      linkElement.rel = "preload";
      linkElement.href = fontUrl;
      linkElement.as = "font";
      linkElement.type = "font/woff2";
      linkElement.crossOrigin = "anonymous";
      document.head.appendChild(linkElement);
    });

    // Preload images via DOM
    images.forEach((imgUrl) => {
      // Method 1: Link preload
      const linkElement = document.createElement("link");
      linkElement.rel = "preload";
      linkElement.href = imgUrl;
      linkElement.as = "image";
      document.head.appendChild(linkElement);

      // Method 2: Image object (as backup)
      const img = new Image();
      img.src = imgUrl;
    });

    // DNS prefetch
    const dnsPrefetch = document.createElement("link");
    dnsPrefetch.rel = "dns-prefetch";
    dnsPrefetch.href = "https://ambro-dev.pl";
    document.head.appendChild(dnsPrefetch);

    // Preconnect
    const preconnect = document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = "https://ambro-dev.pl";
    preconnect.crossOrigin = "anonymous";
    document.head.appendChild(preconnect);

    // Cleanup function to remove links on component unmount
    return () => {
      document
        .querySelectorAll('link[rel="preload"][data-preloader="true"]')
        .forEach((el) => {
          el.parentNode?.removeChild(el);
        });
    };
  }, [fonts, images]);

  // No visible UI, just side effects
  return null;
}
