// components/hero/HeroBackground.tsx
"use client";

import { motion, MotionValue } from "framer-motion";
import { useEffect, useState, memo, useRef } from "react";

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

export const HeroBackground = memo(({ 
  prefersReducedMotion,
  gridParallax,
}: HeroBackgroundProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState<boolean>(false);
  const hasInitialized = useRef(false);

  // Use useEffect for client-side initialization
  useEffect(() => {
    setMounted(true);
    
    // Ensure we only run this once
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // Generate particles only on the client side and reduce the number
    if (!prefersReducedMotion) {
      // Reduce number of particles for better performance
      const newParticles = Array.from({ length: 10 }).map((_, i) => ({
        // Use deterministic values based on index for SSR consistency
        top: `${((i * 9) % 100)}%`,
        left: `${((i * 7) % 100)}%`,
        opacity: 0.3 + (i % 5) * 0.1,
        duration: 4 + (i % 3),
        delay: 0.2 * (i % 5),
      }));

      // Set particles in next tick to avoid hydration mismatch
      requestAnimationFrame(() => {
        setParticles(newParticles);
      });
    }
  }, [prefersReducedMotion]);

  // Base background elements - safe for SSR
  const baseElements = (
    <>
      {/* Dark gradient overlay with more depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-0" />

      {/* Static background for SSR */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay z-0" />
    </>
  );

  // Only render dynamic elements after client-side mount
  return (
    <div className="absolute inset-0 z-0 will-change-transform" style={{ transform: 'translateZ(0)' }}>
      {baseElements}

      {mounted && (
        <>
          {/* Improved grid pattern with scroll parallax - client-only */}
          {!prefersReducedMotion && (
            <motion.div
              style={{
                y: gridParallax,
              }}
              className="absolute inset-0 bg-grid-pattern opacity-10 z-0"
            />
          )}

          {/* Animated gradient orbs - client-only */}
          {!prefersReducedMotion && (
            <div className="absolute inset-0 overflow-hidden z-0">
              {/* Reduce the number of animated elements */}
              <div className="absolute -left-[10%] -top-[20%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-indigo-800/10 to-blue-800/5 blur-[120px] animate-float-slow" />
              <div className="absolute -right-[15%] bottom-[5%] w-[40%] h-[40%] rounded-full bg-gradient-to-bl from-purple-800/10 to-pink-800/5 blur-[120px] animate-float-medium" />

              {/* Add particles only if we need them and client-side */}
              {particles.length > 0 && (
                <div className="particles-container absolute inset-0 z-0">
                  {particles.map((particle, i) => (
                    <div
                      key={i}
                      className="absolute w-[2px] h-[2px] rounded-full bg-white/20 will-change-transform"
                      style={{
                        top: particle.top,
                        left: particle.left,
                        opacity: particle.opacity,
                        animation: `pulse ${particle.duration}s ease-in-out infinite ${particle.delay}s`,
                        transform: 'translateZ(0)',
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
});

// Add display name for better debugging
HeroBackground.displayName = "HeroBackground";
