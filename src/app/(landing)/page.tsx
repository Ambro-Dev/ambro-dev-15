import { Suspense } from "react";
import HeroSection from "@/components/layout/hero-section";
import AboutMeSection from "@/components/layout/about-section";
import ServicesSection from "@/components/layout/services-section";
import { getProjects, getTestimonials } from "@/lib/data"; // Funkcje do pobrania danych
import { constructMetadata } from "@/lib/metadata";

// Import optimized loading states
import {
  ProjectsLoading,
  TestimonialsLoading,
  TechStackLoading,
  CTALoading,
} from "@/app/loading-states";

// Import for server components and data fetching
import { cache } from "react";

// Import client component wrappers
import {
  DynamicProjects,
  DynamicTestimonials,
  DynamicTechStack,
  DynamicCTA,
  DynamicInfrastructure
} from "@/components/dynamic-sections";

// Dodatkowe metadane dla strony głównej
export const metadata = constructMetadata({
  title: "Ambro-Dev - DevOps, Automatyzacja, Aplikacje Webowe",
  description:
    "Kompleksowe usługi DevOps, automatyzacja procesów IT, administracja serwerami, tworzenie aplikacji webowych i optymalizacja infrastruktury.",
  keywords: [
    "DevOps",
    "automatyzacja",
    "aplikacje webowe",
    "chmura",
    "AWS",
    "infrastruktura IT",
    "monitoring",
    "CI/CD",
  ],
});

// Cache the data fetching to improve performance
const getProjectsData = cache(async () => {
  try {
    return await getProjects();
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
});

const getTestimonialsData = cache(async () => {
  try {
    return await getTestimonials();
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
});

// Asynchroniczna funkcja do pobrania projektów (Server Component) z optymalizacją cache
async function ProjectsData() {
  try {
    // Pobierz projekty z cache
    const projects = await getProjectsData();

    if (!projects || projects.length === 0) {
      return (
        <div className="py-16 text-center">
          Failed to load projects. Please try again later.
        </div>
      );
    }

    return <DynamicProjects projects={projects} />;
  } catch (error) {
    console.error("Error rendering projects:", error);
    return (
      <div className="py-16 text-center">
        Failed to load projects. Please try again later.
      </div>
    );
  }
}

// Asynchroniczna funkcja do pobrania opinii (Server Component) z optymalizacją cache
async function TestimonialsData() {
  try {
    // Pobierz opinie z cache
    const testimonials = await getTestimonialsData();

    if (!testimonials || testimonials.length === 0) {
      return (
        <div className="py-16 text-center">
          Failed to load testimonials. Please try again later.
        </div>
      );
    }

    return <DynamicTestimonials testimonials={testimonials} />;
  } catch (error) {
    console.error("Error rendering testimonials:", error);
    return (
      <div className="py-16 text-center">
        Failed to load testimonials. Please try again later.
      </div>
    );
  }
}

function generateHomeSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Ambro-Dev - DevOps, Automatyzacja, Aplikacje Webowe",
    description:
      "Kompleksowe usługi DevOps, automatyzacja procesów IT, administracja serwerami, tworzenie aplikacji webowych i optymalizacja infrastruktury.",
    mainEntity: {
      "@type": "ProfessionalService",
      name: "Ambro-Dev",
      description:
        "Kompleksowe usługi DevOps, automatyzacja procesów IT, administracja serwerami, tworzenie aplikacji webowych i optymalizacja infrastruktury.",
      image: "/logo.webp",
      telephone: "+48123456789",
      email: "kontakt@ambro-dev.pl",
      address: {
        "@type": "PostalAddress",
        addressCountry: "PL",
      },
      priceRange: "$$",
      openingHours: "Mo-Fr 09:00-17:00",
      serviceType: [
        "DevOps",
        "Cloud Migration",
        "Web Development",
        "IT Automation",
      ],
    },
  };
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateHomeSchema()),
        }}
      />
      <main className="min-h-screen text-white relative overflow-hidden md:pt-0 pt-28">
        <div>
          {/* Critical initial content - preloaded */}
          <HeroSection />
          <AboutMeSection />
          <ServicesSection />

          {/* Deferred loading of heavy infrastructure section */}
          <DynamicInfrastructure />

          {/* Progressive loading of sections below the fold */}
          <Suspense fallback={<ProjectsLoading />}>
            <ProjectsData />
          </Suspense>

          <Suspense fallback={<TechStackLoading />}>
            <DynamicTechStack />
          </Suspense>

          <Suspense fallback={<TestimonialsLoading />}>
            <TestimonialsData />
          </Suspense>

          <Suspense fallback={<CTALoading />}>
            <DynamicCTA />
          </Suspense>
        </div>
      </main>
    </>
  );
}
