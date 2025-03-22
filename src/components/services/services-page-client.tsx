"use client";

import { useEffect } from "react";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { SectionHeading } from "@/components/ambro-ui/section-heading";
import { SectionDivider } from "@/components/ambro-ui/section-divider";
import { EnhancedButton } from "@/components/ambro-ui/enhanced-button";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import type { SerializableService } from "@/lib/service-utils";

// Dynamically import heavy components with a simpler loading state
const ServicesGrid = dynamic(
  () => import("@/components/services/services-grid"),
  {
    loading: () => <ServiceGridSkeleton />,
    ssr: false, // Prevent SSR to improve initial loading
  }
);

// Simplified skeleton loader with design that matches our new service icons
function ServiceGridSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((item) => (
        <div
          key={`skeleton-${item}`}
          className="h-72 border border-gray-800/40 bg-gray-900/30 rounded-lg overflow-hidden"
        >
          <div className="p-8">
            {/* Icon skeleton */}
            <div className="h-16 w-16 mb-5 flex items-center justify-center">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 animate-pulse" />
            </div>

            {/* Title skeleton */}
            <div className="h-7 w-44 bg-gray-800/50 rounded-md mb-3 animate-pulse" />

            {/* Description skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-800/30 rounded-md animate-pulse" />
              <div className="h-4 w-5/6 bg-gray-800/30 rounded-md animate-pulse" />
              <div className="h-4 w-4/6 bg-gray-800/30 rounded-md animate-pulse" />
            </div>

            {/* Tags skeleton */}
            <div className="mt-6 pt-4 border-t border-gray-800/50 flex gap-2">
              <div className="h-6 w-16 bg-indigo-900/30 rounded-md animate-pulse" />
              <div className="h-6 w-16 bg-indigo-900/30 rounded-md animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Props for the client component
interface ServicesPageClientProps {
  devopsServices: SerializableService[];
  fullstackServices: SerializableService[];
}

export default function ServicesPageClient({
  devopsServices,
  fullstackServices,
}: ServicesPageClientProps) {
  // Register view event for analytics on page load
  useEffect(() => {
    // Analytics tracking
    if (typeof window !== "undefined") {
      // Track page view, if you have analytics set up
      try {
        console.log("Services page viewed");
      } catch (error) {
        console.error("Analytics error", error);
      }
    }
  }, []);

  return (
    <main className="min-h-screen  text-white relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="fixed inset-0 w-full h-full bg-grid-pattern opacity-3 pointer-events-none" />

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: [
              ...devopsServices.map((service, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Service",
                  name: service.title,
                  description: service.description,
                  url: `https://ambro.dev/uslugi/${service.id}`,
                },
              })),
              ...fullstackServices.map((service, index) => ({
                "@type": "ListItem",
                position: devopsServices.length + index + 1,
                item: {
                  "@type": "Service",
                  name: service.title,
                  description: service.description,
                  url: `https://ambro.dev/uslugi/${service.id}`,
                },
              })),
            ],
          }),
        }}
      />

      {/* Header Section - reduced animation delays */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fadeIn" delay={0.05}>
            <div className="text-center">
              <Link href="/" className="inline-block mb-10">
                <EnhancedButton
                  variant="outline"
                  size="sm"
                  className="border-gray-800 hover:border-indigo-500 transition-colors duration-300 bg-opacity-50"
                >
                  ← Powrót do strony głównej
                </EnhancedButton>
              </Link>

              <SectionHeading
                title="Usługi"
                subtitle="Kompleksowe rozwiązania technologiczne dla Twojego biznesu"
                alignment="center"
                size="xl"
                gradient
                animation="fade"
                className="max-w-2xl mx-auto"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeIn" delay={0.1}>
            <div className="mt-10 text-center">
              <p className="text-gray-300 max-w-3xl mx-auto">
                Oferuję szeroki zakres usług technologicznych - od konfiguracji
                i zarządzania infrastrukturą chmurową, przez automatyzację
                procesów IT, aż po tworzenie nowoczesnych aplikacji webowych.
                Wszystkie rozwiązania są projektowane z myślą o długoterminowym
                rozwoju Twojego biznesu.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* DevOps Services Section - reduced animation delay */}
      <section
        aria-labelledby="devops-heading"
        className="py-20 px-6"
        id="devops-services"
      >
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fadeIn" delay={0}>
            <SectionHeading
              title="Usługi DevOps"
              subtitle="Automatyzacja, wydajność, skalowalność"
              alignment="left"
              size="lg"
              gradientFrom="indigo-500"
              gradientTo="blue-500"
              animation="fade"
            />

            <div className="mt-10">
              <Suspense fallback={<ServiceGridSkeleton />}>
                <ServicesGrid services={devopsServices} />
              </Suspense>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <SectionDivider
        className="max-w-6xl mx-auto"
        variant="tech"
        dotColor="bg-indigo-500"
        text="Rozwiązania dopasowane do potrzeb"
      />

      {/* Fullstack Services Section - reduced animation delay */}
      <section
        aria-labelledby="fullstack-heading"
        className="py-20 px-6"
        id="fullstack-services"
      >
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fadeIn" delay={0}>
            <SectionHeading
              title="Usługi Fullstack"
              subtitle="Nowoczesne aplikacje i architektura"
              alignment="left"
              size="lg"
              gradientFrom="purple-500"
              gradientTo="pink-500"
              animation="fade"
            />

            <div className="mt-10">
              <Suspense fallback={<ServiceGridSkeleton />}>
                <ServicesGrid services={fullstackServices} />
              </Suspense>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Process Section - simpler animation */}
      <section className="py-24 px-6 mb-24">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fadeIn" delay={0}>
            <div className="text-center mb-16">
              <SectionHeading
                title="Proces współpracy"
                subtitle="Jak przebiegają projekty?"
                alignment="center"
                size="lg"
                gradient
                animation="fade"
              />
            </div>

            <div className="bg-gray-900/20 rounded-xl backdrop-blur-sm border border-gray-800/30 p-10">
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  {
                    step: "01",
                    title: "Konsultacja",
                    description:
                      "Dokładna analiza potrzeb i wymagań Twojego projektu",
                  },
                  {
                    step: "02",
                    title: "Propozycja",
                    description:
                      "Przygotowanie szczegółowej propozycji rozwiązania",
                  },
                  {
                    step: "03",
                    title: "Realizacja",
                    description:
                      "Implementacja rozwiązania z regularnymi aktualizacjami",
                  },
                  {
                    step: "04",
                    title: "Wsparcie",
                    description:
                      "Długoterminowe wsparcie i rozwój wdrożonego rozwiązania",
                  },
                ].map((item, index) => (
                  <div
                    key={`process-${index}`}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="h-14 w-14 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mb-5">
                      <span className="text-xl text-indigo-400">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Call to action - simple animation */}
      <section className="py-32 px-6 text-center bg-gradient-to-b from-slate-900 to-black">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fadeIn" delay={0}>
            <SectionHeading
              title="Gotowy na współpracę?"
              subtitle="Skontaktuj się ze mną i opowiedz o swoim projekcie"
              alignment="center"
              size="lg"
              gradient
              animation="fade"
            />
            <div className="mt-10">
              <Link href="/kontakt">
                <EnhancedButton variant="primary" size="lg" className="mx-auto">
                  Skontaktuj się ze mną
                </EnhancedButton>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CSS for grid pattern */}
      <style jsx global>{`
        .bg-grid-pattern {
          background-image: linear-gradient(
              rgba(99, 102, 241, 0.02) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(99, 102, 241, 0.02) 1px,
              transparent 1px
            );
          background-size: 50px 50px;
        }
      `}</style>
    </main>
  );
}
