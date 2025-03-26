import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Ścieżka do katalogu z plikami Obsidian
const POSTS_DIRECTORY = path.join(process.cwd(), "obsidian/blog");

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  coverImage: string;
  tags: string[];
  readTime: number;
  content: string;
};

export function getBlogSlugs(): string[] {
  // Sprawdź czy katalog istnieje
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    console.warn(`Katalog ${POSTS_DIRECTORY} nie istnieje.`);
    return [];
  }

  // Pobierz wszystkie pliki markdown z katalogu
  return fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => filename.replace(/\.md$/, ""));
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(POSTS_DIRECTORY, `${slug}.md`);

    // Sprawdź czy plik istnieje
    if (!fs.existsSync(fullPath)) {
      console.warn(`Plik ${fullPath} nie istnieje.`);
      return null;
    }

    // Odczytaj zawartość pliku
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Parsuj frontmatter przy użyciu gray-matter
    const { data, content } = matter(fileContents);

    // Oblicz przybliżony czas czytania (średnio 200 słów na minutę)
    const wordCount = content.trim().split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    // Zwróć post z domyślnymi wartościami dla brakujących pól
    return {
      slug,
      title: data.title || slug,
      excerpt: data.excerpt || content.slice(0, 160) + "...",
      date: data.date
        ? new Date(data.date).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      author: data.author || "Ambro-Dev",
      coverImage: data.coverImage || `/images/blog/default.webp`,
      tags: data.tags || [],
      readTime,
      content,
    };
  } catch (error) {
    console.error(`Błąd podczas odczytu pliku dla slug ${slug}:`, error);
    return null;
  }
}

export function getAllBlogPosts(): BlogPost[] {
  const slugs = getBlogSlugs();
  const posts = slugs
    .map((slug) => getBlogPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    // Sortowanie od najnowszych do najstarszych
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}
