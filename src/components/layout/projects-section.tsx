"use client";

import { SectionHeading } from "@/components/ambro-ui/section-heading";
import { RevealText } from "@/components/ambro-ui/reveal-text";
import { EnhancedButton } from "@/components/ambro-ui/enhanced-button";
import { GradientText } from "@/components/ambro-ui/gradient-text";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { ClipMask } from "@/components/ambro-ui/clip-mask";
import Image from "next/image";
import { motion } from "framer-motion";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  color: string;
}

interface ClientProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({
  projects,
}: ClientProjectsSectionProps) {
  return (
    <section id="projects" className="py-32 px-6 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection animation="fadeIn">
          <SectionHeading
            title="Wybrane projekty"
            subtitle="Przykłady zrealizowanych wdrożeń"
            alignment="center"
            size="xl"
            gradient
            animation="slide"
          />
        </AnimatedSection>

        <div className="mt-24 space-y-32">
          {projects.map((project, index) => (
            <AnimatedSection
              key={project.title}
              animation={index % 2 === 0 ? "slideLeft" : "slideRight"}
              delay={0.3}
              className="relative"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl backdrop-blur-sm border border-white/10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />

              <div
                className={`grid md:grid-cols-2 gap-12 p-8 md:p-12 relative rounded-3xl`}
              >
                {/* Project Image - Alternate order based on index */}
                <div className={`${index % 2 !== 0 ? "md:order-2" : ""}`}>
                  <div className="group relative h-full">
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-sm opacity-50 group-hover:opacity-90 transition duration-500"
                      initial={{ opacity: 0, scale: 0.98 }}
                      whileInView={{ opacity: 0.5, scale: 1 }}
                      transition={{ duration: 0.4 }}
                    />
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
                      <div className="overflow-hidden rounded-2xl h-full aspect-video">
                        <Image
                          src={project.image}
                          alt={project.title}
                          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                          width={800}
                          height={500}
                        />
                      </div>
                    </ClipMask>
                  </div>
                </div>

                {/* Project Details */}
                <div
                  className={`flex flex-col justify-center ${
                    index % 2 !== 0 ? "md:order-1" : ""
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <h3 className="text-3xl font-bold mb-4">
                      <GradientText
                        from={project.color.split(" ")[0].replace("from-", "")}
                        to={project.color.split(" ")[1].replace("to-", "")}
                      >
                        {project.title}
                      </GradientText>
                    </h3>

                    <div className="text-gray-200 mb-8 text-lg">
                      <RevealText delay={0.4}>{project.description}</RevealText>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-sm uppercase text-gray-400 mb-3 tracking-wider font-medium">
                        Wykorzystane technologie
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-4 py-1.5 text-xs rounded-full bg-gray-800/60 text-gray-200 border border-gray-700/50 backdrop-blur-sm hover:bg-gray-700/70 transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <EnhancedButton
                      variant="tech"
                      size="md"
                      magneticEffect
                      glowOnHover
                      borderGradient
                      href="/projekty"
                      className="w-fit"
                    >
                      Zobacz szczegóły
                    </EnhancedButton>
                  </motion.div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
