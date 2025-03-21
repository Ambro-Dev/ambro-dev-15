import Link from "next/link";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { SectionHeading } from "@/components/ambro-ui/section-heading";
import { EnhancedButton } from "@/components/ambro-ui/enhanced-button";

export function ProjectCTA() {
  return (
    <section className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/30 to-purple-950/30 backdrop-blur-md" />
      <div className="max-w-4xl mx-auto text-center relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl" />
        <div className="relative backdrop-blur-md bg-black/40 p-12 rounded-2xl border border-white/10 shadow-2xl">
          <AnimatedSection animation="fadeIn">
            <SectionHeading
              title="Zainteresowany współpracą?"
              subtitle="Skontaktuj się ze mną, by omówić Twój projekt"
              alignment="center"
              size="xl"
              gradient
              animation="fade"
            />

            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link href="/kontakt">
                <EnhancedButton
                  variant="tech"
                  size="lg"
                  magneticEffect
                  glowOnHover
                  rippleEffect
                  animatedBg
                >
                  Skontaktuj się ze mną
                </EnhancedButton>
              </Link>
              
              <Link href="/projekty">
                <EnhancedButton
                  variant="outline"
                  size="lg"
                  glowOnHover
                >
                  Zobacz więcej projektów
                </EnhancedButton>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
} 