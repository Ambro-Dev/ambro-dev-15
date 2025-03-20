import { SmoothScroll } from "@/components/ambro-ui/smooth-scroll";

// Base skeleton for all sections
function BaseSectionSkeleton({
  height = "h-screen",
  title,
}: {
  height?: string;
  title?: string;
}) {
  return (
    <section
      className={`w-full ${height} flex flex-col items-center justify-center p-4 border border-dashed border-gray-700`}
    >
      {title && <h2 className="text-2xl font-bold text-gray-400">{title}</h2>}
      <div className="w-3/4 h-4 bg-gray-800 rounded mt-4 animate-pulse"></div>
      <div className="w-1/2 h-4 bg-gray-800 rounded mt-2 animate-pulse"></div>
    </section>
  );
}

// Hero section skeleton
function HeroSkeleton() {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center p-4 border border-dashed border-gray-700">
      <div className="w-3/4 h-12 bg-gray-800 rounded animate-pulse"></div>
      <div className="w-1/2 h-8 bg-gray-800 rounded mt-4 animate-pulse"></div>
      <div className="flex gap-4 mt-8">
        <div className="w-32 h-10 bg-gray-800 rounded animate-pulse"></div>
        <div className="w-32 h-10 bg-gray-800 rounded animate-pulse"></div>
      </div>
    </section>
  );
}

// Grid section skeleton (for projects, services, etc.)
function GridSectionSkeleton({
  title,
  columns = 3,
}: {
  title: string;
  columns?: number;
}) {
  return (
    <section className="w-full py-16 px-4 border border-dashed border-gray-700">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-400 text-center mb-8">
          {title}
        </h2>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-8`}
        >
          {Array(columns)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-gray-800/50 rounded-lg h-64 animate-pulse"
                aria-hidden="true"
              />
            ))}
        </div>
      </div>
    </section>
  );
}

// Infrastructure section skeleton with interactive elements hint
function InfrastructureSkeleton() {
  return (
    <section className="w-full py-16 px-4 border border-dashed border-gray-700">
      <h2 className="text-2xl font-bold text-gray-400 text-center mb-8">
        Infrastructure
      </h2>
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="w-3/4 h-96 bg-gray-800/50 rounded-lg animate-pulse relative">
          <div className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-gray-700 animate-ping"></div>
          <div
            className="absolute top-1/2 right-1/3 w-12 h-12 rounded-full bg-gray-700 animate-ping"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-1/3 right-1/4 w-12 h-12 rounded-full bg-gray-700 animate-ping"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
      </div>
    </section>
  );
}

// Testimonials section skeleton
function TestimonialsSkeleton() {
  return (
    <section className="w-full py-16 px-4 border border-dashed border-gray-700">
      <h2 className="text-2xl font-bold text-gray-400 text-center mb-8">
        Testimonials
      </h2>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800/30 rounded-lg p-6 mb-8">
          <div className="w-32 h-4 bg-gray-700 rounded mb-4 animate-pulse"></div>
          <div className="w-3/4 h-4 bg-gray-700 rounded mb-2 animate-pulse"></div>
          <div className="w-1/2 h-4 bg-gray-700 rounded animate-pulse"></div>
          <div className="flex items-center mt-4">
            <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse mr-3"></div>
            <div className="w-24 h-4 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="bg-gray-800/30 rounded-lg p-6">
          <div className="w-3/4 h-4 bg-gray-700 rounded mb-2 animate-pulse"></div>
          <div className="w-1/2 h-4 bg-gray-700 rounded animate-pulse"></div>
          <div className="flex items-center mt-4">
            <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse mr-3"></div>
            <div className="w-24 h-4 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// CTA section skeleton
function CTASkeleton() {
  return (
    <section className="w-full h-48 bg-gradient-to-r from-gray-800/50 to-gray-700/50 flex items-center justify-center border border-dashed border-gray-700">
      <div className="text-center">
        <div className="w-64 h-6 bg-gray-700 rounded mx-auto animate-pulse"></div>
        <div className="w-48 h-4 bg-gray-700 rounded mx-auto mt-3 animate-pulse"></div>
        <div className="w-32 h-10 bg-gray-700 rounded mx-auto mt-6 animate-pulse"></div>
      </div>
    </section>
  );
}

export default function PageSkeleton() {
  return (
    <main className="min-h-screen text-white relative overflow-hidden md:pt-0 pt-28 bg-gray-900">
      <SmoothScroll>
        {/* Static sections - immediate loading */}
        <HeroSkeleton />
        <BaseSectionSkeleton title="About Me" height="min-h-[70vh]" />
        <GridSectionSkeleton title="Services" columns={3} />

        {/* Dynamic sections with suspense boundaries */}
        <InfrastructureSkeleton />
        <GridSectionSkeleton title="Projects" columns={3} />
        <GridSectionSkeleton title="Tech Stack" columns={4} />
        <TestimonialsSkeleton />
        <CTASkeleton />
      </SmoothScroll>
    </main>
  );
}
