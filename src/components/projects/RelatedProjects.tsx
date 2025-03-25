import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/ambro-ui/section-heading";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { TiltCard } from "@/components/ambro-ui/tilt-card";
import { GradientText } from "@/components/ambro-ui/gradient-text";
import { EnhancedButton } from "@/components/ambro-ui/enhanced-button";

interface Project {
  id: string;
  title: string;
  shortDesc: string;
  image: string;
  color: string;
}

interface RelatedProjectsProps {
  projects: Project[];
  currentProjectId: string;
}

export function RelatedProjects({
  projects,
  currentProjectId,
}: RelatedProjectsProps) {
  return (
    <div className="mt-24">
      <AnimatedSection animation="fadeIn">
        <SectionHeading
          title="Podobne projekty"
          subtitle="Zobacz inne projekty z mojego portfolio"
          alignment="center"
          size="lg"
          animation="fade"
        />

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {projects
            .filter((p) => p.id !== currentProjectId)
            .slice(0, 3)
            .map((relatedProject, index) => (
              <AnimatedSection
                key={relatedProject.id}
                animation="slideUp"
                delay={0.1 * index}
              >
                <Link href={`/projekty/${relatedProject.id}`}>
                  <TiltCard
                    className="h-full"
                    tiltAmount={5}
                    glareOpacity={0.2}
                    perspective={800}
                  >
                    <div className="h-full flex flex-col">
                      <div className="w-full h-48 overflow-hidden rounded-t-xl">
                        <Image
                          src={relatedProject.image}
                          alt={relatedProject.title}
                          className="w-full h-full object-cover"
                          layout="responsive"
                          width={800}
                          height={500}
                        />
                      </div>

                      <div className="p-6 flex-grow flex flex-col">
                        <h3 className="text-xl font-bold mb-2">
                          <GradientText
                            from={relatedProject.color
                              .split(" ")[0]
                              .replace("from-", "")}
                            to={relatedProject.color
                              .split(" ")[1]
                              .replace("to-", "")}
                          >
                            {relatedProject.title}
                          </GradientText>
                        </h3>

                        <p className="text-gray-400 text-sm mb-4">
                          {relatedProject.shortDesc}
                        </p>

                        <div className="mt-auto">
                          <EnhancedButton
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            Zobacz szczegóły
                          </EnhancedButton>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </Link>
              </AnimatedSection>
            ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
