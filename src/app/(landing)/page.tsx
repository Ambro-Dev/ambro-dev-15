import { Suspense } from "react";
import ServicesSection from "@/components/layout/services-section";
import { getProjects, getTestimonials } from "@/lib/data";
import { constructMetadata } from "@/lib/metadata";
import TestimonialsSection from "@/components/layout/testimonials-section";
import {
  ProjectsLoading,
  TestimonialsLoading,
  CTALoading,
} from "@/app/loading-states";
import { cache } from "react";
import dynamic from "next/dynamic";
import { SmoothScroll } from "@/components/ambro-ui/smooth-scroll";
import InfrastructureWrapper from "@/components/layout/infrastructure-wrapper";
import GlobalStylesComponent from "@/components/global-styles-component";

// Directly import HeroSection for immediate loading
import HeroSection from "@/components/layout/hero-section";

// Dynamically import heavyweight components with optimized loading states
const ProjectsSection = dynamic(
  () => import("@/components/layout/projects-section"),
  {
    loading: () => <ProjectsLoading />,
    ssr: true,
  }
);

const CTASection = dynamic(() => import("@/components/layout/cta-section"), {
  loading: () => <CTALoading />,
  ssr: true,
});

// Metadata configuration
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

// Optimized data fetching with parallel loading
const getData = cache(async () => {
  try {
    const [projects, testimonials] = await Promise.all([
      getProjects(),
      getTestimonials(),
    ]);
    return { projects, testimonials };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { projects: [], testimonials: [] };
  }
});

// Server Components for data fetching
async function ProjectsData() {
  const { projects } = await getData();

  if (!projects || projects.length === 0) {
    return (
      <div className="py-16 text-center text-gray-400">
        Failed to load projects. Please try again later.
      </div>
    );
  }

  return <ProjectsSection projects={projects} />;
}

async function TestimonialsData() {
  const { testimonials } = await getData();

  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="py-16 text-center text-gray-400">
        Failed to load testimonials. Please try again later.
      </div>
    );
  }

  return <TestimonialsSection testimonials={testimonials} />;
}

// Schema generation
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
        "Kompleksowe usługi DevOps, automatyzacja procesów IT, administracja serwerami, tworzenie aplikacje webowe i optymalizacja infrastruktury.",
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
  // Use a unique key to force rerender on navigation
  const pageKey = `home-${Date.now()}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateHomeSchema()),
        }}
      />
      <main
        className="min-h-screen text-white relative overflow-hidden"
        key={pageKey}
      >
        {/* Global background elements for cohesive design */}
        <div className="fixed inset-0 -z-10 bg-black">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/5 via-transparent to-transparent opacity-40" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5/10_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5/10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-10" />
        </div>

        <SmoothScroll>
          {/* Critical content - loaded immediately with direct import */}
          <HeroSection />

          {/* Main content sections with consistent spacing and styling */}
          <div>
            {/* Services Section - subtle gradient from hero to services */}
            <div className="bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
              <ServicesSection />
            </div>

            {/* Infrastructure Section - complementary gradient to services */}
            <div className="bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
              <InfrastructureWrapper />
            </div>

            {/* Projects Section - similar color scheme but different pattern */}
            <div className="bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
              <Suspense fallback={<ProjectsLoading />}>
                <ProjectsData />
              </Suspense>
            </div>

            {/* Testimonials Section - darker gradient for contrast */}
            <div className="bg-gradient-to-b from-black via-gray-900/80 to-black relative overflow-hidden">
              <Suspense fallback={<TestimonialsLoading />}>
                <TestimonialsData />
              </Suspense>
            </div>

            {/* CTA Section - strong black background for emphasis */}
            <div className="bg-black relative overflow-hidden">
              <CTASection />
            </div>
          </div>
        </SmoothScroll>

        {/* Replace styled-jsx with a client component */}
        <GlobalStylesComponent />
      </main>
    </>
  );
}
