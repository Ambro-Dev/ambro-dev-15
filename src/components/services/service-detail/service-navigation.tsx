"use client";

import { EnhancedButton } from "@/components/ambro-ui/enhanced-button";

interface ServiceNavigationProps {
  primaryColor: string;
  handleBack: () => void;
}

export default function ServiceNavigation({
  primaryColor,
  handleBack,
}: ServiceNavigationProps) {
  return (
    <div className="sticky top-24 z-30 mb-16">
      <nav
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-900/95 p-4 rounded-xl backdrop-blur-sm border border-gray-800/50 shadow-md"
        aria-label="Service navigation"
      >
        <EnhancedButton
          variant="ghost"
          size="sm"
          onClick={handleBack}
          aria-label="Wróć do wszystkich usług"
          className="text-gray-400 hover:text-white transition-colors"
        >
          ← Wróć do wszystkich usług
        </EnhancedButton>

        <div className="flex flex-wrap gap-3">
          {["overview", "process", "benefits", "technology", "comparison"].map(
            (section, index) => (
              <a
                key={section}
                href={`#${section}`}
                className={`nav-link text-sm transition-colors px-3 py-1.5 rounded-md ${
                  index === 0
                    ? `text-white bg-${primaryColor}-500/20 hover:bg-${primaryColor}-500/30 active-section`
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
                aria-current={index === 0 ? "page" : undefined}
              >
                {section === "overview"
                  ? "Przegląd"
                  : section === "process"
                  ? "Proces"
                  : section === "benefits"
                  ? "Korzyści"
                  : section === "technology"
                  ? "Technologie"
                  : "Porównanie"}
              </a>
            )
          )}
        </div>
      </nav>
    </div>
  );
}
