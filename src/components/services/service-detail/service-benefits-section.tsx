"use client";

import { Suspense } from "react";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { SectionHeading } from "@/components/ambro-ui/section-heading";
import { Card3D } from "@/components/ambro-ui/card-3d";
import dynamic from "next/dynamic";
import ServiceSectionSkeleton from "./service-section-skeleton";
import { ErrorBoundary } from "./error-boundary";

// Dynamically import heavy components with loading fallbacks
const ServiceBenefitsChart = dynamic(
  () => import("@/components/services/service-benefits-chart"),
  {
    loading: () => <ServiceSectionSkeleton />,
  }
);

interface ServiceBenefitsSectionProps {
  serviceId: string;
  primaryColor: string;
  secondaryColor: string;
}

export default function ServiceBenefitsSection({
  serviceId,
  primaryColor,
  secondaryColor,
}: ServiceBenefitsSectionProps) {
  return (
    <section className="mb-20">
      <AnimatedSection animation="fadeIn">
        <SectionHeading
          title="Korzyści dla biznesu"
          subtitle="Jakie wartości zyskuje Twoja firma"
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
            borderColor={`border-${primaryColor}-500/20`}
            className="rounded-xl overflow-hidden"
          >
            <Suspense fallback={<ServiceSectionSkeleton />}>
              <ErrorBoundary>
                <ServiceBenefitsChart
                  serviceId={serviceId}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                />
              </ErrorBoundary>
            </Suspense>
          </Card3D>
        </div>
      </AnimatedSection>
    </section>
  );
}
