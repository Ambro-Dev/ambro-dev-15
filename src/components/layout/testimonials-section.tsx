"use client";

import { useState, useRef, useEffect, memo } from "react";
import { SectionHeading } from "@/components/ambro-ui/section-heading";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";

// A minimal, subtle particle effect
const MinimalParticles = () => {
  const [particles, setParticles] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const particleElements = [...Array(8)].map((_, i) => {
      const size = Math.random() * 2 + 1;
      const opacity = Math.random() * 0.07 + 0.02;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const yMove = Math.random() * 40 - 20;
      const xMove = Math.random() * 40 - 20;
      const duration = Math.random() * 25 + 20;
      const delay = Math.random() * 5;

      return (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            width: size,
            height: size,
            top: `${top}%`,
            left: `${left}%`,
            opacity,
          }}
          animate={{
            y: [0, yMove],
            x: [0, xMove],
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
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles}
    </div>
  );
};

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  setHoveredTestimonial: (id: string | null) => void;
  cardVariants: Variants;
}

const TestimonialCard = memo(
  ({
    testimonial,
    index,
    setHoveredTestimonial,
    cardVariants,
  }: Omit<TestimonialCardProps, "hoveredTestimonial">) => {
    return (
      <motion.div
        variants={cardVariants}
        custom={index}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="h-full"
        onMouseEnter={() => setHoveredTestimonial(testimonial.author)}
        onMouseLeave={() => setHoveredTestimonial(null)}
      >
        <div className="h-full p-8 flex flex-col bg-black/20 backdrop-blur-sm border-t border-white/5 rounded-lg transition-all duration-300 hover:border-white/10">
          <svg
            className="w-6 h-6 text-white/20 mb-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <title>Quote</title>
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>

          <p className="font-light text-white/80 mb-8 leading-relaxed italic flex-grow text-lg">
            {testimonial.quote}
          </p>

          <div className="flex items-center mt-auto pt-6 border-t border-white/5">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-4 grayscale hover:grayscale-0 transition-all duration-700">
              <Image
                src={testimonial.image}
                alt={testimonial.author}
                className="w-full h-full object-cover"
                width={100}
                height={100}
              />
            </div>
            <div>
              <p className="font-medium text-white">{testimonial.author}</p>
              <p className="text-sm text-white/50">{testimonial.position}</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

TestimonialCard.displayName = "TestimonialCard";

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  image: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection = ({
  testimonials,
}: TestimonialsSectionProps) => {
  const testimonialsRef = useRef<HTMLElement>(null);
  const [hoveredTestimonial, setHoveredTestimonial] = useState<string | null>(
    null
  );
  const [isVisible, setIsVisible] = useState(false);

  // Subtle hover effect
  const getHighlightClass = (id: string) => {
    if (hoveredTestimonial && hoveredTestimonial !== id) {
      return "opacity-60";
    }
    return "";
  };

  // Minimal animation variants
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: i * 0.1,
      },
    }),
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

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

    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={testimonialsRef}
      id="opinie"
      aria-label="Opinie klientów"
      className="py-28 px-6 relative overflow-hidden section-spacing"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute -top-40 left-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -bottom-40 right-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl opacity-50"></div>
      <MinimalParticles />

      <div className="max-w-6xl mx-auto">
        <AnimatedSection animation="fadeIn" threshold={0.2}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <SectionHeading
              title="Co mówią klienci"
              subtitle="Opinie osób, z którymi miałem przyjemność współpracować"
              alignment="center"
              size="lg"
              animation="fade"
              className="max-w-xl mx-auto"
            />
          </motion.div>

          <motion.div
            className="text-center max-w-2xl mx-auto mt-6 mb-16"
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <p className="text-white/60 leading-relaxed">
              Każdy projekt traktuję jako wyjątkowe wyzwanie, tworząc
              rozwiązania dopasowane do indywidualnych potrzeb klientów.
            </p>
          </motion.div>
        </AnimatedSection>

        {/* Testimonials grid */}
        <motion.div
          className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <AnimatePresence>
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                className={`transition-opacity duration-300 ${getHighlightClass(
                  testimonial.author
                )}`}
              >
                <TestimonialCard
                  testimonial={testimonial}
                  index={index}
                  setHoveredTestimonial={setHoveredTestimonial}
                  cardVariants={cardVariants}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Simple CTA */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnimatedSection animation="fadeIn" delay={0.1}>
            <div className="max-w-2xl mx-auto p-8 border-t border-white/5 relative">
              <p className="text-xl text-white/90 mb-4 font-light">
                Dołącz do zadowolonych klientów i rozpocznij współpracę
              </p>
              <p className="text-white/60 text-base">
                Skontaktuj się ze mną, aby omówić Twój projekt
              </p>
            </div>
          </AnimatedSection>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
