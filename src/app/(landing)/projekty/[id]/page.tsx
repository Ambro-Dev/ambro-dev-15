// src/app/projekty/[id]/page.tsx
import { notFound } from "next/navigation";
import { FloatingBubbles } from "@/components/ambro-ui/floating-bubbles";
import { SmoothScroll } from "@/components/ambro-ui/smooth-scroll";
import { SectionDivider } from "@/components/ambro-ui/section-divider";
import { ProjectHeader } from "@/components/projects/ProjectHeader";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectInfo } from "@/components/projects/ProjectInfo";
import { CodeSample } from "@/components/projects/CodeSample";
import { RelatedProjects } from "@/components/projects/RelatedProjects";
import { ProjectCTA } from "@/components/projects/ProjectCTA";
import { getProjectById, getAllProjects } from "@/lib/projects";

// Generowanie statycznych ścieżek dla wszystkich projektów
export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const projectId = (await params).id;

  // Pobierz projekt z pliku MDX
  const project = await getProjectById(projectId);

  // Pobierz wszystkie projekty do sekcji "Podobne projekty"
  const allProjects = await getAllProjects();

  // Jeśli projekt nie istnieje, zwróć 404
  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effect */}
      <FloatingBubbles
        count={20}
        fixed
        color="rgba(99, 102, 241, 0.2)"
        maxSize={100}
        minSize={20}
        interactive
      />

      <SmoothScroll>
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <ProjectHeader
              title={project.title}
              shortDesc={project.shortDesc}
              color={project.color}
            />

            <ProjectGallery title={project.title} images={project.images} />

            <ProjectInfo
              description={project.description}
              challenge={project.challenge}
              solution={project.solution}
              outcomes={project.outcomes}
              client={project.client}
              role={project.role}
              timeline={project.timeline}
              technologies={project.technologies}
              features={project.features}
            />

            <CodeSample
              codeSnippet={project.codeSnippet || ""}
              projectId={project.id}
            />

            <RelatedProjects
              projects={allProjects}
              currentProjectId={project.id}
            />
          </div>
        </section>

        <ProjectCTA />

        {/* Footer */}
        <footer className="py-12 px-6 bg-black border-t border-gray-800">
          <div className="max-w-6xl mx-auto">
            <SectionDivider
              variant="tech"
              lineColor="from-transparent via-gray-800 to-transparent"
              dotColor="bg-indigo-500"
            />

            <div className="pt-8 text-center text-gray-500 text-sm">
              <p>
                &copy; {new Date().getFullYear()} DevOS. Wszelkie prawa
                zastrzeżone.
              </p>
            </div>
          </div>
        </footer>
      </SmoothScroll>
    </main>
  );
}
