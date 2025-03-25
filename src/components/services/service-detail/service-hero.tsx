"use client";

import { useRef } from "react";
import { motion, MotionValue } from "framer-motion";
import { GradientText } from "@/components/ambro-ui/gradient-text";
import { Suspense } from "react";
import type { SerializableService } from "@/lib/service-utils";
import dynamic from "next/dynamic";

// Dynamiczny import komponentu ikony
const ServiceIcon = dynamic(
  () => import("@/components/services/service-icon"),
  {
    loading: () => (
      <div className="w-10 h-10 bg-indigo-500/20 rounded-full animate-pulse" />
    ),
  }
);

interface ServiceHeroProps {
  service: SerializableService;
  headerOpacity: MotionValue<number>;
  headerScale: MotionValue<number>;
  primaryColor: string;
  secondaryColor: string;
}

export default function ServiceHero({
  service,
  headerOpacity,
  headerScale,
  primaryColor,
  secondaryColor,
}: ServiceHeroProps) {
  const headerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={headerRef}
      className="relative w-full h-[50vh] min-h-[400px] max-h-[600px] mb-16 overflow-hidden rounded-2xl"
      style={{
        opacity: headerOpacity,
        scale: headerScale,
      }}
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent z-10" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${
              primaryColor === "indigo"
                ? "6366f1"
                : primaryColor === "emerald"
                ? "10b981"
                : primaryColor === "blue"
                ? "3b82f6"
                : primaryColor === "purple"
                ? "8b5cf6"
                : primaryColor === "amber"
                ? "f59e0b"
                : primaryColor === "sky"
                ? "0ea5e9"
                : primaryColor === "pink"
                ? "ec4899"
                : "6366f1"
            }' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Service Icon */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <div
          className={`w-32 h-32 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg ring-1 ring-white/10`}
          aria-hidden="true"
        >
          <Suspense
            fallback={
              <div className="w-16 h-16 bg-gray-800/50 rounded-full animate-pulse" />
            }
          >
            <ServiceIcon
              serviceId={service.id}
              size={16}
              color={primaryColor}
            />
          </Suspense>
        </div>
      </motion.div>

      {/* Service Title - Simplified for elegance */}
      <motion.div
        className="absolute bottom-16 left-0 right-0 text-center z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          <GradientText
            from={`${primaryColor}-500`}
            to={`${secondaryColor}-400`}
            glowEffect
            glowIntensity={10}
          >
            {service.title}
          </GradientText>
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto px-6 font-light">
          {service.description}
        </p>
      </motion.div>
    </motion.div>
  );
}
