/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/services/service-benefits-chart.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell,
} from "recharts";
import {
  Zap,
  TrendingUp,
  ShieldCheck,
  DollarSign,
  Clock,
  LineChart,
  LayoutGrid,
  type LucideIcon,
  BarChart3,
  RadarIcon,
  ChevronRight,
} from "lucide-react";
import { TiltCard } from "@/components/ambro-ui/tilt-card";
import ServiceIcon from "@/components/services/service-icon";

interface BenefitData {
  name: string;
  value: number;
  description: string;
  icon: LucideIcon;
}

// Dane korzyści dla różnych usług
const serviceBenefits: { [key: string]: BenefitData[] } = {
  infrastructure: [
    {
      name: "Skalowalność",
      value: 90,
      description: "Łatwe skalowanie infrastruktury w zależności od obciążenia",
      icon: TrendingUp,
    },
    {
      name: "Niezawodność",
      value: 85,
      description: "Wysoka dostępność i odporność na awarie",
      icon: ShieldCheck,
    },
    {
      name: "Oszczędność kosztów",
      value: 75,
      description: "Redukcja kosztów dzięki optymalizacji zasobów",
      icon: DollarSign,
    },
    {
      name: "Bezpieczeństwo",
      value: 80,
      description: "Wbudowane mechanizmy bezpieczeństwa i ochrony danych",
      icon: ShieldCheck,
    },
    {
      name: "Szybkość wdrożenia",
      value: 85,
      description: "Błyskawiczne wdrażanie nowych środowisk",
      icon: Zap,
    },
    {
      name: "Automatyzacja",
      value: 95,
      description: "Automatyzacja zarządzania i konfiguracji",
      icon: LayoutGrid,
    },
  ],
  servers: [
    {
      name: "Wydajność",
      value: 85,
      description: "Zoptymalizowana wydajność serwerów",
      icon: Zap,
    },
    {
      name: "Niezawodność",
      value: 90,
      description: "Wysoka dostępność i minimalizacja przestojów",
      icon: ShieldCheck,
    },
    {
      name: "Bezpieczeństwo",
      value: 85,
      description: "Zaawansowane mechanizmy zabezpieczeń",
      icon: ShieldCheck,
    },
    {
      name: "Monitorowanie",
      value: 80,
      description: "Kompleksowy monitoring i alerty",
      icon: LineChart,
    },
    {
      name: "Oszczędność kosztów",
      value: 70,
      description: "Optymalizacja wykorzystania zasobów",
      icon: DollarSign,
    },
    {
      name: "Skalowalność",
      value: 75,
      description: "Możliwość szybkiego skalowania w górę i w dół",
      icon: TrendingUp,
    },
  ],
  monitoring: [
    {
      name: "Widoczność",
      value: 95,
      description: "Pełna widoczność infrastruktury i aplikacji",
      icon: LineChart,
    },
    {
      name: "Szybkie reagowanie",
      value: 90,
      description: "Natychmiastowa reakcja na problemy",
      icon: Zap,
    },
    {
      name: "Przewidywanie problemów",
      value: 80,
      description: "Wykrywanie potencjalnych problemów zanim wystąpią",
      icon: TrendingUp,
    },
    {
      name: "Analiza wydajności",
      value: 85,
      description: "Szczegółowa analiza wydajności i trendów",
      icon: LineChart,
    },
    {
      name: "Raportowanie",
      value: 80,
      description: "Automatyczne raporty i dashboardy",
      icon: LayoutGrid,
    },
    {
      name: "Optymalizacja zasobów",
      value: 75,
      description: "Identyfikacja możliwości optymalizacji",
      icon: DollarSign,
    },
  ],
  security: [
    {
      name: "Ochrona danych",
      value: 95,
      description: "Kompleksowa ochrona danych wrażliwych",
      icon: ShieldCheck,
    },
    {
      name: "Wykrywanie zagrożeń",
      value: 90,
      description: "Zaawansowane wykrywanie i zapobieganie włamaniom",
      icon: ShieldCheck,
    },
    {
      name: "Zgodność z przepisami",
      value: 85,
      description: "Zapewnienie zgodności z RODO i innymi regulacjami",
      icon: ShieldCheck,
    },
    {
      name: "Ciągłość biznesowa",
      value: 80,
      description: "Minimalizacja ryzyka przestojów związanych z incydentami",
      icon: TrendingUp,
    },
    {
      name: "Bezpieczeństwo sieci",
      value: 85,
      description: "Zabezpieczenie komunikacji sieciowej",
      icon: ShieldCheck,
    },
    {
      name: "Edukacja pracowników",
      value: 75,
      description: "Szkolenia i zwiększanie świadomości bezpieczeństwa",
      icon: LineChart,
    },
  ],
  databases: [
    {
      name: "Wydajność zapytań",
      value: 90,
      description: "Zoptymalizowana wydajność zapytań do bazy danych",
      icon: Zap,
    },
    {
      name: "Niezawodność danych",
      value: 95,
      description: "Zapewnienie integralności i spójności danych",
      icon: ShieldCheck,
    },
    {
      name: "Skalowalność",
      value: 85,
      description: "Łatwe skalowanie wraz ze wzrostem ilości danych",
      icon: TrendingUp,
    },
    {
      name: "Bezpieczeństwo",
      value: 90,
      description: "Zaawansowane mechanizmy ochrony danych",
      icon: ShieldCheck,
    },
    {
      name: "Backup i odzyskiwanie",
      value: 85,
      description: "Niezawodne mechanizmy tworzenia kopii zapasowych",
      icon: Clock,
    },
    {
      name: "Dostępność",
      value: 80,
      description: "Wysoka dostępność i minimalizacja przestojów",
      icon: LineChart,
    },
  ],
  deployment: [
    {
      name: "Szybkość wdrożeń",
      value: 95,
      description: "Skrócenie czasu dostarczania nowych funkcji",
      icon: Zap,
    },
    {
      name: "Automatyzacja",
      value: 90,
      description: "Automatyzacja całego procesu wdrażania",
      icon: LayoutGrid,
    },
    {
      name: "Jakość kodu",
      value: 85,
      description: "Poprawa jakości kodu dzięki automatycznym testom",
      icon: ShieldCheck,
    },
    {
      name: "Niezawodność wdrożeń",
      value: 85,
      description: "Redukcja błędów związanych z wdrożeniami",
      icon: ShieldCheck,
    },
    {
      name: "Szybki rollback",
      value: 80,
      description: "Możliwość szybkiego wycofania zmian w razie problemów",
      icon: Clock,
    },
    {
      name: "Transparentność",
      value: 75,
      description: "Pełna widoczność procesu wdrożeniowego",
      icon: LineChart,
    },
  ],
  webapps: [
    {
      name: "UX/UI",
      value: 95,
      description: "Intuicyjny i atrakcyjny interfejs użytkownika",
      icon: LayoutGrid,
    },
    {
      name: "Wydajność",
      value: 85,
      description: "Optymalna wydajność i szybkość ładowania",
      icon: Zap,
    },
    {
      name: "Skalowalność",
      value: 80,
      description: "Możliwość obsługi rosnącej liczby użytkowników",
      icon: TrendingUp,
    },
    {
      name: "Bezpieczeństwo",
      value: 90,
      description: "Ochrona przed popularnymi zagrożeniami web",
      icon: ShieldCheck,
    },
    {
      name: "Responsywność",
      value: 95,
      description: "Doskonałe działanie na wszystkich urządzeniach",
      icon: LayoutGrid,
    },
    {
      name: "Funkcjonalność",
      value: 90,
      description: "Bogaty zestaw funkcji dopasowanych do potrzeb",
      icon: LayoutGrid,
    },
  ],
  architecture: [
    {
      name: "Skalowalność",
      value: 90,
      description: "Architektura gotowa na przyszły wzrost",
      icon: TrendingUp,
    },
    {
      name: "Elastyczność",
      value: 85,
      description: "Łatwość dostosowania do zmieniających się wymagań",
      icon: LayoutGrid,
    },
    {
      name: "Wydajność",
      value: 85,
      description: "Zoptymalizowana wydajność systemu",
      icon: Zap,
    },
    {
      name: "Maintainability",
      value: 90,
      description: "Łatwość utrzymania i rozwoju systemu",
      icon: Clock,
    },
    {
      name: "Bezpieczeństwo",
      value: 85,
      description: "Bezpieczeństwo wbudowane w architekturę",
      icon: ShieldCheck,
    },
    {
      name: "Spójność",
      value: 80,
      description: "Spójna i przemyślana struktura systemu",
      icon: LayoutGrid,
    },
  ],
};

