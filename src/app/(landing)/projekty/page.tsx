// src/app/(landing)/projekty/page.tsx
import { getAllProjects } from "@/lib/projects";
import Link from "next/link";
import Image from "next/image";

export default async function ProjectsPage() {
  // Pobieramy wszystkie projekty z plików MDX
  const projects = await getAllProjects();

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-24 px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Projekty</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Poniżej znajduje się wybór projektów, które zrealizowałem w
            ostatnich latach. Kliknij w projekt, aby poznać szczegóły i zobaczyć
            zastosowane rozwiązania.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              href={`/projekty/${project.id}`}
              key={project.id}
              className="group"
            >
              <div className="bg-gray-900 rounded-xl overflow-hidden transform transition-all duration-300 group-hover:scale-[1.02] shadow-lg hover:shadow-xl">
                <div className="relative h-64 w-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-50`}
                  ></div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
                  <p className="text-gray-400">{project.shortDesc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
