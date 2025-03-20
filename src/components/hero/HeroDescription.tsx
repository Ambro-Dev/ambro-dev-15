// components/hero/HeroDescription.tsx
"use client";

import { motion, Variants } from "framer-motion";

interface HeroDescriptionProps {
  prefersReducedMotion: boolean | null;
  itemVariants: Variants;
}

export const HeroDescription: React.FC<HeroDescriptionProps> = ({
  prefersReducedMotion,
  itemVariants,
}) => {
  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : itemVariants}
      className="relative mb-12 max-w-2xl mx-auto"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl blur-md -z-10" />
      <div className="relative rounded-2xl overflow-hidden">
        {/* Glass card effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 z-0" />
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed bg-black/30 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl relative z-10">
          Specjalizuję się w administracji serwerami, automatyzacji procesów IT,
          bezpieczeństwie systemów oraz tworzeniu nowoczesnych aplikacji
          webowych.
        </p>

        {/* Add light reflections for glass effect */}
        <div className="absolute -inset-x-2 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="absolute -inset-y-2 left-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </div>
    </motion.div>
  );
};
