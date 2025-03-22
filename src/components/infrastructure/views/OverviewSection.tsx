// views/OverviewSection.tsx
import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Cloud, DollarSign, TrendingUp, Shield, Zap, Tag } from "lucide-react";
import { RevealText } from "@/components/ambro-ui/reveal-text";
import { Card3D } from "@/components/ambro-ui/card-3d";
import { EnhancedButton } from "@/components/ambro-ui/enhanced-button";
import { FloatingBubbles } from "@/components/ambro-ui/floating-bubbles";
import { ViewMode } from "@/types/infrastructure";

interface OverviewSectionProps {
  onViewChange: (mode: ViewMode) => void;
}

// Define the color mappings to avoid dynamic class generation issues
const colorMappings = {
  emerald: {
    bg: "bg-emerald-900/30",
    text: "text-emerald-400",
    gradient: "from-emerald-500 to-teal-500",
  },
  indigo: {
    bg: "bg-indigo-900/30",
    text: "text-indigo-400",
    gradient: "from-indigo-500 to-purple-500",
  },
  amber: {
    bg: "bg-amber-900/30",
    text: "text-amber-400",
    gradient: "from-amber-500 to-orange-500",
  },
  blue: {
    bg: "bg-blue-900/30",
    text: "text-blue-400",
    gradient: "from-blue-500 to-sky-500",
  },
};

// Advantages data
const advantages = [
  {
    text: "Redukcja kosztów do 40%",
    icon: DollarSign,
    color: "emerald",
  },
  {
    text: "Skalowanie w czasie rzeczywistym",
    icon: TrendingUp,
    color: "indigo",
  },
  {
    text: "Zwiększone bezpieczeństwo",
    icon: Shield,
    color: "amber",
  },
  {
    text: "Przyspieszone wdrażanie zmian",
    icon: Zap,
    color: "blue",
  },
];

// Industries data
const industries = [
  { name: "Fintech", color: "text-blue-400" },
  { name: "E-commerce", color: "text-green-400" },
  { name: "Healthcare", color: "text-purple-400" },
  { name: "Manufacturing", color: "text-amber-400" },
];

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  onViewChange,
}) => {
  return (
    <div className="space-y-16 py-6">
      {/* Main content area with improved layout */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left content column - Enhanced typography and spacing */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-200">
              Nowoczesne podejście do infrastruktury IT
            </h3>

            <RevealText
              delay={0.2}
              staggerLines
              className="text-gray-300/90 text-base leading-relaxed space-y-4"
            >
              <p>
                Tradycyjne infrastruktury IT nie nadążają za dynamicznymi
                potrzebami współczesnego biznesu, generując niepotrzebne koszty
                i ograniczając elastyczność organizacji.
              </p>
              <p>
                Nasza nowoczesna, warstwowa architektura rozwiązuje te problemy,
                dostarczając elastyczne, skalowalne i bezpieczne rozwiązanie
                dopasowane do Twoich unikatowych potrzeb.
              </p>
              <p>
                Każdy element architektury przekłada się na konkretne korzyści
                biznesowe - od redukcji kosztów po zwiększenie szybkości
                wdrażania innowacji.
              </p>
            </RevealText>
          </motion.div>

          {/* Enhanced buttons with improved spacing and animations */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap gap-4 mt-8"
          >
            <EnhancedButton
              variant="tech"
              size="lg"
              onClick={() => onViewChange("layers")}
              magneticEffect
              glowOnHover
              className="group relative"
            >
              <span className="relative z-10 flex items-center gap-2">
                Zobacz architekturę
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5-5 5M5 7l5 5-5 5"
                  />
                </motion.svg>
              </span>
            </EnhancedButton>

            <EnhancedButton
              variant="outline"
              size="lg"
              onClick={() => onViewChange("benefits")}
              borderGradient
              className="border-white/10 hover:border-white/20 transition-colors duration-300"
            >
              Korzyści biznesowe
            </EnhancedButton>
          </motion.div>
        </div>

        {/* Right content column - Enhanced card with improved animations */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card3D
            interactive
            interactiveStrength={8}
            glowEffect
            shadow
            bgColor="bg-white/[0.02]"
            borderColor="border-white/[0.08]"
            className="group hover:border-white/20 transition-all duration-300"
          >
            <div className="p-8 relative h-[450px] overflow-hidden rounded-xl">
              {/* Enhanced floating bubbles background */}
              <div className="absolute top-0 left-0 w-full h-full">
                <FloatingBubbles
                  count={20}
                  minSize={5}
                  maxSize={20}
                  color="rgba(99, 102, 241, 0.2)"
                />
              </div>

              {/* Improved content organization with animations */}
              <div className="relative z-10 h-full flex flex-col justify-start items-center">
                {/* Enhanced header with gradient effects */}
                <motion.div
                  className="flex flex-col items-center mb-8"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/[0.08] flex items-center justify-center mb-4 shadow-lg shadow-indigo-900/10 group-hover:scale-110 group-hover:border-white/20 transition-all duration-300">
                    <Cloud className="w-10 h-10 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-center whitespace-normal max-w-[90%] leading-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-200">
                    Elastyczna Infrastruktura Chmurowa
                  </h3>
                </motion.div>

                {/* Enhanced advantage cards with improved animations */}
                <div className="flex flex-col gap-4 w-full max-w-md">
                  {advantages.map((item, idx) => (
                    <motion.div
                      key={`advantage-${idx}`}
                      className="flex items-center gap-4 bg-white/[0.03] backdrop-blur-sm rounded-lg p-4 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
                          colorMappings[
                            item.color as keyof typeof colorMappings
                          ].gradient
                        } bg-opacity-10 flex items-center justify-center`}
                      >
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-gray-200 font-medium flex-1">
                        {item.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </Card3D>
        </motion.div>
      </div>

      {/* Enhanced industry section with improved animations and style */}
      <motion.div
        className="mt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <h3 className="text-2xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-100">
          <TypeAnimation
            sequence={["Zaufali nam liderzy z różnych branż"]}
            speed={50}
            cursor={false}
          />
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
          {industries.map((industry, idx) => (
            <motion.div
              key={`industry-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 mb-4 bg-white/[0.02] backdrop-blur-sm rounded-lg border border-white/[0.06] flex items-center justify-center shadow-md group-hover:border-white/20 group-hover:shadow-lg transition-all duration-300">
                  <Tag
                    className={`w-10 h-10 ${industry.color} group-hover:scale-110 transition-all duration-300`}
                  />
                </div>
                <p className="text-center text-gray-300 font-medium group-hover:text-white transition-colors duration-300">
                  {industry.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
