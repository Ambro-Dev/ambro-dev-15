// components/CallToAction.tsx
import React from "react";
import { EnhancedButton } from "@/components/ambro-ui/enhanced-button";
import { RevealText } from "@/components/ambro-ui/reveal-text";

interface CallToActionProps {
  onViewCaseStudies: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({
  onViewCaseStudies,
}) => {
  return (
    <div className="relative">
      {/* Glass card effect */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-transparent to-purple-600/10 backdrop-blur-lg"></div>
        <div className="absolute inset-0 bg-gray-900/30 backdrop-blur-md"></div>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-10 text-center rounded-3xl border border-white/5">
        <RevealText
          className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-100"
          delay={0.3}
        >
          Gotów zrewolucjonizować swoją infrastrukturę IT?
        </RevealText>

        <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
          Umów bezpłatną konsultację, podczas której omówimy Twoje potrzeby i
          zaproponujemy optymalną architekturę dostosowaną do specyfiki Twojego
          biznesu.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <EnhancedButton
            variant="tech"
            size="lg"
            href="/kontakt"
            animatedBg
            magneticEffect
            borderGradient
            glowOnHover
            rippleEffect
            className="px-8 py-4 text-base font-medium"
          >
            Umów bezpłatną konsultację
          </EnhancedButton>

          <EnhancedButton
            variant="outline"
            size="lg"
            onClick={onViewCaseStudies}
            className="px-8 py-4 text-base font-medium bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10"
          >
            Zobacz historie sukcesu
          </EnhancedButton>
        </div>
      </div>
    </div>
  );
};
