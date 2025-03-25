"use client";

import { Suspense } from "react";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { SectionHeading } from "@/components/ambro-ui/section-heading";
import { Card3D } from "@/components/ambro-ui/card-3d";
import dynamic from "next/dynamic";
import ServiceSectionSkeleton from "./service-section-skeleton";

// Dynamically import heavy components with loading fallbacks
const ServiceComparisonTable = dynamic(
  () => import("@/components/services/service-comparison-table"),
  {
    loading: () => <ServiceSectionSkeleton />,
  }
);

interface ServiceComparisonSectionProps {
  serviceId: string;
  primaryColor: string;
  secondaryColor: string;
}

export default function ServiceComparisonSection({
  serviceId,
  primaryColor,
  secondaryColor,
}: ServiceComparisonSectionProps) {
  return (
    <section className="mb-24">
      <AnimatedSection animation="fadeIn">
        <SectionHeading
          title="Porównanie rozwiązań"
          subtitle="Dlaczego warto wybrać moje usługi"
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
            shadow
            bgColor="bg-gray-900/40"
            borderColor={`border-${primaryColor}-500/10`}
            className="rounded-xl"
          >
            <Suspense fallback={<ServiceSectionSkeleton />}>
              <ServiceComparisonTable
                serviceId={serviceId}
                primaryColor={primaryColor}
              />
            </Suspense>
          </Card3D>
        </div>
      </AnimatedSection>
    </section>
  );
}
