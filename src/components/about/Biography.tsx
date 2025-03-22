import { TypeAnimation } from "react-type-animation";
import { Card3D } from "@/components/ambro-ui/card-3d";
import { RevealText } from "@/components/ambro-ui/reveal-text";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";

export function Biography() {
  return (
    <AnimatedSection animation="fadeIn" delay={0.3} className="md:col-span-3">
      <Card3D
        interactive={false}
        glowEffect={false}
        shadow
        bgColor="bg-gray-900/30"
        borderColor="border-gray-800"
        height="100%"
        className="backdrop-blur-sm"
      >
        <div className="p-8 md:p-10">
          <h3 className="text-2xl font-light mb-8 tracking-wide text-gray-100">
            Kim jestem
          </h3>

          <div className="space-y-6 text-gray-300 font-light leading-relaxed text-base">
            <div>
              <RevealText delay={0.1} className="leading-relaxed">
                Jestem doświadczonym Full Stack Developerem z ponad 8-letnim
                doświadczeniem w tworzeniu nowoczesnych aplikacji webowych i
                mobilnych. Moja przygoda z programowaniem zaczęła się na
                studiach informatycznych, a z czasem przerodziła się w pasję,
                która napędza mnie do ciągłego rozwoju i podejmowania nowych
                wyzwań technologicznych.
              </RevealText>
            </div>

            <div>
              <RevealText delay={0.2} className="leading-relaxed">
                Specjalizuję się w ekosystemie JavaScript/TypeScript, ze
                szczególnym uwzględnieniem React.js, Next.js, Node.js oraz
                technologii chmurowych. Moim głównym celem jest tworzenie
                wydajnych, skalowalnych i przyjaznych dla użytkownika rozwiązań,
                które realnie rozwiązują problemy biznesowe moich klientów.
              </RevealText>
            </div>

            <div>
              <RevealText delay={0.3} className="leading-relaxed">
                Poza pracą nad projektami komercyjnymi, aktywnie udzielam się w
                społeczności Open Source, prowadzę blog techniczny oraz
                występuję na konferencjach dzieląc się wiedzą i doświadczeniem.
                Wierzę w ciągły rozwój i nieustannie poszerzam swoje
                kompetencje, śledząc najnowsze trendy i technologie w branży IT.
              </RevealText>
            </div>
          </div>

          <div className="mt-12 mb-2">
            <h3 className="text-xl font-light mb-6 tracking-wide text-gray-100">
              Co mnie wyróżnia
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Kompleksowe podejście",
                  desc: "Dbam o każdy aspekt projektu - od architektury, przez wydajność, po doświadczenie użytkownika.",
                },
                {
                  title: "Zorientowanie na rezultaty",
                  desc: "Skupiam się na dostarczaniu rozwiązań, które przynoszą realne korzyści biznesowe.",
                },
                {
                  title: "Ciągły rozwój",
                  desc: "Nieustannie poszerzam swoją wiedzę i umiejętności, śledzę najnowsze trendy technologiczne.",
                },
                {
                  title: "Komunikacja i współpraca",
                  desc: "Przykładam dużą wagę do jasnej komunikacji i efektywnej współpracy z klientem i zespołem.",
                },
              ].map((item, index) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={index}
                  className="border border-gray-800 rounded-lg p-5 backdrop-blur-sm hover:border-indigo-500/20 transition-colors duration-300"
                >
                  <h4 className="text-gray-100 font-light mb-3">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 border-t border-gray-800 pt-8">
            <TypeAnimation
              sequence={[
                "Szukasz doświadczonego developera, który pomoże zrealizować Twój projekt? Skontaktuj się ze mną!",
                1000,
              ]}
              speed={40}
              cursor={true}
              className="text-base font-light text-indigo-300"
            />
          </div>
        </div>
      </Card3D>
    </AnimatedSection>
  );
}
