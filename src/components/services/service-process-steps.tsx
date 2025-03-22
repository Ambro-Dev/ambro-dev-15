// src/components/services/service-process-steps.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

interface Step {
  id: string;
  title: string;
  description: string;
  duration: string;
  icon: LucideIcon;
  keyPoints: string[];
}

// Dane procesu dla różnych usług
const serviceProcesses: { [key: string]: Step[] } = {
  infrastructure: [
    {
      id: "analysis",
      title: "Analiza wymagań",
      description: "Dokładne określenie potrzeb i celów infrastrukturalnych",
      duration: "1-2 dni",
      icon: HelpCircle,
      keyPoints: [
        "Identyfikacja kluczowych wymagań biznesowych",
        "Analiza obecnej infrastruktury (jeśli istnieje)",
        "Określenie skali i elastyczności rozwiązania",
        "Identyfikacja potencjalnych wyzwań i ograniczeń",
      ],
    },
    {
      id: "design",
      title: "Projektowanie architektury",
      description: "Tworzenie optymalnej architektury chmurowej",
      duration: "2-3 dni",
      icon: HelpCircle,
      keyPoints: [
        "Wybór odpowiednich usług chmurowych",
        "Projektowanie topologii sieci i zabezpieczeń",
        "Planowanie skalowalności i redundancji",
        "Optymalizacja kosztów infrastruktury",
      ],
    },
    {
      id: "implementation",
      title: "Implementacja",
      description: "Wdrożenie infrastruktury jako kodu (IaC)",
      duration: "3-7 dni",
      icon: Clock,
      keyPoints: [
        "Konfiguracja dostawcy chmury (AWS/Azure/GCP)",
        "Implementacja z wykorzystaniem Terraform/CloudFormation",
        "Konfiguracja sieci, bezpieczeństwa i monitoringu",
        "Tworzenie środowisk (dev, staging, prod)",
      ],
    },
    {
      id: "testing",
      title: "Testowanie i walidacja",
      description: "Weryfikacja poprawności działania infrastruktury",
      duration: "1-2 dni",
      icon: AlertCircle,
      keyPoints: [
        "Testowanie wydajności i skalowalności",
        "Audyt bezpieczeństwa infrastruktury",
        "Walidacja procedur backupu i disaster recovery",
        "Testowanie scenariuszy awarii i przełączania",
      ],
    },
    {
      id: "deployment",
      title: "Wdrożenie produkcyjne",
      description: "Uruchomienie infrastruktury w środowisku docelowym",
      duration: "1 dzień",
      icon: CheckCircle,
      keyPoints: [
        "Migracja danych (jeśli wymagana)",
        "Konfiguracja monitoringu produkcyjnego",
        "Uruchomienie wszystkich komponentów",
        "Weryfikacja działania po wdrożeniu",
      ],
    },
  ],
  servers: [
    {
      id: "audit",
      title: "Audyt istniejącej infrastruktury",
      description: "Analiza obecnych serwerów i architektury",
      duration: "1-2 dni",
      icon: HelpCircle,
      keyPoints: [
        "Inwentaryzacja istniejących serwerów",
        "Analiza wydajności i identyfikacja wąskich gardeł",
        "Przegląd konfiguracji i zabezpieczeń",
        "Ocena stabilności i niezawodności",
      ],
    },
    {
      id: "planning",
      title: "Planowanie i projektowanie",
      description: "Opracowanie optymalnego rozwiązania serwerowego",
      duration: "2-3 dni",
      icon: HelpCircle,
      keyPoints: [
        "Wybór odpowiednich technologii serwerowych",
        "Projektowanie architektury i specyfikacji sprzętowej",
        "Planowanie redundancji i rozwiązań wysokiej dostępności",
        "Optymalizacja kosztów i wydajności",
      ],
    },
    {
      id: "setup",
      title: "Konfiguracja i wdrożenie",
      description: "Instalacja i konfiguracja serwerów",
      duration: "3-5 dni",
      icon: Clock,
      keyPoints: [
        "Instalacja systemów operacyjnych i oprogramowania",
        "Konfiguracja zabezpieczeń i firewalli",
        "Wdrożenie rozwiązań monitorujących",
        "Automatyzacja procesu wdrożenia (IaC)",
      ],
    },
    {
      id: "migration",
      title: "Migracja i optymalizacja",
      description: "Przeniesienie aplikacji i danych na nowe serwery",
      duration: "1-3 dni",
      icon: AlertCircle,
      keyPoints: [
        "Planowanie procesu migracji z minimalizacją przestojów",
        "Przeniesienie aplikacji i danych",
        "Optymalizacja wydajności po migracji",
        "Testowanie działania i stabilności",
      ],
    },
    {
      id: "handover",
      title: "Przekazanie i dokumentacja",
      description: "Przekazanie rozwiązania i szkolenie zespołu",
      duration: "1 dzień",
      icon: CheckCircle,
      keyPoints: [
        "Przekazanie pełnej dokumentacji technicznej",
        "Szkolenie zespołu z obsługi i zarządzania",
        "Ustalenie procedur utrzymania i aktualizacji",
        "Definiowanie planów reagowania na awarie",
      ],
    },
  ],
  monitoring: [
    {
      id: "requirements",
      title: "Analiza wymagań monitoringu",
      description: "Określenie kluczowych metryk i alertów",
      duration: "1-2 dni",
      icon: HelpCircle,
      keyPoints: [
        "Identyfikacja kluczowych wskaźników do monitorowania",
        "Określenie progów alertów i powiadomień",
        "Planowanie retencji danych historycznych",
        "Analiza potrzeb raportowych",
      ],
    },
    {
      id: "setup",
      title: "Wdrożenie narzędzi monitoringu",
      description: "Instalacja i konfiguracja systemów monitorujących",
      duration: "2-4 dni",
      icon: Clock,
      keyPoints: [
        "Instalacja agentów monitorujących",
        "Konfiguracja serwerów Prometheus/Grafana/Zabbix",
        "Implementacja monitoringu infrastruktury i aplikacji",
        "Konfiguracja eksporterów danych",
      ],
    },
    {
      id: "dashboards",
      title: "Tworzenie dashboardów",
      description: "Przygotowanie przejrzystych paneli wizualizacji",
      duration: "1-2 dni",
      icon: AlertCircle,
      keyPoints: [
        "Projektowanie dashboardów dla różnych grup odbiorców",
        "Wizualizacja kluczowych metryk biznesowych",
        "Tworzenie widoków technicznych dla zespołów IT",
        "Konfiguracja raportów automatycznych",
      ],
    },
    {
      id: "alerts",
      title: "Konfiguracja alertów",
      description: "Ustawienie systemu powiadomień i alertów",
      duration: "1-2 dni",
      icon: CheckCircle,
      keyPoints: [
        "Konfiguracja progów alertów i reguł",
        "Integracja z systemami powiadomień (Slack, email, SMS)",
        "Ustawienie eskalacji alertów",
        "Testowanie systemu powiadomień",
      ],
    },
    {
      id: "testing",
      title: "Testowanie i optymalizacja",
      description: "Weryfikacja działania systemu monitoringu",
      duration: "1-2 dni",
      icon: CheckCircle,
      keyPoints: [
        "Testowanie systemu w różnych scenariuszach",
        "Eliminacja fałszywych alertów",
        "Optymalizacja wydajności monitoringu",
        "Szkolenie zespołu z obsługi systemu",
      ],
    },
  ],
  security: [
    {
      id: "audit",
      title: "Audyt bezpieczeństwa",
      description: "Kompleksowy przegląd aktualnych zabezpieczeń",
      duration: "2-3 dni",
      icon: HelpCircle,
      keyPoints: [
        "Identyfikacja podatności i luk bezpieczeństwa",
        "Analiza polityk i procedur bezpieczeństwa",
        "Rewizja uprawnień i kontroli dostępu",
        "Ocena zgodności z regulacjami (RODO, ISO27001)",
      ],
    },
    {
      id: "planning",
      title: "Planowanie zabezpieczeń",
      description: "Opracowanie strategii bezpieczeństwa",
      duration: "1-2 dni",
      icon: Clock,
      keyPoints: [
        "Projektowanie architektury bezpieczeństwa",
        "Wybór odpowiednich rozwiązań i narzędzi",
        "Planowanie procesu wdrożenia zmian",
        "Definiowanie polityk bezpieczeństwa",
      ],
    },
    {
      id: "implementation",
      title: "Implementacja zabezpieczeń",
      description: "Wdrożenie zaplanowanych rozwiązań ochronnych",
      duration: "3-7 dni",
      icon: AlertCircle,
      keyPoints: [
        "Konfiguracja firewalli i systemów wykrywania włamań",
        "Wdrożenie uwierzytelniania wieloskładnikowego",
        "Implementacja szyfrowania danych",
        "Hardening systemów i aplikacji",
      ],
    },
    {
      id: "testing",
      title: "Testowanie bezpieczeństwa",
      description: "Weryfikacja skuteczności wdrożonych zabezpieczeń",
      duration: "2-3 dni",
      icon: AlertCircle,
      keyPoints: [
        "Przeprowadzenie testów penetracyjnych",
        "Symulacje ataków i analiza reakcji",
        "Weryfikacja bezpieczeństwa aplikacji",
        "Testy odporności na ataki DDoS",
      ],
    },
    {
      id: "training",
      title: "Szkolenia i procedury",
      description: "Przygotowanie zespołu i procedur bezpieczeństwa",
      duration: "1-2 dni",
      icon: CheckCircle,
      keyPoints: [
        "Szkolenia dla pracowników z zakresu bezpieczeństwa",
        "Utworzenie procedur reagowania na incydenty",
        "Dokumentacja polityk bezpieczeństwa",
        "Plan ciągłego doskonalenia bezpieczeństwa",
      ],
    },
  ],
  databases: [
    {
      id: "analysis",
      title: "Analiza potrzeb",
      description: "Określenie wymagań dla bazy danych",
      duration: "1-2 dni",
      icon: HelpCircle,
      keyPoints: [
        "Określenie typu danych i modelu bazy",
        "Analiza wymagań wydajnościowych",
        "Planowanie skalowalności i dostępności",
        "Identyfikacja wymagań zgodności i bezpieczeństwa",
      ],
    },
    {
      id: "design",
      title: "Projektowanie struktury",
      description: "Utworzenie optymalnego modelu danych",
      duration: "2-3 dni",
      icon: Clock,
      keyPoints: [
        "Projektowanie schematów i relacji",
        "Optymalizacja pod kątem wydajności",
        "Planowanie indeksów i partycjonowania",
        "Projektowanie strategii backupu i replikacji",
      ],
    },
    {
      id: "implementation",
      title: "Implementacja bazy danych",
      description: "Wdrożenie zaprojektowanej bazy danych",
      duration: "2-4 dni",
      icon: Clock,
      keyPoints: [
        "Instalacja i konfiguracja serwerów bazodanowych",
        "Tworzenie struktur zgodnie z projektem",
        "Implementacja zabezpieczeń i kontroli dostępu",
        "Konfiguracja replikacji i klastrów",
      ],
    },
    {
      id: "migration",
      title: "Migracja danych",
      description: "Przeniesienie danych z istniejących systemów",
      duration: "1-5 dni",
      icon: AlertCircle,
      keyPoints: [
        "Planowanie procesu migracji",
        "Ekstrahowanie danych ze źródeł",
        "Transformacja i walidacja danych",
        "Ładowanie danych do nowej bazy",
      ],
    },
    {
      id: "optimization",
      title: "Optymalizacja i monitoring",
      description: "Dostrojenie wydajności i monitorowanie",
      duration: "1-3 dni",
      icon: CheckCircle,
      keyPoints: [
        "Optymalizacja zapytań i indeksów",
        "Konfiguracja narzędzi monitoringu",
        "Planowanie konserwacji i aktualizacji",
        "Testowanie wydajności pod obciążeniem",
      ],
    },
  ],
  deployment: [
    {
      id: "setup",
      title: "Konfiguracja środowiska CI/CD",
      description: "Przygotowanie infrastruktury do automatyzacji",
      duration: "1-3 dni",
      icon: HelpCircle,
      keyPoints: [
        "Wybór i konfiguracja narzędzi CI/CD",
        "Integracja z systemem kontroli wersji",
        "Konfiguracja środowisk (dev, staging, prod)",
        "Przygotowanie kredencjałów i uprawnień",
      ],
    },
    {
      id: "pipeline",
      title: "Budowa pipeline'ów",
      description: "Tworzenie procesów automatyzacji wdrożeń",
      duration: "2-4 dni",
      icon: Clock,
      keyPoints: [
        "Definiowanie etapów pipeline'u",
        "Konfiguracja automatycznych testów",
        "Implementacja procesów budowania artefaktów",
        "Integracja z systemami monitoringu",
      ],
    },
    {
      id: "automation",
      title: "Automatyzacja wdrożeń",
      description: "Konfiguracja automatycznych deploymentów",
      duration: "1-3 dni",
      icon: Clock,
      keyPoints: [
        "Implementacja wdrożeń zero-downtime",
        "Automatyzacja rollbacków w przypadku awarii",
        "Konfiguracja strategii wdrażania (blue-green, canary)",
        "Integracja z zarządzaniem konfiguracją",
      ],
    },
    {
      id: "security",
      title: "Integracja bezpieczeństwa",
      description: "Wbudowanie bezpieczeństwa w proces CI/CD",
      duration: "1-2 dni",
      icon: AlertCircle,
      keyPoints: [
        "Implementacja skanowania kodu i zależności",
        "Testy bezpieczeństwa aplikacji (SAST, DAST)",
        "Skanowanie kontenerów i obrazów",
        "Weryfikacja zgodności z politykami",
      ],
    },
    {
      id: "handover",
      title: "Dokumentacja i przekazanie",
      description: "Przygotowanie zespołu do korzystania z CI/CD",
      duration: "1 dzień",
      icon: CheckCircle,
      keyPoints: [
        "Kompleksowa dokumentacja procesów",
        "Szkolenie zespołu deweloperskiego",
        "Ustalenie procedur utrzymania pipeline'ów",
        "Przekazanie wiedzy i najlepszych praktyk",
      ],
    },
  ],
  webapps: [
    {
      id: "requirements",
      title: "Analiza wymagań",
      description: "Określenie funkcjonalności i architektury aplikacji",
      duration: "1-3 dni",
      icon: HelpCircle,
      keyPoints: [
        "Zbieranie wymagań funkcjonalnych i biznesowych",
        "Definiowanie architektury technicznej",
        "Projektowanie modelu danych",
        "Planowanie interfejsu użytkownika",
      ],
    },
    {
      id: "design",
      title: "Projektowanie UI/UX",
      description: "Tworzenie interfejsu użytkownika i doświadczeń",
      duration: "2-5 dni",
      icon: Clock,
      keyPoints: [
        "Projektowanie makiet i prototypów",
        "Definiowanie ścieżek użytkownika",
        "Projektowanie responsywnego layoutu",
        "Optymalizacja doświadczeń użytkownika",
      ],
    },
    {
      id: "development",
      title: "Implementacja aplikacji",
      description: "Programowanie funkcjonalności i komponentów",
      duration: "5-15 dni",
      icon: Clock,
      keyPoints: [
        "Rozwój frontendu (React, Vue, Angular)",
        "Implementacja backendu i API",
        "Integracja z bazami danych",
        "Tworzenie systemu autoryzacji i uwierzytelniania",
      ],
    },
    {
      id: "testing",
      title: "Testowanie i QA",
      description: "Walidacja jakości i funkcjonalności",
      duration: "2-5 dni",
      icon: AlertCircle,
      keyPoints: [
        "Testy jednostkowe i integracyjne",
        "Testy UI i e2e",
        "Testy wydajnościowe",
        "Testy bezpieczeństwa aplikacji",
      ],
    },
    {
      id: "deployment",
      title: "Wdrożenie i uruchomienie",
      description: "Publikacja aplikacji w środowisku produkcyjnym",
      duration: "1-2 dni",
      icon: CheckCircle,
      keyPoints: [
        "Konfiguracja środowiska produkcyjnego",
        "Wdrożenie wersji produkcyjnej",
        "Konfiguracja domeny i certyfikatów SSL",
        "Monitoring i obserwacja po wdrożeniu",
      ],
    },
  ],
  architecture: [
    {
      id: "discovery",
      title: "Analiza i odkrywanie",
      description: "Zrozumienie potrzeb i ograniczeń",
      duration: "1-3 dni",
      icon: HelpCircle,
      keyPoints: [
        "Rozmowy z interesariuszami i zespołami",
        "Zrozumienie celów biznesowych",
        "Identyfikacja ograniczeń technicznych",
        "Inwentaryzacja istniejących systemów",
      ],
    },
    {
      id: "strategy",
      title: "Strategia architektoniczna",
      description: "Określenie kierunku i celów architektury",
      duration: "2-3 dni",
      icon: Clock,
      keyPoints: [
        "Ustalenie zasad architektury",
        "Wybór podejścia architektonicznego",
        "Definiowanie metodologii rozwoju",
        "Planowanie ewolucji architektury",
      ],
    },
    {
      id: "design",
      title: "Projektowanie rozwiązania",
      description: "Tworzenie szczegółowej architektury systemu",
      duration: "3-7 dni",
      icon: Clock,
      keyPoints: [
        "Projektowanie architektury modułów",
        "Definiowanie interfejsów i integracji",
        "Planowanie skalowalności i wydajności",
        "Projektowanie bezpieczeństwa systemu",
      ],
    },
    {
      id: "validation",
      title: "Walidacja architektury",
      description: "Weryfikacja założeń i rozwiązań",
      duration: "1-3 dni",
      icon: AlertCircle,
      keyPoints: [
        "Przegląd architektury przez interesariuszy",
        "Analiza ryzyka i wąskich gardeł",
        "Walidacja wymagań niefunkcjonalnych",
        "Prototypowanie kluczowych elementów",
      ],
    },
    {
      id: "documentation",
      title: "Dokumentacja i przekazanie",
      description: "Tworzenie dokumentacji technicznej",
      duration: "2-4 dni",
      icon: CheckCircle,
      keyPoints: [
        "Opracowanie dokumentacji architektury",
        "Tworzenie diagramów i schematów",
        "Definiowanie standardów i wytycznych",
        "Przekazanie wiedzy zespołom wdrożeniowym",
      ],
    },
  ],
};

