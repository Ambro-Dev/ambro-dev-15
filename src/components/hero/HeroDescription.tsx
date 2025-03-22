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
      className="relative mb-16 max-w-2xl mx-auto"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Refined glass card effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-blue-500/5 rounded-2xl blur-md -z-10" />
      <div className="relative rounded-2xl overflow-hidden">
        {/* Subtle glass effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-white/[0.05] z-0" />

        {/* Main content */}
        <p className="text-lg md:text-xl text-gray-300/90 leading-relaxed bg-black/20 backdrop-blur-md p-8 rounded-2xl border border-white/5 shadow-xl relative z-10">
          Specjalizuję się w administracji serwerami, automatyzacji procesów IT,
          bezpieczeństwie systemów oraz tworzeniu nowoczesnych aplikacji
          webowych.
        </p>

        {/* Refined light reflections */}
        <div className="absolute -inset-x-2 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute -inset-y-2 left-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

        {/* Subtle corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/10 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/10 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/10 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/10 rounded-br-2xl" />
      </div>
    </motion.div>
  );
};
