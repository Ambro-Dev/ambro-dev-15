import Link from "next/link";
import { SectionHeading } from "@/components/ambro-ui/section-heading";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { EnhancedButton } from "@/components/ambro-ui/enhanced-button";

export function Header() {
  return (
    <AnimatedSection animation="fadeIn">
      <div className="text-center">
        <Link href="/" className="inline-block mb-10">
          <EnhancedButton
            variant="outline"
            size="sm"
            className="border-gray-800 hover:border-indigo-500 transition-colors duration-300 bg-opacity-50"
          >
            ← Powrót do strony głównej
          </EnhancedButton>
        </Link>

        <SectionHeading
          title="O mnie"
          subtitle="Poznaj moją historię, doświadczenie i umiejętności"
          alignment="center"
          size="xl"
          gradient
          animation="fade"
          className="max-w-2xl mx-auto"
        />
      </div>
    </AnimatedSection>
  );
}
