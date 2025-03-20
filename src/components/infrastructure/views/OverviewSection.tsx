// views/OverviewSection.tsx
import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Cloud, DollarSign, TrendingUp, Shield, Zap, Tag } from "lucide-react";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { GradientText } from "@/components/ambro-ui/gradient-text";
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
  },
  indigo: {
    bg: "bg-indigo-900/30",
    text: "text-indigo-400",
  },
  amber: {
    bg: "bg-amber-900/30",
    text: "text-amber-400",
  },
  blue: {
    bg: "bg-blue-900/30",
    text: "text-blue-400",
  },
};

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  onViewChange,
}) => {
  return (
    <div className="space-y-12 py-6">
      <AnimatedSection animation="fadeIn">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              <GradientText from="indigo-500" to="purple-600">
                Nowoczesne podejście do infrastruktury IT
              </GradientText>
            </h3>

            <RevealText delay={0.2} staggerLines>
              <p className="text-gray-300 mb-3">
                Tradycyjne infrastruktury IT nie nadążają za dynamicznymi
                potrzebami współczesnego biznesu, generując niepotrzebne koszty
                i opóźniając innowacje.
              </p>
              <p className="text-gray-300 mb-3">
                Nasza nowoczesna, warstwowa architektura rozwiązuje te problemy,
                dostarczając elastyczne, skalowalne i bezpieczne rozwiązanie
                dopasowane do Twoich unikatowych potrzeb.
              </p>
              <p className="text-gray-300">
                Każdy element architektury przekłada się na konkretne korzyści
                biznesowe - od redukcji kosztów po zwiększenie szybkości
                wdrażania innowacji.
              </p>
            </RevealText>

            <div className="mt-8 flex flex-wrap gap-4">
              <EnhancedButton
                variant="tech"
                size="lg"
                onClick={() => onViewChange("layers")}
                magneticEffect
                glowOnHover
              >
                Zobacz architekturę
              </EnhancedButton>

              <EnhancedButton
                variant="outline"
                size="lg"
                onClick={() => onViewChange("benefits")}
                borderGradient
              >
                Korzyści biznesowe
              </EnhancedButton>
            </div>
          </div>

          <div>
            <Card3D
              interactive
              interactiveStrength={10}
              glowEffect
              shadow
              bgColor="bg-gray-900/40"
              borderColor="border-indigo-500/40"
            >
              <div className="p-8 pt-10 pb-10 relative h-[400px] overflow-y-auto overflow-x-hidden rounded-xl">
                <div className="absolute top-0 left-0 w-full h-full">
                  <FloatingBubbles
                    count={20}
                    color="rgba(99, 102, 241, 0.2)"
                    minSize={5}
                    maxSize={20}
                  />
                </div>

                <div className="relative z-10 h-full flex flex-col justify-start items-center">
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-indigo-600/30 border-2 border-indigo-600/50 flex items-center justify-center mb-4 shadow-lg shadow-indigo-900/20">
                      <Cloud className="w-10 h-10 text-indigo-400" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-center whitespace-normal max-w-[90%] leading-tight">
                      Elastyczna Infrastruktura Chmurowa
                    </h3>
                  </div>

                  <div className="flex flex-col gap-3 w-full max-w-md">
                    {[
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
                    ].map((item, idx) => (
                      <motion.div
                        key={`advantage-${idx}`}
                        className="flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700/50 hover:border-gray-600/50 transition-all"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                      >
                        <div
                          className={`w-8 h-8 rounded-full ${
                            colorMappings[
                              item.color as keyof typeof colorMappings
                            ].bg
                          } ${
                            colorMappings[
                              item.color as keyof typeof colorMappings
                            ].text
                          } flex items-center justify-center shadow-sm`}
                        >
                          <item.icon className="w-4 h-4" />
                        </div>
                        <span className="text-gray-200 font-medium">
                          {item.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </Card3D>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-center">
            <TypeAnimation
              sequence={["Zaufali nam liderzy z różnych branż"]}
              speed={50}
              cursor={false}
            />
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {[
              { name: "Fintech", color: "text-blue-400" },
              { name: "E-commerce", color: "text-green-400" },
              { name: "Healthcare", color: "text-purple-400" },
              { name: "Manufacturing", color: "text-amber-400" },
            ].map((industry, idx) => (
              <motion.div
                key={`trust-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 mb-4 bg-gray-800/70 rounded-lg border border-gray-700/50 flex items-center justify-center shadow-md hover:shadow-lg hover:border-gray-600/50 transition-all">
                  <Tag className={`w-10 h-10 ${industry.color}`} />
                </div>
                <p className="text-center text-gray-300 font-medium">
                  {industry.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};
