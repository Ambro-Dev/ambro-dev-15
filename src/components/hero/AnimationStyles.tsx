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
      }

      .bg-noise {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        background-repeat: repeat;
        background-size: 200px 200px;
      }

      .glow-sm {
        box-shadow: 0 0 8px 2px rgba(99, 102, 241, 0.3);
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.7;
          transform: scale(0.95);
        }
      }

      @keyframes pulse-slow {
        0%,
        100% {
          opacity: 0.5;
        }
        50% {
          opacity: 0.2;
        }
      }

      @keyframes float-slow {
        0%,
        100% {
          transform: translate(0, 0);
        }
        25% {
          transform: translate(2%, 1%);
        }
        50% {
          transform: translate(0, 2%);
        }
        75% {
          transform: translate(-2%, 1%);
        }
      }

      @keyframes float-medium {
        0%,
        100% {
          transform: translate(0, 0);
        }
        25% {
          transform: translate(-2%, 2%);
        }
        50% {
          transform: translate(-1%, -1%);
        }
        75% {
          transform: translate(1%, -2%);
        }
      }

      @keyframes float-fast {
        0%,
        100% {
          transform: translate(0, 0);
        }
        25% {
          transform: translate(1%, -2%);
        }
        50% {
          transform: translate(2%, 1%);
        }
        75% {
          transform: translate(-1%, 2%);
        }
      }

      @keyframes twinkle {
        0%,
        100% {
          opacity: 0.2;
          transform: scale(1);
        }
        50% {
          opacity: 0.7;
          transform: scale(1.5);
        }
      }

      .animate-float-slow {
        animation: float-slow 20s ease-in-out infinite;
      }

      .animate-float-medium {
        animation: float-medium 15s ease-in-out infinite;
      }

      .animate-float-fast {
        animation: float-fast 12s ease-in-out infinite;
      }

      .animate-pulse-slow {
        animation: pulse-slow 4s ease-in-out infinite;
      }
    `}</style>
  );
};
