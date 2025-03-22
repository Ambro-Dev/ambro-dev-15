"use client";

export default function GlobalStylesComponent() {
  return (
    <style jsx global>{`
      .section-spacing {
        padding-top: 8rem;
        padding-bottom: 8rem;
      }

      .bg-grid-pattern {
        background-image: linear-gradient(
            rgba(99, 102, 241, 0.04) 1px,
            transparent 1px
          ),
          linear-gradient(90deg, rgba(99, 102, 241, 0.04) 1px, transparent 1px);
        background-size: 4rem 4rem;
      }
    `}</style>
  );
}
