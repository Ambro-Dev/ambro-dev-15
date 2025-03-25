"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { SectionHeading } from "@/components/ambro-ui/section-heading";
import { TiltCard } from "@/components/ambro-ui/tilt-card";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { SerializableService } from "@/lib/service-utils";

// Dynamiczny import komponentu ikony
const ServiceIcon = dynamic(
  () => import("@/components/services/service-icon"),
  {
    loading: () => (
      <div className="w-5 h-5 bg-gray-800/50 rounded-full animate-pulse" />
    ),
  }
);

interface RelatedServicesSectionProps {
  relatedServices: SerializableService[];
  primaryColor: string;
  secondaryColor: string;
}

export default function RelatedServicesSection({
  relatedServices,
  primaryColor,
  secondaryColor,
}: RelatedServicesSectionProps) {
  if (relatedServices.length === 0) {
    return null;
  }

  return (
    <section className="mb-16">
      <AnimatedSection animation="fadeIn">
        <SectionHeading
          title="Podobne usługi"
          subtitle="Inne rozwiązania, które mogą Cię zainteresować"
          alignment="left"
          size="lg"
          gradient
          gradientFrom={primaryColor}
          gradientTo={secondaryColor}
          animation="slide"
        />

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {relatedServices.map((relService) => (
            <motion.div
              key={relService.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href={`/uslugi/${relService.id}`}
                className="block h-full"
                aria-label={`Przejdź do usługi: ${relService.title}`}
              >
                <TiltCard
                  className="h-full"
                  tiltAmount={5}
                  glareOpacity={0.1}
                  borderGlow={false}
                  backgroundEffect="gradient"
                >
                  <div className="p-6 h-full">
                    <div className="flex items-center mb-4">
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${relService.color} flex items-center justify-center mr-3`}
                        aria-hidden="true"
                      >
                        <Suspense
                          fallback={
                            <div className="w-5 h-5 bg-gray-800/50 rounded-full animate-pulse" />
                          }
                        >
                          <ServiceIcon
                            serviceId={relService.id}
                            size={5}
                            color="indigo"
                          />
                        </Suspense>
                      </div>
                      <h3 className="text-lg font-semibold">
                        {relService.title}
                      </h3>
                    </div>
                    <p className="text-gray-400 text-sm">
                      {relService.description}
                    </p>
                  </div>
                </TiltCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
