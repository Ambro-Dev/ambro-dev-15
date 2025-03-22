// components/hero/TechBadges.tsx
"use client";

import { motion, Variants } from "framer-motion";

interface TechBadge {
  name: string;
  icon: string;
}

interface TechBadgesProps {
  prefersReducedMotion: boolean | null;
  itemVariants: Variants;
}

const TECH_BADGES: TechBadge[] = [
  { name: "Docker", icon: "🐳" },
  { name: "Kubernetes", icon: "☸️" },
  { name: "AWS", icon: "☁️" },
  { name: "React", icon: "⚛️" },
  { name: "Node.js", icon: "🟢" },
  { name: "TypeScript", icon: "🔷" },
];

export const TechBadges: React.FC<TechBadgesProps> = ({
  prefersReducedMotion,
  itemVariants,
}) => {
  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : itemVariants}
      className="mt-20 flex flex-wrap justify-center gap-3"
    >
      {TECH_BADGES.map((tech, i) => (
        <motion.div
          key={tech.name}
          className="group relative flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-white/[0.02] text-gray-300 border border-white/[0.05] backdrop-blur-xl hover:bg-white/[0.04] hover:border-indigo-500/20 transition-all duration-300 cursor-pointer"
          whileHover={{
            scale: 1.03,
            boxShadow: "0 0 20px rgba(99, 102, 241, 0.15)",
          }}
          whileTap={{ scale: 0.98 }}
          style={{
            opacity: 1,
            transform: "translateY(0)",
            transition: `all ${prefersReducedMotion ? 0 : 0.3}s ease ${
              prefersReducedMotion ? 0 : i * 0.05
            }s`,
          }}
        >
          {/* Subtle gradient background */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Content */}
          <span role="img" aria-label={tech.name} className="relative z-10">
            {tech.icon}
          </span>
          <span className="relative z-10 font-medium">{tech.name}</span>

          {/* Refined light reflection */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      ))}
    </motion.div>
  );
};
