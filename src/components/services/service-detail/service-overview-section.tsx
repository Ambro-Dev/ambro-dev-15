"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { SectionHeading } from "@/components/ambro-ui/section-heading";
import { GradientText } from "@/components/ambro-ui/gradient-text";
import { Card3D } from "@/components/ambro-ui/card-3d";
import { RevealText } from "@/components/ambro-ui/reveal-text";
import { AnimatedGradientBorder } from "@/components/ambro-ui/animated-gradient-border";
import { HighlightText } from "@/components/ambro-ui/highlight-text";
import { EnhancedButton } from "@/components/ambro-ui/enhanced-button";
import Link from "next/link";
import type { SerializableService } from "@/lib/service-utils";

interface ServiceOverviewSectionProps {
  service: SerializableService;
  primaryColor: string;
  secondaryColor: string;
  contactUrl: string;
}

export default function ServiceOverviewSection({
  service,
  primaryColor,
  secondaryColor,
  contactUrl,
}: ServiceOverviewSectionProps) {
  return (
    <section className="mb-20">
      <AnimatedSection animation="fadeIn">
        <SectionHeading
          title="Przegląd usługi"
          subtitle={`Wszystko co musisz wiedzieć o ${service.title}`}
          alignment="left"
          size="lg"
          gradient
          gradientFrom={primaryColor}
          gradientTo={secondaryColor}
          animation="slide"
          titleClassName="mb-4"
        />

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="md:col-span-2">
            <Card3D
              interactive={false}
              glowEffect
              hoverEffect="none"
              glowColor={`rgba(${
                primaryColor === "indigo"
                  ? "99, 102, 241"
                  : primaryColor === "emerald"
                  ? "16, 185, 129"
                  : primaryColor === "sky"
                  ? "14, 165, 233"
                  : primaryColor === "purple"
                  ? "168, 85, 247"
                  : primaryColor === "amber"
                  ? "245, 158, 11"
                  : primaryColor === "pink"
                  ? "236, 72, 153"
                  : "99, 102, 241"
              }, 0.3)`}
              shadow
              bgColor="bg-gray-900/40"
              borderColor={`border-${primaryColor}-500/20`}
              className="h-full"
            >
              <div className="prose prose-invert prose-lg max-w-none p-6">
                <RevealText
                  delay={0.2}
                  staggerLines
                  className="text-gray-300 text-lg leading-relaxed"
                >
                  <p>{service.longDescription}</p>
                </RevealText>

                <h3 className="text-xl font-semibold mt-8 mb-4">
                  <GradientText
                    from={`${primaryColor}-400`}
                    to={`${secondaryColor}-400`}
                    preset="tech"
                  >
                    Kluczowe elementy usługi
                  </GradientText>
                </h3>

                <ul className="space-y-3 mt-6">
                  {service.bulletPoints.map((point, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.4 + index * 0.1,
                        duration: 0.5,
                      }}
                    >
                      <div
                        className={`flex-shrink-0 w-5 h-5 mt-1 rounded-full bg-${primaryColor}-500/20 flex items-center justify-center`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full bg-${primaryColor}-500`}
                        />
                      </div>
                      <span className="text-gray-200">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Card3D>
          </div>

          <div>
            <AnimatedGradientBorder
              borderWidth={1}
              borderColor={`from-${primaryColor}-500 via-${secondaryColor}-500 to-${primaryColor}-500`}
              className="h-full"
              glowEffect
              glowIntensity={10}
              rounded="xl"
            >
              <div className="bg-gray-900/40 p-6 h-full rounded-xl">
                <h3 className="text-xl font-semibold mb-4">
                  <HighlightText
                    color={`bg-${primaryColor}-500/10`}
                    position="bottom"
                    height="35%"
                  >
                    Specjalizacja
                  </HighlightText>
                </h3>

                <div className="space-y-4 mt-6">
                  {service.tags.map((tag, index) => (
                    <motion.div
                      key={index}
                      className={`inline-block mr-2 mb-2 px-3 py-1 rounded-full text-sm bg-${primaryColor}-500/10 text-${primaryColor}-200 border border-${primaryColor}-500/20`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.6 + index * 0.1,
                        duration: 0.4,
                      }}
                    >
                      {tag}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-800">
                  <Link href={contactUrl} className="block">
                    <EnhancedButton
                      variant="tech"
                      size="md"
                      magneticEffect
                      glowOnHover
                      fullWidth
                      className="font-medium"
                    >
                      Zapytaj o szczegóły
                    </EnhancedButton>
                  </Link>
                </div>
              </div>
            </AnimatedGradientBorder>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
