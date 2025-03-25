"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import CTA component
const ServiceCTA = dynamic(() => import("@/components/service-cta"), {
  loading: () => (
    <div className="h-40 w-full bg-gray-800/20 animate-pulse rounded-lg" />
  ),
});

interface ServiceCTASectionProps {
  serviceName: string;
  primaryColor: string;
  secondaryColor: string;
}

export default function ServiceCTASection({
  serviceName,
  primaryColor,
  secondaryColor,
}: ServiceCTASectionProps) {
  return (
    <section className="mb-24">
      <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-2xl p-1 shadow-xl">
        <div className="bg-gradient-to-br from-gray-900/70 to-black/90 rounded-xl backdrop-blur-sm">
          <Suspense
            fallback={
              <div className="h-40 w-full bg-gray-800/20 animate-pulse rounded-lg" />
            }
          >
            <ServiceCTA
              serviceName={serviceName}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
