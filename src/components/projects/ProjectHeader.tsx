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