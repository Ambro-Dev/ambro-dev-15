// components/hero/HeroBadge.tsx
"use client";

import { motion, Variants } from "framer-motion";

interface HeroBadgeProps {
  prefersReducedMotion: boolean | null;
  itemVariants: Variants;
}

export const HeroBadge: React.FC<HeroBadgeProps> = ({
  prefersReducedMotion,
  itemVariants,
}) => {
  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : itemVariants}
      className="mb-8 inline-flex items-center rounded-full border border-indigo-500/40 bg-indigo-500/10 px-4 py-1.5 text-sm backdrop-blur-md shadow-lg hover:shadow-indigo-500/10 hover:bg-indigo-500/15 transition-all duration-300"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <span
        className="mr-2 h-2 w-2 rounded-full bg-indigo-500 glow-sm"
        style={{
          animation: prefersReducedMotion ? "none" : "pulse 2s infinite",
        }}
      />
      <span className="text-indigo-200 font-medium">
        DevOps & Full Stack Developer
      </span>
    </motion.div>
  );
};
