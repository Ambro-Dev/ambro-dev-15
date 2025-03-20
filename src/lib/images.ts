// src/lib/images.ts
// Moduł optymalizacji obrazów

import { ImageProps } from "next/image";

/**
 * Konfiguracja responsywnych obrazów
 */
export function getResponsiveImageProps(
  src: string,
  alt: string,
  priority = false,
  className = ""
): ImageProps {
  return {
    src,
    alt,
    priority,
    className,
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
    quality: 90, // Optymalna jakość
    blurDataURL: getBlurDataURL(), // Placeholdery dla obrazów
    placeholder: "blur",
  };
}

/**
 * Generuje placeholder w formacie data URL
 */
function getBlurDataURL() {
  // Bardzo mały, zakodowany w base64 placeholder SVG
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
    <rect width="100" height="100" fill="#20202380"/>
  </svg>`;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
