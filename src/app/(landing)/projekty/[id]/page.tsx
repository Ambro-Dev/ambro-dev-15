// src/app/projekty/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { FloatingBubbles } from "@/components/ambro-ui/floating-bubbles";
import { ScrollProgress } from "@/components/ambro-ui/scroll-progress";
import { SmoothScroll } from "@/components/ambro-ui/smooth-scroll";
import { EnhancedButton } from "@/components/ambro-ui/enhanced-button";
import { GradientText } from "@/components/ambro-ui/gradient-text";
import { motion, useScroll, useTransform } from "framer-motion";

// Importujemy nowe komponenty
import { ProjectHeader } from "@/components/projects/ProjectHeader";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectDescription } from "@/components/projects/ProjectDescription";
import { ProjectDetails } from "@/components/projects/ProjectDetails";
import { ProjectFeatures } from "@/components/projects/ProjectFeatures";
import { ProjectOutcomes } from "@/components/projects/ProjectOutcomes";
import { ProjectChallengeSolution } from "@/components/projects/ProjectChallengeSolution";
import { ProjectCode } from "@/components/projects/ProjectCode";
import { ProjectCTA } from "@/components/projects/ProjectCTA";
import { ProjectFooter } from "@/components/projects/ProjectFooter";

// Importujemy dane projektów
import { projekty } from "@/data/projects";

export default function ProjectDetailsPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 200], [1, 0.95]);
  const headerBlur = useTransform(scrollY, [0, 200], [0, 8]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Znajdź projekt na podstawie ID
  const project = projekty.find((p) => p.id === projectId);

  // Jeśli projekt nie istnieje, zwróć 404
  if (!project) {
    notFound();
  }

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
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <Link href="/projekty">
                <EnhancedButton variant="outline" size="sm">
                  ← Powrót do projektów
                </EnhancedButton>
              </Link>
              
              <div className="hidden md:block">
                <GradientText
                  from={project.color.split(" ")[0].replace("from-", "")}
                  to={project.color.split(" ")[1].replace("to-", "")}
                  className="text-xl font-bold"
                >
                  {project.title}
                </GradientText>
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <ProjectHeader
              title={project.title}
              shortDesc={project.shortDesc}
              color={project.color}
            />

            <ProjectGallery
              title={project.title}
              images={project.images}
            />

            <div className="grid md:grid-cols-3 gap-8">
              <ProjectDescription description={project.description} />
              <ProjectDetails
                client={project.client}
                timeline={project.timeline}
                role={project.role}
                technologies={project.technologies}
              />
            </div>

            <div className="mt-12 grid md:grid-cols-2 gap-8">
              <ProjectFeatures features={project.features} />
              <ProjectOutcomes outcomes={project.outcomes} />
            </div>

            <ProjectChallengeSolution
              challenge={project.challenge}
              solution={project.solution}
            />

            <ProjectCode
              codeSnippet={project.codeSnippet}
              projectId={project.id}
            />
          </div>
        </section>

        <ProjectCTA />
        <ProjectFooter />
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
