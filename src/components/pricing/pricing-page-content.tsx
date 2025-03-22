"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import React from "react";

// Import all components statically instead of using dynamic imports
// This will reduce waterfall loading and staggering
import { SectionHeading } from "@/components/ambro-ui/section-heading";
import { Card3D } from "@/components/ambro-ui/card-3d";
import { GradientText } from "@/components/ambro-ui/gradient-text";
import { RevealText } from "@/components/ambro-ui/reveal-text";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { EnhancedButton } from "@/components/ambro-ui/enhanced-button";
import { AnimatedGradientBorder } from "@/components/ambro-ui/animated-gradient-border";
import { TiltCard } from "@/components/ambro-ui/tilt-card";

// Importowanie danych
import { pricingPlans, customPricingServices, pricingFAQ } from "@/lib/pricing";
import type { ServiceCategory } from "@/lib/services";
import CTASection from "../layout/cta-section";

// Typ dla zakładek
type TabType = "packages" | "individual";

// Komponent pakietu cenowego z Intersection Observer dla lazy loading
const PricingPlanCard = ({
  plan,
  index,
}: {
  plan: (typeof pricingPlans)[0];
  index: number;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: "100px",
  });

  return (
    <article
      ref={ref}
      className="h-full"
      aria-labelledby={`plan-title-${plan.id}`}
    >
      <AnimatedSection
        animation="slideUp"
        delay={0.05 * index}
        className={inView ? "opacity-100" : "opacity-0"}
      >
        <div
          className={`relative ${plan.highlighted ? "pt-6 md:pt-8" : ""}`}
          data-testid={`pricing-plan-${plan.id}`}
        >
          {plan.highlighted && (
            <div
              className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-5 py-1 rounded-full text-sm font-medium shadow-lg z-20"
              aria-label="Polecany plan"
            >
              Polecany
            </div>
          )}

          <TiltCard
            className={`h-full overflow-hidden ${
              plan.highlighted ? "relative z-10 scale-[1.02] md:scale-105" : ""
            }`}
            tiltAmount={3}
            glareOpacity={0.15}
            borderGlow={plan.highlighted}
            borderColor="rgba(99, 102, 241, 0.5)"
            backgroundEffect={plan.highlighted ? "gradient" : "none"}
          >
            <AnimatedGradientBorder
              borderWidth={plan.highlighted ? 2 : 1}
              borderColor={plan.color
                .replace("from-", "")
                .replace("to-", "via-purple-500 to-")}
              glowEffect
              glowIntensity={plan.highlighted ? 8 : 3}
              animated={plan.highlighted}
              backgroundColor="bg-gray-900/90"
            >
              <div className="p-5 sm:p-6 md:p-8 h-full flex flex-col">
                <header className="mb-6">
                  <h3
                    id={`plan-title-${plan.id}`}
                    className="text-xl sm:text-2xl font-bold mb-3"
                  >
                    <GradientText
                      from={plan.color.split(" ")[0].replace("from-", "")}
                      to={plan.color.split(" ")[1].replace("to-", "")}
                    >
                      {plan.name}
                    </GradientText>
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    {plan.description}
                  </p>
                </header>

                <div className="mb-8 border-b border-gray-800 pb-6">
                  <div className="flex items-baseline justify-center">
                    <span
                      className={`text-4xl sm:text-5xl font-semibold ${
                        plan.highlighted
                          ? "text-transparent bg-clip-text bg-gradient-to-r " +
                            plan.color
                          : ""
                      }`}
                      aria-label={`Cena: ${plan.price}`}
                    >
                      {plan.price}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-around">
                    <span className="text-gray-400 text-sm sm:text-base ml-2">
                      {plan.period}
                    </span>
                    <div className="mt-2 text-gray-400 text-sm">
                      lub <span className="text-gray-300">{plan.or}</span>
                    </div>
                  </div>
                </div>

                <section
                  className="mb-6 sm:mb-8 flex-grow"
                  aria-label="Zawartość pakietu"
                >
                  <h4 className="text-xs uppercase tracking-wider text-indigo-400 mb-4 font-semibold">
                    W pakiecie
                  </h4>
                  <ul className="space-y-3" aria-label="Lista funkcji">
                    {plan.features.map((feature, i) => (
                      <li
                        key={`${plan.id}-feature-${i}`}
                        className="flex items-start"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-indigo-400 mr-3 flex-shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="mb-6 sm:mb-8" aria-label="Przeznaczenie">
                  <h4 className="text-xs uppercase tracking-wider text-indigo-400 mb-3 font-semibold">
                    Idealne dla
                  </h4>
                  <div
                    className="flex flex-wrap gap-2"
                    role="list"
                    aria-label="Lista zastosowań"
                  >
                    {plan.bestFor.map((item, i) => (
                      <span
                        key={`${plan.id}-bestfor-${i}`}
                        className="px-3 py-1 text-xs rounded-full bg-indigo-900/40 text-indigo-300 border border-indigo-700/30"
                        role="listitem"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </section>

                <footer className="mt-auto w-full">
                  <Link
                    href="/kontakt?pakiet=pricing"
                    className="w-full block"
                    aria-label={`Wybierz pakiet ${plan.name}`}
                  >
                    <EnhancedButton
                      variant={plan.highlighted ? "tech" : "outline"}
                      size="lg"
                      className="w-full"
                      magneticEffect={plan.highlighted}
                      glowOnHover={plan.highlighted}
                      rippleEffect={plan.highlighted}
                    >
                      Wybierz pakiet
                    </EnhancedButton>
                  </Link>
                </footer>
              </div>
            </AnimatedGradientBorder>
          </TiltCard>
        </div>
      </AnimatedSection>
    </article>
  );
};

// Komponent usługi z indywidualną wyceną
const CustomPricingServiceCard = ({
  service,
  index,
  serviceCategories,
}: {
  service: (typeof customPricingServices)[0];
  index: number;
  serviceCategories: ServiceCategory[];
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: "100px",
  });

  // Find the matching service from service categories to get icon
  const matchingService = serviceCategories?.find(
    (cat) => cat.id === service.icon
  );

  return (
    <article
      ref={ref}
      className="relative"
      aria-labelledby={`service-title-${service.id}`}
    >
      <AnimatedSection
        animation="slideUp"
        delay={0.05 * index}
        className={inView ? "opacity-100" : "opacity-0"}
      >
        <Card3D
          interactive
          interactiveStrength={4}
          glowEffect
          glowColor="rgba(99, 102, 241, 0.4)"
          bgColor={`bg-gradient-to-br ${service.color}`}
          borderColor="border-indigo-500/20"
          className="relative"
          data-testid={`custom-service-${service.id}`}
        >
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-5 md:gap-8">
              {matchingService?.icon && (
                <div className="flex-shrink-0">
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full ${service.color}`}
                  >
                    {React.createElement(matchingService.icon, {
                      className: "w-8 h-8 sm:w-9 sm:h-9 text-white",
                    })}
                  </div>
                </div>
              )}

              <div className="flex-grow">
                <header className="mb-6">
                  <h3
                    id={`service-title-${service.id}`}
                    className="text-xl sm:text-2xl font-bold mb-3"
                  >
                    <GradientText
                      from={service.color
                        .split(" ")[0]
                        .replace("from-", "")
                        .replace("/60", "")}
                      to={service.color
                        .split(" ")[1]
                        .replace("to-", "")
                        .replace("/60", "")}
                    >
                      {service.name}
                    </GradientText>
                  </h3>
                  <p className="text-gray-300">{service.description}</p>
                </header>

                <div className="grid md:grid-cols-2 gap-8 mb-6">
                  <div className="space-y-2">
                    <p className="text-gray-400">Model cenowy</p>
                    <p className="text-white font-medium">
                      {service.pricingModel}
                    </p>
                    <p className="text-lg font-semibold text-indigo-400">
                      {service.estimatedRange}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-gray-400">Czynniki wpływające na cenę</p>
                    <ul className="space-y-2">
                      {service.factors.map((factor, i) => (
                        <li
                          key={`factor-${service.id}-${i}`}
                          className="flex items-start"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-gray-300 text-sm">
                            {factor}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Link
                    href={`/kontakt?usługa=${service.id}`}
                    aria-label={`Zapytaj o wycenę usługi ${service.name}`}
                  >
                    <EnhancedButton
                      variant="tech"
                      size="md"
                      glowOnHover={true}
                      magneticEffect={true}
                    >
                      Zapytaj o wycenę
                    </EnhancedButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Card3D>
      </AnimatedSection>
    </article>
  );
};

// FAQ komponenty
const FAQItem = ({
  item,
  index,
}: {
  item: { question: string; answer: string };
  index: number;
}) => {
  // Now the hook is at the top level of a React component
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const itemId = `faq-item-${index}`;
  const headingId = `faq-question-${index}`;

  return (
    <div ref={ref} className="faq-item" data-testid={itemId}>
      {inView && (
        <AnimatedSection animation="slideUp" delay={0.1 * index}>
          <AnimatedGradientBorder
            borderWidth={1}
            borderColor="from-indigo-500 via-purple-500 to-pink-500"
            glowEffect
            glowIntensity={3}
            animated
            backgroundColor="bg-gray-900/50"
            hoverEffect
          >
            <article className="p-6" aria-labelledby={headingId}>
              <h3
                id={headingId}
                className="text-xl font-bold mb-3 text-indigo-200"
              >
                {item.question}
              </h3>
              <div
                className="text-gray-300 text-sm leading-relaxed"
                aria-describedby={headingId}
              >
                {item.answer}
              </div>
            </article>
          </AnimatedGradientBorder>
        </AnimatedSection>
      )}
    </div>
  );
};

// FAQSection component
const FAQSection = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Najczęściej Zadawane Pytania"
          subtitle="Odpowiedzi na popularne pytania dotyczące współpracy i rozliczeń"
          alignment="center"
          divider={true}
          size="lg"
          animation="fade"
        />

        <div className="mt-16 max-w-3xl mx-auto space-y-6">
          {pricingFAQ.map((item, index) => (
            <FAQItem key={`faq-${index}`} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Główny komponent strony
export default function PricingPageContent() {
  const [activeTab, setActiveTab] = useState<TabType>("packages");
  const [loadedServiceCategories, setLoadedServiceCategories] = useState<
    ServiceCategory[]
  >([]);
  const searchParams = useSearchParams();

  // Preload all data in a single effect rather than separate ones
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Use Promise.all to fetch data concurrently
        const promises = [
          import("@/lib/services").then((module) => module.serviceCategories),
        ];

        const [serviceCategories] = await Promise.all(promises);
        setLoadedServiceCategories(serviceCategories);
      } catch (error) {
        console.error("Error preloading data:", error);
      }
    };

    fetchAllData();

    // Check for URL params for tab selection
    const tab = searchParams.get("tab");
    if (tab === "individual") {
      setActiveTab("individual");
    }
  }, [searchParams]);

  // Handler for tab change
  const handleTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab);
  }, []);

  return (
    <main className="min-h-screen  text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.1),transparent_40%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(168,85,247,0.1),transparent_40%)]"></div>
      <style jsx global>{`
        .bg-grid-pattern {
          background-size: 50px 50px;
          background-image: linear-gradient(
              to right,
              rgba(99, 102, 241, 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(99, 102, 241, 0.05) 1px,
              transparent 1px
            );
        }
      `}</style>

      {/* Header Section */}
      <section className="pt-36 pb-24 px-6 bg-gradient-to-b from-gray-950 to-black relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <AnimatedSection animation="fadeIn">
            <SectionHeading
              title="Cennik Usług"
              subtitle="Przejrzyste stawki i elastyczne pakiety dopasowane do Twoich potrzeb"
              alignment="center"
              divider={true}
              size="xl"
              animation="fade"
              gradient={true}
              gradientFrom="from-indigo-500"
              gradientTo="to-purple-600"
            />

            <div className="mt-6 text-center max-w-3xl mx-auto">
              <RevealText
                className="text-gray-400 leading-relaxed"
                delay={0.2}
                once={true}
                staggerWords={true}
                staggerDelay={0.01}
              >
                Oferuję elastyczne modele cenowe, od stałych abonamentów po
                wyceny projektowe i stawki godzinowe. Skontaktuj się, aby
                dopasować rozwiązanie do swoich potrzeb.
              </RevealText>
            </div>
          </AnimatedSection>

          {/* Tab Buttons */}
          <div className="mt-12 flex justify-center space-x-4">
            <button
              onClick={() => handleTabChange("packages")}
              className={`px-6 py-3 rounded-full transition-all ${
                activeTab === "packages"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
              aria-selected={activeTab === "packages"}
              role="tab"
            >
              Pakiety Abonamentowe
            </button>

            <button
              onClick={() => handleTabChange("individual")}
              className={`px-6 py-3 rounded-full transition-all ${
                activeTab === "individual"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
              aria-selected={activeTab === "individual"}
              role="tab"
            >
              Wyceny Indywidualne
            </button>
          </div>
        </div>
      </section>

      {/* Content transitions between sections */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent z-10"></div>
      </div>

      {/* Pricing Plans and Individual Pricing Content */}
      <section
        className="py-12 sm:py-16 px-4 sm:px-6 relative"
        aria-label="Oferta cenowa"
      >
        <div className="max-w-6xl mx-auto">
          {/* Pricing Plans Section */}
          <div
            id="panel-packages"
            role="tabpanel"
            aria-labelledby="packages-tab"
            className={activeTab === "packages" ? "block" : "hidden"}
          >
            <div className="mt-8 grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {pricingPlans.map((plan, index) => (
                <PricingPlanCard key={plan.id} plan={plan} index={index} />
              ))}
            </div>
          </div>

          {/* Individual Pricing Services */}
          <div
            id="panel-individual"
            role="tabpanel"
            aria-labelledby="individual-tab"
            className={activeTab === "individual" ? "block" : "hidden"}
          >
            <div className="mt-8 space-y-6 md:space-y-8">
              {customPricingServices.map((service, index) => (
                <CustomPricingServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  serviceCategories={loadedServiceCategories}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Additional Info Section */}
      <section className="py-24 px-6 relative">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent z-0"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12">
            <AnimatedSection animation="slideLeft" delay={0.3}>
              <Card3D
                interactive
                interactiveStrength={8}
                glowEffect
                glowColor="rgba(99, 102, 241, 0.3)"
                shadow
                bgColor="bg-gray-900/70"
                borderColor="border-indigo-500/20"
                height="100%"
              >
                <div className="p-8">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-indigo-100">
                    Elastyczne rozwiązania
                  </h3>
                  <div className="text-gray-300 mb-6">
                    <RevealText staggerLines>
                      <span>Każdy biznes ma unikalne potrzeby, dlatego</span>
                      <span>oferuję elastyczne rozwiązania cenowe</span>
                      <span>dostosowane do Twojej sytuacji i wymagań.</span>
                    </RevealText>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Niezależnie od tego, czy potrzebujesz jednorazowego
                    projektu, czy długoterminowej współpracy, znajdziemy
                    optymalny model rozliczeń, który będzie odpowiadał Twoim
                    potrzebom biznesowym i budżetowi.
                  </p>
                </div>
              </Card3D>
            </AnimatedSection>

            <AnimatedSection animation="slideRight" delay={0.4}>
              <Card3D
                interactive
                interactiveStrength={8}
                glowEffect
                glowColor="rgba(168, 85, 247, 0.3)"
                shadow
                bgColor="bg-gray-900/70"
                borderColor="border-purple-500/20"
                height="100%"
              >
                <div className="p-8">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-6 shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-purple-100">
                    Przejrzyste rozliczenia
                  </h3>
                  <div className="text-gray-300 mb-6">
                    <RevealText staggerLines>
                      <span>Cenię sobie transparentność, dlatego zawsze</span>
                      <span>
                        przedstawiam dokładną wycenę przed rozpoczęciem
                      </span>
                      <span>
                        współpracy i regularne raporty z postępów prac.
                      </span>
                    </RevealText>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Nie ma ukrytych kosztów ani niespodzianek. Otrzymujesz
                    regularny dostęp do raportów z wykonanych prac, co pozwala
                    na pełną kontrolę nad budżetem i realizowanymi zadaniami.
                  </p>
                </div>
              </Card3D>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}
