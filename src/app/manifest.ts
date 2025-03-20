// src/app/manifest.ts
// Dodanie pliku manifestu do obsługi PWA

import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ambro-Dev | DevOps & FullStack Development",
    short_name: "Ambro-Dev",
    description: "Profesjonalne usługi DevOps i FullStack Development",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#4F46E5", // Indigo-600
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-192-maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
