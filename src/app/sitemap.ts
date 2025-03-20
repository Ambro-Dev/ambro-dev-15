// src/app/sitemap.ts
// Dodanie mapy witryny dla lepszej indeksacji

import { serviceCategories } from "@/lib/services";
import { MetadataRoute } from "next";
import { projekty } from "@/data/projekty"; // Zakładam, że dane projektów są eksportowane

// Dane przykładowych wpisów bloga (docelowo pobierane z CMS/API)
const blogPosts = [
  {
    slug: "nowoczesne-technologie-webowe",
    date: "2023-04-15",
    title: "Nowoczesne technologie webowe",
  },
  {
    slug: "najlepsze-praktyki-ux-ui",
    date: "2023-05-20",
    title: "Najlepsze praktyki UX/UI",
  },
  {
    slug: "trendy-w-rozwoju-stron-www",
    date: "2023-06-10",
    title: "Trendy w rozwoju stron WWW",
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ambro.dev";

  // Główne strony
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/o-mnie`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/projekty`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/uslugi`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/cennik`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/kontakt`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), priority: 0.8 },
  ];

  // Strony usług
  const servicePages = serviceCategories.map((service) => ({
    url: `${baseUrl}/uslugi/${service.id}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  // Strony projektów
  const projectPages = projekty.map((project: { id: string }) => ({
    url: `${baseUrl}/projekty/${project.id}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  // Strony bloga (w rzeczywistej aplikacji pobierane dynamicznie z CMS/API)
  const blogPages = blogPosts.map((post: { slug: string; date: string }) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...projectPages, ...blogPages];
}
