// components/hero/ScrollIndicator.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";

interface ScrollIndicatorProps {
  isClient: boolean;
  prefersReducedMotion: boolean | null;
  itemVariants: Variants;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  isClient,
  prefersReducedMotion,
  itemVariants,
}) => {
  // Add component key for re-renders
  const [key, setKey] = useState<number>(Date.now());

  // Reset component on navigation
  useEffect(() => {
    if (!isClient) return;

    const resetComponent = () => {
      setKey(Date.now());
    };

    window.addEventListener("popstate", resetComponent);

    return () => {
      window.removeEventListener("popstate", resetComponent);
    };
  }, [isClient]);

  if (!isClient || prefersReducedMotion) return null;

  return (
    <motion.div
      key={key}
      variants={itemVariants}
      className="w-full flex justify-center mt-24 z-20"
      whileInView={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
    >
      <motion.div
        className="flex flex-col items-center cursor-pointer group"
        onClick={() =>
          window.scrollBy({
            top: window.innerHeight * 0.8,
            behavior: "smooth",
          })
        }
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="text-sm text-gray-400 font-medium mb-3 group-hover:text-indigo-300 transition-colors duration-300">
          Przewiń w dół
        </div>
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mx-auto text-indigo-400/80 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <title>Scroll Down</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
          {/* Refined glow effect */}
          <div className="absolute inset-0 bg-indigo-500/10 blur-md rounded-full scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        </div>
      </motion.div>
    </motion.div>
  );
};
