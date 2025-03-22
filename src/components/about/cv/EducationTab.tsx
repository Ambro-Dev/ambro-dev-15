import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { edukacja } from "../data";
import { AcademicCapIcon } from "@heroicons/react/24/outline";

export function EducationTab() {
  return (
    <div className="space-y-8">
      {edukacja.map((edu, index) => (
        <AnimatedSection
          key={edu.id}
          animation="fadeIn"
          delay={0.2 + index * 0.1}
        >
          <div className="border border-gray-800 rounded-lg p-8 backdrop-blur-sm hover:border-indigo-500/20 transition-all duration-300">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-medium text-gray-100">
                  {edu.uczelnia}
                </h3>
                <span className="text-indigo-400 text-sm font-light">
                  {edu.okres}
                </span>
              </div>

              <div className="flex flex-col space-y-1">
                <span className="text-gray-200 font-light">{edu.kierunek}</span>
                <span className="text-gray-400 text-sm font-light">
                  {edu.stopien}
                </span>
              </div>

              {edu.opis && (
                <div className="pt-4">
                  <div className="flex items-start">
                    <AcademicCapIcon className="h-4 w-4 text-indigo-400 mt-1 flex-shrink-0" />
                    <p className="ml-2 text-gray-400 text-sm font-light">
                      {edu.opis}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}
