import { Card3D } from "@/components/ambro-ui/card-3d";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";

interface ProjectInfoProps {
  description: string;
  challenge: string;
  solution: string;
  outcomes: string[];
  client: string;
  role: string;
  timeline: string;
  technologies: string[];
  features: string[];
}

export function ProjectInfo({
  description,
  challenge,
  solution,
  outcomes,
  client,
  role,
  timeline,
  technologies,
  features,
}: ProjectInfoProps) {
  return (
    <div className="mt-16 grid md:grid-cols-3 gap-8">
      <AnimatedSection
        animation="slideLeft"
        delay={0.3}
        className="md:col-span-2"
      >
        <Card3D
          interactive={false}
          glowEffect
          shadow
          bgColor="bg-gray-900/50"
          borderColor="border-indigo-500/20"
          height="100%"
        >
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-6">O projekcie</h3>
            <p className="text-gray-300 mb-8 leading-relaxed">{description}</p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-xl font-bold mb-4">Wyzwanie</h4>
                <p className="text-gray-300">{challenge}</p>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-4">Rozwiązanie</h4>
                <p className="text-gray-300">{solution}</p>
              </div>
            </div>

            <h4 className="text-xl font-bold mb-4">Wyniki</h4>
            <ul className="list-disc pl-5 text-gray-300 space-y-2">
              {outcomes.map((outcome, index) => (
                <li key={index}>{outcome}</li>
              ))}
            </ul>
          </div>
        </Card3D>
      </AnimatedSection>

      <AnimatedSection animation="slideRight" delay={0.4}>
        <Card3D
          interactive={false}
          glowEffect
          shadow
          bgColor="bg-gray-900/50"
          borderColor="border-indigo-500/20"
          height="100%"
        >
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-6">Szczegóły projektu</h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm uppercase text-gray-500 mb-1">Klient</h4>
                <p className="font-medium">{client}</p>
              </div>

              <div>
                <h4 className="text-sm uppercase text-gray-500 mb-1">Rola</h4>
                <p className="font-medium">{role}</p>
              </div>

              <div>
                <h4 className="text-sm uppercase text-gray-500 mb-1">
                  Czas realizacji
                </h4>
                <p className="font-medium">{timeline}</p>
              </div>

              <div>
                <h4 className="text-sm uppercase text-gray-500 mb-2">
                  Technologie
                </h4>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-xs rounded-full bg-gray-800 text-gray-300 border border-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm uppercase text-gray-500 mb-2">
                  Główne funkcjonalności
                </h4>
                <ul className="list-disc pl-5 text-gray-300 space-y-1 text-sm">
                  {features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Card3D>
      </AnimatedSection>
    </div>
  );
}
