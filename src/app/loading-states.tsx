// Loading states for individual sections
// These can be used with Suspense fallback prop

// Generic section loading skeleton
export function SectionLoading({ title }: { title: string }) {
  return (
    <div className="w-full py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-gray-800/50 rounded-lg h-64 animate-pulse"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Hero section loading state
export function HeroLoading() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center px-4">
      <div className="w-3/4 max-w-2xl h-10 bg-gray-800/50 rounded-lg animate-pulse mb-4"></div>
      <div className="w-1/2 max-w-xl h-6 bg-gray-800/50 rounded-lg animate-pulse mb-8"></div>
      <div className="flex gap-4">
        <div className="w-36 h-12 bg-gray-800/50 rounded-lg animate-pulse"></div>
        <div className="w-36 h-12 bg-gray-800/50 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
}

// About section loading state
export function AboutLoading() {
  return (
    <div className="w-full py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square bg-gray-800/50 rounded-lg animate-pulse"></div>
        <div className="flex flex-col justify-center space-y-4">
          <div className="w-1/2 h-8 bg-gray-800/50 rounded-lg animate-pulse"></div>
          <div className="w-full h-4 bg-gray-800/50 rounded-lg animate-pulse"></div>
          <div className="w-full h-4 bg-gray-800/50 rounded-lg animate-pulse"></div>
          <div className="w-3/4 h-4 bg-gray-800/50 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

// Projects section loading state
export function ProjectsLoading() {
  return <SectionLoading title="Nasze projekty" />;
}

// Infrastructure section loading state
export function InfrastructureLoading() {
  return (
    <div className="w-full py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Infrastruktura</h2>
        <div className="h-[500px] bg-gray-800/30 rounded-lg animate-pulse relative">
          <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-gray-700/50 animate-ping"></div>
          <div
            className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-gray-700/50 animate-ping"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/3 w-16 h-16 rounded-full bg-gray-700/50 animate-ping"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

// Tech stack section loading state
export function TechStackLoading() {
  return (
    <div className="w-full py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Technologie</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-gray-800/50 rounded-lg animate-pulse flex items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-gray-700/70"></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

// Testimonials section loading state
export function TestimonialsLoading() {
  return (
    <div className="w-full py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-64 h-10 bg-gray-800/50 rounded-lg animate-pulse mx-auto mb-3"></div>
          <div className="w-96 h-6 bg-gray-800/50 rounded-lg animate-pulse mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-gray-800/30 rounded-xl border border-gray-700/20 p-6 h-64 animate-pulse flex flex-col"
            >
              <div className="w-8 h-8 bg-gray-700/50 rounded-full mb-4"></div>
              <div className="space-y-2 flex-grow">
                <div className="w-full h-3 bg-gray-700/50 rounded"></div>
                <div className="w-5/6 h-3 bg-gray-700/50 rounded"></div>
                <div className="w-4/6 h-3 bg-gray-700/50 rounded"></div>
              </div>
              <div className="flex items-center mt-4">
                <div className="w-10 h-10 bg-gray-700/50 rounded-full mr-3"></div>
                <div className="space-y-1">
                  <div className="w-24 h-3 bg-gray-700/50 rounded"></div>
                  <div className="w-16 h-2 bg-gray-700/50 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// CTA section loading state
export function CTALoading() {
  return (
    <div className="h-48 bg-gradient-to-r from-indigo-500/30 to-purple-600/30 flex items-center justify-center">
      <div className="text-center">
        <div className="w-3/4 max-w-md h-8 bg-gray-800/50 rounded-lg animate-pulse mb-4 mx-auto"></div>
        <div className="w-1/2 max-w-xs h-12 bg-gray-800/50 rounded-lg animate-pulse mx-auto"></div>
      </div>
    </div>
  );
}
