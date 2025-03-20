"use client";

import { useTilt } from "@/hooks/use-tilt";
import { useTransform } from "framer-motion";
import {
  useRef,
  type FC,
  type ReactNode,
  memo,
  useMemo,
  useCallback,
} from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { Card } from "@heroui/react";

/**
 * Card3D Component
 *
 * Creates a 3D card with interactive tilt effects and customizable styling using HeroUI.
 * Supports modern glassmorphism and neumorphism effects.
 *
 * @param children - Content to display inside the card
 * @param className - Additional CSS classes
 * @param perspective - 3D perspective value in pixels
 * @param rotateX - Base X-axis rotation in degrees
 * @param rotateY - Base Y-axis rotation in degrees
 * @param rotateZ - Z-axis rotation in degrees
 * @param translateZ - Z-axis translation in pixels
 * @param interactive - Enable interactive tilt effect
 * @param interactiveStrength - Strength of the tilt effect (1-50)
 * @param interactiveLayer - Which layer responds to mouse movement
 * @param bgColor - Background color Tailwind class
 * @param borderColor - Border color Tailwind class
 * @param glowEffect - Enable glow effect
 * @param glowColor - Color of the glow effect
 * @param glowIntensity - Intensity of the glow (0-30)
 * @param invert - Apply invert filter effect
 * @param shadow - Show shadow
 * @param shadowColor - Shadow color
 * @param sharpEdges - Use sharp edges instead of rounded corners
 * @param height - Card height
 * @param width - Card width
 * @param onClick - Click handler function
 * @param variant - Card style variant
 * @param size - Card size
 * @param hoverEffect - Hover effect style
 * @param glassEffect - Glassmorphism effect configuration
 * @param neumorphicEffect - Neumorphism effect configuration
 */
