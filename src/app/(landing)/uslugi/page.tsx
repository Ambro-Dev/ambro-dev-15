// src/app/uslugi/page.tsx
import { serviceCategories } from "@/lib/services";
import ServicesPageClient from "@/components/services/services-page-client";
import { Suspense } from "react";
import { constructMetadata } from "@/lib/metadata";
import {
  prepareSerializableService,
  type SerializableService,
} from "@/lib/service-utils";
import ServicesPageLoading from "@/components/services/services-page-loading";

export const metadata = constructMetadata({
  title: "Usługi IT i DevOps | Nowoczesne rozwiązania technologiczne",
  description:
    "Kompleksowe usługi technologiczne - od konfiguracji i zarządzania infrastrukturą chmurową, automatyzację procesów IT, po tworzenie aplikacji webowych.",
  keywords: [
    "DevOps",
    "usługi IT",
    "automatyzacja",
    "infrastruktura chmurowa",
    "aplikacje webowe",
    "fullstack development",
    "CI/CD",
    "Terraform",
    "Kubernetes",
    "Next.js",
  ],
  canonical: "https://ambro.dev/uslugi",
  image: "/images/services/og-services.jpg",
});

export default function ServicesPage() {
  // Prepare all services in a single pass to avoid staggered data processing
  const services = serviceCategories
    .map(prepareSerializableService)
    .filter(Boolean) as SerializableService[];

  // Filter the prepared services into categories
  const devopsServices = services.filter(
    (service) => service.id !== "webapps" && service.id !== "architecture"
  );

  const fullstackServices = services.filter(
    (service) => service.id === "webapps" || service.id === "architecture"
  );

  // Render with a single suspense boundary for everything
  return (
    <Suspense fallback={<ServicesPageLoading />}>
      <ServicesPageClient
        devopsServices={devopsServices}
        fullstackServices={fullstackServices}
      />
    </Suspense>
  );
}
