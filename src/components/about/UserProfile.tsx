import Image from "next/image";
import { EnhancedButton } from "@/components/ambro-ui/enhanced-button";
import { Card3D } from "@/components/ambro-ui/card-3d";
import { ClipMask } from "@/components/ambro-ui/clip-mask";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { daneOsobowe } from "./data";

export function UserProfile() {
  return (
    <AnimatedSection animation="fadeIn" delay={0.2} className="md:col-span-2">
      <Card3D
        interactive
        interactiveStrength={10}
        glowEffect
        glowColor="rgba(99, 102, 241, 0.3)"
        shadow
        bgColor="bg-gray-900/30"
        borderColor="border-gray-800"
        height="100%"
        className="backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/30"
      >
        <div className="p-8 flex flex-col items-center">
          <ClipMask
            mask="circle"
            width={180}
            height={180}
            animate={false}
            expandOnHover={false}
            borderWidth={1}
            borderColor="rgba(99, 102, 241, 0.3)"
            gradientColors={["#4f46e5", "#7c3aed"]}
            className="mb-8"
          >
            <Image
              src="/api/placeholder/240/240"
              alt="Moje zdjęcie"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              width={240}
              height={240}
            />
          </ClipMask>

          <h2 className="text-2xl font-light mb-1 tracking-wide">
            {daneOsobowe.imie}
          </h2>
          <p className="text-indigo-400 mb-8 text-sm font-medium uppercase tracking-wider">
            {daneOsobowe.stanowisko}
          </p>

          <div className="w-full space-y-6 mt-2 text-gray-300 text-sm">
            <div className="flex items-center border-b border-gray-800 pb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-indigo-400 mr-4 opacity-80"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <title>{`${daneOsobowe.doswiadczenieLata} lat doświadczenia`}</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>{daneOsobowe.doswiadczenieLata} lat doświadczenia</span>
            </div>

            <div className="flex items-center border-b border-gray-800 pb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-indigo-400 mr-4 opacity-80"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <title>{daneOsobowe.lokalizacja}</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{daneOsobowe.lokalizacja}</span>
            </div>

            <div className="flex items-center border-b border-gray-800 pb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-indigo-400 mr-4 opacity-80"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <title>Email</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>{daneOsobowe.email}</span>
            </div>

            <div className="flex items-center pb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-indigo-400 mr-4 opacity-80"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <title>Telefon</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span>{daneOsobowe.telefon}</span>
            </div>
          </div>

          <div className="flex space-x-5 mt-8 mb-8">
            {["github", "twitter", "linkedin"].map((social) => (
              <a
                key={social}
                href={`#${social}`}
                className="w-9 h-9 rounded-full border border-gray-800 flex items-center justify-center hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-colors"
                aria-label={social}
              >
                {/* Placeholder for social icons */}
                <div className="w-4 h-4 rounded-full bg-indigo-400/30" />
              </a>
            ))}
          </div>

          <EnhancedButton
            variant="outline"
            size="md"
            className="mt-2 w-full border-gray-800 hover:border-indigo-500 transition-all duration-300 bg-opacity-50"
            href="/kontakt"
            rippleEffect={false}
            glowOnHover={false}
          >
            Skontaktuj się ze mną
          </EnhancedButton>
        </div>
      </Card3D>
    </AnimatedSection>
  );
}
