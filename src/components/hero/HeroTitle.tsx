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

  // 3D tilt effect for cards
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !titleRef.current) return;

      const { left, top, width, height } =
        titleRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      const tiltX = (y - 0.5) * 10; // 10 degree rotation
      const tiltY = (0.5 - x) * 10;

      titleRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    },
    [prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    if (titleRef.current) {
      titleRef.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
    setIsHovering(false);
  }, [setIsHovering]);

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : itemVariants}
      className="mb-6 relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: "transform 0.1s ease-out",
        willChange: "transform",
      }}
    >
      <motion.h1
        ref={titleRef}
        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight relative transition-transform duration-200 ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        <GradientText
          from="indigo-500"
          via="purple-500"
          to="pink-500"
          glowEffect={!prefersReducedMotion}
          glowIntensity={prefersReducedMotion ? 0 : isHovering ? 20 : 10}
          className="leading-[1.1] font-extrabold"
        >
          Ambro-Dev
        </GradientText>

        {/* Add shadow for 3D effect */}
        {!prefersReducedMotion && (
          <div className="absolute inset-0 blur-xl opacity-30 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 -z-10 transform scale-90 translate-y-4" />
        )}
      </motion.h1>
    </motion.div>
  );
};
