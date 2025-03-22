"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";

// Icon paths for each service
const SERVICE_ICONS: Record<string, { path: string; viewBox?: string }> = {
  infrastructure: {
    path: "M21 13v10h-6v-6H9v6H3V13h-1v-2h1V4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v5a1 1 0 0 0 1 1h7a1 1 0 0 1 1 1v2h-1Z M6 13v2m0 2v2m4-6v2m0 2v2m4-6v2m0 2v2",
  },
  servers: {
    path: "M5 2h14a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 6h14a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2zm0 6h14a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2zM9 4h1m-1 6h1m-1 6h1",
  },
  monitoring: {
    path: "M12 4V2m0 20v-2m8-8h2M2 12h2m13.657-5.657L19.07 4.93M4.93 19.07l1.414-1.414m11.313 1.414L19.07 19.07M4.93 4.93l1.414 1.414M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z",
  },
  security: {
    path: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M12 8v4m.05 4h.01",
  },
  databases: {
    path: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-1-5V5m2 2h2M6 20a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1H6v-1z",
  },
  deployment: {
    path: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0 0v-8.5M9 9l3-3 3 3",
  },
  webapps: {
    path: "M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm0 6h18M7 3v18",
  },
  architecture: {
    path: "M2 20h.01m4-.01h.01m4 0h.01m4 0h.01m4 0h.01M2 16h20M2 12h20M2 8h20M2 4h20",
  },
  default: {
    path: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M12 12h.01",
  },
};

interface ServiceIconProps {
  serviceId: string;
  isHovered?: boolean;
  color: string;
  size?: number;
  animate?: boolean;
  performance?: "high" | "medium" | "low";
  pauseAnimations?: boolean;
}

const ServiceIcon = memo(
  ({
    serviceId,
    isHovered = false,
    color,
    size = 12,
    animate = false,
    performance,
    pauseAnimations,
  }: ServiceIconProps) => {
    // Get icon paths or use default if not found
    const { path, viewBox = "0 0 24 24" } =
      SERVICE_ICONS[serviceId] || SERVICE_ICONS.default;

    // Animations
    const iconVariants = {
      idle: {
        scale: 1,
        rotate: 0,
      },
      hover: {
        scale: 1.05,
        rotate: (isHovered || animate) && !pauseAnimations ? 5 : 0,
        transition: {
          duration:
            performance === "high" ? 0.2 : performance === "medium" ? 0.3 : 0.4,
          ease: "easeOut",
        },
      },
    };

    // Get color values for gradient
    const getColorValue = (colorName: string) => {
      const colorMap: Record<
        string,
        { light: string; dark: string; accent: string }
      > = {
        indigo: { light: "#818cf8", dark: "#4f46e5", accent: "#c7d2fe" },
        blue: { light: "#60a5fa", dark: "#2563eb", accent: "#bfdbfe" },
        emerald: { light: "#34d399", dark: "#059669", accent: "#a7f3d0" },
        sky: { light: "#38bdf8", dark: "#0284c7", accent: "#bae6fd" },
        purple: { light: "#a78bfa", dark: "#7c3aed", accent: "#ddd6fe" },
        amber: { light: "#fbbf24", dark: "#d97706", accent: "#fde68a" },
        pink: { light: "#f472b6", dark: "#db2777", accent: "#fbcfe8" },
      };

      return colorMap[colorName] || colorMap.indigo;
    };

    const { light, dark, accent } = getColorValue(color);

    return (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Glowing background */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-20"
          initial={{ scale: 0.8 }}
          animate={{
            scale: isHovered ? 1 : 0.85,
            background: `radial-gradient(circle, ${light}33 0%, transparent 70%)`,
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Icon container */}
        <motion.div
          className="relative z-10 flex items-center justify-center rounded-xl"
          style={{
            background: `linear-gradient(135deg, ${light}50, ${dark}80)`,
            boxShadow: isHovered ? `0 0 15px ${light}40` : "none",
            width: `${size * 4}px`,
            height: `${size * 4}px`,
          }}
          initial="idle"
          animate={isHovered ? "hover" : "idle"}
          variants={iconVariants}
        >
          {/* SVG Icon */}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width={size * 2}
            height={size * 2}
            viewBox={viewBox}
            fill="none"
            stroke={accent}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{
              opacity: 1,
              strokeWidth: isHovered ? 2 : 1.5,
            }}
          >
            <motion.path d={path} />
          </motion.svg>
        </motion.div>

        {/* Floating particles when hovered */}
        {isHovered && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{ background: accent }}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 0.7,
                }}
                animate={{
                  x: Math.random() * 30 - 15,
                  y: Math.random() * 30 - 15,
                  opacity: 0,
                  scale: Math.random() * 0.5 + 0.5,
                }}
                transition={{
                  duration: Math.random() * 1 + 0.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: i * 0.2,
                }}
              />
            ))}
          </>
        )}
      </div>
    );
  }
);

ServiceIcon.displayName = "ServiceIcon";

export default ServiceIcon;
