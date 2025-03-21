"use client";

import {
  type HTMLMotionProps,
  motion,
  useInView,
  type Variants,
} from "framer-motion";
import React, { type FC, type ReactNode, useRef, useMemo, memo, useEffect, useState } from "react";

/**
 * AnimatedSection Component - Performance Optimized
 *
 * Creates a section with animation effects that trigger when the element enters the viewport.
 *
 * @param children - Content to be wrapped and animated
 * @param className - Additional CSS classes
 * @param delay - Animation delay in seconds
 * @param threshold - Visibility threshold to trigger animation (0.0 to 1.0)
 * @param as - Component type to render (defaults to motion.div)
 * @param animation - Animation type preset
 * @param duration - Animation duration in seconds
 * @param distance - Movement distance for slide animations in pixels
 * @param easing - Animation easing curve
 * @param once - Whether to trigger animation only once
 * @param staggerChildren - Delay between child animations in seconds
 * @param customVariants - Custom animation variants
 * @param disableOnMobile - Whether to disable animations on mobile devices
 */
export const AnimatedSection: FC<{
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  as?: React.ComponentType<HTMLMotionProps<"div">>;
  animation?:
    | "fadeIn"
    | "slideUp"
    | "slideLeft"
    | "slideRight"
    | "zoomIn"
    | "custom";
  duration?: number;
  distance?: number;
  easing?: [number, number, number, number];
  once?: boolean;
  staggerChildren?: number;
  customVariants?: Variants;
  disableOnMobile?: boolean;
}> = memo(
  ({
    children,
    className = "",
    delay = 0,
    threshold = 0.1,
    as: Component = motion.div,
    animation = "slideUp",
    duration = 0.6,
    distance = 30,
    easing = [0.215, 0.61, 0.355, 1],
    once = true,
    staggerChildren = 0,
    customVariants,
    disableOnMobile = true,
  }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    
    // Detect mobile devices for animation reduction
    useEffect(() => {
      // Mark as mounted first
      setIsMounted(true);
      
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Skip animations on mobile if disabled
    if (disableOnMobile && isMobile) {
      return <div className={className}>{children}</div>;
    }

    const inView = useInView(ref, {
      amount: threshold,
      once,
    });

    // Force visibility after component mounts
    useEffect(() => {
      // Only run after component has mounted to prevent hydration mismatch
      if (!isMounted) return;
      
      // Force immediate visibility for hero sections
      if (className?.includes('hero') || document.body.classList.contains('hero-visible')) {
        if (ref.current) {
          ref.current.dataset.forceVisible = 'true';
          ref.current.style.opacity = '1';
          ref.current.style.transform = 'none';
        }
        return;
      }
      
      // For other sections, short delay to prevent jank
      const timer = setTimeout(() => {
        if (ref.current) {
          ref.current.dataset.forceVisible = 'true';
        }
      }, 50);
      
      return () => clearTimeout(timer);
    }, [className, isMounted]);

    // Predefined animation variants - memoized to prevent recreation on every render
    const animations = useMemo<Record<string, Variants>>(
      () => ({
        fadeIn: {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        },
        slideUp: {
          hidden: { opacity: 0, y: distance, willChange: "opacity, transform" },
          visible: { opacity: 1, y: 0, willChange: "opacity, transform" },
        },
        slideLeft: {
          hidden: { opacity: 0, x: distance, willChange: "opacity, transform" },
          visible: { opacity: 1, x: 0, willChange: "opacity, transform" },
        },
        slideRight: {
          hidden: { opacity: 0, x: -distance, willChange: "opacity, transform" },
          visible: { opacity: 1, x: 0, willChange: "opacity, transform" },
        },
        zoomIn: {
          hidden: { opacity: 0, scale: 0.95, willChange: "opacity, transform" },
          visible: { opacity: 1, scale: 1, willChange: "opacity, transform" },
        },
      }),
      [distance]
    );

    // Selected animation variant - memoized
    const selectedVariants = useMemo(
      () => (animation === "custom" ? customVariants : animations[animation]),
      [animation, animations, customVariants]
    );

    // Container variants with stagger effect - memoized
    const containerVariants = useMemo(
      () =>
        staggerChildren > 0
          ? {
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: Math.min(staggerChildren, 0.05),
                  delayChildren: delay,
                },
              },
            }
          : selectedVariants,
      [staggerChildren, delay, selectedVariants]
    );

    // Animation transition config - memoized
    const transitionConfig = useMemo(
      () => ({
        duration,
        delay: staggerChildren > 0 ? 0 : delay,
        ease: easing,
      }),
      [duration, delay, staggerChildren, easing]
    );

    // Staggered children - only process when staggerChildren is active
    const processedChildren = useMemo(() => {
      if (!staggerChildren) return children;

      // Limit the number of animated children to improve performance
      const childrenArray = React.Children.toArray(children);
      const maxAnimatedChildren = 8; // Limit staggered children
      
      return React.Children.map(childrenArray.slice(0, maxAnimatedChildren), (child) => (
        <motion.div
          key={React.isValidElement(child) && child.key ? child.key : undefined}
          variants={selectedVariants}
          transition={{
            duration,
            ease: easing,
          }}
          style={{ 
            willChange: "transform, opacity",
            transform: "translateZ(0)" // Hardware acceleration
          }}
        >
          {child}
        </motion.div>
      )).concat(
        // Render remaining children without animation
        childrenArray.slice(maxAnimatedChildren).map((child, i) => (
          <div key={`static-${i}`}>{child}</div>
        ))
      );
    }, [children, staggerChildren, selectedVariants, duration, easing]);

    return (
      <Component
        ref={ref}
        initial={isMounted ? "hidden" : false}
        animate={isMounted ? (inView ? "visible" : "hidden") : false}
        variants={containerVariants}
        transition={transitionConfig}
        className={className}
        style={{ 
          willChange: inView && isMounted ? "opacity, transform" : "auto",
          transform: "translateZ(0)", // Hardware acceleration
          backfaceVisibility: "hidden",
        }}
        data-in-view={inView}
        data-mounted={isMounted}
      >
        {processedChildren}
      </Component>
    );
  }
);

// Add display name for better debugging
AnimatedSection.displayName = "AnimatedSection";
