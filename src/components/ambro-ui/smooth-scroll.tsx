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
}> = ({
  children,
  offset = 80,
  disabled = false,
  behavior = "smooth",
  duration = 1,
  ease = [0.32, 0.72, 0, 1],
  onlyLinks = true,
  scrollResistance = 5,
}) => {
  // Create the motion value at the component level
  const scrollY = useMotionValue(0);
  const isScrolling = useRef(false);
  // Add component key for re-rendering
  const [componentKey, setComponentKey] = useState<number>(Date.now());

  // Memoize the animation options to avoid recreating objects
  const animationOptions = useMemo(
    () => ({
      duration,
      ease,
    }),
    [duration, ease]
  );

  // Force scroll to top on component mount
  useEffect(() => {
    // Reset scroll position to top on mount
    window.scrollTo(0, 0);
  }, []);

  // Define the scroll function with fewer dependencies
  const scrollWithFramer = useCallback(
    (targetY: number, initialY: number) => {
      const difference = targetY - initialY;

      if (Math.abs(difference) < 10) {
        window.scrollTo(0, targetY);
        return;
      }

      // Prevent multiple animations
      if (isScrolling.current) return;
      isScrolling.current = true;

      // Set the current value
      scrollY.set(initialY);

      // Update window scroll position when the motion value changes
      const unsubscribe = scrollY.onChange((latest) => {
        window.scrollTo(0, latest);
      });

      // Animate the motion value using memoized options
      animate(scrollY, targetY, {
        ...animationOptions,
        onComplete: () => {
          unsubscribe();
          isScrolling.current = false;
        },
      });
    },
    [scrollY, animationOptions] // Now we only depend on stable references
  );

  // Reset component state on navigation
  useEffect(() => {
    const handleRouteChange = () => {
      isScrolling.current = false;
      scrollY.set(0);
      setComponentKey(Date.now());

      // Force scroll to top
      window.scrollTo(0, 0);
    };

    window.addEventListener("popstate", handleRouteChange);
    window.addEventListener("load", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      window.removeEventListener("load", handleRouteChange);
    };
  }, [scrollY]);

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

  return <div key={componentKey}>{children}</div>;
};
