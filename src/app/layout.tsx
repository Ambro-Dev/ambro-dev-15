import { Suspense } from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { baseURL, home, style } from "./resources";
import { fontClasses } from "@/lib/fonts";
import { Analytics } from "@vercel/analytics/next";
import { constructMetadata } from "@/lib/metadata";

// Statycznie zaimportowane komponenty krytyczne dla pierwszego renderowania
import Navigation from "@/components/navigation";
import { AccessibilityProvider } from "@/components/accessibility/AccessibilityProvider";

// Dynamiczne importy z lazy-loading dla niekrytycznych komponentów
import { AccessibilityWidget } from "@/components/accessibility/AccessibilityWidget";
import { ScrollProgress } from "@/components/ambro-ui/scroll-progress";
import { FloatingBubbles } from "@/components/ambro-ui/floating-bubbles";
import Footer from "@/components/footer";
import { Providers } from "@/app/providers";

// Rozszerzone metadane zgodne z Next.js 15
export const metadata = constructMetadata({
  title: home.title,
  description: home.description,
  keywords: [
    "DevOps",
    "automatyzacja",
    "aplikacje webowe",
    "chmura",
    "AWS",
    "infrastruktura IT",
  ],
  canonical: `https://${baseURL}`,
});

// Viewport settings
export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      data-neutral={style.neutral}
      data-brand={style.brand}
      data-accent={style.accent}
      data-solid={style.solid}
      data-solid-style={style.solidStyle}
      data-theme={style.theme}
      data-border={style.border}
      data-surface={style.surface}
      data-transition={style.transition}
      className={`${fontClasses} dark`}
      suppressHydrationWarning
    >
      <head>
        {/* Preload critical assets - funkcja Next.js */}
        <link
          rel="preload"
          as="image"
          href="/logo.webp"
          type="image/webp"
          fetchPriority="high"
        />

        {/* Preconnect do domen zewnętrznych */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <style
          dangerouslySetInnerHTML={{
            __html: `
    :root { color-scheme: dark; }
    body { background-color: #000000; color: #ffffff; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .page-transition { animation: fadeIn 0.5s ease-in-out; }
  `,
          }}
        />

        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Analytics />
        <AccessibilityProvider>
          {/* Analytics Component */}
          <Providers>
            <ThemeProvider>
              {/* Scroll Progress Indicator zoptymalizowany pod Next.js */}
              <Suspense
                fallback={
                  <div className="h-1 w-full bg-transparent fixed top-0 z-50" />
                }
              >
                <ScrollProgress
                  position="top"
                  color="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                  zIndex={60}
                  height={3}
                  borderRadius="rounded-none"
                />
              </Suspense>

              {/* Navigation - prerendered */}
              <Navigation />

              <div className="flex-grow relative overflow-hidden">
                {/* Floating bubbles - lazy loaded */}
                <Suspense fallback={<div className="absolute inset-0 z-0" />}>
                  <div className="absolute inset-0 z-0">
                    <FloatingBubbles
                      count={10} // Zredukowana liczba dla lepszej wydajności
                      minSize={2}
                      maxSize={6}
                      color="rgba(99, 102, 241, 0.3)"
                      minSpeed={0.5}
                      maxSpeed={1}
                      fixed
                      className="h-full w-full opacity-50"
                    />
                  </div>
                </Suspense>

                {/* Main content with ID for skip-to-content */}
                <main id="main-content" tabIndex={-1}>
                  {children}
                </main>
              </div>

              {/* Footer - lazy loaded */}
              <Suspense fallback={<div className="h-64 bg-black" />}>
                <Footer />
              </Suspense>

              {/* Widget dostępności */}
              <AccessibilityWidget />
            </ThemeProvider>
          </Providers>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
