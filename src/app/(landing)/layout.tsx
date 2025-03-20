// src/app/(landing)/layout.tsx

"use client";

import Script from "next/script";
import AssetPreloader from "@/components/ambro-ui/asset-preloader";

// Critical static assets to preload
const criticalFonts: string[] = [
  // Add your font URLs here
];

const criticalImages: string[] = [
  "/logo.webp",
  // Add more critical images here
];

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Preload critical assets */}
      <AssetPreloader fonts={criticalFonts} images={criticalImages} />

      {/* Main Layout */}
      <div className="bg-[#050505] text-white min-h-screen">
        {children}

        {/* Script optimization - Load non-critical JS after page load */}
        <Script
          src="/scripts/analytics.js"
          strategy="lazyOnload"
          async={true}
        />

        {/* Font display optimization - Add font loading strategy */}
        <style jsx global>{`
          @font-face {
            font-family: "Your-Font";
            font-style: normal;
            font-weight: 400;
            font-display: swap; /* Use swap for better text visibility during loading */
            src: url("/fonts/your-font.woff2") format("woff2");
          }

          /* Add content-visibility for offscreen content */
          section {
            content-visibility: auto;
          }

          /* Add image rendering optimizations */
          img {
            image-rendering: auto;
          }

          /* Add will-change hints for animations */
          .animated {
            will-change: transform, opacity;
          }
        `}</style>
      </div>
    </>
  );
}
