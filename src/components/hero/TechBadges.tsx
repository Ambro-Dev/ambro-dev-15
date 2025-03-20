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
      className="mt-16 flex flex-wrap justify-center gap-4"
    >
      {TECH_BADGES.map((tech, i) => (
        <motion.div
          key={tech.name}
          className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-full bg-gray-800/70 text-gray-200 border border-gray-700/70 backdrop-blur-xl hover:bg-gray-700/50 hover:border-indigo-500/30 transition-all duration-300 cursor-pointer group"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 15px rgba(99, 102, 241, 0.2)",
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
          <span role="img" aria-label={tech.name}>
            {tech.icon}
          </span>
          <span>{tech.name}</span>

          {/* Add subtle light reflection */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      ))}
    </motion.div>
  );
};
