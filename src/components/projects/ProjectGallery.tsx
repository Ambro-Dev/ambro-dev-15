import { useState } from "react";
import Image from "next/image";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";

interface ProjectGalleryProps {
  title: string;
  images: string[];
}

export function ProjectGallery({ title, images }: ProjectGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <AnimatedSection animation="slideUp" delay={0.2}>
      <div className="relative group mb-12">
        {/* Card glass background with subtle glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/30 via-purple-500/20 to-pink-500/30 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative backdrop-blur-xl bg-black/20 border border-white/10 p-6 rounded-2xl overflow-hidden shadow-xl">
          {/* Light effect overlays */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute left-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-lg">
                <Image
                  src={images[activeImage]}
                  alt={`${title} - widok ${activeImage + 1}`}
                  className="w-full h-full object-cover rounded-xl"
                  width={800}
                  height={500}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
              {images.map((img, index) => (
                <div
                  key={`${img}-${index}`}
                  className={`cursor-pointer transition-all duration-300 rounded-lg overflow-hidden border ${
                    activeImage === index
                      ? "border-indigo-500 shadow-lg shadow-indigo-500/20"
                      : "border-white/10 opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => setActiveImage(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveImage(index);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Wybierz zdjęcie ${index + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${title} - miniatua ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={400}
                    height={200}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
} 