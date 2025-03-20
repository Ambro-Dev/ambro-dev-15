// components/hero/CTAButtons.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { EnhancedButton } from "@/components/ambro-ui/enhanced-button";
import { useCallback } from "react";

interface CTAButtonsProps {
  prefersReducedMotion: boolean | null;
  itemVariants: Variants;
}

export const CTAButtons: React.FC<CTAButtonsProps> = ({
  prefersReducedMotion,
  itemVariants,
}) => {
  // Memoize event handlers to prevent recreating on each render
  const scrollToProjects = useCallback(() => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToInfra = useCallback(() => {
    document
      .getElementById("infrastructure")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : itemVariants}
      className="flex flex-col sm:flex-row gap-5 justify-center"
    >
      <EnhancedButton
        variant="tech"
        size="lg"
        onClick={scrollToProjects}
        magneticEffect={!prefersReducedMotion}
        glowOnHover={!prefersReducedMotion}
        rippleEffect={!prefersReducedMotion}
        className="px-8 py-4 relative overflow-visible group"
      >
        <span className="absolute -inset-1 bg-gradient-to-r from-indigo-500/40 to-blue-500/40 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative flex items-center">
          <span className="relative">
            Zobacz moje projekty
            {/* Animated underline effect */}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-indigo-400 to-blue-400 group-hover:w-full transition-all duration-300 ease-in-out" />
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <title>Arrow Right</title>
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </EnhancedButton>

      <EnhancedButton
        variant="outline"
        size="lg"
        onClick={scrollToInfra}
        borderGradient={!prefersReducedMotion}
        className="px-8 py-4 group backdrop-blur-md relative overflow-hidden"
      >
        {/* Add shimmer effect on hover */}
        <div className="absolute inset-0 w-full h-full -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <span className="relative flex items-center">
          Infrastruktura
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2 group-hover:translate-y-1 transition-transform duration-300"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <title>Arrow Down</title>
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </EnhancedButton>
    </motion.div>
  );
};
