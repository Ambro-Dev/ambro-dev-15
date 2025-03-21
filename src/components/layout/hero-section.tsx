"use client";

import React, { memo, useRef, useState, useEffect } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";

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
  const [mounted, setMounted] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true); // Start as visible for SSR

  // Client-side initialization
  useEffect(() => {
    // Mark as mounted
    setMounted(true);
    
    // Apply client-side only logic in a safe way (after hydration)
    const handleMount = () => {
      // Force component to be visible immediately on mount
      setIsVisible(true);
      
      // Scroll to top with fewer paint operations
      if (window.scrollY !== 0) {
        window.scrollTo({
          top: 0,
          behavior: 'instant'
        });
      }
      
      // Add hero-visible class safely
      document.body.classList.add('hero-visible');
    };
    
    // Use requestAnimationFrame to ensure this happens after hydration
    requestAnimationFrame(handleMount);
    
    return () => {
      document.body.classList.remove('hero-visible');
    };
  }, []);

  // Scroll-driven animations - only used client-side
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // These transformations are only used on client side
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const gridParallax = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Animation variants for staggered children animations
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
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 md:px-6 overflow-hidden will-change-transform"
      style={{ 
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      {/* Background elements */}
      <HeroBackground
        prefersReducedMotion={prefersReducedMotion}
        gridParallax={gridParallax}
      />

      <AnimatedSection
        animation="fadeIn"
        delay={0.1}
        duration={0.4}
        className="relative z-10 max-w-5xl mx-auto text-center"
        once={true}
        threshold={0.01}
        disableOnMobile={false}
      >
        <motion.div
          {...animationSettings}
          style={{
            // For SSR, ensure consistent initial state
            opacity: mounted ? (isVisible ? (prefersReducedMotion ? 1 : opacity) : 1) : 1,
            y: mounted ? (isVisible ? (prefersReducedMotion ? 0 : y) : 0) : 0,
            scale: mounted ? (isVisible ? (prefersReducedMotion ? 1 : scale) : 1) : 1,
          }}
        >
          {/* Interactive badge */}
          <HeroBadge
            prefersReducedMotion={prefersReducedMotion}
            itemVariants={itemVariants}
          />

          {/* 3D title with hover effect */}
          <HeroTitle
            prefersReducedMotion={prefersReducedMotion}
            itemVariants={itemVariants}
            isHovering={isHovering}
            setIsHovering={setIsHovering}
          />

          {/* Improved subtitle */}
          <HeroSubtitle
            prefersReducedMotion={prefersReducedMotion}
            itemVariants={itemVariants}
          />

          {/* Enhanced description */}
          <HeroDescription
            prefersReducedMotion={prefersReducedMotion}
            itemVariants={itemVariants}
          />

          {/* Call to action buttons */}
          <CTAButtons
            prefersReducedMotion={prefersReducedMotion}
            itemVariants={itemVariants}
          />

          {/* Tech badges */}
          <TechBadges
            prefersReducedMotion={prefersReducedMotion}
            itemVariants={itemVariants}
          />

          {/* Scroll indicator */}
          <ScrollIndicator
            isClient={mounted}
            prefersReducedMotion={prefersReducedMotion}
            itemVariants={itemVariants}
          />
        </motion.div>
      </AnimatedSection>

      {/* CSS animations */}
      <AnimationStyles />
    </section>
  );
});

// Add display name for better debugging
HeroSection.displayName = "HeroSection";

export default HeroSection;
