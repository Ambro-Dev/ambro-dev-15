// components/hero/HeroBackground.tsx
"use client";

import { motion, MotionValue } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  top: string;
  left: string;
  opacity: number;
  duration: number;
  delay: number;
}

interface HeroBackgroundProps {
  prefersReducedMotion: boolean | null;
  gridParallax: MotionValue<number>;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  prefersReducedMotion,
  gridParallax,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);

    // Generate particles only on the client side
    const newParticles = Array.from({ length: 20 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.7 + 0.3,
      duration: Math.random() * 2 + 3,
      delay: Math.random() * 2,
    }));

    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {/* Dark gradient overlay with more depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-0" />

      {/* Improved grid pattern with scroll parallax */}
      <motion.div
        style={{
          y: prefersReducedMotion ? 0 : gridParallax,
        }}
        className="absolute inset-0 bg-grid-pattern opacity-10 z-0"
      />

      {/* Enhanced noise texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-overlay z-0" />

      {/* Animated gradient orbs with better color blending */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute -left-[10%] -top-[20%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-indigo-800/15 to-blue-800/10 blur-[120px] motion-safe:animate-float-slow" />
          <div className="absolute -right-[15%] top-[10%] w-[45%] h-[40%] rounded-full bg-gradient-to-bl from-purple-800/15 to-pink-800/10 blur-[120px] motion-safe:animate-float-medium" />
          <div className="absolute left-[10%] bottom-[5%] w-[30%] h-[30%] rounded-full bg-gradient-to-tr from-blue-800/15 to-cyan-800/10 blur-[100px] motion-safe:animate-float-fast" />

          {/* Add extra light particles/stars - only rendered client-side */}
          {isClient && (
            <div className="particles-container absolute inset-0 z-0">
              {particles.map((particle, i) => (
                <div
                  key={i}
                  className="absolute w-[2px] h-[2px] rounded-full bg-white/20"
                  style={{
                    top: particle.top,
                    left: particle.left,
                    opacity: particle.opacity,
                    animation: `twinkle ${particle.duration}s ease-in-out infinite ${particle.delay}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
