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
      className="flex flex-col sm:flex-row gap-4 justify-center"
    >
      <EnhancedButton
        variant="tech"
        size="lg"
        onClick={scrollToProjects}
        magneticEffect={!prefersReducedMotion}
        glowOnHover={!prefersReducedMotion}
        glowIntensity={8}
        rippleEffect={!prefersReducedMotion}
        className="relative overflow-visible"
      >
        <span className="absolute -inset-1 bg-gradient-to-r from-indigo-500/30 to-blue-500/30 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        Zobacz projekty
      </EnhancedButton>

      <EnhancedButton
        variant="outline"
        size="lg"
        onClick={scrollToInfra}
        magneticEffect={!prefersReducedMotion}
        className="border-gray-700/50 hover:border-gray-600/70"
      >
        Poznaj infrastrukturę
      </EnhancedButton>
    </motion.div>
  );
};
