// components/BenefitCard.tsx
import React from "react";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/ambro-ui/tilt-card";
import { BusinessBenefit } from "@/types/infrastructure";

interface BenefitCardProps {
  benefit: BusinessBenefit;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

export const BenefitCard: React.FC<BenefitCardProps> = ({
  benefit,
  isActive,
  onClick,
  index,
}) => {
  const benefitVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -7,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const getBorderColor = (gradientString: string) => {
    if (gradientString.includes("emerald")) return "rgba(16, 185, 129, 0.6)";
    if (gradientString.includes("blue")) return "rgba(59, 130, 246, 0.6)";
    if (gradientString.includes("purple")) return "rgba(168, 85, 247, 0.6)";
    if (gradientString.includes("amber")) return "rgba(245, 158, 11, 0.6)";
    if (gradientString.includes("sky")) return "rgba(14, 165, 233, 0.6)";
    if (gradientString.includes("pink")) return "rgba(236, 72, 153, 0.6)";
    return "rgba(99, 102, 241, 0.6)";
  };

  return (
    <motion.div
      className="cursor-pointer"
      variants={benefitVariants}
      initial="initial"
      animate="animate"
      custom={index}
      whileHover="hover"
      onClick={onClick}
    >
      <TiltCard
        className="h-full"
        tiltAmount={7}
        glareOpacity={0.1}
        borderGlow={isActive}
        borderColor={getBorderColor(benefit.gradient)}
      >
        <div className="p-5 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`p-2 rounded-lg bg-gradient-to-br ${benefit.gradient}`}
            >
              <benefit.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold">{benefit.title}</h3>
          </div>

          <p className="text-gray-400 text-sm mb-5">{benefit.description}</p>

          <div className="mt-auto">
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${benefit.gradient}`}
                initial={{ width: 0 }}
                animate={{ width: `${benefit.value}%` }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-500">0%</span>
              <span className="text-xs text-gray-500">100%</span>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};
