// src/app/projekty/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/ambro-ui/section-heading";
import { Card3D } from "@/components/ambro-ui/card-3d";
import { GradientText } from "@/components/ambro-ui/gradient-text";
import { RevealText } from "@/components/ambro-ui/reveal-text";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { EnhancedButton } from "@/components/ambro-ui/enhanced-button";
import { CodeBlock } from "@/components/ambro-ui/code-block";
import { HoverCard } from "@/components/ambro-ui/hover-card";
import Image from "next/image";
import { Projekt, projekty } from "@/data/projekty"; // Use relative import path
import { motion, useScroll, useTransform } from "framer-motion";
import CTASection from "@/components/layout/cta-section";

export default function ProjektyPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const categories = ["all", "Web", "Mobile", "IoT", "AI"];
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 200], [1, 0.95]);
  const headerBlur = useTransform(scrollY, [0, 200], [0, 8]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
    <main className="min-h-screen bg-gradient-to-b from-black to-slate-900 text-white relative overflow-hidden pt-20">
      {/* Subtle grid background */}
      <div className="fixed inset-0 w-full h-full bg-grid-pattern opacity-3 pointer-events-none" />

      {/* Sticky Header with clean glass effect */}
      {isMounted && (
        <motion.div
          className="sticky top-0 z-10 py-5 px-6 backdrop-blur-md bg-black/10"
          style={{
            opacity: headerOpacity,
            backdropFilter: `blur(${headerBlur.get()}px)`,
            borderBottom: "1px solid rgba(255, 255, 255, 0.03)",
          }}
        >
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/">
              <EnhancedButton variant="outline" size="sm">
                ← Powrót
              </EnhancedButton>
            </Link>

            {/* Kategorie projektów - simplified */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveTab(category)}
                  className={`px-4 py-1.5 rounded-full transition-all text-sm ${
                    activeTab === category
                      ? "bg-indigo-600/80 text-white"
                      : "bg-gray-800/20 text-gray-300 hover:bg-gray-800/30 border border-white/5"
                  }`}
                >
                  {category === "all" ? "Wszystkie" : category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Header Section - more minimal */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection animation="fadeIn">
            <div className="text-center mb-16">
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

          {/* Lista projektów - more consistent spacing */}
          <div className="space-y-20">
            {filteredProjects.map((project: Projekt, index: number) => (
              <AnimatedSection
                key={project.id}
                animation={index % 2 === 0 ? "slideLeft" : "slideRight"}
                delay={0.2}
                className="relative"
              >
                <div className="relative group">
                  {/* Subtle card glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  <div className="relative backdrop-blur-lg bg-black/20 border border-white/5 p-8 rounded-xl overflow-hidden">
                    {/* Light border effect */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    {/* Project content */}
                    <div className={`grid md:grid-cols-2 gap-10 relative`}>
                      {/* Project Image with clean styling */}
                      <div
                        className={`order-2 ${
                          index % 2 === 0 ? "md:order-1" : "md:order-2"
                        }`}
                      >
                        <div className="relative rounded-lg overflow-hidden group-hover:shadow-lg transition-all duration-500 border border-white/5">
                          <Image
                            src={project.image}
                            alt={project.title}
                            className="object-cover w-full h-full hover:scale-103 transition-transform duration-700"
                            width={800}
                            height={500}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        </div>
                      </div>

                      {/* Project Details - cleaner layout */}
                      <div
                        className={`flex flex-col justify-center order-1 ${
                          index % 2 === 0 ? "md:order-2" : "md:order-1"
                        }`}
                      >
                        <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                          <GradientText
                            from={project.color
                              .split(" ")[0]
                              .replace("from-", "")}
                            to={project.color.split(" ")[1].replace("to-", "")}
                            className="tracking-tight"
                          >
                            {project.title}
                          </GradientText>
                        </h3>

                        <div className="text-gray-300 mb-6">
                          <RevealText delay={0.2}>
                            {project.description.substring(0, 150)}...
                          </RevealText>
                        </div>

                        <div className="mb-6">
                          <h4 className="text-sm uppercase text-gray-400 mb-3 font-medium tracking-wider">
                            Technologie
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies
                              .slice(0, 6)
                              .map((tech: string, techIndex: number) => (
                                <span
                                  key={techIndex}
                                  className="px-3 py-1 text-xs rounded-full bg-white/5 text-gray-300 border border-white/5 hover:bg-white/10 transition-colors"
                                >
                                  {tech}
                                </span>
                              ))}
                            {project.technologies.length > 6 && (
                              <span className="px-3 py-1 text-xs rounded-full bg-white/5 text-gray-300 border border-white/5">
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
                              glowOnHover={false}
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

                    {/* Główne funkcjonalności - cleaner layout */}
                    <div className="mt-12 pt-8 border-t border-white/5">
                      <h4 className="text-lg font-semibold mb-5 flex items-center gap-2">
                        <span className="bg-indigo-500/10 p-1.5 rounded-md">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-indigo-400"
                          >
                            <path d="m12 14 4-4" />
                            <path d="M3.34 19a10 10 0 1 1 17.32 0" />
                          </svg>
                        </span>
                        Główne funkcjonalności
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {project.features.map(
                          (feature: string, featureIndex: number) => (
                            <div
                              key={featureIndex}
                              className="bg-white/5 rounded-lg p-4 border border-white/5 hover:border-indigo-500/20 transition-colors"
                            >
                              <span>{feature}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Wyzwania i rozwiązania - simplified cards */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card3D
                        interactive={true}
                        glowEffect={false}
                        shadow
                        bgColor="bg-white/5"
                        borderColor="border-white/10"
                        height="100%"
                        variant="glass"
                        glassEffect={{
                          blur: 10,
                          opacity: 0.05,
                          borderWidth: 1,
                          borderColor: "rgba(255, 255, 255, 0.05)",
                          backdropFilter: "blur(10px)",
                        }}
                        hoverEffect="lift"
                      >
                        <div className="p-6">
                          <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <span className="bg-indigo-500/10 p-1.5 rounded-md">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-indigo-400"
                              >
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                              </svg>
                            </span>
                            Wyzwanie
                          </h4>
                          <p className="text-gray-300 leading-relaxed">
                            {project.challenge}
                          </p>
                        </div>
                      </Card3D>

                      <Card3D
                        interactive={true}
                        glowEffect={false}
                        shadow
                        bgColor="bg-white/5"
                        borderColor="border-white/10"
                        height="100%"
                        variant="glass"
                        glassEffect={{
                          blur: 10,
                          opacity: 0.05,
                          borderWidth: 1,
                          borderColor: "rgba(255, 255, 255, 0.05)",
                          backdropFilter: "blur(10px)",
                        }}
                        hoverEffect="lift"
                      >
                        <div className="p-6">
                          <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <span className="bg-indigo-500/10 p-1.5 rounded-md">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-indigo-400"
                              >
                                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                              </svg>
                            </span>
                            Rozwiązanie
                          </h4>
                          <p className="text-gray-300 leading-relaxed">
                            {project.solution}
                          </p>
                        </div>
                      </Card3D>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />

      {/* CSS for grid pattern - more subtle */}
      <style jsx global>{`
        .bg-grid-pattern {
          background-image: linear-gradient(
              rgba(99, 102, 241, 0.02) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(99, 102, 241, 0.02) 1px,
              transparent 1px
            );
          background-size: 50px 50px;
        }
      `}</style>
    </main>
  );
}
