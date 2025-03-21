"use client";

import { animate, useMotionValue } from "framer-motion";
import {
  type FC,
  type ReactNode,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

export const SmoothScroll: FC<{
  children: ReactNode;
  offset?: number;
  disabled?: boolean;
  behavior?: ScrollBehavior;
  duration?: number;
  ease?: [number, number, number, number];
  onlyLinks?: boolean;
  selector?: string;
  scrollResistance?: number;
  autoDisableOnMobile?: boolean;
}> = ({
  children,
  offset = 80,
  disabled = false,
  behavior = "smooth",
  duration = 0.8,
  ease = [0.32, 0.72, 0, 1],
  onlyLinks = true,
  scrollResistance = 5,
  autoDisableOnMobile = true,
}) => {
  // Create the motion value at the component level
  const scrollY = useMotionValue(0);
  const isScrolling = useRef(false);
  const [shouldDisable, setShouldDisable] = useState(false);
  
  // Check for mobile devices to automatically disable
  useEffect(() => {
    if (autoDisableOnMobile) {
      const checkMobile = () => {
        setShouldDisable(window.innerWidth < 768);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, [autoDisableOnMobile]);

  // Complete disable if needed
  if (disabled || shouldDisable) {
    return <>{children}</>;
  }

  // Memoize the animation options to avoid recreating objects
  const animationOptions = useMemo(
    () => ({
      duration,
      ease,
    }),
    [duration, ease]
  );

  // Define the scroll function with fewer dependencies
  const scrollWithFramer = useCallback(
    (targetY: number, initialY: number) => {
      const difference = targetY - initialY;

      // Skip animation for small distances
      if (Math.abs(difference) < 50) {
        window.scrollTo(0, targetY);
        return;
      }

      // Prevent multiple animations
      if (isScrolling.current) return;
      isScrolling.current = true;

      // Set the current value
      scrollY.set(initialY);

      // Use requestAnimationFrame for smoother performance
      let rafId: number;
      let lastScrollPosition = initialY;
      
      const handleScroll = () => {
        window.scrollTo(0, scrollY.get());
        lastScrollPosition = scrollY.get();
        rafId = requestAnimationFrame(handleScroll);
      };
      
      rafId = requestAnimationFrame(handleScroll);

      // Animate the motion value using memoized options
      animate(scrollY, targetY, {
        ...animationOptions,
        onComplete: () => {
          cancelAnimationFrame(rafId);
          isScrolling.current = false;
        },
      });
    },
    [scrollY, animationOptions] // Now we only depend on stable references
  );

  useEffect(() => {
    if (disabled) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile && scrollResistance > 0) return;

    // Use event delegation for better performance
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Use querySelector to find the closest matching element
      const linkSelector = onlyLinks ? 'a[href^="#"]' : "[data-scroll]";
      const anchor = target.closest(linkSelector);

      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const dataTarget = anchor.getAttribute("data-scroll-target");
      const targetSelector = dataTarget || href;

      if (!targetSelector) return;

      e.preventDefault();

      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        const element = document.querySelector(targetSelector);
        if (!element) return;

        const targetPosition =
          element.getBoundingClientRect().top + window.pageYOffset - offset;

        if (behavior === "smooth") {
          scrollWithFramer(targetPosition, window.pageYOffset);
        } else {
          window.scrollTo({
            top: targetPosition,
            behavior,
          });
        }
      });
    };

    // Use passive event listener where possible
    document.addEventListener("click", handleClick, { passive: false });

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [
    offset,
    disabled,
    behavior,
    onlyLinks,
    scrollResistance,
    scrollWithFramer,
  ]);

  return <>{children}</>;
};
