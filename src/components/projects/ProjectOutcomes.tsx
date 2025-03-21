import { AnimatedSection } from "@/components/ambro-ui/animated-section";

interface ProjectOutcomesProps {
  outcomes: string[];
}

export function ProjectOutcomes({ outcomes }: ProjectOutcomesProps) {
  return (
    <AnimatedSection animation="slideRight" delay={0.4}>
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/20 to-blue-500/30 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="backdrop-blur-xl bg-black/20 border border-white/10 p-6 rounded-2xl relative">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="bg-green-500/20 p-1.5 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                <path d="M12 20v-6M12 14l2.5-2.5M12 14l-2.5-2.5"></path>
                <path d="M16 4v6h-8V4"></path>
              </svg>
            </span>
            Rezultaty
          </h2>
          <div className="space-y-3">
            {outcomes.map((outcome, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-md rounded-lg p-4 border border-white/5 hover:bg-white/10 transition-colors duration-300 hover:border-green-500/30"
              >
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
} 