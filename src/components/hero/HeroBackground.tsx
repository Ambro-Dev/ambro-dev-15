// components/hero/HeroBackground.tsx
"use client";

import { motion, MotionValue } from "framer-motion";
import { memo, useState, useEffect } from "react";

interface HeroBackgroundProps {
  prefersReducedMotion: boolean | null;
  gridParallax: MotionValue<number>;
}

export const HeroBackground = memo(
  ({ prefersReducedMotion, gridParallax }: HeroBackgroundProps) => {
    // Add state to force re-render on navigation
    const [key, setKey] = useState<number>(Date.now());

    // Reset component on navigation and ensure visibility
    useEffect(() => {
      const resetComponent = () => {
        setKey(Date.now());
      };

      // Reset on mount
      resetComponent();

      window.addEventListener("popstate", resetComponent);

      // Also reset on visibility change (tab switching)
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          resetComponent();
        }
      });

      return () => {
        window.removeEventListener("popstate", resetComponent);
        document.removeEventListener("visibilitychange", resetComponent);
      };
    }, []);

    return (
      <motion.div
        key={key}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {/* Refined background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-gray-900"></div>

        {/* Subtle animated dots background with reduced opacity */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 opacity-10"
            initial={{ backgroundPosition: "0% 0%" }}
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{
              duration: 80,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            style={{
              background: `radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
              willChange: "background-position",
            }}
            key={`dots-${key}`}
          />
        )}

        {/* Refined grid background with subtle parallax */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px), linear-gradient(to right, rgba(99, 102, 241, 0.05) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            y: prefersReducedMotion ? 0 : gridParallax,
            opacity: 0.08,
          }}
          key={`grid-${key}`}
        />

        {/* Subtle ambient light effects */}
        <div className="absolute top-0 -left-32 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl opacity-30 animate-float-slow"></div>
        <div className="absolute bottom-24 -right-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-30 animate-float-medium"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl opacity-20 animate-float-fast"></div>

        {/* Subtle noise texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.015]"></div>
      </motion.div>
    );
  }
);

HeroBackground.displayName = "HeroBackground";
