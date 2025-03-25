"use client";

import { Suspense } from "react";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { SectionHeading } from "@/components/ambro-ui/section-heading";
import { Card3D } from "@/components/ambro-ui/card-3d";
import { HighlightText } from "@/components/ambro-ui/highlight-text";
import { CodeBlock } from "@/components/ambro-ui/code-block";
import dynamic from "next/dynamic";
import ServiceSectionSkeleton from "./service-section-skeleton";

// Dynamically import heavy components with loading fallbacks
const ServiceProcessSteps = dynamic(
  () => import("@/components/services/service-process-steps"),
  {
    loading: () => <ServiceSectionSkeleton />,
  }
);

interface ServiceProcessSectionProps {
  serviceId: string;
  primaryColor: string;
  secondaryColor: string;
  getExampleCode: () => {
    code: string;
    language: string;
    fileName: string;
    highlightLines: number[];
  };
}

export default function ServiceProcessSection({
  serviceId,
  primaryColor,
  secondaryColor,
  getExampleCode,
}: ServiceProcessSectionProps) {
  return (
    <section className="mb-20">
      <AnimatedSection animation="fadeIn">
        <SectionHeading
          title="Proces realizacji"
          subtitle="Jak wygląda wdrożenie usługi krok po kroku"
          alignment="left"
          size="lg"
          gradient
          gradientFrom={primaryColor}
          gradientTo={secondaryColor}
          animation="slide"
        />

        <div className="mt-12 bg-gray-900/40 p-8 rounded-xl border border-gray-800/40 backdrop-blur-sm">
          <Suspense fallback={<ServiceSectionSkeleton />}>
            <ServiceProcessSteps
              serviceId={serviceId}
              primaryColor={primaryColor}
            />
          </Suspense>
        </div>

        {/* Example Code Block (for technical services) */}
        {(serviceId === "deployment" ||
          serviceId === "infrastructure" ||
          serviceId === "servers" ||
          serviceId === "webapps") && (
          <div className="mt-12">
            <Card3D
              interactive={false}
              shadow
              bgColor="bg-gray-900/30"
              borderColor={`border-${primaryColor}-500/10`}
              className="p-6"
            >
              <h3 className="text-xl font-semibold mb-6">
                <HighlightText
                  color={`bg-${primaryColor}-500/10`}
                  height="30%"
                  position="bottom"
                >
                  Przykład implementacji
                </HighlightText>
              </h3>

              <CodeBlock
                code={getExampleCode().code}
                language={getExampleCode().language}
                fileName={getExampleCode().fileName}
                showLineNumbers
                theme="tech"
                highlightLines={getExampleCode().highlightLines}
                wrapLines
                copyButton
                rounded="rounded-lg"
                maxHeight="400px"
              />
            </Card3D>
          </div>
        )}
      </AnimatedSection>
    </section>
  );
}
