"use client";

import dynamic from "next/dynamic";

// Dynamically import the PerformanceOptimizer with ssr: false
const PerformanceOptimizer = dynamic(
  () => import("@/components/performance-optimization"),
  { ssr: false }
);

export function PerformanceOptimizerWrapper() {
  return <PerformanceOptimizer />;
} 