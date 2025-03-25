import Link from "next/link";
import { SectionHeading } from "@/components/ambro-ui/section-heading";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { EnhancedButton } from "@/components/ambro-ui/enhanced-button";

export function ProjectCTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedSection animation="fadeIn">
          <SectionHeading
            title="Zróbmy coś razem"
            subtitle="Masz pomysł na projekt? Porozmawiajmy o nim"
            alignment="center"
            size="xl"
            gradient
            animation="fade"
          />

          <div className="mt-10">
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
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
