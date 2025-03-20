// src/app/cennik/page.tsx

import { Suspense } from "react";

// Komponenty ładowania
import PricingPageSkeleton from "@/components/pricing/pricing-page-skeleton";
import PricingPageContent from "@/components/pricing/pricing-page-content";

export default function PricingPage() {
  return (
    <>
      {/* Główna zawartość strony w granicy Suspense */}
      <Suspense fallback={<PricingPageSkeleton />}>
        <PricingPageContent />
      </Suspense>
    </>
  );
}
