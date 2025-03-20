"use client";

import React, { useState } from "react";

// Type for tabs
type TabType = "packages" | "individual";

// Skeleton for a pricing plan card
const PricingPlanCardSkeleton = ({
  highlighted = false,
}: {
  highlighted?: boolean;
}) => {
  return (
    <div className={`h-full ${highlighted ? "relative z-10 scale-105" : ""}`}>
      <div className="bg-gray-900/80 border-2 border-gray-800 rounded-xl p-8 h-full flex flex-col">
        {highlighted && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 w-20 h-5 rounded-full"></div>
        )}

        <div className="h-8 w-32 bg-gray-800 rounded-md animate-pulse mb-2"></div>
        <div className="h-4 w-full bg-gray-800 rounded-md animate-pulse mb-6"></div>

        <div className="mb-6">
          <div className="h-10 w-24 bg-gray-800 rounded-md animate-pulse"></div>
          <div className="h-4 w-36 bg-gray-800 rounded-md animate-pulse mt-1"></div>
        </div>

        <div className="mb-8 flex-grow">
          <div className="h-4 w-24 bg-gray-800 rounded-md animate-pulse mb-3"></div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={`feature-${i}`} className="flex items-start">
                <div className="w-5 h-5 rounded-md bg-gray-800 animate-pulse mr-2"></div>
                <div className="h-4 w-full bg-gray-800 rounded-md animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="h-4 w-24 bg-gray-800 rounded-md animate-pulse mb-2"></div>
          <div className="flex flex-wrap gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={`tag-${i}`}
                className="h-6 w-16 bg-indigo-900/30 rounded-full animate-pulse"
              ></div>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <div
            className={`h-12 w-full ${
              highlighted ? "bg-indigo-800/50" : "bg-gray-800"
            } rounded-lg animate-pulse`}
          ></div>
        </div>
      </div>
    </div>
  );
};

// Skeleton for a custom pricing service card
const CustomPricingServiceCardSkeleton = () => {
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-indigo-900/30 animate-pulse"></div>
        </div>

        <div className="flex-grow">
          <div className="h-8 w-48 bg-gray-800 rounded-md animate-pulse mb-2"></div>
          <div className="h-4 w-full bg-gray-800 rounded-md animate-pulse mb-4"></div>

          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div>
              <div className="h-4 w-32 bg-gray-800 rounded-md animate-pulse mb-2"></div>
              <div className="h-4 w-40 bg-gray-800 rounded-md animate-pulse mb-2"></div>
              <div className="h-6 w-36 bg-gray-800 rounded-md animate-pulse"></div>
            </div>

            <div>
              <div className="h-4 w-48 bg-gray-800 rounded-md animate-pulse mb-2"></div>
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={`factor-${i}`} className="flex items-start">
                    <div className="w-4 h-4 rounded-md bg-gray-800 animate-pulse mr-2"></div>
                    <div className="h-4 w-full bg-gray-800 rounded-md animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="h-10 w-36 bg-indigo-800/50 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton for FAQ item
const FAQItemSkeleton = () => {
  return (
    <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
      <div className="h-6 w-3/4 bg-gray-800 rounded-md animate-pulse mb-3"></div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-800 rounded-md animate-pulse"></div>
        <div className="h-4 w-full bg-gray-800 rounded-md animate-pulse"></div>
        <div className="h-4 w-3/4 bg-gray-800 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

// Skeleton for the info card
const InfoCardSkeleton = () => {
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 h-full">
      <div className="h-8 w-48 bg-gray-800 rounded-md animate-pulse mb-4"></div>
      <div className="space-y-2 mb-4">
        <div className="h-5 w-full bg-gray-800 rounded-md animate-pulse"></div>
        <div className="h-5 w-full bg-gray-800 rounded-md animate-pulse"></div>
        <div className="h-5 w-3/4 bg-gray-800 rounded-md animate-pulse"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-800 rounded-md animate-pulse"></div>
        <div className="h-4 w-full bg-gray-800 rounded-md animate-pulse"></div>
        <div className="h-4 w-3/4 bg-gray-800 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

// Main Skeleton Component
export default function PricingPageSkeleton() {
  const [activeTab, setActiveTab] = useState<TabType>("packages");

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Header Section Skeleton */}
      <section className="pt-36 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center mb-6">
            <div className="h-12 w-64 bg-gray-800 rounded-md animate-pulse mb-2"></div>
            <div className="h-6 w-80 bg-gray-800 rounded-md animate-pulse"></div>
          </div>

          <div className="mt-6 text-center max-w-3xl mx-auto">
            <div className="space-y-2">
              <div className="h-5 w-full bg-gray-800 rounded-md animate-pulse mx-auto"></div>
              <div className="h-5 w-full bg-gray-800 rounded-md animate-pulse mx-auto"></div>
              <div className="h-5 w-3/4 bg-gray-800 rounded-md animate-pulse mx-auto"></div>
            </div>
          </div>

          {/* Tab Buttons Skeleton */}
          <div className="mt-12 flex justify-center space-x-4">
            <button
              onClick={() => setActiveTab("packages")}
              className={`px-6 py-3 rounded-full transition-all ${
                activeTab === "packages"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800/50 text-gray-300"
              }`}
            >
              Pakiety Abonamentowe
            </button>

            <button
              onClick={() => setActiveTab("individual")}
              className={`px-6 py-3 rounded-full transition-all ${
                activeTab === "individual"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800/50 text-gray-300"
              }`}
            >
              Wyceny Indywidualne
            </button>
          </div>

          {/* Pricing Plans Section Skeleton */}
          <div className={activeTab === "packages" ? "block" : "hidden"}>
            <div className="mt-16 grid lg:grid-cols-3 gap-8">
              <PricingPlanCardSkeleton />
              <PricingPlanCardSkeleton highlighted={true} />
              <PricingPlanCardSkeleton />
            </div>
          </div>

          {/* Individual Pricing Services Skeleton */}
          <div className={activeTab === "individual" ? "block" : "hidden"}>
            <div className="mt-16 space-y-8">
              {[...Array(3)].map((_, index) => (
                <CustomPricingServiceCardSkeleton
                  key={`service-skeleton-${index}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section Skeleton */}
      <section className="py-24 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center mb-10">
            <div className="h-12 w-64 bg-gray-800 rounded-md animate-pulse mb-2"></div>
            <div className="h-6 w-80 bg-gray-800 rounded-md animate-pulse"></div>
          </div>

          <div className="mt-16 max-w-3xl mx-auto space-y-6">
            {[...Array(5)].map((_, index) => (
              <FAQItemSkeleton key={`faq-skeleton-${index}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info Section Skeleton */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <InfoCardSkeleton />
            <InfoCardSkeleton />
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col items-center">
            <div className="h-10 w-64 bg-gray-800 rounded-md animate-pulse mb-2"></div>
            <div className="h-6 w-80 bg-gray-800 rounded-md animate-pulse mb-10"></div>
            <div className="h-12 w-40 bg-indigo-800/50 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Footer Skeleton */}
      <footer className="py-12 px-6 bg-black border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="h-px w-full bg-gray-800"></div>
          <div className="pt-8 text-center">
            <div className="h-4 w-full bg-gray-800 rounded-md animate-pulse mx-auto mb-2"></div>
            <div className="h-4 w-48 bg-gray-800 rounded-md animate-pulse mx-auto"></div>
          </div>
        </div>
      </footer>
    </main>
  );
}
