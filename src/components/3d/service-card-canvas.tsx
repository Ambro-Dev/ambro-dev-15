"use client";

import React, { useRef, memo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// Interface ServiceIconProps
interface ServiceIconProps {
  serviceId: string;
  isHovered: boolean;
  color: string;
  performance?: "high" | "medium" | "low";
  pauseAnimations?: boolean;
}

// Convert color name to hex
const getColorHex = (colorName: string): string => {
  const colorMap: { [key: string]: string } = {
    indigo: "#6366f1",
    blue: "#3b82f6",
    emerald: "#10b981",
    sky: "#0ea5e9",
    purple: "#a855f7",
    amber: "#f59e0b",
    pink: "#ec4899",
  };

  return colorMap[colorName] || "#6366f1"; // Default to indigo if not found
};

// 3D Service Icon - optimized, implemented as memo
const ServiceIcon = memo(
  ({
    serviceId,
    isHovered,
    color,
    pauseAnimations = false,
  }: ServiceIconProps) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.MeshStandardMaterial>(null);

    // Further reduce animation complexity
    const rotationSpeed = 0.05; // Much slower rotation
    const bounceAmount = 0.01; // Less bounce

    // Target values for animations
    const [scale, setScale] = useState(1);
    const [emissiveIntensity, setEmissiveIntensity] = useState(0.2);

    // Update target values when hover state changes
    useEffect(() => {
      setScale(isHovered ? 1.1 : 1);
      setEmissiveIntensity(isHovered ? 0.3 : 0.2);
    }, [isHovered]);

    // Convert color name to hex
    const colorHex = getColorHex(color);

    // Much simpler animation frame
    useFrame((state) => {
      if (meshRef.current && !pauseAnimations) {
        // Simple scale
        meshRef.current.scale.x = scale;
        meshRef.current.scale.y = scale;
        meshRef.current.scale.z = scale;

        // Simple rotation - just Y axis
        meshRef.current.rotation.y =
          state.clock.getElapsedTime() * rotationSpeed;

        // Simplified position
        if (isHovered) {
          meshRef.current.position.y =
            Math.sin(state.clock.getElapsedTime()) * bounceAmount;
        }

        // Update material emissive intensity directly
        if (materialRef.current) {
          materialRef.current.emissiveIntensity = emissiveIntensity;
        }
      }
    });

    // Ultra simplified geometries for all cases
    const renderShape = () => {
      switch (serviceId) {
        case "infrastructure":
          return <torusKnotGeometry args={[0.8, 0.3, 8, 4]} />;
        case "servers":
          return <boxGeometry args={[1.2, 1.2, 1.2]} />;
        case "monitoring":
          return <sphereGeometry args={[1, 8, 8]} />;
        case "security":
          return <octahedronGeometry args={[1]} />;
        case "databases":
          return <cylinderGeometry args={[0.8, 0.8, 1.5, 8]} />;
        case "deployment":
          return <dodecahedronGeometry args={[1]} />;
        case "webapps":
          return <tetrahedronGeometry args={[1.2]} />;
        case "architecture":
          return <icosahedronGeometry args={[1]} />;
        default:
          return <sphereGeometry args={[1, 8, 8]} />;
      }
    };

    return (
      <mesh ref={meshRef}>
        {renderShape()}
        <meshStandardMaterial
          ref={materialRef}
          color={colorHex}
          metalness={0.5}
          roughness={0.5}
          emissive={colorHex}
          emissiveIntensity={emissiveIntensity}
          flatShading={true}
        />
      </mesh>
    );
  }
);

ServiceIcon.displayName = "ServiceIcon";

// Interface for the main component ServiceCardCanvas props
interface ServiceCardCanvasProps {
  serviceId: string;
  isHovered: boolean;
  color: string;
  performance?: "high" | "medium" | "low";
  pauseAnimations?: boolean;
}

// Main Canvas component optimized as memo
const ServiceCardCanvas = memo(
  ({
    serviceId,
    isHovered,
    color,
    performance = "high", // Default to high performance
    pauseAnimations = false,
  }: ServiceCardCanvasProps) => {
    // Fixed low DPR for better performance
    const dpr: [number, number] = [1, 1.5];

    return (
      <div className="w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          dpr={dpr}
          style={{ background: "transparent" }}
          frameloop="demand" // Only render when needed
          gl={{ antialias: false }} // Disable antialiasing for performance
        >
          <ambientLight intensity={0.7} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
          />

          {/* Simplified Float with minimal animation */}
          <Float
            speed={1}
            rotationIntensity={0.1}
            floatIntensity={0.2}
            enabled={!pauseAnimations}
          >
            <ServiceIcon
              serviceId={serviceId}
              isHovered={isHovered}
              color={color}
              performance={performance}
              pauseAnimations={pauseAnimations}
            />
          </Float>
        </Canvas>
      </div>
    );
  }
);

ServiceCardCanvas.displayName = "ServiceCardCanvas";

export default ServiceCardCanvas;
