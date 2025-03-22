import { useState } from "react";
import { SectionHeading } from "@/components/ambro-ui/section-heading";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { ExperienceTab } from "@/components/about/cv/ExperienceTab";
import { SkillsTab } from "@/components/about/cv/SkillsTab";
import { EducationTab } from "@/components/about/cv/EducationTab";
import { CertificatesTab } from "@/components/about/cv/CertificatesTab";

export function CVTabs() {
  const [activeTab, setActiveTab] = useState<string>("doswiadczenie");

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-black via-gray-950 to-black">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection animation="fadeIn">
          <SectionHeading
            title="Moje CV"
            subtitle="Doświadczenie, edukacja i umiejętności"
            alignment="center"
            size="lg"
            gradient
            animation="fade"
            className="max-w-2xl mx-auto"
          />
        </AnimatedSection>

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {[
            { id: "doswiadczenie", label: "Doświadczenie" },
            { id: "umiejetnosci", label: "Umiejętności" },
            { id: "edukacja", label: "Edukacja" },
            { id: "certyfikaty", label: "Certyfikaty" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-1.5 rounded-full text-sm font-light transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                  : "text-gray-400 hover:text-gray-300 hover:bg-gray-900/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-12">
          {activeTab === "doswiadczenie" && <ExperienceTab />}
          {activeTab === "umiejetnosci" && <SkillsTab />}
          {activeTab === "edukacja" && <EducationTab />}
          {activeTab === "certyfikaty" && <CertificatesTab />}
        </div>
      </div>
    </section>
  );
}
