import Link from "next/link";
import { EnhancedButton } from "@/components/ambro-ui/enhanced-button";
import { SectionHeading } from "@/components/ambro-ui/section-heading";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";

interface ProjectHeaderProps {
  title: string;
  shortDesc: string;
  color: string;
}

export function ProjectHeader({ title, shortDesc, color }: ProjectHeaderProps) {
  return (
    <AnimatedSection animation="fadeIn">
      <div className="text-center">
        <Link href="/projekty">
          <EnhancedButton variant="outline" size="sm" className="mb-8">
            ← Powrót do projektów
          </EnhancedButton>
        </Link>

        <SectionHeading
          title={title}
          subtitle={shortDesc}
          alignment="center"
          size="xl"
          gradient={true}
          gradientFrom={color.split(" ")[0].replace("from-", "")}
          gradientTo={color.split(" ")[1].replace("to-", "")}
          animation="slide"
        />
      </div>
    </AnimatedSection>
  );
}
