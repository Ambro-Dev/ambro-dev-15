// components/LayerDetail.tsx
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { InfraLayer } from "@/types/infrastructure";

interface LayerDetailProps {
  layer: InfraLayer;
}

export const LayerDetail: React.FC<LayerDetailProps> = ({ layer }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="mt-8 bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="md:w-1/3 flex justify-center">
          <div
            className={`p-6 rounded-xl bg-gradient-to-br ${layer.gradient} flex flex-col items-center gap-4`}
          >
            <layer.icon className="w-16 h-16 text-white" />
            <div className="text-center">
              <h3 className="text-xl font-bold text-white">{layer.name}</h3>
              <p className="text-white/80">{layer.description}</p>
            </div>
          </div>
        </div>

        <div className="md:w-2/3">
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Wartość biznesowa</h3>
            <p className="text-lg text-gray-200">{layer.businessValue}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm uppercase text-gray-500 mb-3 font-medium">
                Kluczowe funkcje
              </h4>
              <ul className="space-y-2">
                {layer.features.map((feature, index) => (
                  <li
                    key={`feature-${layer.id}-${index}`}
                    className="flex items-start"
                  >
                    <span
                      className={`inline-block w-5 h-5 rounded-full bg-${layer.color}-400/20 text-${layer.color}-400 flex items-center justify-center mr-3 mt-0.5`}
                    >
                      <Check className="w-3 h-3" />
                    </span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm uppercase text-gray-500 mb-3 font-medium">
                Technologie i narzędzia
              </h4>
              <div className="flex flex-wrap gap-2">
                {layer.tools.map((tool, index) => (
                  <span
                    key={`tool-${layer.id}-${index}`}
                    className={`px-3 py-1 text-sm rounded-full bg-${layer.color}-900/30 text-${layer.color}-300 border border-${layer.color}-700/30`}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-700/50">
        <p className="text-gray-400 text-sm">
          Każda warstwa naszej architektury została zaprojektowana z myślą o
          konkretnych potrzebach biznesowych i technicznych, zapewniając
          optymalną wydajność, bezpieczeństwo i skalowalność dla Twojego
          projektu.
        </p>
      </div>
    </motion.div>
  );
};
