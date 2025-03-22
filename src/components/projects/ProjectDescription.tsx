import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { Card3D } from "@/components/ambro-ui/card-3d";

interface ProjectDescriptionProps {
  description: string;
}

export function ProjectDescription({ description }: ProjectDescriptionProps) {
  return (
    <AnimatedSection animation="fadeIn" delay={0.3}>
      <div className="relative group h-full">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 via-purple-500/10 to-pink-500/20 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
        
        <Card3D
          interactive={false}
          glowEffect
          shadow
          bgColor="bg-black/20"
          borderColor="border-white/10"
          height="100%"
          variant="glass"
          glassEffect={{
            blur: 16,
            opacity: 0.05,
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(16px)"
          }}
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-indigo-500/20 p-1.5 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </span>
              O projekcie
            </h2>
            <div className="text-gray-300 space-y-4">
              <p className="leading-relaxed">{description}</p>
            </div>
          </div>
        </Card3D>
      </div>
    </AnimatedSection>
  );
} 