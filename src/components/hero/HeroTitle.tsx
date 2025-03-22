// components/hero/HeroTitle.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { GradientText } from "@/components/ambro-ui/gradient-text";
import { useCallback, useRef } from "react";

interface HeroTitleProps {
  prefersReducedMotion: boolean | null;
  itemVariants: Variants;
  isHovering: boolean;
  setIsHovering: (hovering: boolean) => void;
}

export const HeroTitle: React.FC<HeroTitleProps> = ({
  prefersReducedMotion,
  itemVariants,
  isHovering,
  setIsHovering,
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Handle mouse movement for refined 3D effect
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !titleRef.current) return;

      const { left, top, width, height } =
        titleRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      // More subtle rotation values for elegance
      const rotateX = y * -5;
      const rotateY = x * 5;

      titleRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    },
    [prefersReducedMotion]
  );

  // Reset transform on mouse leave
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    if (titleRef.current) {
      titleRef.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    }
  }, [setIsHovering]);

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : itemVariants}
      className="mb-8 relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        willChange: "transform",
      }}
    >
      <motion.h1
        ref={titleRef}
        className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight relative transition-transform duration-300 ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        <GradientText
          from="indigo-500"
          via="purple-500"
          to="blue-500"
          glowEffect={!prefersReducedMotion}
          glowIntensity={prefersReducedMotion ? 0 : isHovering ? 12 : 6}
          className="leading-[1.1] font-extrabold"
        >
          Ambro-Dev
        </GradientText>

        {/* Refined shadow for depth */}
        {!prefersReducedMotion && (
          <div className="absolute inset-0 blur-xl opacity-15 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 -z-10 transform scale-95 translate-y-4" />
        )}
      </motion.h1>

      {/* Subtle decorative elements */}
      <div className="absolute -inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      <div className="absolute -inset-x-8 bottom-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
    </motion.div>
  );
};
