"use client";

import React, { memo, useRef, useState, useEffect } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  Variants,
  AnimatePresence,
} from "framer-motion";

// Import all components
import { HeroBackground } from "@/components/hero/HeroBackground";
import { HeroBadge } from "@/components/hero/HeroBadge";
import { HeroTitle } from "@/components/hero/HeroTitle";
import { HeroSubtitle } from "@/components/hero/HeroSubtitle";
import { HeroDescription } from "@/components/hero/HeroDescription";
import { CTAButtons } from "@/components/hero/CTAButtons";
import { TechBadges } from "@/components/hero/TechBadges";
import { ScrollIndicator } from "@/components/hero/ScrollIndicator";
import { AnimationStyles } from "@/components/hero/AnimationStyles";

// Using memo to prevent unnecessary re-renders
const HeroSection = memo(() => {
  // Support for users who prefer reduced motion
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [key, setKey] = useState<number>(Date.now());
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Set isClient to true once component mounts (client-side only)
  // Add a key reset on navigation to force component re-render
  useEffect(() => {
    setIsClient(true);

    // Force visible immediately on mount
    setIsVisible(true);

    // Force reset component on route change
    const resetComponent = () => {
      setKey(Date.now());
      setIsHovering(false);

      // Force scroll to top when navigating to this page
      window.scrollTo(0, 0);

      // Force visible state
      setIsVisible(true);
    };

    // Add router change event listener
    window.addEventListener("popstate", resetComponent);

    // Also reset on page load/visibility change
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        resetComponent();
      }
    });

    return () => {
      window.removeEventListener("popstate", resetComponent);
      document.removeEventListener("visibilitychange", resetComponent);
    };
  }, []);

  // Scroll-driven animations with refined values
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 30]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98]);
  const gridParallax = useTransform(scrollYProgress, [0, 1], [0, -20]);

  // Refined animation variants for smoother transitions
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  // Simplified animation settings based on user preference
  const animationSettings = prefersReducedMotion
    ? { initial: {}, animate: {} }
    : {
        initial: "hidden" as const,
        animate: "visible" as const,
        variants: containerVariants,
      };

  return (
    <AnimatePresence>
      <section
        key={key}
        ref={sectionRef}
        className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 md:px-6 overflow-hidden bg-gradient-to-b from-black via-gray-950 to-gray-900"
      >
        {/* Refined background elements */}
        <HeroBackground
          prefersReducedMotion={prefersReducedMotion}
          gridParallax={gridParallax}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 max-w-5xl mx-auto text-center"
        >
          <motion.div
            {...animationSettings}
            style={{
              opacity: isVisible ? 1 : prefersReducedMotion ? 1 : opacity,
              y: prefersReducedMotion ? 0 : y,
              scale: prefersReducedMotion ? 1 : scale,
            }}
            className="space-y-12"
          >
            {/* Refined badge with subtle animation */}
            <HeroBadge
              prefersReducedMotion={prefersReducedMotion}
              itemVariants={itemVariants}
            />

            {/* Elegant title with refined hover effect */}
            <HeroTitle
              prefersReducedMotion={prefersReducedMotion}
              itemVariants={itemVariants}
              isHovering={isHovering}
              setIsHovering={setIsHovering}
            />

            {/* Refined subtitle with subtle gradient */}
            <HeroSubtitle
              prefersReducedMotion={prefersReducedMotion}
              itemVariants={itemVariants}
            />

            {/* Elegant description with improved typography */}
            <HeroDescription
              prefersReducedMotion={prefersReducedMotion}
              itemVariants={itemVariants}
            />

            {/* Refined CTA buttons with subtle hover effects */}
            <CTAButtons
              prefersReducedMotion={prefersReducedMotion}
              itemVariants={itemVariants}
            />

            {/* Minimalist tech badges */}
            <TechBadges
              prefersReducedMotion={prefersReducedMotion}
              itemVariants={itemVariants}
            />

            {/* Elegant scroll indicator */}
            <ScrollIndicator
              isClient={isClient}
              prefersReducedMotion={prefersReducedMotion}
              itemVariants={itemVariants}
            />
          </motion.div>
        </motion.div>

        {/* Refined CSS animations */}
        <AnimationStyles />
      </section>
    </AnimatePresence>
  );
});

// Add display name for better debugging
HeroSection.displayName = "HeroSection";

export default HeroSection;
