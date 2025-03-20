// views/LayersSection.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { GradientText } from "@/components/ambro-ui/gradient-text";
import { LayerDetail } from "@/components/infrastructure/LayerDetail";
import { infrastructureLayers } from "@/data/infrastructureLayers";

export const LayersSection: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  // Animation variants for layers
  const layerVariants = {
    initial: {
      opacity: 0,
      y: 30,
    },
    animate: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    }),
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
      y: -5,
    },
    expanded: {
      scale: 1.05,
      y: -10,
      zIndex: 10,
    },
  };

  // Helper function to get layer by ID
  const getLayerById = (id: string) => {
    return infrastructureLayers.find((layer) => layer.id === id);
  };

  // Handle layer click
  const handleLayerClick = (layerId: string) => {
    if (activeLayer === layerId) {
      setActiveLayer(null);
    } else {
      setActiveLayer(layerId);
    }
  };

  return (
    <div className="relative py-6">
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-3">
          <GradientText from="indigo-500" to="purple-600">
            Warstwy nowoczesnej architektury
          </GradientText>
        </h3>
        <p className="text-gray-300">
          Nasza architektura składa się z modułowych, niezależnych warstw, które
          współpracują ze sobą, tworząc elastyczny, skalowalny i bezpieczny
          ekosystem dla Twoich aplikacji i usług. Każda warstwa dostarcza
          konkretną wartość biznesową.
        </p>
      </div>

      <div className="rounded-lg overflow-hidden border border-gray-800 bg-gray-900/30">
        {infrastructureLayers.map((layer) => (
          <motion.div
            key={layer.id}
            className={`border-b border-gray-800 last:border-b-0 transition-colors ${
              activeLayer === layer.id
                ? `bg-${layer.color}-900/10`
                : "hover:bg-gray-800/30"
            } ${activeLayer && activeLayer !== layer.id ? "opacity-60" : ""}`}
            custom={layer.position}
            initial="initial"
            animate="animate"
            variants={layerVariants}
            whileHover={activeLayer === null ? "hover" : undefined}
            onClick={() => handleLayerClick(layer.id)}
          >
            <div
              className={`p-5 flex items-center gap-4 cursor-pointer ${
                activeLayer === layer.id
                  ? `border-l-4 border-${layer.color}-500`
                  : ""
              }`}
            >
              <div
                className={`p-3 rounded-lg bg-gradient-to-br ${layer.gradient}`}
              >
                <layer.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3
                  className={`text-lg font-semibold ${
                    activeLayer === layer.id ? `text-${layer.color}-400` : ""
                  }`}
                >
                  {layer.name}
                </h3>
                <p className="text-sm text-gray-400">{layer.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:block max-w-md">
                  <span className="text-sm text-gray-400">
                    <span className={`text-${layer.color}-400 font-medium`}>
                      Korzyść biznesowa:
                    </span>{" "}
                    {layer.businessValue.split(" ").slice(0, 6).join(" ")}...
                  </span>
                </div>
                <ChevronRight
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                    activeLayer === layer.id ? "rotate-90" : ""
                  }`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeLayer && getLayerById(activeLayer) && (
          <LayerDetail layer={getLayerById(activeLayer)!} />
        )}
      </AnimatePresence>
    </div>
  );
};
