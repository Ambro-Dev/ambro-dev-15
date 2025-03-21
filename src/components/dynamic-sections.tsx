"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import {
  ProjectsLoading,
  TestimonialsLoading,
  TechStackLoading,
  CTALoading,
} from "@/app/loading-states";

// Dynamically import with ssr: false in the client component
const ProjectsSection = dynamic(
  () => import("@/components/layout/projects-section"),
  {
    loading: () => <ProjectsLoading />,
    ssr: false,
  }
);

const TestimonialsSection = dynamic(
  () => import("@/components/layout/testimonials-section"),
  {
    loading: () => <TestimonialsLoading />,
    ssr: false,
  }
);

const CTASection = dynamic(() => import("@/components/layout/cta-section"), {
  loading: () => <CTALoading />,
  ssr: false,
});

const TechStackSection = dynamic(
  () => import("@/components/layout/tech-stack-section"),
  {
    loading: () => <TechStackLoading />,
    ssr: false,
  }
);

// Lazy load infrastructure with lowest priority
const InfrastructureWrapper = dynamic(
  () => import("@/components/layout/infrastructure-wrapper"),
  {
    ssr: false,
    loading: () => <div className="h-[300px] flex items-center justify-center">Ładowanie sekcji infrastruktury...</div>
  }
);

// Client components to wrap the dynamic imports
export function DynamicProjects({ projects }: { projects: any[] }) {
  return <ProjectsSection projects={projects} />;
}

export function DynamicTestimonials({ testimonials }: { testimonials: any[] }) {
  return <TestimonialsSection testimonials={testimonials} />;
}

export function DynamicTechStack() {
  return <TechStackSection />;
}

export function DynamicCTA() {
  return <CTASection />;
}

export function DynamicInfrastructure() {
  return (
    <Suspense fallback={<div className="h-[300px] flex items-center justify-center">Ładowanie sekcji infrastruktury...</div>}>
      <InfrastructureWrapper />
    </Suspense>
  );
} 