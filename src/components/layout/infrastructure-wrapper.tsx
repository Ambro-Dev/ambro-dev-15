"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { InfrastructureLoading } from "@/app/loading-states";

// Move the dynamic import with ssr: false to a client component
const InfrastructureConcept = dynamic(
  () => import("@/components/infrastructure/InfrastructureConcept"),
  {
    loading: () => <InfrastructureLoading />,
    ssr: false, // This is allowed in a client component
  }
);

export default function InfrastructureWrapper() {
  return (
    <Suspense fallback={<InfrastructureLoading />}>
      <InfrastructureConcept />
    </Suspense>
  );
}
