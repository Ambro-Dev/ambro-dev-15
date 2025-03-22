import { AnimatedSection } from "@/components/ambro-ui/animated-section";

interface ProjectFeaturesProps {
  features: string[];
}

export function ProjectFeatures({ features }: ProjectFeaturesProps) {
  return (
    <AnimatedSection animation="slideLeft" delay={0.4}>
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/30 to-blue-500/20 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="backdrop-blur-xl bg-black/20 border border-white/10 p-6 rounded-2xl relative">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="bg-indigo-500/20 p-1.5 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
                <path d="m12 14 4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" />
              </svg>
            </span>
            Główne funkcjonalności
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-md rounded-lg p-4 border border-white/5 hover:bg-white/10 transition-colors duration-300 hover:border-indigo-500/30"
              >
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
} 