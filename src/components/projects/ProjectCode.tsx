import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { CodeBlock } from "@/components/ambro-ui/code-block";

interface ProjectCodeProps {
  codeSnippet: string;
  projectId: string;
}

export function ProjectCode({ codeSnippet, projectId }: ProjectCodeProps) {
  return (
    <AnimatedSection animation="fadeIn" delay={0.6} className="mt-12">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-blue-500/20 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative backdrop-blur-xl bg-black/20 border border-white/10 p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="bg-purple-500/20 p-1.5 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </span>
            Fragment kodu
          </h2>
          <CodeBlock
            code={codeSnippet}
            language="typescript"
            theme="tech"
            showLineNumbers
            fileName={`${projectId}.ts`}
          />
        </div>
      </div>
    </AnimatedSection>
  );
} 