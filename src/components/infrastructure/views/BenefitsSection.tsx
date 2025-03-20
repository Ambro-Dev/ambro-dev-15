// views/BenefitsSection.tsx
import React, { useState, useRef } from "react";
import { Check } from "lucide-react";
import { GradientText } from "@/components/ambro-ui/gradient-text";
import { AnimatedGradientBorder } from "@/components/ambro-ui/animated-gradient-border";
import { BenefitCard } from "@/components/infrastructure/BenefitCard";
import { businessBenefits } from "@/data/businessBenefits";

export const BenefitsSection: React.FC = () => {
  const [activeBenefit, setActiveBenefit] = useState<string>("cost");
  const benefitsRef = useRef<HTMLDivElement>(null);

  const activeBenefitObj = businessBenefits.find((b) => b.id === activeBenefit);

  return (
    <div ref={benefitsRef} className="relative py-6">
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-3">
          <GradientText from="indigo-500" to="purple-600">
            Wymierne korzyści biznesowe
          </GradientText>
        </h3>
        <p className="text-gray-300">
          Nasza architektura to nie tylko innowacyjna technologia, ale przede
          wszystkim konkretne, wymierne korzyści biznesowe, które przekładają
          się na przewagę konkurencyjną.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {businessBenefits.map((benefit, index) => (
          <BenefitCard
            key={benefit.id}
            benefit={benefit}
            isActive={activeBenefit === benefit.id}
            onClick={() => setActiveBenefit(benefit.id)}
            index={index}
          />
        ))}
      </div>

      {/* Selected benefit details */}
      {activeBenefitObj && (
        <AnimatedGradientBorder
          borderWidth={1}
          borderColor={activeBenefitObj.gradient
            .replace("from-", "")
            .replace("to-", "")}
          glowEffect
          glowIntensity={5}
          animated
          backgroundColor="bg-gray-900/70"
          direction="diagonal"
          className="mb-8"
        >
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="md:w-1/4 flex justify-center">
                <div
                  className={`w-32 h-32 rounded-full bg-gradient-to-br ${activeBenefitObj.gradient} flex items-center justify-center`}
                >
                  <activeBenefitObj.icon className="w-16 h-16 text-white" />
                </div>
              </div>

              <div className="md:w-3/4">
                <h3 className="text-2xl font-bold mb-2">
                  <GradientText
                    from={activeBenefitObj.gradient
                      .split(" ")[0]
                      .replace("from-", "")}
                    to={activeBenefitObj.gradient
                      .split(" ")[1]
                      .replace("to-", "")}
                  >
                    {activeBenefitObj.title}
                  </GradientText>
                </h3>

                <p className="text-xl text-gray-200 mb-4">
                  {activeBenefitObj.stats}
                </p>

                <p className="text-gray-400">{activeBenefitObj.description}</p>

                <div className="mt-6 grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="text-sm uppercase text-gray-500 mb-2">
                      Jak to osiągamy
                    </h4>
                    <ul className="space-y-2">
                      {[
                        "Zastosowanie najnowszych technologii i rozwiązań",
                        "Optymalizacja pod kątem Twoich specyficznych potrzeb",
                        "Wykorzystanie efektu skali i automatyzacji",
                        "Ciągły monitoring i usprawnienia wydajności",
                      ].map((item, idx) => (
                        <li
                          key={`how-${idx}`}
                          className="flex items-start gap-2"
                        >
                          <Check className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="text-sm uppercase text-gray-500 mb-2">
                      Co to oznacza dla Twojego biznesu
                    </h4>
                    <ul className="space-y-2">
                      {renderBusinessImpact(activeBenefitObj.id).map(
                        (item, idx) => (
                          <li
                            key={`business-${idx}`}
                            className="flex items-start gap-2"
                          >
                            <span className="text-indigo-400">→</span>
                            <span className="text-sm text-gray-300">
                              {item}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedGradientBorder>
      )}

      <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">Metodologia pomiaru korzyści</h3>
        <p className="text-gray-300 mb-4">
          Wszystkie przedstawione korzyści opierają się na rzeczywistych
          wynikach osiągniętych przez naszych klientów. Do oceny efektywności
          wdrożeń stosujemy rygorystyczne metodologie i narzędzia analityczne:
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Analiza przed-po",
              description:
                "Porównanie kluczowych metryk przed i po wdrożeniu, uwzględniające naturalne trendy i sezonowość",
              icon: "BarChart",
            },
            {
              title: "Długoterminowe pomiary",
              description:
                "Monitorowanie korzyści w czasie, aby potwierdzić trwałość i stabilność osiągniętych rezultatów",
              icon: "Clock",
            },
            {
              title: "Analiza finansowa",
              description:
                "Szczegółowa kalkulacja oszczędności i zwrotu z inwestycji (ROI) wykorzystująca standardowe wskaźniki finansowe",
              icon: "DollarSign",
            },
          ].map((item, idx) => (
            <div
              key={`method-${idx}`}
              className="bg-gray-800/40 p-4 rounded-lg"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-5 h-5 text-indigo-400">{item.icon}</span>
                <h4 className="font-medium">{item.title}</h4>
              </div>
              <p className="text-sm text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function to render different business impacts based on benefit ID
const renderBusinessImpact = (benefitId: string) => {
  switch (benefitId) {
    case "cost":
      return [
        "Niższe całkowite koszty posiadania (TCO)",
        "Lepsze wykorzystanie budżetu IT",
        "Oszczędności do reinwestycji w innowacje",
        "Przewidywalne koszty operacyjne",
      ];
    case "agility":
      return [
        "Szybsza reakcja na zmiany rynkowe",
        "Skrócony czas wprowadzania nowych funkcji",
        "Większa elastyczność w dostosowywaniu się do potrzeb",
        "Szybkie testowanie nowych pomysłów",
      ];
    case "scalability":
      return [
        "Płynna obsługa szczytów ruchu",
        "Eliminacja przepłacania za nieużywane zasoby",
        "Wsparcie szybkiego wzrostu biznesu",
        "Dostosowanie się do sezonowych zmian",
      ];
    case "security":
      return [
        "Zmniejszenie ryzyka naruszenia danych",
        "Ochrona reputacji marki",
        "Zgodność z regulacjami (RODO, ISO27001)",
        "Spokój umysłu dla kierownictwa",
      ];
    case "insights":
      return [
        "Lepsze decyzje oparte na danych",
        "Identyfikacja trendów i wzorców",
        "Proaktywne zarządzanie problemami",
        "Odkrywanie nowych możliwości biznesowych",
      ];
    case "time":
      return [
        "Uwolnienie zasobów dla strategicznych inicjatyw",
        "Redukcja błędów wynikających z pracy manualnej",
        "Zwiększona produktywność zespołu IT",
        "Szybsze iteracje i usprawnienia",
      ];
    default:
      return [
        "Wzrost efektywności operacyjnej",
        "Poprawa doświadczeń użytkowników",
        "Zwiększona konkurencyjność",
        "Lepsze wyniki biznesowe",
      ];
  }
};
