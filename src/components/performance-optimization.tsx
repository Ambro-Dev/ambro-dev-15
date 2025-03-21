"use client";

import { useEffect } from "react";

/**
 * PerformanceOptimizer Component
 * 
 * This component applies various performance optimization techniques:
 * 1. Defers non-critical JavaScript execution
 * 2. Applies lazy loading for images outside viewport
 * 3. Implements intersection observer for animations
 * 4. Throttles scroll/resize events for better performance
 */
export default function PerformanceOptimizer() {
  useEffect(() => {
    // Function to add intersection observer for lazy loading
    const setupLazyLoading = () => {
      // Create intersection observer for images and videos
      const mediaObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const element = entry.target;
              
              // Handle lazy load images
              if (element.tagName === 'IMG') {
                const imgElement = element as HTMLImageElement;
                if (imgElement.dataset.src) {
                  imgElement.src = imgElement.dataset.src;
                  imgElement.removeAttribute('data-src');
                  mediaObserver.unobserve(element);
                }
              }
              
              // Handle lazy load videos
              if (element.tagName === 'VIDEO') {
                const videoElement = element as HTMLVideoElement;
                if (videoElement.dataset.src) {
                  videoElement.src = videoElement.dataset.src;
                  videoElement.load();
                  videoElement.removeAttribute('data-src');
                  mediaObserver.unobserve(element);
                }
              }
            }
          });
        },
        { rootMargin: '200px 0px' } // Load when within 200px of viewport
      );
      
      // Observe all images and videos with data-src
      document.querySelectorAll('img[data-src], video[data-src]').forEach(el => {
        mediaObserver.observe(el);
      });
    };
    
    // Throttle resize events for better performance
    const setupThrottledEvents = () => {
      let resizeTimeout: NodeJS.Timeout;
      let scrollTimeout: NodeJS.Timeout;
      let lastScrollPosition = window.scrollY;
      
      // Throttle resize events
      const throttledResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          // Trigger any resize-dependent calculations here
          document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
        }, 200);
      };
      
      // Throttle scroll events
      const throttledScroll = () => {
        // Skip if we're in the middle of processing
        if (scrollTimeout) return;
        
        scrollTimeout = setTimeout(() => {
          // Only process if we've scrolled substantially
          if (Math.abs(lastScrollPosition - window.scrollY) > 50) {
            // Trigger any scroll-dependent calculations here
            lastScrollPosition = window.scrollY;
          }
          scrollTimeout = null as unknown as NodeJS.Timeout;
        }, 100);
      };
      
      window.addEventListener('resize', throttledResize, { passive: true });
      window.addEventListener('scroll', throttledScroll, { passive: true });
      
      // Initial setup
      throttledResize();
      
      // Return cleanup function
      return () => {
        window.removeEventListener('resize', throttledResize);
        window.removeEventListener('scroll', throttledScroll);
        clearTimeout(resizeTimeout);
        clearTimeout(scrollTimeout);
      };
    };
    
    // Add browser hint for critical resources
    const addResourceHints = () => {
      // Preconnect to critical domains
      const domains = [
        'https://fonts.googleapis.com', 
        'https://fonts.gstatic.com'
      ];
      
      domains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    };
    
    // Reduce layout thrashing by batching DOM operations
    const optimizeAnimationFrames = () => {
      // Add a helper function to window for batching visual updates
      (window as any).batchVisualUpdates = (callback: () => void) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            callback();
          });
        });
      };
    };

    // Run optimizations after a small delay to prioritize initial render
    const timeout = setTimeout(() => {
      setupLazyLoading();
      const cleanup = setupThrottledEvents();
      addResourceHints();
      optimizeAnimationFrames();
      
      return cleanup;
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, []);

  // This component doesn't render anything visible
  return null;
} 