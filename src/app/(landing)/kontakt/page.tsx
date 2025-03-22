// src/app/kontakt/page.tsx
import { headers } from "next/headers";
import dynamic from "next/dynamic";
import { constructMetadata } from "@/lib/metadata";

// Import AssetPreloader
const AssetPreloader = dynamic(
  () => import("@/components/ambro-ui/asset-preloader"),
  {
    ssr: true,
  }
);

// Preload critical components
const ContactSchemaJsonLd = dynamic(
  () => import("@/lib/contact").then((mod) => mod.ContactSchemaJsonLd),
  {
    ssr: true,
  }
);

// Optimize ContactPageContent with preload
const ContactPageContent = dynamic(
  () => import("@/components/contact/contact-page-content"),
  {
    ssr: true,
    loading: () => <ContactPageLoading />,
  }
);

// Metadane dla strony (SEO)
export const metadata = constructMetadata({
  title: "Kontakt | Ambro-Dev - Profesjonalne rozwiązania IT",
  description:
    "Skontaktuj się z Ambro-Dev, aby omówić Twój projekt. Oferuję profesjonalne usługi chmurowe, aplikacje webowe, projektowanie i monitorowanie infrastruktury sieciowe oraz rozwiązania dla biznesu.",
  canonical: "https://ambro.dev/kontakt",
});

// Critical assets to preload
const criticalImages = [
  "/logo.webp",
  // Add other critical images here
];

export default function ContactPage() {
  // Force headers evaluation to activate caching
  headers();

  return (
    <>
      {/* Preload critical assets */}
      <AssetPreloader images={criticalImages} />

      {/* Structured data dla Google */}
      <ContactSchemaJsonLd />

      {/* Główna zawartość strony */}
      <ContactPageContent />
    </>
  );
}

// Komponent placeholdera podczas ładowania
function ContactPageLoading() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto py-24 px-6">
        <div className="animate-pulse space-y-8">
          <div className="h-12 bg-gray-800 rounded w-48 mx-auto" />
          <div className="h-6 bg-gray-800 rounded max-w-2xl mx-auto" />
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2 h-96 bg-gray-900/50 rounded-xl" />
            <div className="md:col-span-3 h-96 bg-gray-900/50 rounded-xl" />
          </div>
        </div>
      </div>
    </main>
  );
}
