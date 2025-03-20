"use client";

import React, { useRef, memo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, Float } from "@react-three/drei";
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
    performance = "medium",
    pauseAnimations = false,
  }: ServiceIconProps) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.MeshStandardMaterial>(null);

    // Constants instead of states - reduced complexity
    const rotationSpeed = performance === "high" ? 0.15 : 0.3;
    const bounceAmount = performance === "high" ? 0.02 : 0.05;
    const hoverMultiplier = performance === "high" ? 1.5 : 2;

    // Target values for animations
    const [scale, setScale] = useState(1);
    const [targetRotationY, setTargetRotationY] = useState(0);
    const [emissiveIntensity, setEmissiveIntensity] = useState(0.2);

    // Update target values when hover state changes
    useEffect(() => {
      setScale(isHovered ? 1.1 : 1);
      setTargetRotationY(isHovered ? Math.PI : 0);
      setEmissiveIntensity(pauseAnimations ? 0.1 : isHovered ? 0.4 : 0.2);
    }, [isHovered, pauseAnimations]);

    // Convert color name to hex
    const colorHex = getColorHex(color);

    // Optimized continuous animation
    useFrame((state) => {
      if (meshRef.current) {
        // Smooth scale transition
        meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);

        // Continuous rotation + hover rotation
        meshRef.current.rotation.y =
          state.clock.getElapsedTime() * rotationSpeed;

        // Additional rotation towards target on hover
        meshRef.current.rotation.y += THREE.MathUtils.lerp(
          meshRef.current.userData.currentRotation || 0,
          targetRotationY,
          0.1
        );
        meshRef.current.userData.currentRotation = THREE.MathUtils.lerp(
          meshRef.current.userData.currentRotation || 0,
          targetRotationY,
          0.1
        );

        // Less intensive up-down movement
        if (isHovered) {
          meshRef.current.position.y =
            Math.sin(state.clock.getElapsedTime() * hoverMultiplier) *
            bounceAmount;
        } else {
          // Reset position when not hovered - fewer calculations
          meshRef.current.position.y =
            Math.sin(state.clock.getElapsedTime()) * bounceAmount * 0.5;
        }

        // Update material emissive intensity
        if (materialRef.current) {
          materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
            materialRef.current.emissiveIntensity,
            emissiveIntensity,
            0.1
          );
        }
      }
    });

    // Geometries with drastically reduced complexity during transitions
    const renderShape = () => {
      // Ultra-simple geometry during filter change
      if (pauseAnimations) {
        switch (serviceId) {
          case "infrastructure":
            return <torusKnotGeometry args={[0.8, 0.3, 8, 4]} />;
          case "servers":
            return <boxGeometry args={[1.2, 1.2, 1.2]} />;
          case "monitoring":
            return <sphereGeometry args={[1, 6, 6]} />;
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
            return <sphereGeometry args={[1, 6, 6]} />;
        }
      }

      // Higher details when there is no filter change
      const useHighDetail = performance !== "high";

      switch (serviceId) {
        case "infrastructure":
          return (
            <torusKnotGeometry
              args={useHighDetail ? [0.8, 0.3, 128, 32] : [0.8, 0.3, 100, 16]}
            />
          );
        case "servers":
          return <boxGeometry args={[1.2, 1.2, 1.2]} />;
        case "monitoring":
          return (
            <sphereGeometry args={useHighDetail ? [1, 48, 48] : [1, 32, 32]} />
          );
        case "security":
          return <octahedronGeometry args={useHighDetail ? [1, 2] : [1]} />;
        case "databases":
          return (
            <cylinderGeometry
              args={useHighDetail ? [0.8, 0.8, 1.5, 48] : [0.8, 0.8, 1.5, 32]}
            />
          );
        case "deployment":
          return <dodecahedronGeometry args={useHighDetail ? [1, 1] : [1]} />;
        case "webapps":
          return <tetrahedronGeometry args={[1.2]} />;
        case "architecture":
          return <icosahedronGeometry args={useHighDetail ? [1, 1] : [1]} />;
        default:
          return (
            <sphereGeometry args={useHighDetail ? [1, 48, 48] : [1, 32, 32]} />
          );
      }
    };

    return (
      <mesh ref={meshRef}>
        {renderShape()}
        <meshStandardMaterial
          ref={materialRef}
          color={colorHex}
          metalness={pauseAnimations ? 0.5 : 0.7}
          roughness={pauseAnimations ? 0.5 : 0.3}
          emissive={colorHex}
          emissiveIntensity={pauseAnimations ? 0.1 : isHovered ? 0.4 : 0.2}
          // The following parameters are computationally expensive, so we disable them during filter changes
          flatShading={pauseAnimations}
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
    performance = "medium",
    pauseAnimations = false,
  }: ServiceCardCanvasProps) => {
    // Removed delayed rendering that caused problems

    // Canvas parameter optimization based on performance mode
    const dpr: [number, number] = [1, 2]; // Limiting maximum DPR

    // Environment preset selection based on performance
    const environmentPreset = performance === "high" ? "apartment" : "city";

    return (
      <div className="w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          dpr={dpr}
          style={{ background: "transparent" }}
          frameloop="always" // Always render - "demand" caused problems
        >
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
          />

          {/* Removed pointLight for better performance in high performance mode */}
          {performance !== "high" && (
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
          )}

          {/* Optimized Float with less intensity */}
          <Float
            speed={1.5}
            rotationIntensity={isHovered ? 0.3 : 0.1}
            floatIntensity={isHovered ? 0.6 : 0.3}
          >
            <ServiceIcon
              serviceId={serviceId}
              isHovered={isHovered}
              color={color}
              performance={performance}
              pauseAnimations={pauseAnimations}
            />
          </Float>

          {/* Shadows only when not in high performance mode */}
          {performance !== "high" && (
            <ContactShadows
              position={[0, -1.5, 0]}
              opacity={0.3}
              scale={3.5}
              blur={2}
              far={4}
            />
          )}

          {/* Simplified environment for high performance mode */}
          <Environment preset={environmentPreset} />
        </Canvas>
      </div>
    );
  }
);

ServiceCardCanvas.displayName = "ServiceCardCanvas";

export default ServiceCardCanvas;
