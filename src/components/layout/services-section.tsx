// src/components/services-section.tsx
"use client";

import { useState, useRef, useMemo, useCallback, memo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { serviceCategories, type ServiceCategory } from "@/lib/services";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { SectionHeading } from "@/components/ambro-ui/section-heading";
import { GradientText } from "@/components/ambro-ui/gradient-text";
import { EnhancedButton } from "@/components/ambro-ui/enhanced-button";

// FloatingParticles component for ambient background - made client-only
const FloatingParticles = () => {
  const [particles, setParticles] = useState<React.ReactNode[]>([]);

  // Generate particles only on the client side to avoid hydration mismatch
  useEffect(() => {
    const particleElements = [...Array(15)].map((_, i) => {
      const width = Math.random() * 3 + 1;
      const height = Math.random() * 3 + 1;
      const r = Math.floor(Math.random() * 100 + 150);
      const g = Math.floor(Math.random() * 100 + 150);
      const b = Math.floor(Math.random() * 255);
      const a = Math.random() * 0.2 + 0.05;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const yMove = Math.random() * 80 - 40;
      const xMove = Math.random() * 80 - 40;
      const opacity = Math.random() * 0.3 + 0.1;
      const duration = Math.random() * 20 + 15;
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
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      {particles}
    </div>
  );
};

interface ServiceCardProps {
  service: ServiceCategory;
  index: number;
  hoveredService: string | null;
  setHoveredService: (id: string | null) => void;
  handleServiceClick: (id: string) => void;
  cardVariants: Variants;
}

const ServiceCard = ({
  service,
  index,
  hoveredService,
  setHoveredService,
  handleServiceClick,
  cardVariants,
}: ServiceCardProps) => {
  const Icon = service.icon;

  return (
    <motion.li
      variants={cardVariants}
      custom={index}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ y: -5 }}
      className="relative group"
    >
      <div
        className={`h-full backdrop-blur-sm bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] rounded-xl overflow-hidden transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_8px_20px_rgba(99,102,241,0.18)] ${
          hoveredService === service.id ? "border-white/20" : ""
        }`}
        onMouseEnter={() => setHoveredService(service.id)}
        onMouseLeave={() => setHoveredService(null)}
        onClick={() => handleServiceClick(service.id)}
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/5 group-hover:to-purple-500/5 transition-all duration-300" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5/5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5/5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="p-8 flex flex-col h-full relative">
          {/* Service icon with enhanced styling */}
          <div className="mb-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center border border-white/[0.08] group-hover:scale-110 group-hover:border-white/20 transition-all duration-300">
              <Icon className="w-7 h-7 text-white/80 group-hover:text-white transition-colors duration-300" />
            </div>
          </div>

          {/* Service title with enhanced typography */}
          <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-indigo-200 to-purple-200 transition-all duration-300">
            {service.title}
          </h3>

          {/* Service description with improved readability */}
          <p className="text-gray-300/90 text-base leading-relaxed mb-6 flex-grow">
            {service.description}
          </p>

          {/* Service tags with enhanced styling */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-sm rounded-full bg-white/[0.03] text-white/70 border border-white/[0.06] group-hover:bg-white/[0.06] group-hover:border-white/20 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Learn more link */}
          <div className="mt-6 pt-6 border-t border-white/[0.06] group-hover:border-white/20 transition-colors duration-300">
            <span className="text-indigo-300/80 group-hover:text-indigo-200 text-sm font-medium flex items-center gap-2 transition-colors duration-300">
              Dowiedz się więcej
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </motion.li>
  );
};

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
        className="mt-12 flex flex-wrap justify-center gap-3"
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
              className={`px-6 py-2.5 rounded-full relative transition-all backdrop-blur-sm font-medium text-sm md:text-base ${
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
              <span className="relative z-10 flex items-center gap-2">
                {tab.label}
                {activeCategory === tab.id && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="w-1.5 h-1.5 rounded-full bg-white/80"
                  />
                )}
              </span>
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

export const ServicesSection = () => {
  const router = useRouter();
  const servicesRef = useRef<HTMLElement>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Select only the most important services for the landing page
  const featuredServices = useMemo(() => {
    // We'll show only 3 most important services
    return serviceCategories.slice(0, 3);
  }, []);

  // Refined animation variants with more engaging transitions
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1],
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  // Optimized service click handler
  const handleServiceClick = useCallback(
    (serviceId: string) => {
      router.push(`/uslugi#${serviceId}`);
    },
    [router]
  );

  // Intersection Observer for fade-in effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={servicesRef}
      id="uslugi"
      aria-label="Usługi"
      className="py-32 px-6 relative overflow-hidden section-spacing"
    >
      <GlobalStyles />

      {/* Refined background elements - simplified due to global background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/5 via-transparent to-transparent opacity-30" />
      <div className="absolute inset-0 bg-grid-pattern opacity-8" />
      <FloatingParticles />

      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection animation="fadeIn" threshold={0.2}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <SectionHeading
              title="Kluczowe usługi"
              subtitle="Profesjonalne rozwiązania dla Twojego biznesu"
              alignment="center"
              size="xl"
              gradient
              animation="fade"
              className="max-w-2xl mx-auto"
            />
          </motion.div>

          {/* Enhanced introduction text with better typography */}
          <motion.div
            className="text-center max-w-3xl mx-auto mt-8 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="text-gray-200/90 leading-relaxed text-lg md:text-xl">
              Oferuję kompleksowe usługi technologiczne, które pomogą Ci
              zbudować silną pozycję w cyfrowym świecie. Od automatyzacji
              procesów IT, przez zarządzanie infrastrukturą chmurową, aż po
              tworzenie nowoczesnych aplikacji webowych.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-sm font-medium border border-indigo-500/20">
                DevOps
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-sm font-medium border border-purple-500/20">
                Fullstack
              </span>
            </div>
          </motion.div>
        </AnimatedSection>

        {/* Featured services grid */}
        <motion.ul
          id="services-grid"
          aria-label="Lista usług"
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr"
          style={{
            willChange: "transform, opacity",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {featuredServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              hoveredService={hoveredService}
              setHoveredService={setHoveredService}
              handleServiceClick={handleServiceClick}
              cardVariants={cardVariants}
            />
          ))}
        </motion.ul>

        {/* Enhanced bottom CTA section with better visual hierarchy */}
        <motion.div
          className="mt-40 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <AnimatedSection animation="fadeIn" delay={0.2}>
            <div className="max-w-3xl mx-auto backdrop-blur-md p-10 md:p-14 rounded-2xl border border-white/10 bg-gradient-to-b from-gray-900/70 to-black/60 relative overflow-hidden shadow-[0_20px_80px_-10px_rgba(99,102,241,0.25)] glassmorphism-card">
              {/* Dynamic background elements */}
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl opacity-70" />
              <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />

              {/* Subtle ambient particle effects */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5/5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5/5_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20" />

              <div className="relative z-10">
                <motion.h3
                  className="text-3xl md:text-4xl font-bold mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <GradientText from="indigo-300" to="purple-400" glowEffect>
                    Gotowy na transformację cyfrową?
                  </GradientText>
                </motion.h3>

                <motion.p
                  className="text-gray-200/90 mb-10 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Sprawdź pełną ofertę usług i dowiedz się, jak mogę pomóc Ci
                  osiągnąć cele biznesowe dzięki nowoczesnym rozwiązaniom
                  technologicznym.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Link href="/uslugi" aria-label="Zobacz wszystkie usługi">
                    <EnhancedButton
                      variant="tech"
                      size="lg"
                      magneticEffect
                      glowOnHover
                      rippleEffect
                      className="bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 hover:from-indigo-500 hover:via-purple-400 hover:to-indigo-500 bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
                    >
                      Zobacz pełną ofertę
                    </EnhancedButton>
                  </Link>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
