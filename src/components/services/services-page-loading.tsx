"use client";

export default function ServicesPageLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-slate-900 text-white relative pt-24 pb-16 overflow-hidden">
      {/* Subtle grid background */}
      <div className="fixed inset-0 w-full h-full bg-grid-pattern opacity-3 pointer-events-none" />

      {/* Fake scroll progress indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-50 w-1/3" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header skeleton */}
        <div className="relative py-12">
          <div className="text-center">
            <div className="h-8 w-44 mx-auto bg-gray-800/30 animate-pulse rounded-md mb-10" />
            <div className="h-10 w-64 mx-auto bg-gray-800/30 animate-pulse rounded-md mb-4" />
            <div className="h-5 w-96 max-w-full mx-auto bg-gray-800/30 animate-pulse rounded-md mb-10" />
            <div className="h-24 w-full max-w-2xl mx-auto bg-gray-800/30 animate-pulse rounded-md" />
          </div>
        </div>

        {/* DevOps section skeleton */}
        <div className="py-20">
          <div className="h-8 w-56 bg-gray-800/30 animate-pulse rounded-md mb-6" />
          <div className="h-5 w-80 bg-gray-800/30 animate-pulse rounded-md mb-10" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={`skeleton-${item}`}
                className="h-72 bg-gray-800/30 rounded-md animate-pulse overflow-hidden"
              >
                <div className="h-12 w-12 rounded-full bg-gray-800/50 m-6 mb-4" />
                <div className="h-6 w-36 ml-6 mb-3 bg-gray-800/50 rounded-md" />
                <div className="h-4 w-full max-w-[80%] ml-6 bg-gray-800/50 rounded-md mb-2" />
                <div className="h-4 w-full max-w-[70%] ml-6 bg-gray-800/50 rounded-md mb-2" />
                <div className="h-4 w-full max-w-[60%] ml-6 bg-gray-800/50 rounded-md mb-8" />

                <div className="mx-6 pt-4 border-t border-gray-800/50 flex gap-2">
                  <div className="h-5 w-16 rounded-md bg-gray-800/50" />
                  <div className="h-5 w-16 rounded-md bg-gray-800/50" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider skeleton */}
        <div className="h-px w-full bg-gray-800/30 my-8" />

        {/* Fullstack section skeleton */}
        <div className="py-20">
          <div className="h-8 w-56 bg-gray-800/30 animate-pulse rounded-md mb-6" />
          <div className="h-5 w-80 bg-gray-800/30 animate-pulse rounded-md mb-10" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2].map((item) => (
              <div
                key={`skeleton-${item}`}
                className="h-72 bg-gray-800/30 rounded-md animate-pulse overflow-hidden"
              >
                <div className="h-12 w-12 rounded-full bg-gray-800/50 m-6 mb-4" />
                <div className="h-6 w-36 ml-6 mb-3 bg-gray-800/50 rounded-md" />
                <div className="h-4 w-full max-w-[80%] ml-6 bg-gray-800/50 rounded-md mb-2" />
                <div className="h-4 w-full max-w-[70%] ml-6 bg-gray-800/50 rounded-md mb-2" />
                <div className="h-4 w-full max-w-[60%] ml-6 bg-gray-800/50 rounded-md mb-8" />

                <div className="mx-6 pt-4 border-t border-gray-800/50 flex gap-2">
                  <div className="h-5 w-16 rounded-md bg-gray-800/50" />
                  <div className="h-5 w-16 rounded-md bg-gray-800/50" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process section skeleton */}
        <div className="py-24 bg-gray-900/10 rounded-lg">
          <div className="h-8 w-56 mx-auto bg-gray-800/30 animate-pulse rounded-md mb-4" />
          <div className="h-5 w-80 mx-auto bg-gray-800/30 animate-pulse rounded-md mb-16" />

          <div className="max-w-5xl mx-auto bg-gray-800/20 rounded-lg p-10 animate-pulse">
            <div className="grid md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={`process-${item}`}
                  className="flex flex-col items-center"
                >
                  <div className="h-10 w-10 rounded-full bg-gray-800/50 mb-4" />
                  <div className="h-5 w-24 bg-gray-800/50 rounded-md mb-2" />
                  <div className="h-3 w-32 bg-gray-800/50 rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Skeleton */}
        <div className="py-32 text-center">
          <div className="h-10 w-96 max-w-full mx-auto bg-gray-800/30 animate-pulse rounded-md mb-6" />
          <div className="h-16 w-full max-w-xl mx-auto bg-gray-800/30 animate-pulse rounded-md mb-8" />
          <div className="h-12 w-48 mx-auto bg-gray-800/30 animate-pulse rounded-md" />
        </div>
      </div>

      {/* CSS for grid pattern */}
      <style jsx global>{`
        .bg-grid-pattern {
          background-image: linear-gradient(
              rgba(99, 102, 241, 0.02) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(99, 102, 241, 0.02) 1px,
              transparent 1px
            );
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  );
}
