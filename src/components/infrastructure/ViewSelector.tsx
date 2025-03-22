// components/ViewSelector.tsx
import React from "react";
import { ViewMode } from "@/types/infrastructure";

interface ViewSelectorProps {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
}

export const ViewSelector: React.FC<ViewSelectorProps> = ({
  viewMode,
  onViewChange,
}) => {
  const tabs = [
    { id: "overview" as ViewMode, label: "Przegląd" },
    { id: "layers" as ViewMode, label: "Architektura" },
    { id: "benefits" as ViewMode, label: "Korzyści" },
    { id: "cases" as ViewMode, label: "Historie sukcesu" },
    { id: "faq" as ViewMode, label: "FAQ" },
  ];

  return (
    <div className="flex justify-center">
      <div className="bg-gray-900/20 backdrop-blur-sm p-1 rounded-full inline-flex flex-wrap justify-center border border-white/5 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              viewMode === tab.id
                ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md"
                : "text-gray-300 hover:text-white hover:bg-white/5"
            }`}
            type="button"
            onClick={() => onViewChange(tab.id)}
            aria-current={viewMode === tab.id ? "page" : undefined}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};
