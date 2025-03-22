"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { SectionHeading } from "@/components/ambro-ui/section-heading";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { ShuffleText } from "@/components/ambro-ui/shuffle-text";
import { CallToAction } from "@/components/infrastructure/CallToAction";
import { OverviewSection } from "@/components/infrastructure/views/OverviewSection";
import { LayersSection } from "@/components/infrastructure/views/LayersSection";
import { BenefitsSection } from "@/components/infrastructure/views/BenefitsSection";
import { CaseStudiesSection } from "@/components/infrastructure/views/CaseStudiesSection";
import { FaqSection } from "@/components/infrastructure/views/FaqSection";
import { ViewMode } from "@/types/infrastructure";

// Floating particles component for ambient background
const FloatingParticles = () => {
  const [particles, setParticles] = useState<React.ReactNode[]>([]);

  // Generate particles only on the client side to avoid hydration mismatch
  useEffect(() => {
    const particleElements = [...Array(15)].map((_, i) => {
      const width = Math.random() * 3 + 1;
      const height = Math.random() * 3 + 1;
      const r = Math.floor(Math.random() * 100 + 150);
      const g = Math.floor(Math.random() * 100 + 150);
      const b = Math.floor(Math.random() * 255);
      const a = Math.random() * 0.2 + 0.05;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const yMove = Math.random() * 80 - 40;
      const xMove = Math.random() * 80 - 40;
      const opacity = Math.random() * 0.3 + 0.1;
      const duration = Math.random() * 20 + 15;
      const delay = Math.random() * 5;

      return (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            width,
            height,
            background: `rgba(${r}, ${g}, ${b}, ${a})`,
            top: `${top}%`,
            left: `${left}%`,
            filter: "blur(1px)",
          }}
          animate={{
            y: [0, yMove],
            x: [0, xMove],
            opacity: [0, opacity, 0],
          }}
          transition={{
            duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay,
          }}
        />
      );
    });

    setParticles(particleElements);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      {particles}
    </div>
  );
};

// Main component
const InfrastructureConcept: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("overview");
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Define animation variants
  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.3,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

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

  // Define view tabs
  const viewTabs = useMemo(
    () => [
      { id: "overview" as ViewMode, label: "Przegląd" },
      { id: "layers" as ViewMode, label: "Architektura" },
      { id: "benefits" as ViewMode, label: "Korzyści" },
      { id: "cases" as ViewMode, label: "Historie sukcesu" },
      { id: "faq" as ViewMode, label: "FAQ" },
    ],
    []
  );

  return (
    <section
      ref={containerRef}
      className="py-24 px-4 relative overflow-hidden section-spacing"
      id="infrastructure-section"
    >
      {/* Simplified background elements to work with global backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated particles */}
        <FloatingParticles />

        {/* Subtle gradient orbs */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl opacity-60"></div>
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

        {/* Improved view selector/filter component */}
        <motion.div
          className={`sticky top-0 z-20 py-4 transition-all duration-300 ${
            isScrolled ? "bg-gray-900/80 backdrop-blur-md shadow-sm" : ""
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-center">
            <div className="bg-gray-900/30 backdrop-blur-sm p-1 rounded-full inline-flex flex-wrap justify-center border border-white/5 shadow-sm">
              {viewTabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 relative ${
                    viewMode === tab.id
                      ? "text-white"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                  type="button"
                  onClick={() => handleViewChange(tab.id)}
                  aria-current={viewMode === tab.id ? "page" : undefined}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {viewMode === tab.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-purple-600/90 rounded-full -z-10"
                      layoutId="activeInfraTab"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {tab.label}
                    {viewMode === tab.id && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="w-1.5 h-1.5 rounded-full bg-white/80"
                      />
                    )}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Improved content container with animations */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative p-6 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/[0.02] border border-white/[0.06]"
            >
              {/* Enhanced glass morphism effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-50" />

              {/* Subtle grid pattern */}
              <div
                className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5/5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5/5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"
                style={{ opacity: 0.1 }}
              />

              {/* Inner border effects */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
              </div>

              {/* Content with increased z-index */}
              <div className="relative z-10">{renderActiveView()}</div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Improved call to action */}
        <div className="mt-12">
          <CallToAction onViewCaseStudies={() => handleViewChange("cases")} />
        </div>
      </div>
    </section>
  );
};

export default InfrastructureConcept;
