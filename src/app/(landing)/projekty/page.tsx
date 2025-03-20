// src/app/projekty/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { FloatingBubbles } from "@/components/ambro-ui/floating-bubbles";
import { ScrollProgress } from "@/components/ambro-ui/scroll-progress";
import { SectionHeading } from "@/components/ambro-ui/section-heading";
import { SmoothScroll } from "@/components/ambro-ui/smooth-scroll";
import { Card3D } from "@/components/ambro-ui/card-3d";
import { ClipMask } from "@/components/ambro-ui/clip-mask";
import { GradientText } from "@/components/ambro-ui/gradient-text";
import { RevealText } from "@/components/ambro-ui/reveal-text";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { EnhancedButton } from "@/components/ambro-ui/enhanced-button";
import { AnimatedGradientBorder } from "@/components/ambro-ui/animated-gradient-border";
import { CodeBlock } from "@/components/ambro-ui/code-block";
import { HoverCard } from "@/components/ambro-ui/hover-card";
import { SectionDivider } from "@/components/ambro-ui/section-divider";
import Image from "next/image";
import { Projekt, projekty } from "@/data/projekty"; // Use relative import path

export default function ProjektyPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const categories = ["all", "Web", "Mobile", "IoT", "AI"];

  // Filtrowanie projektów na podstawie aktywnej zakładki
  const filteredProjects =
    activeTab === "all"
      ? projekty
      : projekty.filter((project: Projekt) => {
          if (activeTab === "Web")
            return project.technologies.some((t: string) =>
              ["React", "Next.js", "TailwindCSS"].includes(t)
            );
          if (activeTab === "Mobile")
            return project.technologies.some((t: string) =>
              ["React Native"].includes(t)
            );
          if (activeTab === "IoT")
            return project.technologies.some((t: string) =>
              ["MQTT", "Z-Wave API", "Zigbee"].includes(t)
            );
          if (activeTab === "AI")
            return project.technologies.some((t: string) =>
              ["TensorFlow.js", "TensorFlow"].includes(t)
            );
          return true;
        });

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effect */}
      <FloatingBubbles
        count={20}
        fixed
        color="rgba(99, 102, 241, 0.2)"
        maxSize={100}
        minSize={20}
        interactive
      />

      {/* Scroll Progress Indicator */}
      <ScrollProgress
        position="top"
        color="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      />

      <SmoothScroll>
        {/* Header Section */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection animation="fadeIn">
              <div className="text-center">
                <Link href="/">
                  <EnhancedButton variant="outline" size="sm" className="mb-8">
                    ← Powrót do strony głównej
                  </EnhancedButton>
                </Link>

                <SectionHeading
                  title="Moje projekty"
                  subtitle="Przegląd wybranych realizacji i wdrożeń"
                  alignment="center"
                  size="xl"
                  gradient
                  animation="slide"
                />
              </div>
            </AnimatedSection>

            {/* Kategorie projektów */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveTab(category)}
                  className={`px-6 py-2 rounded-full transition-all ${
                    activeTab === category
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                  }`}
                >
                  {category === "all" ? "Wszystkie" : category}
                </button>
              ))}
            </div>

            {/* Lista projektów */}
            <div className="mt-16 space-y-24">
              {filteredProjects.map((project: Projekt, index: number) => (
                <AnimatedSection
                  key={project.id}
                  animation={index % 2 === 0 ? "slideLeft" : "slideRight"}
                  delay={0.3}
                  className="relative"
                >
                  <AnimatedGradientBorder
                    borderWidth={2}
                    borderColor="from-indigo-500 via-purple-500 to-pink-500"
                    glowEffect
                    glowIntensity={5}
                    animated
                    backgroundColor="bg-gray-900/50"
                    rounded="rounded-xl"
                  >
                    <div className="p-8">
                      <div
                        className={`grid md:grid-cols-2 gap-12 relative ${
                          index % 2 === 0 ? "" : "md:flex-row-reverse"
                        }`}
                      >
                        {/* Project Image */}
                        <ClipMask
                          mask={index % 2 === 0 ? "hexagon" : "diamond"}
                          width="100%"
                          height="100%"
                          animate
                          expandOnHover
                          shadowSize={20}
                          borderWidth={2}
                          borderColor="white"
                          gradientColors={["#4f46e5", "#7c3aed", "#ec4899"]}
                        >
                          <Image
                            src={project.image}
                            alt={project.title}
                            className="object-cover w-full h-full"
                            layout="responsive"
                            width={800}
                            height={500}
                          />
                        </ClipMask>

                        {/* Project Details */}
                        <div className="flex flex-col justify-center">
                          <h3 className="text-3xl font-bold mb-4">
                            <GradientText
                              from={project.color
                                .split(" ")[0]
                                .replace("from-", "")}
                              to={project.color
                                .split(" ")[1]
                                .replace("to-", "")}
                            >
                              {project.title}
                            </GradientText>
                          </h3>

                          <div className="text-gray-300 mb-6">
                            <RevealText delay={0.4}>
                              {project.description.substring(0, 200)}...
                            </RevealText>
                          </div>

                          <div className="mb-6">
                            <h4 className="text-sm uppercase text-gray-500 mb-2">
                              Wykorzystane technologie
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies
                                .slice(0, 6)
                                .map((tech: string, techIndex: number) => (
                                  <span
                                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                                    key={techIndex}
                                    className="px-3 py-1 text-xs rounded-full bg-gray-800 text-gray-300 border border-gray-700"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              {project.technologies.length > 6 && (
                                <span className="px-3 py-1 text-xs rounded-full bg-gray-800 text-gray-300 border border-gray-700">
                                  +{project.technologies.length - 6}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-4">
                            <Link href={`/projekty/${project.id}`}>
                              <EnhancedButton
                                variant="tech"
                                size="md"
                                magneticEffect
                                glowOnHover
                                borderGradient
                              >
                                Szczegóły projektu
                              </EnhancedButton>
                            </Link>

                            <HoverCard
                              hoverContent={
                                <div className="w-full max-w-2xl">
                                  <CodeBlock
                                    code={project.codeSnippet}
                                    language="typescript"
                                    theme="tech"
                                    showLineNumbers
                                    maxHeight="300px"
                                    fileName={`${project.id}.ts`}
                                  />
                                </div>
                              }
                              position="top"
                              glassmorphism
                              width={700}
                            >
                              <EnhancedButton variant="outline" size="md">
                                Zobacz kod
                              </EnhancedButton>
                            </HoverCard>
                          </div>
                        </div>
                      </div>

                      {/* Główne funkcjonalności */}
                      <div className="mt-12">
                        <h4 className="text-xl font-bold mb-4">
                          Główne funkcjonalności
                        </h4>
                        <div className="grid md:grid-cols-3 gap-4">
                          {project.features.map(
                            (feature: string, featureIndex: number) => (
                              <div
                                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                                key={featureIndex}
                                className="bg-gray-800/30 rounded-lg p-4 backdrop-blur-sm"
                              >
                                <span>{feature}</span>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      {/* Wyzwania i rozwiązania */}
                      <div className="mt-12 grid md:grid-cols-2 gap-8">
                        <Card3D
                          interactive={false}
                          glowEffect
                          shadow
                          bgColor="bg-gray-900/50"
                          borderColor="border-indigo-500/20"
                          height="100%"
                        >
                          <div className="p-6">
                            <h4 className="text-xl font-bold mb-4">Wyzwanie</h4>
                            <p className="text-gray-300">{project.challenge}</p>
                          </div>
                        </Card3D>

                        <Card3D
                          interactive={false}
                          glowEffect
                          shadow
                          bgColor="bg-gray-900/50"
                          borderColor="border-pink-500/20"
                          height="100%"
                        >
                          <div className="p-6">
                            <h4 className="text-xl font-bold mb-4">
                              Rozwiązanie
                            </h4>
                            <p className="text-gray-300">{project.solution}</p>
                          </div>
                        </Card3D>
                      </div>
                    </div>
                  </AnimatedGradientBorder>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection animation="fadeIn">
              <SectionHeading
                title="Zróbmy coś razem"
                subtitle="Masz pomysł na projekt? Porozmawiajmy o nim"
                alignment="center"
                size="xl"
                gradient
                animation="fade"
              />

              <div className="mt-10">
                <Link href="/kontakt">
                  <EnhancedButton
                    variant="tech"
                    size="lg"
                    magneticEffect
                    glowOnHover
                    rippleEffect
                    animatedBg
                  >
                    Skontaktuj się ze mną
                  </EnhancedButton>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 bg-black border-t border-gray-800">
          <div className="max-w-6xl mx-auto">
            <SectionDivider
              variant="tech"
              lineColor="from-transparent via-gray-800 to-transparent"
              dotColor="bg-indigo-500"
            />

            <div className="pt-8 text-center text-gray-500 text-sm">
              <p>
                &copy; {new Date().getFullYear()} DevOS. Wszelkie prawa
                zastrzeżone.
              </p>
            </div>
          </div>
        </footer>
      </SmoothScroll>
    </main>
  );
}
