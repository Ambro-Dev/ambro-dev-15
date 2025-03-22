import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { umiejetnosci } from "../data";

export function SkillsTab() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <AnimatedSection animation="fadeIn" delay={0.2}>
        <div className="border border-gray-800 rounded-lg p-8 backdrop-blur-sm hover:border-indigo-500/20 transition-all duration-300">
          <h3 className="text-xl font-light mb-8 text-gray-100">
            Technologie & Narzędzia
          </h3>

          <div className="space-y-5">
            {umiejetnosci.technologie.map((tech, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <div key={index}>
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-gray-300 font-light">{tech.nazwa}</span>
                  <span className="text-indigo-400 font-light">
                    {tech.poziom}%
                  </span>
                </div>
                <div className="w-full bg-gray-800/50 rounded-full h-1.5">
                  <motion.div
                    className="bg-gradient-to-r from-indigo-500/50 to-indigo-400/60 h-1.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${tech.poziom}%` }}
                    transition={{
                      duration: 1.2,
                      delay: 0.1 * index,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <div className="space-y-8">
        <AnimatedSection animation="fadeIn" delay={0.3}>
          <div className="border border-gray-800 rounded-lg p-8 backdrop-blur-sm hover:border-indigo-500/20 transition-all duration-300">
            <h3 className="text-xl font-light mb-8 text-gray-100">
              Języki programowania
            </h3>

            <div className="space-y-5">
              {umiejetnosci.jezykiProgramowania.map((jezyk, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <div key={index}>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-gray-300 font-light">
                      {jezyk.nazwa}
                    </span>
                    <span className="text-indigo-400 font-light">
                      {jezyk.poziom}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-800/50 rounded-full h-1.5">
                    <motion.div
                      className="bg-gradient-to-r from-indigo-500/50 to-indigo-400/60 h-1.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${jezyk.poziom}%` }}
                      transition={{
                        duration: 1.2,
                        delay: 0.1 * index,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fadeIn" delay={0.4}>
          <div className="border border-gray-800 rounded-lg p-8 backdrop-blur-sm hover:border-indigo-500/20 transition-all duration-300">
            <h3 className="text-xl font-light mb-6 text-gray-100">
              Umiejętności miękkie
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {umiejetnosci.miękkie.map((umiejetnosc, index) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={index}
                  className="flex items-center space-x-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                  <span className="text-gray-300 text-sm font-light">
                    {umiejetnosc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