// Domyślny proces do użycia, jeśli nie znajdzie usługi
const defaultProcess = serviceProcesses.infrastructure;

const ServiceProcessSteps: React.FC<{
  serviceId: string;
  primaryColor: string;
}> = ({ serviceId, primaryColor }) => {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [steps, setSteps] = useState<Step[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Set up steps and active step
  useEffect(() => {
    const serviceSteps = serviceProcesses[serviceId] || defaultProcess;
    setSteps(serviceSteps);

    if (serviceSteps.length > 0 && !activeStep) {
      setActiveStep(serviceSteps[0].id);
    }
  }, [serviceId, activeStep]);

  // Timeline animation variants
  const timelineVariants = {
    initial: { width: "0%" },
    animate: {
      width: "100%",
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

  // Step animation variants
  const stepVariants = {
    inactive: { scale: 1 },
    active: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  // Content animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="flex flex-col">
      {/* Modern Timeline */}
      <div
        ref={timelineRef}
        className="relative flex items-center justify-between mb-12 overflow-x-auto pb-4 pt-2"
      >
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-800 transform -translate-y-1/2 z-0"></div>

        <motion.div
          className={`absolute top-1/2 left-0 h-0.5 bg-${primaryColor}-500 transform -translate-y-1/2 z-10`}
          variants={timelineVariants}
          initial="initial"
          animate="animate"
        />

        {steps.map((step, index) => {
          const isActive = step.id === activeStep;
          const isPast = steps.findIndex((s) => s.id === activeStep) > index;

          return (
            <motion.div
              key={step.id}
              className={`relative z-20 flex flex-col items-center cursor-pointer px-4 min-w-[100px]`}
              onClick={() => setActiveStep(step.id)}
              variants={stepVariants}
              animate={isActive ? "active" : "inactive"}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2
                  ${
                    isActive
                      ? `bg-${primaryColor}-500 text-white shadow-lg shadow-${primaryColor}-500/20`
                      : isPast
                      ? `bg-${primaryColor}-900/50 text-${primaryColor}-300`
                      : "bg-gray-800 text-gray-400"
                  }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: isActive ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {isPast ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </motion.div>

              <div className="text-center">
                <p
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive ? `text-${primaryColor}-400` : "text-gray-400"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                  {step.duration}
                </p>
              </div>

              {isActive && (
                <motion.div
                  className={`absolute -bottom-2 w-2 h-2 rounded-full bg-${primaryColor}-500`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  layoutId="activeIndicator"
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {steps.map((step) => {
          if (step.id !== activeStep) return null;

          return (
            <motion.div
              key={`content-${step.id}`}
              className="grid md:grid-cols-2 gap-8 rounded-xl border border-gray-800/50 bg-gray-900/30 p-6"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`p-3 rounded-full bg-${primaryColor}-900/30 text-${primaryColor}-400 shadow-inner shadow-${primaryColor}-500/10`}
                  >
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3
                      className={`text-xl font-semibold text-${primaryColor}-300`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Szacowany czas: {step.duration}
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  {step.description}
                </p>

                <div className="bg-gray-800/30 rounded-lg p-5 backdrop-blur-sm border border-gray-800/50">
                  <h4 className="font-medium text-white mb-4 flex items-center gap-2">
                    <span
                      className={`w-1 h-5 bg-${primaryColor}-500 rounded-sm inline-block`}
                    ></span>
                    Kluczowe elementy
                  </h4>

                  <ul className="space-y-2">
                    {step.keyPoints.map((point, idx) => (
                      <motion.li
                        key={`point-${idx}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <span
                          className={`w-5 h-5 rounded-full bg-${primaryColor}-900/30 flex items-center justify-center flex-shrink-0 mt-0.5`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-3 h-3 text-${primaryColor}-400`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <title>check</title>
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <span className="text-gray-300">{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div
                  className={`relative w-full h-full max-h-60 flex items-center justify-center rounded-lg 
                    bg-gradient-to-br from-gray-900 to-gray-900/80 p-4 border border-gray-800/50 overflow-hidden`}
                >
                  <div
                    className={`text-${primaryColor}-400 opacity-10 absolute inset-0 flex items-center justify-center`}
                  >
                    <svg
                      className="w-full h-full max-w-[240px] max-h-[240px]"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>process</title>
                      {step.id === "analysis" ||
                      step.id === "requirements" ||
                      step.id === "discovery" ||
                      step.id === "audit" ? (
                        // Analysis / Requirements
                        <path
                          d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="currentColor"
                        />
                      ) : step.id === "planning" ||
                        step.id === "design" ||
                        step.id === "strategy" ? (
                        // Planning / Design
                        <path
                          d="M9 4.45c.74-.77 1.07-1.55 2.93-1.45C14.08 3.03 15 4.15 15 5.5c0 1.8-1.98 3.08-3.5 4.5-1.5 1.35-2 2.05-2.5 3.5m0 4v.5m5-11c1.21 0 2.5.8 2.5 2.5S16 12 14 12c-1.5 0-2.5-.5-2.5-1"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="currentColor"
                        />
                      ) : step.id === "development" ||
                        step.id === "setup" ||
                        step.id === "implementation" ? (
                        // Development / Implementation
                        <path
                          d="M8 9l3 3-3 3m5 0h3M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="currentColor"
                        />
                      ) : step.id === "testing" ||
                        step.id === "validation" ||
                        step.id === "verification" ? (
                        // Testing / Validation
                        <path
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="currentColor"
                        />
                      ) : (
                        // Deployment / Final Step
                        <path
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="currentColor"
                        />
                      )}
                    </svg>
                  </div>

                  <motion.div
                    className={`absolute bottom-4 right-4 text-${primaryColor}-400 text-sm font-mono bg-${primaryColor}-900/20 px-2 py-1 rounded`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    Step {steps.findIndex((s) => s.id === step.id) + 1}/
                    {steps.length}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="flex justify-between mt-8">
        <motion.button
          className={`px-4 py-2 rounded-md border border-gray-800 flex items-center gap-2 
            ${
              steps.findIndex((s) => s.id === activeStep) === 0
                ? "opacity-50 cursor-not-allowed bg-gray-900/30 text-gray-500"
                : "bg-gray-900/60 text-gray-300 hover:bg-gray-800/80 hover:border-gray-700"
            }`}
          disabled={steps.findIndex((s) => s.id === activeStep) === 0}
          onClick={() => {
            const currentIndex = steps.findIndex((s) => s.id === activeStep);
            if (currentIndex > 0) {
              setActiveStep(steps[currentIndex - 1].id);
            }
          }}
          whileHover={{
            scale: steps.findIndex((s) => s.id === activeStep) === 0 ? 1 : 1.03,
          }}
          whileTap={{
            scale: steps.findIndex((s) => s.id === activeStep) === 0 ? 1 : 0.98,
          }}
        >
          <ArrowRight className="w-4 h-4 transform rotate-180" />
          <span>Poprzedni krok</span>
        </motion.button>

        <motion.button
          className={`px-4 py-2 rounded-md flex items-center gap-2
            ${
              steps.findIndex((s) => s.id === activeStep) === steps.length - 1
                ? `bg-${primaryColor}-600 text-white border border-${primaryColor}-500`
                : `bg-${primaryColor}-600/90 hover:bg-${primaryColor}-500 text-white border border-${primaryColor}-500/80`
            }`}
          onClick={() => {
            const currentIndex = steps.findIndex((s) => s.id === activeStep);
            if (currentIndex < steps.length - 1) {
              setActiveStep(steps[currentIndex + 1].id);
            }
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>
            {steps.findIndex((s) => s.id === activeStep) === steps.length - 1
              ? "Zakończ proces"
              : "Następny krok"}
          </span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
};

export default ServiceProcessSteps;
