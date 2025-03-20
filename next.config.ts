import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  // Optymalizacja obrazów
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ambro.dev",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24, // 24 godziny
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  experimental: {
    mdxRs: true,
    optimizeCss: true,
    optimizePackageImports: [
      "framer-motion",
      "lodash",
      "lucide-react",
      "react-intersection-observer",
      "three",
      "@react-three/drei",
      "recharts",
    ],
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },
};

const withMDX = createMDX({
  // Opcje MDX
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // Możesz dodać więcej pluginów MDX tutaj
  },
});

export default withMDX(nextConfig);
