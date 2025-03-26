import { getBlogPostBySlug, getBlogSlugs } from "@/lib/blog";
import { constructMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import React from "react";
import { generateBreadcrumbSchema } from "@/lib/schema";
import Script from "next/script";
import { SectionHeading } from "@/components/ambro-ui/section-heading";
import { EnhancedButton } from "@/components/ambro-ui/enhanced-button";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkEmoji from "remark-emoji";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// Generowanie statycznych paramsów dla Next.js
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = getBlogSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

// Generowanie metadanych dla każdego posta
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    return constructMetadata({
      title: "Artykuł nie znaleziony | Blog",
      description: "Niestety, nie znaleźliśmy szukanego artykułu.",
    });
  }

  return constructMetadata({
    title: `${post.title} | Blog`,
    description: post.excerpt,
    keywords: post.tags,
    canonical: `https://ambro.dev/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Dane strukturalne dla artykułu */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: "Strona główna", url: "https://ambro.dev" },
              { name: "Blog", url: "https://ambro.dev/blog" },
              { name: post.title, url: `https://ambro.dev/blog/${post.slug}` },
            ])
          ),
        }}
      />

      <main className="min-h-screen bg-black text-white relative overflow-hidden pt-24 pb-16">
        <article className="max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <Link
              href="/blog"
              className="text-indigo-400 hover:text-indigo-300 transition flex items-center gap-2 mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Powrót do bloga
            </Link>

            <SectionHeading
              title={post.title}
              subtitle={post.excerpt}
              size="lg"
              gradient
              animation="slide"
            />

            <div className="flex items-center flex-wrap gap-y-3 gap-x-6 mt-4 mb-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                {post.date}
              </div>

              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {post.readTime} min czytania
              </div>

              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                {post.author}
              </div>
            </div>

            <div className="bg-gray-800/30 h-64 w-full rounded-xl mb-8 overflow-hidden relative">
              {/* Docelowo zastąp implementacją next/image */}
              <div className="absolute inset-0 bg-indigo-900/20 flex items-center justify-center">
                <span className="text-sm text-gray-400">{post.coverImage}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-800 text-gray-300 px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <Suspense
            fallback={<div className="animate-pulse">Ładowanie treści...</div>}
          >
            <div className="prose prose-invert prose-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath, remarkEmoji]}
                rehypePlugins={[rehypeRaw, rehypeKatex]}
                components={{
                  code({
                    inline,
                    className,
                    children,
                    ...props
                  }: React.HTMLProps<HTMLElement> & { inline?: boolean }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        // @ts-expect-error - SyntaxHighlighter has incompatible types with direct style assignment
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        className="rounded-md my-4"
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code
                        className={`${className} bg-gray-800 px-1 py-0.5 rounded`}
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                  img({ src, alt, ...props }) {
                    if (!src) return null;

                    // Handle both absolute URLs and relative paths
                    if (src.startsWith("http")) {
                      // Remote image
                      return (
                        <div className="my-8 rounded-lg overflow-hidden shadow-xl">
                          <img
                            src={src}
                            alt={alt || ""}
                            className="w-full h-auto"
                            {...props}
                          />
                          {alt && (
                            <div className="text-sm text-center text-gray-400 mt-2 italic">
                              {alt}
                            </div>
                          )}
                        </div>
                      );
                    } else {
                      // Local image with Next.js Image
                      return (
                        <div className="my-8 rounded-lg overflow-hidden shadow-xl">
                          <Image
                            src={src}
                            alt={alt || ""}
                            width={1200}
                            height={675}
                            className="w-full h-auto"
                          />
                          {alt && (
                            <div className="text-sm text-center text-gray-400 mt-2 italic">
                              {alt}
                            </div>
                          )}
                        </div>
                      );
                    }
                  },
                  blockquote({ children }) {
                    return (
                      <blockquote className="border-l-4 border-indigo-500 pl-4 my-6 italic bg-gray-800/30 p-4 rounded-r-lg">
                        {children}
                      </blockquote>
                    );
                  },
                  h1({ children }) {
                    return (
                      <h1 className="text-3xl font-bold mb-4 mt-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600">
                        {children}
                      </h1>
                    );
                  },
                  h2({ children }) {
                    return (
                      <h2 className="text-2xl font-bold mb-3 mt-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-500">
                        {children}
                      </h2>
                    );
                  },
                  h3({ children }) {
                    return (
                      <h3 className="text-xl font-bold mb-3 mt-5 text-indigo-300">
                        {children}
                      </h3>
                    );
                  },
                  ul({ children }) {
                    return (
                      <ul className="list-disc pl-6 my-4 space-y-2">
                        {children}
                      </ul>
                    );
                  },
                  ol({ children }) {
                    return (
                      <ol className="list-decimal pl-6 my-4 space-y-2">
                        {children}
                      </ol>
                    );
                  },
                  li({ children }) {
                    return <li className="ml-2">{children}</li>;
                  },
                  table({ children }) {
                    return (
                      <div className="overflow-x-auto my-6">
                        <table className="min-w-full bg-gray-800/30 rounded-lg overflow-hidden">
                          {children}
                        </table>
                      </div>
                    );
                  },
                  thead({ children }) {
                    return <thead className="bg-gray-700/50">{children}</thead>;
                  },
                  th({ children }) {
                    return (
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        {children}
                      </th>
                    );
                  },
                  td({ children }) {
                    return (
                      <td className="px-4 py-3 border-t border-gray-700 text-sm">
                        {children}
                      </td>
                    );
                  },
                  a({ children, href }) {
                    return (
                      <a
                        href={href}
                        className="text-indigo-400 hover:text-indigo-300 transition underline"
                        target={href?.startsWith("http") ? "_blank" : undefined}
                        rel={
                          href?.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {children}
                      </a>
                    );
                  },
                  hr() {
                    return <hr className="my-8 border-gray-700" />;
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </Suspense>

          <div className="mt-16 border-t border-gray-800 pt-8">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">
                Szukasz rozwiązań dla swojego projektu?
              </h3>
              <p className="text-gray-400 mb-6">
                Porozmawiajmy o tym, jak mogę pomóc w realizacji Twoich celów
                technologicznych.
              </p>
              <Link href="/kontakt">
                <EnhancedButton
                  variant="tech"
                  size="lg"
                  magneticEffect
                  glowOnHover
                >
                  Skontaktuj się ze mną
                </EnhancedButton>
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
