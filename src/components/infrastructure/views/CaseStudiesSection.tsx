// views/CaseStudiesSection.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { GradientText } from "@/components/ambro-ui/gradient-text";
import { Card3D } from "@/components/ambro-ui/card-3d";
import { EnhancedButton } from "@/components/ambro-ui/enhanced-button";
import { caseStudies } from "@/data/caseStudies";

export const CaseStudiesSection: React.FC = () => {
  const [activeCaseStudy, setActiveCaseStudy] = useState<string>("ecommerce");

  const activeCase = caseStudies.find((cs) => cs.id === activeCaseStudy);

  if (!activeCase) return null;

  return (
    <div className="relative py-6">
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-3">
          <GradientText from="indigo-500" to="purple-600">
            Historie sukcesu naszych klientów
          </GradientText>
        </h3>
        <p className="text-gray-300">
          Zobacz jak nowoczesna architektura pomogła firmom podobnym do Twojej
          osiągnąć wymierne rezultaty biznesowe.
        </p>
      </div>

      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {caseStudies.map((caseStudy) => (
          <motion.button
            key={caseStudy.id}
            type="button"
            onClick={() => setActiveCaseStudy(caseStudy.id)}
            className={`px-6 py-3 rounded-lg whitespace-nowrap transition-colors ${
              activeCaseStudy === caseStudy.id
                ? "bg-indigo-600 text-white"
                : "bg-gray-800/50 text-gray-300 hover:bg-gray-800"
            }`}
            whileHover={{ y: -3 }}
            whileTap={{ y: 0 }}
          >
            {caseStudy.company} ({caseStudy.industry})
          </motion.button>
        ))}
      </div>

      <Card3D
        interactive={false}
        glowEffect
        glowColor="rgba(99, 102, 241, 0.4)"
        shadow
        bgColor="bg-gray-900/50"
        borderColor="border-indigo-500/30"
      >
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-lg bg-indigo-900/50 flex items-center justify-center">
                  <span className="text-2xl font-bold text-indigo-400">
                    {activeCase.company.substring(0, 2)}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{activeCase.company}</h3>
                  <p className="text-gray-400">{activeCase.industry}</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Wyzwanie</h4>
                <p className="text-gray-300">{activeCase.challenge}</p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Rozwiązanie</h4>
                <p className="text-gray-300">{activeCase.solution}</p>
              </div>
            </div>

            <div>
              <div className="bg-gray-800/50 p-6 rounded-xl mb-6">
                <h4 className="text-lg font-semibold mb-4">Rezultaty</h4>
                <ul className="space-y-3">
                  {activeCase.results.map((result, idx) => (
                    <li
                      key={`result-${idx}`}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-indigo-900/50 text-indigo-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-gray-200">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-indigo-900/10 border border-indigo-500/20 p-6 rounded-xl">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-900/50 text-indigo-400 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block w-5 h-5 stroke-current"
                    >
                      <title>quote</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <div className="italic text-gray-300">
                    &quot;{activeCase.testimonial.quote}&quot;
                  </div>
                </div>
                <div className="ml-11">
                  <div className="font-semibold">
                    {activeCase.testimonial.author}
                  </div>
                  <div className="text-sm text-gray-400">
                    {activeCase.testimonial.position}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-700">
            <EnhancedButton
              variant="tech"
              size="lg"
              href="/kontakt"
              magneticEffect
              glowOnHover
              rippleEffect
            >
              Chcę osiągnąć podobne rezultaty
            </EnhancedButton>
          </div>
        </div>
      </Card3D>
    </div>
  );
};
