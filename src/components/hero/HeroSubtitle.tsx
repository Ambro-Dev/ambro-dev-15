// components/hero/HeroSubtitle.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { ShuffleText } from "@/components/ambro-ui/shuffle-text";

interface HeroSubtitleProps {
  prefersReducedMotion: boolean | null;
  itemVariants: Variants;
}

export const HeroSubtitle: React.FC<HeroSubtitleProps> = ({
  prefersReducedMotion,
  itemVariants,
}) => {
  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : itemVariants}
      className="flex flex-col sm:flex-row items-center justify-center mb-10 text-xl md:text-2xl lg:text-3xl font-medium"
    >
      <span className="mr-2 text-white/90">Tworzę</span>
      <div className="relative">
        <ShuffleText
          words={[
            "nowoczesne",
            "wydajne",
            "skalowalne",
            "bezpieczne",
            "kompleksowe",
          ]}
          changeInterval={prefersReducedMotion ? 3000 : 2000}
          shuffleSpeed={prefersReducedMotion ? 0 : 50}
          highlightActive
          highlightClass="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-indigo-500/30 after:rounded-full"
        />
        {/* Subtle highlight animation */}
        {!prefersReducedMotion && (
          <div className="absolute -inset-1 rounded-lg blur-lg bg-indigo-500/5 animate-pulse-slow -z-10" />
        )}
      </div>
      <span className="ml-2 text-white/90">rozwiązania DevOps i Fullstack</span>
    </motion.div>
  );
};
