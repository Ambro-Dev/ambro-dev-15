// src/app/(landing)/blog/page.tsx
// Dodanie bloga do poprawy SEO i widoczności w wyszukiwarkach

import { constructMetadata } from "@/lib/metadata";
import { Suspense } from "react";
import { SectionHeading } from "@/components/ambro-ui/section-heading";
import { EnhancedButton } from "@/components/ambro-ui/enhanced-button";
import Link from "next/link";
import { generateBreadcrumbSchema } from "@/lib/schema";
import Script from "next/script";
import { getAllBlogPosts } from "@/lib/blog";

// Metadata dla strony bloga
export const metadata = constructMetadata({
  title: "Blog | DevOps i FullStack Development",
  description:
    "Praktyczna wiedza z zakresu DevOps, automatyzacji, chmury i rozwoju aplikacji webowych. Tutoriale, porady i najlepsze praktyki.",
  keywords: [
    "blog techniczny",
    "DevOps",
    "CI/CD",
    "automatyzacja",
    "cloud",
    "Next.js",
    "React",
    "Docker",
    "Kubernetes",
  ],
  canonical: "https://ambro.dev/blog",
});

// Komponent Blog Page
export default function BlogPage() {
  // Pobieranie postów z plików Obsidian
  const blogPosts = getAllBlogPosts();

  return (
    <>
      {/* Dane strukturalne dla strony bloga */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: "Strona główna", url: "https://ambro.dev" },
              { name: "Blog", url: "https://ambro.dev/blog" },
            ])
          ),
        }}
      />

      <main className="min-h-screen bg-black text-white relative overflow-hidden pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionHeading
              title="Blog Techniczny"
              subtitle="Dzielę się wiedzą i doświadczeniem z zakresu DevOps i FullStack Development"
              alignment="center"
              size="xl"
              gradient
              animation="slide"
            />
          </div>

          <Suspense fallback={<BlogPageSkeleton />}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.length > 0 ? (
                blogPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <article className="bg-gray-900/40 rounded-xl overflow-hidden h-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-gray-800/50">
                      <div className="h-48 bg-gray-800 relative">
                        {/* Cover Image Placeholder (w rzeczywistości użyj next/image) */}
                        <div className="absolute inset-0 bg-indigo-900/20 flex items-center justify-center">
                          <span className="text-sm text-gray-400">
                            {post.coverImage}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-xs text-gray-400">
                            {post.date}
                          </span>
                          <span className="bg-indigo-900/30 text-indigo-300 text-xs rounded-full px-2 py-1">
                            {post.readTime} min czytania
                          </span>
                        </div>
                        <h2 className="text-xl font-bold mb-3 line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-gray-400 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-400 text-lg mb-4">
                    Nie znaleziono żadnych wpisów na blogu.
                  </p>
                  <p className="text-sm text-gray-500">
                    Dodaj pliki markdown w katalogu &quot;obsidian/blog&quot;
                    aby zobaczyć tutaj wpisy.
                  </p>
                </div>
              )}
            </div>
          </Suspense>

          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6">
              Szukasz rozwiązań technicznych dla swojego biznesu?
            </p>
            <Link href="/kontakt">
              <EnhancedButton
                variant="tech"
                size="lg"
                magneticEffect
                glowOnHover
              >
                Porozmawiajmy o Twoim projekcie
              </EnhancedButton>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

// Skeleton komponent podczas ładowania
function BlogPageSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-gray-900/40 rounded-xl overflow-hidden h-full border border-gray-800/50"
        >
          <div className="h-48 bg-gray-800/50 animate-pulse" />
          <div className="p-6">
            <div className="h-5 bg-gray-800/50 animate-pulse rounded-full mb-3 w-1/3" />
            <div className="h-7 bg-gray-800/50 animate-pulse rounded-lg mb-3 w-full" />
            <div className="h-4 bg-gray-800/50 animate-pulse rounded-lg mb-2 w-full" />
            <div className="h-4 bg-gray-800/50 animate-pulse rounded-lg mb-2 w-full" />
            <div className="h-4 bg-gray-800/50 animate-pulse rounded-lg mb-4 w-2/3" />
            <div className="flex gap-2">
              <div className="h-6 bg-gray-800/50 animate-pulse rounded-full w-16" />
              <div className="h-6 bg-gray-800/50 animate-pulse rounded-full w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