// Domyślne korzyści do użycia, jeśli nie znajdzie usługi
const defaultBenefits = serviceBenefits.infrastructure;

// Custom tooltip component
const CustomTooltip = ({ active, payload, primaryColor }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={`p-3 bg-gray-900/90 border border-${primaryColor}-500/30 rounded-lg shadow-lg backdrop-blur-sm max-w-xs`}
      >
        <p className="text-white font-medium mb-1">{payload[0].payload.name}</p>
        <p className={`text-${primaryColor}-400 text-sm`}>
          Ocena: <span className="font-mono">{payload[0].value}</span>/100
        </p>
        <p className="text-gray-400 text-xs mt-2">
          {payload[0].payload.description}
        </p>
      </div>
    );
  }
  return null;
};

// Color conversion function
const getColorHex = (color: string): string => {
  const colorMap: { [key: string]: string } = {
    indigo: "6366f1",
    blue: "3b82f6",
    emerald: "10b981",
    sky: "0ea5e9",
    purple: "a855f7",
    amber: "f59e0b",
    pink: "ec4899",
  };

  return colorMap[color] || "6366f1";
};

// Main component
const ServiceBenefitsChart: React.FC<{
  serviceId: string;
  primaryColor: string;
  secondaryColor?: string;
}> = ({ serviceId, primaryColor, secondaryColor = primaryColor }) => {
  const [chartType, setChartType] = useState<"bar" | "radar">("radar");
  const [selectedBenefit, setSelectedBenefit] = useState<string | null>(null);
  const [benefits, setBenefits] = useState<BenefitData[]>([]);
  const [chartLoaded, setChartLoaded] = useState(false);

  useEffect(() => {
    // Get data for the specified service or use default
    const serviceData = serviceBenefits[serviceId] || defaultBenefits;
    setBenefits(Array.isArray(serviceData) ? serviceData : []);

    // Set the first benefit as selected on initial load
    if (
      !selectedBenefit &&
      Array.isArray(serviceData) &&
      serviceData.length > 0 &&
      serviceData[0]?.name
    ) {
      setSelectedBenefit(serviceData[0].name);
    }

    // Reset chart animation status
    setChartLoaded(false);
    setTimeout(() => setChartLoaded(true), 100);
  }, [serviceId, selectedBenefit]);

  // Get hex color for charts
  const primaryColorHex = `#${getColorHex(primaryColor)}`;
  const secondaryColorHex = `#${getColorHex(secondaryColor)}`;

  // Sort benefits by value
  const sortedBenefits = Array.isArray(benefits)
    ? [...benefits].sort((a, b) => b.value - a.value)
    : [];

  // Fix the selectedBenefitDetails with safe access
  const selectedBenefitDetails = Array.isArray(benefits)
    ? benefits.find((b) => b && b.name === selectedBenefit) || null
    : null;

  // Chart event handlers with safety checks
  const handleChartClick = (data: any) => {
    if (data && typeof data === "object" && data.name) {
      setSelectedBenefit(data.name);
    }
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const detailsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 28,
        delay: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 },
    },
  };

  // Create unique identifiers for animation elements based on selected benefit
  const uniqueKey = selectedBenefit
    ? `benefit-${selectedBenefit.replace(/\s+/g, "-").toLowerCase()}`
    : "no-selection";

  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Chart Controls */}
      <motion.div
        className="flex justify-between items-center mb-6"
        variants={itemVariants}
      >
        <h3 className="text-xl font-semibold text-white">Mierzalne korzyści</h3>

        <div
          className={`bg-gray-800/60 p-1 rounded-lg flex space-x-1 border border-gray-800`}
        >
          <button
            className={`flex items-center justify-center p-2 rounded text-sm font-medium transition-all duration-300
              ${
                chartType === "radar"
                  ? `bg-${primaryColor}-900/70 text-${primaryColor}-300`
                  : "text-gray-400 hover:text-white"
              }`}
            onClick={() => setChartType("radar")}
            aria-label="Przełącz na wykres radarowy"
          >
            <RadarIcon size={16} className="mr-1" />
            <span className="hidden sm:inline">Radar</span>
          </button>
          <button
            className={`flex items-center justify-center p-2 rounded text-sm font-medium transition-all duration-300
              ${
                chartType === "bar"
                  ? `bg-${primaryColor}-900/70 text-${primaryColor}-300`
                  : "text-gray-400 hover:text-white"
              }`}
            onClick={() => setChartType("bar")}
            aria-label="Przełącz na wykres słupkowy"
          >
            <BarChart3 size={16} className="mr-1" />
            <span className="hidden sm:inline">Bar</span>
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid md:grid-cols-5 gap-6">
        {/* Benefits List - Sidebar */}
        <motion.div className="md:col-span-2" variants={itemVariants}>
          <div
            className={`space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-${primaryColor}-900 scrollbar-track-gray-800/30`}
          >
            {sortedBenefits.map((benefit) => (
              <motion.div
                key={benefit.name}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="transform-gpu"
              >
                <TiltCard
                  tiltAmount={3}
                  glareOpacity={0.05}
                  className={`cursor-pointer transition-all duration-300 bg-gray-900/40 hover:bg-gray-900/60 
                    ${
                      selectedBenefit === benefit.name
                        ? `ring-1 ring-${primaryColor}-500 shadow-lg shadow-${primaryColor}-900/10`
                        : "ring-1 ring-gray-800/80"
                    }`}
                  onClick={() => setSelectedBenefit(benefit.name)}
                  scale={1.02}
                >
                  <div className="p-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-md ${
                          selectedBenefit === benefit.name
                            ? `bg-${primaryColor}-900/70 text-${primaryColor}-300`
                            : "bg-gray-800/80 text-gray-400"
                        }`}
                      >
                        <benefit.icon size={16} />
                      </div>
                      <div className="flex-1">
                        <h3
                          className={`font-medium ${
                            selectedBenefit === benefit.name
                              ? `text-${primaryColor}-300`
                              : "text-white"
                          }`}
                        >
                          {benefit.name}
                        </h3>
                        <div className="flex items-center mt-1">
                          <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-${primaryColor}-${
                                selectedBenefit === benefit.name
                                  ? "500"
                                  : "700/50"
                              } rounded-full`}
                              style={{ width: `${benefit.value}%` }}
                            />
                          </div>
                          <span
                            className={`ml-2 text-xs ${
                              selectedBenefit === benefit.name
                                ? `text-${primaryColor}-400`
                                : "text-gray-500"
                            }`}
                          >
                            {benefit.value}
                          </span>
                        </div>
                      </div>

                      {selectedBenefit === benefit.name && (
                        <ChevronRight
                          size={16}
                          className={`text-${primaryColor}-400`}
                        />
                      )}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Chart Area */}
        <motion.div
          className="md:col-span-3 bg-gray-900/30 rounded-xl border border-gray-800/50 backdrop-blur-sm"
          variants={itemVariants}
        >
          {chartLoaded && (
            <AnimatePresence mode="wait">
              <motion.div
                className="p-4 h-[400px] relative"
                key={`chart-${chartType}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === "bar" ? (
                    <BarChart
                      data={sortedBenefits}
                      margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
                      layout="vertical"
                      barSize={20}
                      onClick={handleChartClick}
                    >
                      <defs>
                        <linearGradient
                          id="barGradient"
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="0"
                        >
                          <stop
                            offset="0%"
                            stopColor={primaryColorHex}
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="100%"
                            stopColor={secondaryColorHex}
                            stopOpacity={0.8}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#374151"
                        horizontal={true}
                        vertical={false}
                      />
                      <XAxis
                        type="number"
                        domain={[0, 100]}
                        tick={{ fill: "#9CA3AF" }}
                        axisLine={{ stroke: "#4B5563" }}
                        tickLine={{ stroke: "#4B5563" }}
                      />
                      <YAxis
                        dataKey="name"
                        type="category"
                        tick={{ fill: "#D1D5DB" }}
                        width={120}
                        axisLine={{ stroke: "#4B5563" }}
                        tickLine={{ stroke: "#4B5563" }}
                      />
                      <Tooltip
                        content={<CustomTooltip primaryColor={primaryColor} />}
                        cursor={{ fill: "rgba(107, 114, 128, 0.15)" }}
                      />
                      <Bar
                        dataKey="value"
                        name="Ocena"
                        fill="url(#barGradient)"
                        onClick={(data) => setSelectedBenefit(data.name)}
                        isAnimationActive={true}
                        animationDuration={1000}
                        animationEasing="ease-out"
                        radius={[0, 4, 4, 0]}
                      >
                        {sortedBenefits.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              entry.name === selectedBenefit
                                ? primaryColorHex
                                : `url(#barGradient)`
                            }
                            cursor="pointer"
                            stroke={
                              entry.name === selectedBenefit
                                ? primaryColorHex
                                : "none"
                            }
                            strokeWidth={entry.name === selectedBenefit ? 1 : 0}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  ) : (
                    <RadarChart
                      cx="50%"
                      cy="50%"
                      outerRadius="70%"
                      data={benefits}
                      onClick={handleChartClick}
                    >
                      <defs>
                        <linearGradient
                          id="radarGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor={primaryColorHex}
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="100%"
                            stopColor={secondaryColorHex}
                            stopOpacity={0.3}
                          />
                        </linearGradient>
                      </defs>
                      <PolarGrid stroke="#374151" />
                      <PolarAngleAxis
                        dataKey="name"
                        tick={{ fill: "#D1D5DB", fontSize: 12 }}
                      />
                      <PolarRadiusAxis
                        angle={90}
                        domain={[0, 100]}
                        tick={{ fill: "#9CA3AF" }}
                        stroke="#4B5563"
                      />
                      <Radar
                        name="Korzyść"
                        dataKey="value"
                        stroke={primaryColorHex}
                        fill="url(#radarGradient)"
                        fillOpacity={0.6}
                        activeDot={{
                          onClick: handleChartClick,
                          r: 8,
                          stroke: primaryColorHex,
                          strokeWidth: 2,
                          fill: "#fff",
                        }}
                        isAnimationActive={chartLoaded}
                        animationDuration={1200}
                        animationEasing="ease-out"
                      />
                      <Tooltip
                        content={<CustomTooltip primaryColor={primaryColor} />}
                      />
                    </RadarChart>
                  )}
                </ResponsiveContainer>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>

      {/* Selected Benefit Details */}
      <AnimatePresence mode="wait">
        {selectedBenefitDetails &&
          typeof selectedBenefitDetails === "object" && (
            <motion.div
              className={`mt-8 p-6 rounded-xl border border-${primaryColor}-500/20 
              bg-gradient-to-br from-gray-900 to-gray-900/80 backdrop-blur-sm shadow-lg`}
              variants={detailsVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              key={`details-${uniqueKey}`}
            >
              <div className="flex items-center gap-5">
                <div
                  className={`p-4 rounded-full bg-${primaryColor}-900/30 text-${primaryColor}-400 
              shadow-inner shadow-${primaryColor}-500/10 border border-${primaryColor}-500/20`}
                >
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                      repeat: 0,
                      repeatType: "mirror",
                    }}
                  >
                    <ServiceIcon
                      serviceId="performance"
                      size={8}
                      color={primaryColor}
                      animate
                    />
                  </motion.div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3
                      className={`text-xl font-bold text-${primaryColor}-300`}
                    >
                      {selectedBenefitDetails.name || ""}
                    </h3>
                    <span
                      className={`text-${primaryColor}-400 font-mono bg-${primaryColor}-900/20 px-2 py-1 rounded text-sm`}
                    >
                      {selectedBenefitDetails.value || 0}/100
                    </span>
                  </div>
                  <p className="text-gray-300 mt-2">
                    {selectedBenefitDetails.description || ""}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ServiceBenefitsChart;
