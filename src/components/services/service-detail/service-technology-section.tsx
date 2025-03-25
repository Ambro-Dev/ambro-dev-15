"use client";

import { Suspense } from "react";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { SectionHeading } from "@/components/ambro-ui/section-heading";
import { Card3D } from "@/components/ambro-ui/card-3d";
import dynamic from "next/dynamic";
import ServiceSectionSkeleton from "./service-section-skeleton";

// Dynamically import heavy components with loading fallbacks
const ServiceTechStack = dynamic(
  () => import("@/components/services/service-tech-stack"),
  {
    loading: () => <ServiceSectionSkeleton />,
  }
);

interface ServiceTechnologySectionProps {
  technologies: string[];
  primaryColor: string;
  secondaryColor: string;
}

export default function ServiceTechnologySection({
  technologies,
  primaryColor,
  secondaryColor,
}: ServiceTechnologySectionProps) {
  return (
    <section className="mb-20">
      <AnimatedSection animation="fadeIn">
        <SectionHeading
          title="Technologie"
          subtitle="Narzędzia i platformy wykorzystywane w usłudze"
          alignment="left"
          size="lg"
          gradient
          gradientFrom={primaryColor}
          gradientTo={secondaryColor}
          animation="slide"
        />

        <div className="mt-12">
          <Card3D
            interactive={false}
            hoverEffect="none"
            glowEffect
            glowColor={`rgba(${
              primaryColor === "indigo"
                ? "99, 102, 241"
                : primaryColor === "emerald"
                ? "16, 185, 129"
                : primaryColor === "blue"
                ? "59, 130, 246"
                : primaryColor === "purple"
                ? "139, 92, 246"
                : primaryColor === "sky"
                ? "14, 165, 233"
                : primaryColor === "amber"
                ? "245, 158, 11"
                : primaryColor === "pink"
                ? "236, 72, 153"
                : "99, 102, 241"
            }, 0.3)`}
            shadow
            bgColor="bg-gray-900/40"
            borderColor={`border-${primaryColor}-500/10`}
            className="rounded-xl"
          >
            <Suspense fallback={<ServiceSectionSkeleton />}>
              <ServiceTechStack
                technologies={technologies}
                primaryColor={primaryColor}
              />
            </Suspense>
          </Card3D>
        </div>
      </AnimatedSection>
    </section>
  );
}
