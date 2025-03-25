// src/types/project.ts
export interface Project {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  challenge: string;
  solution: string;
  client: string;
  timeline: string;
  role: string;
  technologies: string[];
  features: string[];
  outcomes: string[];
  image: string;
  images: string[];
  color: string;
  codeSnippet?: string;
}
