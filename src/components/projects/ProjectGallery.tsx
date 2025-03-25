"use client";

import { useState } from "react";
import Image from "next/image";
import { Card3D } from "@/components/ambro-ui/card-3d";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";

interface ProjectGalleryProps {
  title: string;
  images: string[];
}

export function ProjectGallery({ title, images }: ProjectGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="mt-16">
      <AnimatedSection animation="slideUp" delay={0.3}>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card3D
              interactive={false}
              glowEffect
              shadow
              borderColor="border-indigo-500/20"
              height="100%"
            >
              <Image
                src={images[activeImage]}
                alt={`${title} - widok ${activeImage + 1}`}
                className="w-full h-full object-cover rounded-xl"
                layout="responsive"
                width={800}
                height={500}
              />
            </Card3D>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
            {images.map((img, index) => (
              <div
                key={`${img}-${index}`}
                className={`cursor-pointer transition-all ${
                  activeImage === index
                    ? "ring-2 ring-indigo-500"
                    : "opacity-70 hover:opacity-100"
                }`}
                onClick={() => setActiveImage(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveImage(index);
                  }
                }}
              >
                <Image
                  src={img}
                  alt={`${title} - miniatua ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                  layout="responsive"
                  width={800}
                  height={500}
                />
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
