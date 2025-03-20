// views/FaqSection.tsx
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { GradientText } from "@/components/ambro-ui/gradient-text";
import { AnimatedGradientBorder } from "@/components/ambro-ui/animated-gradient-border";
import { EnhancedButton } from "@/components/ambro-ui/enhanced-button";
import { faqs } from "@/data/faqs";

export const FaqSection: React.FC = () => {
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  // Handle FAQ click
  const handleFaqClick = (question: string) => {
    if (activeQuestion === question) {
      setActiveQuestion(null);
    } else {
      setActiveQuestion(question);
    }
  };

  return (
    <div ref={faqRef} className="relative py-6">
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-3">
          <GradientText from="indigo-500" to="purple-600">
            Najczęściej zadawane pytania
          </GradientText>
        </h3>
        <p className="text-gray-300">
          Masz pytania dotyczące naszej nowoczesnej architektury? Oto odpowiedzi
          na najczęściej zadawane pytania.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {faqs.map((faq, index) => (
          <div
            key={`faq-${index}`}
            className={`border border-gray-800 rounded-lg overflow-hidden transition-all ${
              activeQuestion === faq.question
                ? "bg-gray-800/30"
                : "bg-gray-900/30"
            }`}
          >
            <button
              type="button"
              className="w-full flex justify-between items-center p-5 text-left"
              onClick={() => handleFaqClick(faq.question)}
            >
              <h4 className="text-lg font-medium">{faq.question}</h4>
              <ChevronRight
                className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                  activeQuestion === faq.question ? "rotate-90" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {activeQuestion === faq.question && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-5 pb-5 text-gray-300">{faq.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <AnimatedGradientBorder
        borderWidth={1}
        borderColor="from-indigo-500 via-purple-500 to-pink-500"
        glowEffect
        glowIntensity={5}
        animated
        backgroundColor="bg-gray-900/70"
        direction="diagonal"
      >
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="md:w-2/3">
              <h3 className="text-xl font-bold mb-2">
                <GradientText from="indigo-500" via="purple-500" to="pink-500">
                  Nie znalazłeś odpowiedzi na swoje pytanie?
                </GradientText>
              </h3>

              <p className="text-gray-300">
                Skontaktuj się z nami, aby uzyskać szczegółowe informacje
                dotyczące Twojego konkretnego przypadku. Pierwsze konsultacje są
                bezpłatne i niezobowiązujące.
              </p>
            </div>

            <div className="md:w-1/3 flex justify-center">
              <EnhancedButton
                variant="tech"
                size="lg"
                href="/kontakt"
                magneticEffect
                glowOnHover
                rippleEffect
                animatedBg
                fullWidth
              >
                Zadaj pytanie
              </EnhancedButton>
            </div>
          </div>
        </div>
      </AnimatedGradientBorder>
    </div>
  );
};
