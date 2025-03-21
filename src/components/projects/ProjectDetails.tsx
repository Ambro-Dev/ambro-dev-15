import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { Card3D } from "@/components/ambro-ui/card-3d";

interface ProjectDetailsProps {
  client: string;
  timeline: string;
  role: string;
  technologies: string[];
}

export function ProjectDetails({ client, timeline, role, technologies }: ProjectDetailsProps) {
  return (
    <AnimatedSection animation="fadeIn" delay={0.3}>
      <div className="relative group h-full">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500/20 via-purple-500/10 to-indigo-500/20 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
        
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
              <span className="bg-pink-500/20 p-1.5 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </span>
              Szczegóły projektu
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-1">Klient</h3>
                <p className="text-white">{client}</p>
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-1">Czas realizacji</h3>
                <p className="text-white">{timeline}</p>
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-1">Moja rola</h3>
                <p className="text-white">{role}</p>
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-1">Technologie</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs rounded-full bg-white/5 backdrop-blur-md text-gray-300 border border-white/10 hover:bg-white/10 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card3D>
      </div>
    </AnimatedSection>
  );
} 