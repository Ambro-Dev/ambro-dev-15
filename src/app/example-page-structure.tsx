import { Suspense } from "react";
import { SmoothScroll } from "@/components/ambro-ui/smooth-scroll";

// Import loading states
import {
  SectionLoading,
  InfrastructureLoading,
  TechStackLoading,
  TestimonialsLoading,
  CTALoading,
} from "./loading-states";

// Define project type
interface Project {
  id: number;
  title: string;
}

// Example of how to fetch data for server components
async function getExampleData(): Promise<Project[]> {
  // In a real implementation, this would fetch data from an API or database
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "Example 1" },
        { id: 2, title: "Example 2" },
        { id: 3, title: "Example 3" },
      ]);
    }, 500); // Simulated delay
  });
}

// Example of a Server Component with async data fetching
async function ProjectsData() {
  // Disable caching to demonstrate PPR (Partial Prerendering)
  // unstable_noStore();

  // Fetch projects data
  const projects = await getExampleData();

  return (
    <section id="projects" className="w-full py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Nasze projekty</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: Project) => (
            <div key={project.id} className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p>
                Project description would go here in the real implementation.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main page component demonstrating structure with Suspense
export default function ExamplePageStructure() {
  return (
    <main className="min-h-screen text-white relative overflow-hidden md:pt-0 pt-28">
      <SmoothScroll>
        {/* Hero Section - Static */}
        <section
          id="hero"
          className="h-screen w-full flex flex-col items-center justify-center px-4"
        >
          <h1 className="text-5xl font-bold text-center mb-4">Ambro-Dev</h1>
          <p className="text-xl text-center mb-8 max-w-2xl">
            DevOps, Automatyzacja, Aplikacje Webowe
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg">
              Nasze usługi
            </button>
            <button className="bg-transparent border border-white hover:bg-white/10 px-6 py-3 rounded-lg">
              Kontakt
            </button>
          </div>
        </section>

        {/* About Section - Static */}
        <section id="about" className="w-full py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">O nas</h2>
            {/* About content here */}
          </div>
        </section>

        {/* Services Section - Static */}
        <section id="services" className="w-full py-16 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Nasze usługi
            </h2>
            {/* Services content here */}
          </div>
        </section>

        {/* Infrastructure Section - Dynamic with Suspense */}
        <Suspense fallback={<InfrastructureLoading />}>
          <section id="infrastructure" className="w-full py-16">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">
                Infrastruktura
              </h2>
              {/* Interactive infrastructure visualization would be here */}
            </div>
          </section>
        </Suspense>

        {/* Projects Section - Dynamic with data fetching */}
        <Suspense fallback={<SectionLoading title="Nasze projekty" />}>
          <ProjectsData />
        </Suspense>

        {/* Tech Stack Section - Dynamic with Suspense */}
        <Suspense fallback={<TechStackLoading />}>
          <section id="tech-stack" className="w-full py-16 bg-gray-900">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">
                Technologie
              </h2>
              {/* Tech stack content here */}
            </div>
          </section>
        </Suspense>

        {/* Testimonials Section - Dynamic with data fetching */}
        <Suspense fallback={<TestimonialsLoading />}>
          <section id="testimonials" className="w-full py-16">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">
                Opinie klientów
              </h2>
              {/* Testimonials content would be here */}
            </div>
          </section>
        </Suspense>

        {/* CTA Section - Dynamic with Suspense */}
        <Suspense fallback={<CTALoading />}>
          <section
            id="cta"
            className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                Rozpocznijmy współpracę
              </h2>
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
                Skontaktuj się
              </button>
            </div>
          </section>
        </Suspense>
      </SmoothScroll>
    </main>
  );
}
