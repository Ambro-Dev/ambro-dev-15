import { EnhancedButton } from "@/components/ambro-ui/enhanced-button";
import { GradientText } from "@/components/ambro-ui/gradient-text";
import { RevealText } from "@/components/ambro-ui/reveal-text";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { FloatingBubbles } from "@/components/ambro-ui/floating-bubbles";

export default function CTASection() {
  return (
    <section className="py-28 px-6 relative overflow-hidden section-spacing">
      {/* Refined background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute inset-0 z-0 opacity-30">
        <FloatingBubbles
          count={10}
          color="rgba(99, 102, 241, 0.08)"
          minSize={20}
          maxSize={40}
          interactive={false}
        />
      </div>

      {/* Content container with glass effect */}
      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection animation="fadeIn">
          <div className="backdrop-blur-lg bg-gray-900/20 border border-white/5 rounded-2xl p-12 shadow-xl">
            {/* Subtle accent gradients */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-600/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl"></div>

            <div className="relative text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <GradientText
                  from="indigo-400"
                  via="blue-400"
                  to="indigo-400"
                  glowEffect
                  glowIntensity={8}
                  animated
                >
                  Gotowy na transformację technologiczną?
                </GradientText>
              </h2>

              <div className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
                <RevealText>
                  Skontaktuj się ze mną, aby omówić, jak mogę pomóc w rozwoju
                  Twojego biznesu poprzez nowoczesne rozwiązania DevOps i
                  aplikacje webowe.
                </RevealText>
              </div>

              <EnhancedButton
                variant="tech"
                size="lg"
                href="/kontakt"
                magneticEffect
                glowOnHover
                glowIntensity={10}
                rippleEffect
                className="px-8"
              >
                Rozpocznij projekt
              </EnhancedButton>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
