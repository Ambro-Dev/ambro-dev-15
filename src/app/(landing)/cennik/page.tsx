// src/app/cennik/page.tsx

import { Suspense } from "react";
import { headers } from "next/headers";

// Komponenty ładowania
import PricingPageSkeleton from "@/components/pricing/pricing-page-skeleton";
import PricingPageContent from "@/components/pricing/pricing-page-content";

// Preload key components
import dynamic from "next/dynamic";

// Preload critical UI components to reduce staggering
const SectionHeading = dynamic(
  () =>
    import("@/components/ambro-ui/section-heading").then(
      (mod) => mod.SectionHeading
    ),
  {
    ssr: true,
    loading: () => (
      <div className="h-12 w-64 bg-gray-800 rounded-md animate-pulse"></div>
    ),
  }
);

const Card3D = dynamic(
  () => import("@/components/ambro-ui/card-3d").then((mod) => mod.Card3D),
  { ssr: true }
);
const GradientText = dynamic(
  () =>
    import("@/components/ambro-ui/gradient-text").then(
      (mod) => mod.GradientText
    ),
  { ssr: true }
);
const AnimatedSection = dynamic(
  () =>
    import("@/components/ambro-ui/animated-section").then(
      (mod) => mod.AnimatedSection
    ),
  { ssr: true }
);

export default function PricingPage() {
  // Force header evaluation to activate caching
  headers();

  return (
    <>
      {/* Preload critical components */}
      <div className="hidden">
        <SectionHeading title="Preload" />
        <Card3D>Preload</Card3D>
        <GradientText from="indigo-600" to="purple-600">
          Preload
        </GradientText>
        <AnimatedSection>Preload</AnimatedSection>
      </div>

      {/* Główna zawartość strony w granicy Suspense */}
      <Suspense fallback={<PricingPageSkeleton />}>
        <PricingPageContent />
      </Suspense>
    </>
  );
}
