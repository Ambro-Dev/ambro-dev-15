// src/components/services-section.tsx
"use client";

import { useState, useRef, useMemo, useCallback, memo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { serviceCategories } from "@/lib/services";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { SectionHeading } from "@/components/ambro-ui/section-heading";
import { GradientText } from "@/components/ambro-ui/gradient-text";
import { EnhancedButton } from "@/components/ambro-ui/enhanced-button";
import ServiceCardCanvas from "@/components/3d/service-card-canvas";

// Typ dla danych usługi
interface ServiceType {
  id: string;
  title: string;
  description: string;
  tags: string[];
  color: string;
}

// Interfejs propsów dla komponentu ServiceCard
interface ServiceCardProps {
  service: ServiceType;
  index: number;
  hoveredService: string | null;
  setHoveredService: (id: string | null) => void;
  handleServiceClick: (id: string) => void;
  cardVariants: Variants;
  isFilterChanging: boolean;
}

// Memoizowany komponent karty usługi dla lepszej wydajności
const ServiceCard = memo(
  ({
    service,
    index,
    hoveredService,
    setHoveredService,
    handleServiceClick,
    cardVariants,
    isFilterChanging,
  }: ServiceCardProps) => {
    const isHovered = hoveredService === service.id;

    // Extract color from service for consistent styling
    const serviceColor = service.color.split(" ")[0].replace("from-", "");
    const serviceColorHex = service.color.split(" ")[0].replace("from-", "#");

    // Animation variants dla elementów wewnątrz karty
    const innerVariants = {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
      hover: { scale: 1.02, transition: { duration: 0.2 } },
    };

    const tagVariants = {
      initial: { opacity: 0, scale: 0.8 },
      animate: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: { delay: 0.1 + i * 0.05, duration: 0.2 },
      }),
    };

    return (
      <motion.li
        key={service.id}
        custom={index}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        onHoverStart={() => setHoveredService(service.id)}
        onHoverEnd={() => setHoveredService(null)}
        onClick={() => handleServiceClick(service.id)}
        className="group relative h-full cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 gpu-accelerated"
        aria-label={`Usługa: ${service.title}`}
        style={{ perspective: "1000px" }}
      >
        {/* Modern card with subtle border and gradient background */}
        <div
          className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-800/80 bg-gradient-to-br from-gray-900/90 to-gray-950/90 p-6 backdrop-blur-sm transition-all duration-300"
          style={{
            boxShadow: isHovered
              ? `0 10px 30px -10px ${serviceColorHex}40, 0 0 0 1px ${serviceColorHex}30`
              : "0 4px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          {/* Card background subtle gradient */}
          <motion.div
            className="absolute inset-0 z-0 opacity-30"
            style={{
              background: `radial-gradient(circle at top right, ${serviceColorHex}20, transparent 70%)`,
            }}
            animate={{
              opacity: isHovered ? 0.4 : 0.3,
            }}
            transition={{ duration: 0.5 }}
          />

          {/* Service icon and title container */}
          <div className="flex items-start space-y-0 mb-5 relative z-10">
            {/* Service icon with subtle glow */}
            <motion.div
              className="mr-4 h-16 w-16 relative flex-shrink-0"
              variants={innerVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
            >
              <ServiceCardCanvas
                serviceId={service.id}
                isHovered={isHovered}
                color={serviceColor}
                performance="high"
                pauseAnimations={isFilterChanging}
              />

              {/* Icon glow effect */}
              <motion.div
                className="absolute -inset-1 rounded-full blur-xl z-0"
                style={{
                  background: `radial-gradient(circle, ${serviceColorHex}50, transparent 70%)`,
                  opacity: 0,
                }}
                animate={{ opacity: isHovered ? 0.5 : 0 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>

            {/* Title with gradient effect */}
            <motion.h3
              className="text-lg sm:text-xl md:text-2xl font-bold relative z-10 flex-1"
              variants={innerVariants}
              initial="initial"
              animate="animate"
            >
              <GradientText
                preset="tech"
                glowEffect
                glowPreset={isHovered ? "intense" : "subtle"}
                fontWeight="bold"
                className="transition-all duration-300"
              >
                {service.title}
              </GradientText>
            </motion.h3>
          </div>

          {/* Service description with improved spacing and readability */}
          <motion.p
            className="mb-6 text-gray-300 leading-relaxed relative z-10 text-sm sm:text-base"
            variants={innerVariants}
            initial="initial"
            animate="animate"
          >
            {service.description}
          </motion.p>

          {/* Tags section */}
          <motion.div
            className="mt-auto relative z-10"
            variants={innerVariants}
            initial="initial"
            animate="animate"
          >
            <h4 className="text-xs uppercase text-gray-400 mb-2.5 font-medium tracking-wider flex items-center">
              <span className="text-indigo-400 mr-2">#</span>
              Technologie
            </h4>
            <div className="flex flex-wrap gap-2">
              {service.tags.slice(0, 3).map((tag, tagIndex) => (
                <motion.span
                  key={`${service.id}-tag-${tagIndex}`}
                  custom={tagIndex}
                  variants={tagVariants}
                  initial="initial"
                  animate="animate"
                  className="px-2.5 py-1 text-xs rounded-full bg-gray-800/40 text-gray-300 border border-gray-700/40 transition-all duration-300 hover:bg-gray-700/50"
                >
                  {tag}
                </motion.span>
              ))}
              {service.tags.length > 3 && (
                <motion.span
                  custom={3}
                  variants={tagVariants}
                  initial="initial"
                  animate="animate"
                  className="px-2.5 py-1 text-xs rounded-full bg-gray-800/40 text-gray-300 border border-gray-700/40 transition-all duration-300"
                >
                  +{service.tags.length - 3}
                </motion.span>
              )}
            </div>
          </motion.div>

          {/* Clean and accessible card indicator for seeing more */}
          <motion.div
            className="absolute bottom-4 right-4 flex items-center gap-1.5 text-sm text-indigo-400 font-medium z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
          >
            <span className="opacity-80">Zobacz więcej</span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ x: isHovered ? [0, 4, 0] : 0 }}
              transition={{
                duration: 1.2,
                repeat: isHovered ? Infinity : 0,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            >
              <title>Dowiedz się więcej</title>
              <path d="M5 12h13M12 5l7 7-7 7" />
            </motion.svg>
          </motion.div>
        </div>
      </motion.li>
    );
  }
);

ServiceCard.displayName = "ServiceCard";

// Interfejs dla kategorii filtrowania
interface FilterCategoryType {
  id: string | null;
  label: string;
}

// Interfejs propsów dla komponentu FilterButtons
interface FilterButtonsProps {
  filterCategories: FilterCategoryType[];
  activeCategory: string | null;
  setActiveCategory: (id: string | null) => void;
}

// Memoizowany komponent przycisków filtrowania
const FilterButtons = memo(
  ({
    filterCategories,
    activeCategory,
    setActiveCategory,
  }: FilterButtonsProps) => {
    return (
      <motion.div
        className="mt-12 flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AnimatePresence>
          {filterCategories.map((tab) => (
            <motion.button
              key={tab.id || "all"}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              aria-selected={activeCategory === tab.id}
              aria-controls="services-grid"
              className={`px-6 py-2.5 rounded-full relative transition-all backdrop-blur-sm font-medium ${
                activeCategory === tab.id
                  ? "text-white shadow-lg"
                  : "bg-gray-800/30 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700/30"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeCategory === tab.id && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-purple-600/90 rounded-full -z-10 backdrop-blur-md"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {tab.label}
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
    );
  }
);

FilterButtons.displayName = "FilterButtons";

// Dodajemy globalny CSS dla akceleracji sprzętowej i efektów
const GlobalStyles = () => {
  return (
    <style jsx global>{`
      .gpu-accelerated {
        transform: translateZ(0);
        backface-visibility: hidden;
        perspective: 1000px;
        will-change: transform, opacity;
      }

      .glassmorphism {
        background: rgba(16, 18, 27, 0.4);
        backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.05);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
      }

      .glassmorphism-card {
        background: rgba(20, 23, 34, 0.6);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5),
          0 5px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      }

      .neomorphism {
        background: linear-gradient(145deg, #1a1c2a, #15171f);
        box-shadow: 8px 8px 16px #0e0f13, -8px -8px 16px #222436;
        border-radius: 16px;
      }

      .bg-grid-pattern {
        background-image: linear-gradient(
            rgba(99, 102, 241, 0.03) 1px,
            transparent 1px
          ),
          linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px);
        background-size: 40px 40px;
      }

      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          transition-duration: 0.01ms !important;
        }
      }
    `}</style>
  );
};

// FloatingParticles component for ambient background - made client-only
const FloatingParticles = () => {
  const [particles, setParticles] = useState<React.ReactNode[]>([]);

  // Generate particles only on the client side to avoid hydration mismatch
  useEffect(() => {
    const particleElements = [...Array(22)].map((_, i) => {
      const width = Math.random() * 5 + 2;
      const height = Math.random() * 5 + 2;
      const r = Math.floor(Math.random() * 100 + 150);
      const g = Math.floor(Math.random() * 100 + 150);
      const b = Math.floor(Math.random() * 255);
      const a = Math.random() * 0.3 + 0.1;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const yMove = Math.random() * 120 - 60;
      const xMove = Math.random() * 120 - 60;
      const opacity = Math.random() * 0.5 + 0.2;
      const duration = Math.random() * 15 + 10;
      const delay = Math.random() * 5;

      return (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            width,
            height,
            background: `rgba(${r}, ${g}, ${b}, ${a})`,
            top: `${top}%`,
            left: `${left}%`,
            filter: "blur(1px)",
          }}
          animate={{
            y: [0, yMove],
            x: [0, xMove],
            opacity: [0, opacity, 0],
          }}
          transition={{
            duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay,
          }}
        />
      );
    });

    setParticles(particleElements);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
      {particles}
    </div>
  );
};

export const ServicesSection = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [isFilterChanging, setIsFilterChanging] = useState(false);
  const [renderedCategory, setRenderedCategory] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const servicesRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    return () => {
      if (servicesRef.current) {
        observer.unobserve(servicesRef.current);
      }
    };
  }, []);

  // Memoizacja kategorii aby uniknąć ponownych obliczeń przy re-renderach
  const { devopsCategories, fullstackCategories } = useMemo(() => {
    return {
      devopsCategories: serviceCategories.filter(
        (cat) => cat.id !== "webapps" && cat.id !== "architecture"
      ),
      fullstackCategories: serviceCategories.filter(
        (cat) => cat.id === "webapps" || cat.id === "architecture"
      ),
    };
  }, []);

  // Memoizacja filtrowania usług z dwustopniowym systemem - redukuje re-rendery
  const filteredServices = useMemo(() => {
    // Używamy renderedCategory zamiast activeCategory do renderowania
    // To pozwala na dwustopniowe przejście: najpierw zmiana filtra, potem renderowanie
    if (renderedCategory === null) return serviceCategories;
    if (renderedCategory === "devops") return devopsCategories;
    if (renderedCategory === "fullstack") return fullstackCategories;
    return serviceCategories;
  }, [renderedCategory, devopsCategories, fullstackCategories]);

  // Zoptymalizowany callback dla zmiany kategorii z dwustopniowym procesem
  const handleCategoryChange = useCallback(
    (categoryId: string | null) => {
      if (activeCategory === categoryId) return; // Nie rób nic jeśli ta sama kategoria

      // Krok 1: Aktywuj tryb zmiany filtra i zapamiętaj, że będziemy zmieniać kategorię
      setIsFilterChanging(true);
      setActiveCategory(categoryId);

      // Reset hover state
      setHoveredService(null);

      // Krok 2: Po 50ms wykonaj rzeczywistą zmianę przefiltrowanych usług
      // Ten delay pozwala przeglądarce najpierw obsłużyć operacje UI bez zacinania
      setTimeout(() => {
        setRenderedCategory(categoryId);

        // Krok 3: Po kolejnych 250ms wyłącz tryb zmiany filtra
        setTimeout(() => {
          setIsFilterChanging(false);
        }, 250);
      }, 50);
    },
    [activeCategory]
  );

  // Callback dla handlera kliknięcia
  const handleServiceClick = useCallback(
    (serviceId: string) => {
      router.push(`/uslugi/${serviceId}`);
    },
    [router]
  );

  // Animation variants dla kart
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    }),
    hover: {
      y: -10,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  // Kategorie filtrowania - memoizowane aby uniknąć ponownego tworzenia tablicy
  const filterCategories = useMemo(
    () => [
      { id: null, label: "Wszystkie" },
      { id: "devops", label: "DevOps" },
      { id: "fullstack", label: "Fullstack" },
    ],
    []
  );

  return (
    <section
      ref={servicesRef}
      id="uslugi"
      aria-label="Usługi"
      className="py-28 px-6 bg-gradient-to-b from-black via-gray-900/80 to-black relative overflow-hidden"
    >
      <GlobalStyles />

      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent opacity-50" />
      <div className="absolute inset-0 bg-grid-pattern" />
      <FloatingParticles />

      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection animation="fadeIn" threshold={0.2}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
          >
            <SectionHeading
              title="Moje usługi"
              subtitle="Profesjonalne rozwiązania DevOps i Fullstack"
              alignment="center"
              size="xl"
              gradient
              animation="fade"
            />
          </motion.div>

          {/* Brief introduction text */}
          <motion.div
            className="text-center max-w-2xl mx-auto mt-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <p className="text-gray-200 leading-relaxed text-lg">
              Oferuję kompleksowe usługi obejmujące zarówno obszar DevOps, jak i
              tworzenie aplikacji Fullstack. Każde rozwiązanie jest dopasowane
              do indywidualnych potrzeb biznesowych, zapewniając wydajność,
              skalowalność i bezpieczeństwo.
            </p>
          </motion.div>
        </AnimatedSection>

        {/* Zoptymalizowany komponent przycisków filtrowania */}
        <FilterButtons
          filterCategories={filterCategories}
          activeCategory={activeCategory}
          setActiveCategory={handleCategoryChange}
        />

        {/* Updated service cards grid with auto-rows for equal height and improved responsiveness */}
        <motion.ul
          id="services-grid"
          aria-label="Lista usług"
          className={`mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 auto-rows-fr ${
            isFilterChanging ? "gpu-accelerated" : ""
          }`}
          style={{
            willChange: isFilterChanging ? "transform, opacity" : "auto",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {filteredServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              hoveredService={hoveredService}
              setHoveredService={setHoveredService}
              handleServiceClick={handleServiceClick}
              cardVariants={cardVariants}
              isFilterChanging={isFilterChanging}
            />
          ))}
        </motion.ul>

        {/* Bottom CTA section */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <AnimatedSection animation="fadeIn" delay={0.3}>
            <div className="max-w-3xl mx-auto backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-indigo-500/10 bg-gray-900/50 relative overflow-hidden">
              {/* Decorative accent element */}
              <div className="absolute -top-28 -right-28 w-56 h-56 bg-indigo-600/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-28 -left-28 w-56 h-56 bg-purple-600/20 rounded-full blur-3xl" />

              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-6">
                  <GradientText from="indigo-400" to="purple-500" glowEffect>
                    Kompleksowe rozwiązania dla nowoczesnego biznesu
                  </GradientText>
                </h3>
                <p className="text-gray-200 mb-8 md:mb-10 text-lg max-w-2xl mx-auto">
                  Niezależnie od skali czy branży, moje usługi pomogą Ci
                  zdigitalizować, zautomatyzować i usprawnić procesy w Twojej
                  firmie.
                </p>

                <Link href="/uslugi" aria-label="Zobacz wszystkie usługi">
                  <EnhancedButton
                    variant="tech"
                    size="lg"
                    magneticEffect
                    glowOnHover
                    rippleEffect
                  >
                    Zobacz wszystkie usługi
                  </EnhancedButton>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
