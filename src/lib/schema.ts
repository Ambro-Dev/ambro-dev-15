// Centralizacja i standaryzacja danych strukturalnych (JSON-LD)

import { siteConfig } from "./metadata";

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ambro-Dev",
    url: siteConfig.url,
    jobTitle: "DevOps & FullStack Developer",
    sameAs: [
      `https://github.com/${siteConfig.github}`,
      `https://twitter.com/${siteConfig.twitter}`,
      `https://linkedin.com/in/${siteConfig.linkedin}`,
    ],
    knowsAbout: [
      "DevOps",
      "Cloud Infrastructure",
      "AWS",
      "Kubernetes",
      "Docker",
      "CI/CD",
      "React",
      "Next.js",
      "TypeScript",
    ],
    image: `${siteConfig.url}/images/ambro-profile.jpg`,
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      "@type": "Person",
      name: "Ambro-Dev",
      url: siteConfig.url,
    },
    image: service.image,
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateProjectSchema(project: {
  name: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  technologies: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.description,
    url: project.url,
    image: project.image,
    datePublished: project.datePublished,
    applicationCategory: "WebApplication",
    operatingSystem: "All",
    author: {
      "@type": "Person",
      name: "Ambro-Dev",
      url: siteConfig.url,
    },
    keywords: project.technologies.join(", "),
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.webp`,
    sameAs: [
      `https://github.com/${siteConfig.github}`,
      `https://twitter.com/${siteConfig.twitter}`,
      `https://linkedin.com/in/${siteConfig.linkedin}`,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+48123456789",
      email: "kontakt@ambro.dev",
      contactType: "customer service",
    },
  };
}
