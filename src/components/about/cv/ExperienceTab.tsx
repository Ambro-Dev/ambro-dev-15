import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { doswiadczenie } from "../data";

export function ExperienceTab() {
  return (
    <div className="space-y-10">
      {doswiadczenie.map((praca, index) => (
        <AnimatedSection key={praca.id} animation="fadeIn" delay={0.1 * index}>
          <div className="border border-gray-800 rounded-lg p-6 hover:border-indigo-500/20 transition-all duration-300 backdrop-blur-sm">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-light text-gray-100 mb-1">
                    {praca.firma}
                  </h3>
                  <p className="text-indigo-400 font-light text-sm tracking-wide">
                    {praca.stanowisko}
                  </p>
                  <p className="text-gray-500 text-sm mt-2">{praca.okres}</p>
                </div>

                <div>
                  <h4 className="text-xs uppercase text-gray-500 mb-3 tracking-wider">
                    Technologie
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {praca.technologie.map((tech, techIndex) => (
                      <span
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        key={techIndex}
                        className="px-3 py-1 text-xs rounded-full border border-gray-800 text-gray-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-3">
                <div className="mb-8">
                  <h4 className="text-xs uppercase text-gray-500 mb-3 tracking-wider">
                    Opis stanowiska
                  </h4>
                  <p className="text-gray-300 font-light leading-relaxed">
                    {praca.opis}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase text-gray-500 mb-3 tracking-wider">
                    Kluczowe osiągnięcia
                  </h4>
                  <ul className="list-disc pl-5 text-gray-300 space-y-3 font-light leading-relaxed">
                    {praca.osiagniecia.map((osiagniecie, i) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      <li key={i}>{osiagniecie}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}
