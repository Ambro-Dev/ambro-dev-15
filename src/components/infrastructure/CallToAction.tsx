// components/CallToAction.tsx
import React from "react";
import { motion } from "framer-motion";
import { EnhancedButton } from "@/components/ambro-ui/enhanced-button";
import { RevealText } from "@/components/ambro-ui/reveal-text";

interface CallToActionProps {
  onViewCaseStudies: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({
  onViewCaseStudies,
}) => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Enhanced glass effect with modern gradients */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 backdrop-blur-sm"></div>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent"></div>
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"></div>
      </div>

      {/* Subtle animated background grid */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5/5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5/5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"
          style={{ opacity: 0.1 }}
        ></div>
      </div>

      {/* Content with enhanced typography and spacing */}
      <div className="relative z-10 p-10 text-center rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
        <RevealText
          className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-100"
          delay={0.3}
        >
          Gotów zrewolucjonizować swoją infrastrukturę IT?
        </RevealText>

        <motion.p
          className="text-gray-300/90 max-w-2xl mx-auto mb-8 text-base leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Skontaktuj się z nami i odkryj, jak możemy pomóc w transformacji
          Twojej infrastruktury. Nasi eksperci zaproponują optymalną
          architekturę dostosowaną do specyfiki Twojego biznesu.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <EnhancedButton
            variant="tech"
            size="lg"
            href="/kontakt"
            animatedBg
            magneticEffect
            glowOnHover
            className="px-8 py-3 text-base font-medium group"
          >
            <span className="relative z-10 flex items-center gap-2">
              Umów bezpłatną konsultację
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
                  d="M14 5l7 7-7 7"
                />
              </motion.svg>
            </span>
          </EnhancedButton>

          <EnhancedButton
            variant="outline"
            size="lg"
            onClick={onViewCaseStudies}
            className="px-8 py-3 text-base font-medium border-white/10 hover:border-white/20 transition-colors duration-300"
            borderGradient
          >
            Zobacz historie sukcesu
          </EnhancedButton>
        </motion.div>
      </div>
    </motion.div>
  );
};
