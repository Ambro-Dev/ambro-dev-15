"use client";

import { useRef, useEffect } from "react";

interface NavHighlightObserverProps {
  sectionId: string;
  children: React.ReactNode;
}

export default function NavHighlightObserver({
  sectionId,
  children,
}: NavHighlightObserverProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Use intersection observer to highlight active nav item when in view
  useEffect(() => {
    if (typeof window !== "undefined") {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Update active section
            for (const link of document.querySelectorAll(".nav-link")) {
              link.classList.remove("active-section");
            }
            document
              .querySelector(`a[href="#${sectionId}"]`)
              ?.classList.add("active-section");
          }
        },
        { threshold: 0.3 }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    }
  }, [sectionId]);

  return (
    <div id={sectionId} ref={sectionRef}>
      {children}
    </div>
  );
}
