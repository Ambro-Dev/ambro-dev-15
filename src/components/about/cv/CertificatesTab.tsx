import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { certyfikaty } from "../data";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

export function CertificatesTab() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {certyfikaty.map((cert, index) => (
        <AnimatedSection
          key={cert.id}
          animation="fadeIn"
          delay={0.2 + index * 0.1}
        >
          <div className="border border-gray-800 rounded-lg p-6 backdrop-blur-sm hover:border-indigo-500/20 transition-all duration-300 h-full">
            <div className="flex items-start space-x-4">
              <div className="bg-indigo-500/10 p-3 rounded-lg">
                <CheckBadgeIcon className="h-6 w-6 text-indigo-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-100">
                  {cert.nazwa}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm font-light">
                    {cert.wydawca}
                  </span>
                  <span className="text-indigo-400 text-sm font-light">
                    {cert.rok}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}
