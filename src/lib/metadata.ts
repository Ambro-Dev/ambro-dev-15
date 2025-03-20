// src/lib/metadata.ts
// Centralizacja i standaryzacja metadanych dla lepszej spójności SEO

export const siteConfig = {
  name: "Ambro-Dev",
  url: "https://ambro.dev",
  ogImage: "/images/og/default-og.jpg",
  description:
    "Profesjonalne usługi DevOps i FullStack Development. Automatyzacja, chmura, CI/CD, aplikacje webowe.",
  locale: "pl_PL",
  twitter: "@ambrodev",
  github: "Ambro-Dev",
  linkedin: "ambro-dev",
};

export type MetadataProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  canonical?: string;
  noIndex?: boolean;
};

/**
 * Generuje spójne metadane dla wszystkich stron
 */
export function constructMetadata({
  title,
  description,
  keywords = [],
  image,
  canonical,
  noIndex,
}: MetadataProps = {}) {
  return {
    title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
    description: description || siteConfig.description,
    keywords: [
      "DevOps",
      "FullStack Developer",
      "automatyzacja",
      "infrastruktura",
      "CI/CD",
      "AWS",
      "Kubernetes",
      "Docker",
      "React",
      "Next.js",
      "TypeScript",
      "Terraform",
      ...keywords,
    ],
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      url: canonical || siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: image || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      images: [image || siteConfig.ogImage],
      creator: siteConfig.twitter,
    },
    alternates: {
      canonical: canonical || siteConfig.url,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
