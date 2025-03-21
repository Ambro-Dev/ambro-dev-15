// src/app/projekty/page.tsx
"use client";

import { useState, useEffect } from "react";
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
import { motion, useScroll, useTransform } from "framer-motion";

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
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white relative overflow-hidden">
      {/* Radial gradient background */}
      <div className="fixed inset-0 w-full h-full bg-grid-pattern opacity-5 pointer-events-none" />
      
      {/* Background Effect */}
      <FloatingBubbles
        count={30}
        fixed
        color="rgba(99, 102, 241, 0.15)"
        maxSize={150}
        minSize={20}
        interactive
      />

      {/* Scroll Progress Indicator */}
      <ScrollProgress
        position="top"
        color="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        height={3}
      />

      <SmoothScroll>
        {/* Sticky Header with glass effect */}
        {isMounted && (
          <motion.div 
            className="sticky top-0 z-50 pt-6 pb-4 px-6 backdrop-blur-md bg-black/10"
            style={{ 
              opacity: headerOpacity,
              backdropFilter: `blur(${headerBlur.get()}px)`,
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
            }}
          >
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link href="/">
                <EnhancedButton variant="outline" size="sm">
                  ← Powrót
                </EnhancedButton>
              </Link>

              {/* Kategorie projektów */}
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveTab(category)}
                    className={`px-4 py-1.5 rounded-full transition-all text-sm ${
                      activeTab === category
                        ? "bg-indigo-600/90 text-white shadow-md shadow-indigo-500/20"
                        : "bg-gray-800/30 text-gray-300 hover:bg-gray-700/40 backdrop-blur-md border border-white/5"
                    }`}
                  >
                    {category === "all" ? "Wszystkie" : category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Header Section */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection animation="fadeIn">
              <div className="text-center">
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

            {/* Lista projektów */}
            <div className="mt-16 space-y-16">
              {filteredProjects.map((project: Projekt, index: number) => (
                <AnimatedSection
                  key={project.id}
                  animation={index % 2 === 0 ? "slideLeft" : "slideRight"}
                  delay={0.2}
                  className="relative"
                >
                  <div className="relative group">
                    {/* Card glass background with subtle glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/30 via-purple-500/20 to-pink-500/30 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative backdrop-blur-xl bg-black/20 border border-white/10 p-6 sm:p-8 rounded-2xl overflow-hidden shadow-xl">
                      {/* Light effect overlays */}
                      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      <div className="absolute left-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                      
                      {/* Project content */}
                      <div className={`grid md:grid-cols-2 gap-8 sm:gap-12 relative`}>
                        {/* Project Image with improved styling */}
                        <div className={`order-2 ${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
                          <div className="relative rounded-xl overflow-hidden group-hover:shadow-xl transition-all duration-300 border border-white/10">
                            <Image
                              src={project.image}
                              alt={project.title}
                              className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                              width={800}
                              height={500}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                          </div>
                        </div>

                        {/* Project Details */}
                        <div className={`flex flex-col justify-center order-1 ${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
                          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                            <GradientText
                              from={project.color
                                .split(" ")[0]
                                .replace("from-", "")}
                              to={project.color
                                .split(" ")[1]
                                .replace("to-", "")}
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
                            <h4 className="text-sm uppercase text-gray-400 mb-2 font-medium tracking-wider">
                              Technologie
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies
                                .slice(0, 6)
                                .map((tech: string, techIndex: number) => (
                                  <span
                                    key={techIndex}
                                    className="px-3 py-1 text-xs rounded-full bg-white/5 backdrop-blur-md text-gray-300 border border-white/10 hover:bg-white/10 transition-colors duration-300"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              {project.technologies.length > 6 && (
                                <span className="px-3 py-1 text-xs rounded-full bg-white/5 backdrop-blur-md text-gray-300 border border-white/10">
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

                      {/* Główne funkcjonalności - improved styling */}
                      <div className="mt-10 pt-8 border-t border-white/5">
                        <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                          <span className="bg-indigo-500/20 p-1.5 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
                              <path d="m12 14 4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" />
                            </svg>
                          </span>
                          Główne funkcjonalności
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {project.features.map(
                            (feature: string, featureIndex: number) => (
                              <div
                                key={featureIndex}
                                className="bg-white/5 backdrop-blur-md rounded-lg p-4 border border-white/5 hover:bg-white/10 transition-colors duration-300 hover:border-indigo-500/30"
                              >
                                <span>{feature}</span>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      {/* Wyzwania i rozwiązania - improved card appearance */}
                      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <Card3D
                          interactive={true}
                          glowEffect
                          shadow
                          bgColor="bg-white/5"
                          borderColor="border-indigo-500/20"
                          height="100%"
                          variant="glass"
                          glassEffect={{
                            blur: 16,
                            opacity: 0.05,
                            borderWidth: 1, 
                            borderColor: "rgba(255, 255, 255, 0.1)",
                            backdropFilter: "blur(16px)"
                          }}
                          hoverEffect="glass"
                        >
                          <div className="p-6">
                            <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                              <span className="bg-indigo-500/20 p-1.5 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
                                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                                </svg>
                              </span>
                              Wyzwanie
                            </h4>
                            <p className="text-gray-300 leading-relaxed">{project.challenge}</p>
                          </div>
                        </Card3D>

                        <Card3D
                          interactive={true}
                          glowEffect
                          shadow
                          bgColor="bg-white/5"
                          borderColor="border-pink-500/20"
                          height="100%"
                          variant="glass"
                          glassEffect={{
                            blur: 16,
                            opacity: 0.05,
                            borderWidth: 1, 
                            borderColor: "rgba(255, 255, 255, 0.1)",
                            backdropFilter: "blur(16px)"
                          }}
                          hoverEffect="glass"
                        >
                          <div className="p-6">
                            <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                              <span className="bg-pink-500/20 p-1.5 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400">
                                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                                </svg>
                              </span>
                              Rozwiązanie
                            </h4>
                            <p className="text-gray-300 leading-relaxed">{project.solution}</p>
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

        {/* CTA Section with glass morphism */}
        <section className="py-24 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/30 to-purple-950/30 backdrop-blur-md" />
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl" />
            <div className="relative backdrop-blur-md bg-black/40 p-12 rounded-2xl border border-white/10 shadow-2xl">
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
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 bg-black/50 backdrop-blur-md border-t border-gray-800/50">
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
      
      {/* Add global CSS class for grid pattern */}
      <style jsx global>{`
        .bg-grid-pattern {
          background-image: linear-gradient(
              rgba(99, 102, 241, 0.03) 1px,
              transparent 1px
            ),
            linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </main>
  );
}