export const Card3D: FC<{
  children: ReactNode;
  className?: string;
  perspective?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  translateZ?: number;
  interactive?: boolean;
  interactiveStrength?: number;
  interactiveLayer?: "child" | "parent";
  bgColor?: string;
  borderColor?: string;
  glowEffect?: boolean;
  glowColor?: string;
  glowIntensity?: number;
  invert?: boolean;
  shadow?: boolean;
  shadowColor?: string;
  sharpEdges?: boolean;
  height?: string;
  width?: string;
  onClick?: () => void;
  variant?:
    | "default"
    | "bordered"
    | "elevated"
    | "flat"
    | "glass"
    | "neumorphic";
  size?: "sm" | "md" | "lg";
  hoverEffect?: "none" | "lift" | "glow" | "glass";
  glassEffect?: {
    blur?: number;
    opacity?: number;
    borderWidth?: number;
    borderColor?: string;
    backdropFilter?: string;
  };
  neumorphicEffect?: {
    lightColor?: string;
    darkColor?: string;
    intensity?: number;
    distance?: number;
  };
}> = memo(
  ({
    children,
    className = "",
    perspective = 1000,
    rotateX = 0,
    rotateY = 0,
    rotateZ = 0,
    translateZ = 0,
    interactive = true,
    interactiveStrength = 15,
    interactiveLayer = "child",
    bgColor = "bg-black/20",
    borderColor = "border-indigo-500/20",
    glowEffect = false,
    glowColor = "rgba(99, 102, 241, 0.4)",
    glowIntensity = 15,
    invert = false,
    shadow = true,
    shadowColor = "rgba(0, 0, 0, 0.4)",
    sharpEdges = false,
    height = "auto",
    width = "auto",
    onClick,
    variant = "default",
    size = "md",
    hoverEffect = "lift",
    glassEffect = {
      blur: 12,
      opacity: 0.1,
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.2)",
      backdropFilter: "blur(12px)",
    },
    neumorphicEffect = {
      lightColor: "rgba(255, 255, 255, 0.1)",
      darkColor: "rgba(0, 0, 0, 0.1)",
      intensity: 0.5,
      distance: 8,
    },
  }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    // Custom tilt effect - only enable if interactive is true
    const {
      rotateX: tiltX,
      rotateY: tiltY,
      handlers,
    } = useTilt({
      amount: interactiveStrength,
      disabled: !interactive,
    });

    // Calculate rotations including base rotations and interactive rotations
    const finalRotateX = useTransform(tiltX, (value) =>
      interactive ? value + rotateX : rotateX
    );

    const finalRotateY = useTransform(tiltY, (value) =>
      interactive ? value + rotateY : rotateY
    );

    // Border radius based on sharp edges setting - memoized
    const borderRadius = useMemo(
      () => (sharpEdges ? "0" : "0.5rem"),
      [sharpEdges]
    );

    // Transform configuration based on interactivity - memoized
    const transformConfig = useMemo(() => {
      if (!interactive) {
        return {
          rotateX,
          rotateY,
          rotateZ,
          translateZ: `${translateZ}px`,
        };
      }

      if (interactiveLayer === "parent") {
        return {
          rotateX: finalRotateX,
          rotateY: finalRotateY,
          rotateZ,
          translateZ: `${translateZ}px`,
        };
      }

      return {
        rotateX,
        rotateY,
        rotateZ,
        translateZ: `${translateZ}px`,
      };
    }, [
      interactive,
      interactiveLayer,
      rotateX,
      rotateY,
      rotateZ,
      translateZ,
      finalRotateX,
      finalRotateY,
    ]);

    // Shadow style - memoized
    const shadowStyle = useMemo(() => {
      if (!shadow) return {};
      return {
        boxShadow: `0 20px 25px -5px ${shadowColor}`,
      };
    }, [shadow, shadowColor]);

    // Glow effect style - memoized
    const glowStyle = useMemo(() => {
      if (!glowEffect) return {};
      return {
        boxShadow: `0 0 ${glowIntensity}px ${glowColor}`,
      };
    }, [glowEffect, glowIntensity, glowColor]);

    // Glass effect style - memoized
    const glassStyle = useMemo(() => {
      if (variant !== "glass") return {};
      return {
        background: `rgba(255, 255, 255, ${glassEffect.opacity})`,
        backdropFilter: glassEffect.backdropFilter,
        border: `${glassEffect.borderWidth}px solid ${glassEffect.borderColor}`,
      };
    }, [variant, glassEffect]);

    // Neumorphic effect style - memoized
    const neumorphicStyle = useMemo(() => {
      if (variant !== "neumorphic") return {};
      const { lightColor, darkColor, distance = 8 } = neumorphicEffect;
      return {
        background: "rgb(30, 41, 59)",
        boxShadow: `
          ${distance}px ${distance}px ${distance * 2}px ${
          darkColor || "rgba(0, 0, 0, 0.1)"
        },
          -${distance}px -${distance}px ${distance * 2}px ${
          lightColor || "rgba(255, 255, 255, 0.1)"
        }
        `,
      };
    }, [variant, neumorphicEffect]);

    // Combined styles for better performance - memoized
    const combinedStyles = useMemo(
      () => ({
        transformStyle: "preserve-3d" as const,
        borderRadius,
        ...transformConfig,
        ...shadowStyle,
        ...glowStyle,
        ...glassStyle,
        ...neumorphicStyle,
      }),
      [
        borderRadius,
        transformConfig,
        shadowStyle,
        glowStyle,
        glassStyle,
        neumorphicStyle,
      ]
    );

    // Memoized click handler to prevent rerenders
    const handleClick = useCallback(() => {
      if (onClick) onClick();
    }, [onClick]);

    // Card classes - memoized
    const cardClasses = useMemo(
      () =>
        twMerge(
          "relative overflow-hidden transition-all duration-300",
          variant === "bordered" && "border-2",
          variant === "elevated" && "shadow-lg",
          variant === "flat" && "shadow-none",
          variant === "glass" && "backdrop-blur-md",
          variant === "neumorphic" && "bg-slate-800",
          size === "sm" && "p-4",
          size === "lg" && "p-6",
          hoverEffect === "lift" && "hover:scale-105",
          hoverEffect === "glow" && "hover:shadow-xl",
          hoverEffect === "glass" && "hover:bg-white/20",
          className
        ),
      [variant, size, hoverEffect, className]
    );

    return (
      <motion.div
        ref={cardRef}
        className={cardClasses}
        style={{
          perspective: `${perspective}px`,
          height,
          width,
          borderRadius,
        }}
        onClick={handleClick}
        {...(interactiveLayer === "parent" ? handlers : {})}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
      >
        <Card
          className={twMerge(
            "w-full h-full transition-all duration-300",
            variant === "glass" && "bg-white/10",
            variant === "neumorphic" && "bg-slate-800",
            bgColor,
            borderColor
          )}
          style={combinedStyles}
          {...(interactiveLayer === "child" ? handlers : {})}
        >
          <div
            className="relative w-full h-full overflow-hidden"
            style={{
              transformStyle: "preserve-3d",
              borderRadius,
            }}
          >
            {/* Background effects */}
            {invert && (
              <div
                className="absolute inset-0 backdrop-invert mix-blend-difference z-0"
                style={{ borderRadius, backdropFilter: "blur(50%)" }}
                aria-hidden="true"
              />
            )}

            {/* Glass effect overlay */}
            {variant === "glass" && (
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,${glassEffect.opacity}) 0%, rgba(255,255,255,0) 100%)`,
                  backdropFilter: glassEffect.backdropFilter,
                }}
                aria-hidden="true"
              />
            )}

            {/* Neumorphic light effect */}
            {variant === "neumorphic" && (
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${neumorphicEffect.lightColor}, transparent 70%)`,
                }}
                aria-hidden="true"
              />
            )}

            {/* Content */}
            <div
              className="relative z-10 w-full h-full"
              style={{
                transformStyle: "preserve-3d",
                transform: "translateZ(5px)",
              }}
            >
              {children}
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }
);

// Add display name for better debugging
Card3D.displayName = "Card3D";
