// src/components/services-grid.tsx
"use client";

import { useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TiltCard } from "@/components/ambro-ui/tilt-card";
import { GradientText } from "@/components/ambro-ui/gradient-text";
import type { SerializableService } from "@/lib/service-utils";
import ServiceIcon from "./service-icon";

interface ServicesGridProps {
  services: SerializableService[];
}

// Create a memoized card component to prevent unnecessary re-renders
const ServiceCard = memo(
  ({
    service,
    index,
    isHovered,
    onHoverStart,
    onHoverEnd,
  }: {
    service: SerializableService;
    index: number;
    isHovered: boolean;
    onHoverStart: () => void;
    onHoverEnd: () => void;
  }) => {
    // Animation variants for cards - reduced intensity
    const cardVariants = {
      hidden: { opacity: 0, y: 20 }, // Reduced distance
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.05 * index, // Reduced delay between items
          duration: 0.4, // Faster animation
          ease: [0.43, 0.13, 0.23, 0.96],
        },
      },
      hover: {
        y: -5, // Reduced hover movement
        transition: { duration: 0.2, ease: "easeOut" }, // Faster transition
      },
    };

    // Extract the primary color from the gradient string
    const primaryColor = service.color.split(" ")[0].replace("from-", "");

    return (
      <motion.div
        custom={index}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
        className="h-full"
        layout
        layoutId={`service-card-${service.id}`}
      >
        <Link
          href={`/uslugi/${service.id}`}
          className="block h-full"
          aria-label={`Zobacz usługę: ${service.title}`}
        >
          <TiltCard
            className="h-full backdrop-blur-sm transition-all duration-300 border border-gray-800/40 hover:border-indigo-500/30 bg-gray-900/30"
            tiltAmount={3} // Reduced tilt amount
            glareOpacity={0.03} // Reduced glare effect
            borderGlow={false}
            borderColor={`rgba(48, 48, 48, ${isHovered ? 1 : 0.5})`}
            backgroundEffect="none"
          >
            <div className="p-8 flex flex-col h-full">
              {/* Service Icon - using our new component */}
              <div className="h-16 w-16 mb-5">
                <ServiceIcon
                  serviceId={service.id}
                  isHovered={isHovered}
                  color={primaryColor}
                />
              </div>

              <h3 className="text-xl font-light mb-3 tracking-wide">
                <GradientText
                  preset={
                    service.id.includes("ai") || service.id.includes("ml")
                      ? "ai"
                      : service.id.includes("cloud") ||
                        service.id.includes("deploy")
                      ? "devops"
                      : service.id.includes("data")
                      ? "data"
                      : "tech"
                  }
                  glowEffect={isHovered}
                  glowPreset="light"
                  fontWeight="light"
                >
                  {service.title}
                </GradientText>
              </h3>

              <div className="mb-auto">
                <p className="text-gray-300 font-light leading-relaxed text-base">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-800/50">
                <div className="flex flex-wrap gap-2">
                  {service.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={`${service.id}-tag-${tagIndex}`}
                      className="px-2 py-1 text-xs rounded-md bg-indigo-900/30 text-indigo-300 border border-indigo-700/30"
                    >
                      {tag}
                    </span>
                  ))}
                  {service.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs rounded-md bg-indigo-900/30 text-indigo-300 border border-indigo-700/30">
                      +{service.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Subtle arrow indicator - simplified animation */}
              {isHovered && (
                <div className="absolute top-6 right-6 text-indigo-400/70">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                </div>
              )}
            </div>
          </TiltCard>
        </Link>
      </motion.div>
    );
  }
);

// Add display name for debugging
ServiceCard.displayName = "ServiceCard";

const ServicesGrid = ({ services }: ServicesGridProps) => {
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  // Use useCallback for event handlers to prevent recreating functions on every render
  const handleHoverStart = useCallback((serviceId: string) => {
    setHoveredService(serviceId);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setHoveredService(null);
  }, []);

  return (
    <div
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      aria-label="Dostępne usługi"
    >
      {services.map((service, index) => (
        <ServiceCard
          key={service.id}
          service={service}
          index={index}
          isHovered={hoveredService === service.id}
          onHoverStart={() => handleHoverStart(service.id)}
          onHoverEnd={handleHoverEnd}
        />
      ))}
    </div>
  );
};

export default ServicesGrid;
