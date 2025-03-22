import Image from "next/image";
import { SectionHeading } from "@/components/ambro-ui/section-heading";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { TiltCard } from "@/components/ambro-ui/tilt-card";
import { GradientText } from "@/components/ambro-ui/gradient-text";
import { EnhancedButton } from "@/components/ambro-ui/enhanced-button";
import { projektyOsobiste } from "./data";

export function PersonalProjects() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection animation="fadeIn">
          <SectionHeading
            title="Projekty osobiste"
            subtitle="Rozwiązania tworzone z pasją w wolnym czasie"
            alignment="center"
            size="xl"
            gradient
            animation="fade"
          />
        </AnimatedSection>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {projektyOsobiste.map((projekt, index) => (
            <AnimatedSection
              key={projekt.id}
              animation="slideUp"
              delay={0.1 * index}
            >
              <TiltCard
                className="h-full"
                tiltAmount={10}
                glareOpacity={0.2}
                borderGlow
                borderColor="rgba(99, 102, 241, 0.4)"
              >
                <div className="h-full flex flex-col">
                  <div className="w-full h-48 overflow-hidden">
                    <Image
                      src={projekt.image}
                      alt={projekt.nazwa}
                      className="w-full h-full object-cover"
                      width={400}
                      height={300}
                    />
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold mb-2">
                      <GradientText
                        from={projekt.color.split(" ")[0].replace("from-", "")}
                        to={projekt.color.split(" ")[1].replace("to-", "")}
                      >
                        {projekt.nazwa}
                      </GradientText>
                    </h3>

                    <p className="text-gray-300 mb-4 flex-grow">
                      {projekt.opis}
                    </p>

                    <div className="mb-4">
                      <h4 className="text-sm uppercase text-gray-500 mb-2">
                        Technologie
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {projekt.technologie.map((tech, techIndex) => (
                          <span
                            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                            key={techIndex}
                            className="px-3 py-1 text-xs rounded-full bg-gray-800 text-gray-300 border border-gray-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <EnhancedButton
                      variant="outline"
                      size="sm"
                      href={projekt.link}
                      className="w-full"
                    >
                      Zobacz na GitHub
                    </EnhancedButton>
                  </div>
                </div>
              </TiltCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
