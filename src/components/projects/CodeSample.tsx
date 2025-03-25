import { SectionHeading } from "@/components/ambro-ui/section-heading";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { CodeBlock } from "@/components/ambro-ui/code-block";

interface CodeSampleProps {
  codeSnippet: string;
  projectId: string;
}

export function CodeSample({ codeSnippet, projectId }: CodeSampleProps) {
  return (
    <div className="mt-16">
      <AnimatedSection animation="fadeIn" delay={0.3}>
        <SectionHeading
          title="Przykładowy kod"
          subtitle="Fragment kodu z projektu"
          alignment="center"
          size="lg"
          animation="fade"
        />

        <div className="mt-8">
          <CodeBlock
            code={codeSnippet}
            language="typescript"
            theme="tech"
            showLineNumbers
            fileName={`${projectId}.ts`}
            animateTyping={false}
          />
        </div>
      </AnimatedSection>
    </div>
  );
}
