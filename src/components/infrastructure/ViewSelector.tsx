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
      <div className="bg-gray-900/30 backdrop-blur-md p-1.5 rounded-full inline-flex flex-wrap justify-center border border-white/10 shadow-[0_4px_20px_0_rgba(0,0,0,0.1)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              viewMode === tab.id
                ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                : "text-gray-300 hover:bg-white/5 hover:text-white"
            }`}
            type="button"
            onClick={() => onViewChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};
