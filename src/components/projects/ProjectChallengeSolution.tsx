import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { Card3D } from "@/components/ambro-ui/card-3d";

interface ProjectChallengeSolutionProps {
  challenge: string;
  solution: string;
}

export function ProjectChallengeSolution({ challenge, solution }: ProjectChallengeSolutionProps) {
  return (
    <div className="mt-12 grid md:grid-cols-2 gap-8">
      <AnimatedSection animation="slideLeft" delay={0.5}>
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
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-indigo-500/20 p-1.5 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </span>
              Wyzwanie
            </h2>
            <p className="text-gray-300 leading-relaxed">{challenge}</p>
          </div>
        </Card3D>
      </AnimatedSection>

      <AnimatedSection animation="slideRight" delay={0.5}>
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
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-pink-500/20 p-1.5 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400">
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                </svg>
              </span>
              Rozwiązanie
            </h2>
            <p className="text-gray-300 leading-relaxed">{solution}</p>
          </div>
        </Card3D>
      </AnimatedSection>
    </div>
  );
} 