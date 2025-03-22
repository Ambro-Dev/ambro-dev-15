// src/app/o-mnie/page.tsx
"use client";

import dynamic from "next/dynamic";
import { TechStackLoading } from "@/app/loading-states";
import CTASection from "@/components/layout/cta-section";

// Importowanie komponentów
import { Header } from "@/components/about/Header";
import { UserProfile } from "@/components/about/UserProfile";
import { Biography } from "@/components/about/Biography";
import { CVTabs } from "@/components/about/cv/CVTabs";

const TechStackSection = dynamic(
  () => import("@/components/layout/tech-stack-section"),
  {
    loading: () => <TechStackLoading />,
    ssr: false,
  }
);

// Since this is a client component, we need a separate file for metadata
// This will be handled in a metadata.ts file in the same directory

export default function AboutPage() {
  return (
    <main className="min-h-screen  text-white relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="fixed inset-0 w-full h-full bg-grid-pattern opacity-3 pointer-events-none" />
      {/* Header Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Header />

          {/* Profile Section */}
          <div className="mt-16 grid md:grid-cols-5 gap-12">
            <UserProfile />
            <Biography />
          </div>
        </div>
      </section>
      {/* CV Section */}
      <CVTabs />
      <TechStackSection />
      {/* CTA Section */}
      <CTASection />
    </main>
  );
}
