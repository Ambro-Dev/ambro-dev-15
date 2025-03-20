import type { Metadata } from "next";

// Define the metadata for the landing page route group
export const metadata: Metadata = {
  title: {
    template: "%s | Ambro-Dev",
    default: "Ambro-Dev - DevOps, Automatyzacja Procesów IT",
  },
  description:
    "Kompleksowe usługi DevOps, automatyzacja procesów IT, administracja infrastrukturą oraz tworzenie nowoczesnych aplikacji webowych.",
  keywords: [
    "devops",
    "automatyzacja",
    "aplikacje webowe",
    "CI/CD",
    "infrastruktura IT",
  ],
  openGraph: {
    title: "Ambro-Dev - DevOps i Automatyzacja",
    description:
      "Kompleksowe usługi DevOps, automatyzacja procesów IT, administracja infrastrukturą oraz tworzenie nowoczesnych aplikacji webowych.",
    url: "https://ambro-dev.pl",
    siteName: "Ambro-Dev",
    locale: "pl_PL",
    type: "website",
  },
};
