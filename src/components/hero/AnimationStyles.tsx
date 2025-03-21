// components/hero/AnimationStyles.tsx
import React from "react";

export const AnimationStyles: React.FC = () => {
  return (
    <style jsx global>{`
      .bg-grid-pattern {
        background-size: 60px 60px;
        background-image: linear-gradient(
            to right,
            rgba(99, 102, 241, 0.07) 1px,
            transparent 1px
          ),
          linear-gradient(
            to bottom,
            rgba(99, 102, 241, 0.07) 1px,
            transparent 1px
          );
        will-change: transform;
        transform: translateZ(0);
        backface-visibility: hidden;
      }

      .bg-noise {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        background-repeat: repeat;
        background-size: 200px 200px;
        transform: translateZ(0);
      }

      .glow-sm {
        box-shadow: 0 0 8px 2px rgba(99, 102, 241, 0.3);
      }

      /* Force visibility for elements with data-force-visible attribute */
      [data-force-visible="true"] {
        opacity: 1 !important;
        transform: none !important;
        visibility: visible !important;
      }
      
      /* Ensure initially visible on page load */
      body:not(.loaded) [data-in-view="false"],
      body.hero-visible [data-in-view="false"],
      body.force-visible [data-in-view="false"] {
        opacity: 1 !important;
        transform: none !important;
      }
      
      /* Performance optimization */
      .will-change-transform {
        will-change: transform;
        transform: translateZ(0);
        backface-visibility: hidden;
      }
      
      /* Apply hardware acceleration to specific animations */
      .animate-float-slow,
      .animate-float-medium,
      .animate-float-fast,
      .animate-pulse-slow {
        transform: translateZ(0);
        backface-visibility: hidden;
        will-change: transform, opacity;
      }
      
      /* Define animations with improved performance */
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translate3d(0, 10px, 0);
        }
        to {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }

      @keyframes pulse {
        0%, 100% {
          opacity: 1;
          transform: scale3d(1, 1, 1);
        }
        50% {
          opacity: 0.7;
          transform: scale3d(0.95, 0.95, 1);
        }
      }

      @keyframes pulse-slow {
        0%, 100% {
          opacity: 0.5;
        }
        50% {
          opacity: 0.2;
        }
      }

      @keyframes float-slow {
        0%, 100% {
          transform: translate3d(0, 0, 0);
        }
        25% {
          transform: translate3d(2%, 1%, 0);
        }
        50% {
          transform: translate3d(0, 2%, 0);
        }
        75% {
          transform: translate3d(-2%, 1%, 0);
        }
      }

      @keyframes float-medium {
        0%, 100% {
          transform: translate3d(0, 0, 0);
        }
        25% {
          transform: translate3d(-2%, 2%, 0);
        }
        50% {
          transform: translate3d(-1%, -1%, 0);
        }
        75% {
          transform: translate3d(1%, -2%, 0);
        }
      }

      @keyframes float-fast {
        0%, 100% {
          transform: translate3d(0, 0, 0);
        }
        25% {
          transform: translate3d(1%, -2%, 0);
        }
        50% {
          transform: translate3d(2%, 1%, 0);
        }
        75% {
          transform: translate3d(-1%, 2%, 0);
        }
      }

      @keyframes float {
        0% {
          transform: translate3d(0, 0, 0);
        }
        50% {
          transform: translate3d(0, -15px, 0);
        }
        100% {
          transform: translate3d(0, 0, 0);
        }
      }

      @keyframes shimmer {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
    `}</style>
  );
};
