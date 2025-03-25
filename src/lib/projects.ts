import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { Project } from "@/types/project";

const projectsDirectory = path.join(process.cwd(), "src/content/projects");

/**
 * Pobiera metadane wszystkich projektów z plików MDX
 */
export async function getAllProjects(): Promise<Project[]> {
  // Sprawdź czy katalog istnieje
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  // Pobierz wszystkie pliki MDX z katalogu projektów
  const fileNames = fs
    .readdirSync(projectsDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"));

  const projects = fileNames.map((fileName) => {
    // Usuń rozszerzenie .mdx aby uzyskać id
    const id = fileName.replace(/\.mdx$/, "");

    // Odczytaj zawartość pliku MDX
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Użyj gray-matter do sparsowania metadanych
    const { data, content } = matter(fileContents);

    // Utwórz obiekt projektu z metadanych i treści
    const project: Project = {
      id,
      title: data.title,
      shortDesc: data.shortDesc,
      description: data.description,
      challenge: data.challenge,
      solution: data.solution,
      client: data.client,
      timeline: data.timeline,
      role: data.role,
      technologies: data.technologies || [],
      features: data.features || [],
      outcomes: data.outcomes || [],
      image: data.image,
      images: data.images || [],
      color: data.color,
      codeSnippet: extractCodeSnippet(content),
    };

    return project;
  });

  return projects;
}

/**
 * Pobiera projekt o określonym ID
 */
export async function getProjectById(id: string): Promise<Project | null> {
  const projects = await getAllProjects();
  return projects.find((project) => project.id === id) || null;
}

/**
 * Pobiera treść MDX projektu i przetwarza ją do komponentu React
 */
export async function getProjectMdxContent(id: string) {
  const fullPath = path.join(projectsDirectory, `${id}.mdx`);

  // Sprawdź czy plik istnieje
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content } = matter(fileContents);

  // Przetwarzanie MDX na komponent React
  const mdxSource = await serialize(content, {
    // Możesz tu dodać dodatkowe opcje przetwarzania
    parseFrontmatter: false,
  });

  return mdxSource;
}

/**
 * Ekstrahuje przykładowy kod z treści MDX
 */
function extractCodeSnippet(content: string): string {
  const codeBlockRegex = /```(?:jsx|js|typescript|ts)([\s\S]*?)```/;
  const match = content.match(codeBlockRegex);

  if (match && match[1]) {
    return match[1].trim();
  }

  return "";
}
