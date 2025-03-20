"use client";

import React, { useState, useRef, useEffect } from "react";
import { SectionHeading } from "@/components/ambro-ui/section-heading";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { ShuffleText } from "@/components/ambro-ui/shuffle-text";
import { ViewSelector } from "@/components/infrastructure/ViewSelector";
import { CallToAction } from "@/components/infrastructure/CallToAction";
import { OverviewSection } from "@/components/infrastructure/views/OverviewSection";
import { LayersSection } from "@/components/infrastructure/views/LayersSection";
import { BenefitsSection } from "@/components/infrastructure/views/BenefitsSection";
import { CaseStudiesSection } from "@/components/infrastructure/views/CaseStudiesSection";
import { FaqSection } from "@/components/infrastructure/views/FaqSection";
import { ViewMode } from "@/types/infrastructure";

const InfrastructureConcept: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("overview");
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle view mode change
  const handleViewChange = (mode: ViewMode) => {
    setViewMode(mode);

    // Reset scroll position
    window.scrollTo({
      top: containerRef.current?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const offset = containerRef.current?.offsetTop || 0;
      setIsScrolled(scrollPosition > offset + 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Render active view based on viewMode
  const renderActiveView = () => {
    switch (viewMode) {
      case "overview":
        return <OverviewSection onViewChange={handleViewChange} />;
      case "layers":
        return <LayersSection />;
      case "benefits":
        return <BenefitsSection />;
      case "cases":
        return <CaseStudiesSection />;
      case "faq":
        return <FaqSection />;
      default:
        return <OverviewSection onViewChange={handleViewChange} />;
    }
  };

  return (
    <section
      ref={containerRef}
      className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-gray-900/80 to-gray-900/40"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>

        {/* Background grid */}
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px]"
          style={{ opacity: 0.2 }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection animation="fadeIn">
          <SectionHeading
            title={
              <span>
                Nowoczesna{" "}
                <ShuffleText
                  words={["architektura", "infrastruktura", "automatyzacja"]}
                  changeInterval={3000}
                  highlightActive
                  highlightClass="text-indigo-400"
                  shuffleSpeed={20}
                />{" "}
                dla Twojego biznesu
              </span>
            }
            subtitle="Elastyczne, skalowalne i bezpieczne rozwiązania chmurowe zapewniające wymierne korzyści biznesowe"
            alignment="center"
            size="lg"
            gradient
            animation="fade"
            highlightWords={[1]}
            highlightColor="bg-indigo-500/10"
          />
        </AnimatedSection>

        {/* View selector tabs - enhanced with sticky behavior on scroll */}
        <div
          className={`sticky -top-1 z-20 py-3 transition-all duration-300 ${
            isScrolled ? "bg-gray-900/80 backdrop-blur-lg shadow-lg" : ""
          }`}
        >
          <ViewSelector viewMode={viewMode} onViewChange={handleViewChange} />
        </div>

        {/* Main content container */}
        <div
          ref={contentRef}
          className="mt-8 rounded-2xl overflow-hidden relative group"
        >
          {/* Glass effect border */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-sm p-[1px] z-0">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-blue-500/5 to-purple-500/10 opacity-70"></div>
          </div>

          {/* Main content with glass morphism */}
          <div className="bg-gray-900/30 backdrop-blur-md relative z-10 rounded-2xl border border-white/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]">
            {/* Subtle inner highlight */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
              <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
              <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent"></div>
            </div>

            {/* Content padding */}
            <div className="p-8 relative z-10">{renderActiveView()}</div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-16">
          <CallToAction onViewCaseStudies={() => handleViewChange("cases")} />
        </div>
      </div>
    </section>
  );
};

export default InfrastructureConcept;
