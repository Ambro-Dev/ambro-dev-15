"use client";

import { SectionHeading } from "@/components/ambro-ui/section-heading";
import { RevealText } from "@/components/ambro-ui/reveal-text";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { useEffect, useRef, useState } from "react";

export const AboutMeSection = () => {
  // Track mouse position for parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const { left, top, width, height } =
          sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-28 md:py-36 px-6 relative overflow-hidden"
    >
      {/* Enhanced background with dynamic elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-indigo-950/20 to-gray-950 z-0">
        {/* Noise texture for added depth */}
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        ></div>

        {/* Animated gradient orbs with parallax effect */}
        <div
          className="absolute -top-40 -left-40 w-[28rem] h-[28rem] bg-indigo-500/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${
              mousePosition.y * 20
            }px)`,
            transition: "transform 2s cubic-bezier(0.075, 0.82, 0.165, 1)",
          }}
        ></div>
        <div
          className="absolute top-1/3 -right-40 w-[38rem] h-[38rem] bg-purple-500/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * -30}px, ${
              mousePosition.y * 30
            }px)`,
            transition: "transform 2.5s cubic-bezier(0.075, 0.82, 0.165, 1)",
          }}
        ></div>
        <div
          className="absolute bottom-0 left-1/3 w-[32rem] h-[32rem] bg-pink-500/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 25}px, ${
              mousePosition.y * -25
            }px)`,
            transition: "transform 2.2s cubic-bezier(0.075, 0.82, 0.165, 1)",
          }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection animation="slideUp">
          <SectionHeading
            title="O mnie"
            subtitle="DevOps Engineer & Fullstack Developer"
            alignment="center"
            size="xl"
            gradient
            highlightWords={[2]}
            animation="fade"
            delay={0.2}
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-14 mt-20">
          <AnimatedSection animation="slideLeft" delay={0.3}>
            <div className="group h-full">
              <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.18)] h-full overflow-hidden transition-all duration-500 group-hover:translate-y-[-5px] group-hover:shadow-[0_20px_40px_rgba(80,40,200,0.1)]">
                <div className="p-8 sm:p-10 relative h-full">
                  {/* Dynamic gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/[0.07] to-purple-600/[0.03] opacity-50 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>

                  {/* Light beam effect on hover */}
                  <div className="absolute -inset-1/2 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent rotate-45 transform translate-x-[-120%] group-hover:translate-x-[120%] transition-all duration-1000 ease-in-out"></div>

                  <div className="relative flex flex-col h-full">
                    <h3 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                      Moja wizja
                    </h3>
                    <div className="text-gray-100/95 mb-8 text-lg leading-relaxed">
                      <RevealText staggerLines delay={0.5}>
                        <span>
                          Tworzenie rozwiązań technologicznych, które łączą
                        </span>
                        <span>
                          niezawodną infrastrukturę z nowoczesnymi aplikacjami,
                        </span>
                        <span>
                          umożliwiając firmom szybszy rozwój i innowacje.
                        </span>
                      </RevealText>
                    </div>

                    {/* Animated decorative elements */}
                    <div className="my-8 relative py-2">
                      {/* Animated grid pattern */}
                      <div className="absolute inset-0 grid grid-cols-6 gap-1.5">
                        {Array.from({ length: 18 }).map((_, i) => (
                          <div
                            key={i}
                            className="h-1.5 w-full rounded-full bg-indigo-500/10 overflow-hidden"
                            style={{
                              animationDelay: `${i * 0.1}s`,
                              animation: "pulseLight 5s infinite ease-in-out",
                            }}
                          />
                        ))}
                      </div>

                      {/* Floating tech icons */}
                      <div className="relative h-20 w-full flex items-center justify-evenly opacity-80">
                        {["⚙️", "🚀", "💻", "☁️", "🔄"].map((icon, index) => (
                          <div
                            key={index}
                            className="text-xl opacity-80"
                            style={{
                              animation: `float ${
                                3 + index * 0.5
                              }s infinite ease-in-out alternate`,
                              animationDelay: `${index * 0.3}s`,
                            }}
                          >
                            {icon}
                          </div>
                        ))}
                      </div>

                      {/* Subtle separator line */}
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent mt-2"></div>
                    </div>

                    <p className="text-gray-300/90 mt-auto leading-relaxed">
                      Posiadam wieloletnie doświadczenie zarówno w obszarze
                      DevOps, jak i tworzenia aplikacji webowych, co pozwala mi
                      oferować kompleksowe rozwiązania technologiczne
                      dostosowane do indywidualnych potrzeb biznesowych.
                    </p>

                    {/* Add animation keyframes */}
                    <style jsx global>{`
                      @keyframes pulseLight {
                        0%,
                        100% {
                          opacity: 0.3;
                        }
                        50% {
                          opacity: 0.8;
                        }
                      }

                      @keyframes float {
                        0% {
                          transform: translateY(0px);
                        }
                        100% {
                          transform: translateY(-8px);
                        }
                      }
                    `}</style>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slideRight" delay={0.4}>
            <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 rounded-2xl p-8 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.18)] h-full transition-all duration-500">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 mb-10">
                Dlaczego warto mnie wybrać
              </h3>

              <div className="space-y-5">
                {[
                  {
                    title: "Kompleksowa wiedza",
                    desc: "Łączę kompetencje w obszarze DevOps i programowania Fullstack, co pozwala na holistyczne podejście do projektów.",
                    icon: "🔄",
                    color: "from-blue-500/30 to-indigo-500/10",
                  },
                  {
                    title: "Doświadczenie praktyczne",
                    desc: "Posiadam wieloletnie doświadczenie w zarządzaniu serwerami, automatyzacji procesów IT oraz tworzeniu aplikacji webowych.",
                    icon: "⚙️",
                    color: "from-indigo-500/30 to-purple-500/10",
                  },
                  {
                    title: "Podejście zorientowane na cel",
                    desc: "Koncentruję się na dostarczaniu rozwiązań, które realnie wspierają cele biznesowe i przynoszą wymierną wartość.",
                    icon: "🎯",
                    color: "from-purple-500/30 to-pink-500/10",
                  },
                  {
                    title: "Ciągły rozwój",
                    desc: "Nieustannie poszerzam swoją wiedzę o najnowsze technologie i najlepsze praktyki w branży IT.",
                    icon: "📈",
                    color: "from-pink-500/30 to-red-500/10",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="group backdrop-blur-md bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] rounded-xl overflow-hidden transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_8px_20px_rgba(99,102,241,0.18)]"
                  >
                    <div className="p-5 flex items-start gap-4 relative">
                      {/* Custom gradient per item */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20 group-hover:opacity-40 transition-opacity duration-300 rounded-xl`}
                      ></div>

                      {/* Enhanced icon container */}
                      <div className="relative shrink-0 text-xl bg-white/[0.03] p-3 rounded-lg backdrop-blur-sm flex items-center justify-center w-12 h-12 border border-white/[0.06] shadow-inner group-hover:scale-110 transition-transform duration-300">
                        <span className="group-hover:animate-pulse">
                          {item.icon}
                        </span>
                      </div>

                      <div className="relative">
                        <h4 className="font-semibold text-base mb-1.5 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-indigo-200 to-purple-200 transition-all duration-300">
                          {item.title}
                        </h4>
                        <p className="text-gray-300/90 text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
