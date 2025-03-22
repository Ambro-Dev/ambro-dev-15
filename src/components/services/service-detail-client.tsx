"use client";

import { useRef, useEffect, Component } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedSection } from "@/components/ambro-ui/animated-section";
import { SectionHeading } from "@/components/ambro-ui/section-heading";
import { GradientText } from "@/components/ambro-ui/gradient-text";
import { Card3D } from "@/components/ambro-ui/card-3d";
import { EnhancedButton } from "@/components/ambro-ui/enhanced-button";
import { RevealText } from "@/components/ambro-ui/reveal-text";
import { TiltCard } from "@/components/ambro-ui/tilt-card";
import { ScrollProgress } from "@/components/ambro-ui/scroll-progress";
import { SectionDivider } from "@/components/ambro-ui/section-divider";
import { AnimatedGradientBorder } from "@/components/ambro-ui/animated-gradient-border";
import { HighlightText } from "@/components/ambro-ui/highlight-text";
import { CodeBlock } from "@/components/ambro-ui/code-block";
import { FloatingBubbles } from "@/components/ambro-ui/floating-bubbles";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import type { SerializableService } from "@/lib/service-utils";

// Dynamically import heavy components with loading fallbacks
const ServiceProcessSteps = dynamic(
  () => import("@/components/services/service-process-steps"),
  {
    loading: () => <ServiceSectionSkeleton />,
  }
);

const ServiceBenefitsChart = dynamic(
  () => import("@/components/services/service-benefits-chart"),
  {
    loading: () => <ServiceSectionSkeleton />,
  }
);

const ServiceCTA = dynamic(() => import("@/components/service-cta"), {
  loading: () => (
    <div className="h-32 w-full bg-gray-800/20 animate-pulse rounded-lg" />
  ),
});

const ServiceComparisonTable = dynamic(
  () => import("@/components/services/service-comparison-table"),
  {
    loading: () => <ServiceSectionSkeleton />,
  }
);

const ServiceTechStack = dynamic(
  () => import("@/components/services/service-tech-stack"),
  {
    loading: () => <ServiceSectionSkeleton />,
  }
);

// Dynamiczny import komponentu ikony z nowszej wersji
const ServiceIcon = dynamic(
  () => import("@/components/services/service-icon"),
  {
    loading: () => (
      <div className="w-10 h-10 bg-indigo-500/20 rounded-full animate-pulse" />
    ),
  }
);

// Simple skeleton for loading states
function ServiceSectionSkeleton() {
  return (
    <div className="w-full space-y-4">
      <div className="h-8 bg-gray-800/20 rounded w-1/3 animate-pulse" />
      <div className="h-64 bg-gray-800/20 rounded animate-pulse" />
    </div>
  );
}

// Add proper type annotations to the ErrorBoundary
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Add a simple error boundary component
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // Remove the parameter completely
  static getDerivedStateFromError(): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      // You can render any fallback UI
      return (
        <div className="p-6 bg-red-900/20 border border-red-500/30 rounded-lg">
          <h3 className="text-lg font-medium text-white mb-2">
            Oops! Something went wrong.
          </h3>
          <p className="text-gray-300">
            We encountered an error loading this component. Please try
            refreshing the page.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Define props for the client component
interface ServiceDetailClientProps {
  service: SerializableService;
  relatedServices: SerializableService[];
}

// Component to handle intersection observer for sections
function NavHighlightObserver({
  sectionId,
  children,
}: {
  sectionId: string;
  children: React.ReactNode;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Use intersection observer to highlight active nav item when in view
  useEffect(() => {
    if (typeof window !== "undefined") {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Update active section
            // Fixed code
            for (const link of document.querySelectorAll(".nav-link")) {
              link.classList.remove("active-section");
            }
            document
              .querySelector(`a[href="#${sectionId}"]`)
              ?.classList.add("active-section");
          }
        },
        { threshold: 0.3 }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    }
  }, [sectionId]);

  return (
    <div id={sectionId} ref={sectionRef}>
      {children}
    </div>
  );
}

export default function ServiceDetailClient({
  service,
  relatedServices,
}: ServiceDetailClientProps) {
  const router = useRouter();
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const headerScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Efekt analityczny z nowszej wersji
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log(`Service detail viewed: ${service.id}`);
      // Tutaj możesz dodać kod analityki
    }
  }, [service.id]);

  // Handle back button
  const handleBack = () => {
    router.back();
  };

  // Utworzenie parametrów URL z nowszej wersji
  const contactUrl = `/kontakt?service=${encodeURIComponent(service.id)}`;

  // Function to determine primary and secondary colors
  const getPrimaryColor = () => {
    const colorClasses = service.color.split(" ")[0];
    return colorClasses.replace("from-", "");
  };

  const getSecondaryColor = () => {
    const colorClasses = service.color.split(" ")[1];
    return colorClasses.replace("to-", "");
  };

  const primaryColor = getPrimaryColor();
  const secondaryColor = getSecondaryColor();

  // Get example code based on service type
  const getExampleCode = () => {
    if (service.id === "deployment") {
      return {
        code: `// Przykładowy plik konfiguracyjny CI/CD (pipeline.yml)
name: Deployment Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18.x'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Build application
        run: npm run build
      - name: Deploy to staging
        if: github.ref == 'refs/heads/develop'
        run: |
          echo "Deploying to staging environment"
          # Tutaj kod do wdrożenia na środowisko testowe
      - name: Deploy to production
        if: github.ref == 'refs/heads/main'
        run: |
          echo "Deploying to production environment"
          # Tutaj kod do wdrożenia na środowisko produkcyjne`,
        language: "yaml",
        fileName: "pipeline.yml",
        highlightLines: [10, 11, 19, 20, 21],
      };
    }
    if (service.id === "infrastructure") {
      return {
        code: `# Przykładowy kod Terraform do tworzenia infrastruktury AWS
provider "aws" {
  region = "eu-central-1"
}

# Definicja sieci VPC
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  
  tags = {
    Name = "main-vpc"
    Environment = "production"
  }
}

# Tworzenie subnets w różnych strefach dostępności
resource "aws_subnet" "public" {
  count = 3
  
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.20.0/24"
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  map_public_ip_on_launch = true
  
  tags = {
    Name = "public-subnet-24"
    Type = "Public"
  }
}

# Tworzenie grupy bezpieczeństwa
resource "aws_security_group" "web" {
  name        = "web-sg"
  description = "Allow web traffic"
  vpc_id      = aws_vpc.main.id
  
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Output ważnych wartości
output "vpc_id" {
  value = aws_vpc.main.id
}`,
        language: "yaml",
        fileName: "main.tf",
        highlightLines: [],
      };
    }
    if (service.id === "servers") {
      return {
        code: `# Przykładowy playbook Ansible do konfiguracji serwera
---
- name: Konfiguracja serwera produkcyjnego
  hosts: web_servers
  become: yes
  
  vars:
    app_name: example-app
    app_user: www-data
    app_dir: "/var/www/{{ app_name }}"
    
  tasks:
    - name: Instalacja wymaganych pakietów
      apt:
        name:
          - nginx
          - nodejs
          - npm
          - certbot
          - python3-certbot-nginx
        state: present
        update_cache: yes
      
    - name: Konfiguracja Nginx
      template:
        src: templates/nginx.conf.j2
        dest: "/etc/nginx/sites-available/{{ app_name }}"
      notify: restart nginx
      
    - name: Włączenie konfiguracji Nginx
      file:
        src: "/etc/nginx/sites-available/{{ app_name }}"
        dest: "/etc/nginx/sites-enabled/{{ app_name }}"
        state: link
      notify: restart nginx
      
    - name: Konfiguracja certyfikatu SSL
      command: certbot --nginx -d example.com -d www.example.com --non-interactive --agree-tos -m admin@example.com
      
    - name: Uruchomienie aplikacji
      systemd:
        name: "{{ app_name }}"
        state: started
        enabled: yes
        
  handlers:
    - name: restart nginx
      service:
        name: nginx
        state: restarted`,
        language: "yaml",
        fileName: "server_config.yml",
        highlightLines: [],
      };
    }
    return {
      code: `// Przykładowy kod React + TypeScript
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/users');
        
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map(user => (
          <motion.div
            key={user.id}
            className="p-4 border rounded-lg shadow-sm"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;`,
      language: "typescript",
      fileName: "UserDashboard.tsx",
      highlightLines: [],
    };
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <ScrollProgress color={`bg-${primaryColor}-500`} />

      <div className="max-w-6xl mx-auto pt-24 pb-16 px-4 sm:px-6 relative z-10">
        {/* Hero Header with Refined Design */}
        <motion.div
          ref={headerRef}
          className="relative w-full h-[50vh] min-h-[400px] max-h-[600px] mb-16 overflow-hidden rounded-2xl"
          style={{
            opacity: headerOpacity,
            scale: headerScale,
          }}
        >
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent z-10" />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${
                  primaryColor === "indigo"
                    ? "6366f1"
                    : primaryColor === "emerald"
                    ? "10b981"
                    : primaryColor === "blue"
                    ? "3b82f6"
                    : primaryColor === "purple"
                    ? "8b5cf6"
                    : primaryColor === "amber"
                    ? "f59e0b"
                    : primaryColor === "sky"
                    ? "0ea5e9"
                    : primaryColor === "pink"
                    ? "ec4899"
                    : "6366f1"
                }' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          {/* Floating particles for visual interest */}
          <div className="absolute inset-0 z-0 opacity-40">
            <FloatingBubbles
              count={8}
              minSize={2}
              maxSize={6}
              color={`rgba(${
                primaryColor === "indigo"
                  ? "99, 102, 241"
                  : primaryColor === "emerald"
                  ? "16, 185, 129"
                  : primaryColor === "blue"
                  ? "59, 130, 246"
                  : primaryColor === "purple"
                  ? "139, 92, 246"
                  : primaryColor === "amber"
                  ? "245, 158, 11"
                  : primaryColor === "sky"
                  ? "14, 165, 233"
                  : primaryColor === "pink"
                  ? "236, 72, 153"
                  : "99, 102, 241"
              }, 0.6)`}
              minSpeed={0.5}
              maxSpeed={1.5}
              interactive={false}
            />
          </div>

          {/* Service Icon */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div
              className={`w-32 h-32 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg ring-1 ring-white/10`}
              aria-hidden="true"
            >
              <Suspense
                fallback={
                  <div className="w-16 h-16 bg-gray-800/50 rounded-full animate-pulse" />
                }
              >
                <ServiceIcon
                  serviceId={service.id}
                  size={16}
                  color={primaryColor}
                />
              </Suspense>
            </div>
          </motion.div>

          {/* Service Title - Simplified for elegance */}
          <motion.div
            className="absolute bottom-16 left-0 right-0 text-center z-10"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              <GradientText
                from={`${primaryColor}-500`}
                to={`${secondaryColor}-400`}
                glowEffect
                glowIntensity={10}
              >
                {service.title}
              </GradientText>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto px-6 font-light">
              {service.description}
            </p>
          </motion.div>
        </motion.div>

        {/* Refined Navigation Bar - More minimal and elegant */}
        <div className="sticky top-24 z-30 mb-16">
          <nav
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-900/95 p-4 rounded-xl backdrop-blur-sm border border-gray-800/50 shadow-md"
            aria-label="Service navigation"
          >
            <EnhancedButton
              variant="ghost"
              size="sm"
              onClick={handleBack}
              aria-label="Wróć do wszystkich usług"
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Wróć do wszystkich usług
            </EnhancedButton>

            <div className="flex flex-wrap gap-3">
              {[
                "overview",
                "process",
                "benefits",
                "technology",
                "comparison",
              ].map((section, index) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className={`nav-link text-sm transition-colors px-3 py-1.5 rounded-md ${
                    index === 0
                      ? `text-white bg-${primaryColor}-500/20 hover:bg-${primaryColor}-500/30 active-section`
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                  aria-current={index === 0 ? "page" : undefined}
                >
                  {section === "overview"
                    ? "Przegląd"
                    : section === "process"
                    ? "Proces"
                    : section === "benefits"
                    ? "Korzyści"
                    : section === "technology"
                    ? "Technologie"
                    : "Porównanie"}
                </a>
              ))}
            </div>
          </nav>
        </div>

        {/* Main content sections */}
        <NavHighlightObserver sectionId="overview">
          <section className="mb-20">
            <AnimatedSection animation="fadeIn">
              <SectionHeading
                title="Przegląd usługi"
                subtitle={`Wszystko co musisz wiedzieć o ${service.title}`}
                alignment="left"
                size="lg"
                gradient
                gradientFrom={primaryColor}
                gradientTo={secondaryColor}
                animation="slide"
                titleClassName="mb-4"
              />

              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="md:col-span-2">
                  <Card3D
                    interactive={false}
                    glowEffect
                    glowColor={`rgba(${
                      primaryColor === "indigo"
                        ? "99, 102, 241"
                        : primaryColor === "emerald"
                        ? "16, 185, 129"
                        : primaryColor === "sky"
                        ? "14, 165, 233"
                        : primaryColor === "purple"
                        ? "168, 85, 247"
                        : primaryColor === "amber"
                        ? "245, 158, 11"
                        : primaryColor === "pink"
                        ? "236, 72, 153"
                        : "99, 102, 241"
                    }, 0.3)`}
                    shadow
                    bgColor="bg-gray-900/40"
                    borderColor={`border-${primaryColor}-500/20`}
                    className="p-6 h-full"
                  >
                    <div className="prose prose-invert prose-lg max-w-none">
                      <RevealText
                        delay={0.2}
                        staggerLines
                        className="text-gray-300 text-lg leading-relaxed"
                      >
                        <p>{service.longDescription}</p>
                      </RevealText>

                      <h3 className="text-xl font-semibold mt-8 mb-4">
                        <GradientText
                          from={`${primaryColor}-400`}
                          to={`${secondaryColor}-400`}
                          preset="tech"
                        >
                          Kluczowe elementy usługi
                        </GradientText>
                      </h3>

                      <ul className="space-y-3 mt-6">
                        {service.bulletPoints.map((point, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: 0.4 + index * 0.1,
                              duration: 0.5,
                            }}
                          >
                            <div
                              className={`flex-shrink-0 w-5 h-5 mt-1 rounded-full bg-${primaryColor}-500/20 flex items-center justify-center`}
                            >
                              <div
                                className={`w-2 h-2 rounded-full bg-${primaryColor}-500`}
                              />
                            </div>
                            <span className="text-gray-200">{point}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </Card3D>
                </div>

                <div>
                  <AnimatedGradientBorder
                    borderWidth={1}
                    borderColor={`from-${primaryColor}-500 via-${secondaryColor}-500 to-${primaryColor}-500`}
                    className="h-full"
                    glowEffect
                    glowIntensity={10}
                    rounded="xl"
                  >
                    <div className="bg-gray-900/40 p-6 h-full rounded-xl">
                      <h3 className="text-xl font-semibold mb-4">
                        <HighlightText
                          color={`bg-${primaryColor}-500/10`}
                          position="bottom"
                          height="35%"
                        >
                          Specjalizacja
                        </HighlightText>
                      </h3>

                      <div className="space-y-4 mt-6">
                        {service.tags.map((tag, index) => (
                          <motion.div
                            key={index}
                            className={`inline-block mr-2 mb-2 px-3 py-1 rounded-full text-sm bg-${primaryColor}-500/10 text-${primaryColor}-200 border border-${primaryColor}-500/20`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: 0.6 + index * 0.1,
                              duration: 0.4,
                            }}
                          >
                            {tag}
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-8 pt-6 border-t border-gray-800">
                        <Link href={contactUrl} className="block">
                          <EnhancedButton
                            variant="tech"
                            size="md"
                            magneticEffect
                            glowOnHover
                            fullWidth
                            className="font-medium"
                          >
                            Zapytaj o szczegóły
                          </EnhancedButton>
                        </Link>
                      </div>
                    </div>
                  </AnimatedGradientBorder>
                </div>
              </div>
            </AnimatedSection>
          </section>
        </NavHighlightObserver>

        <SectionDivider
          className="my-16"
          variant="tech"
          dotColor={`bg-${primaryColor}-500`}
        />

        {/* Process Section */}
        <NavHighlightObserver sectionId="process">
          <section className="mb-20">
            <AnimatedSection animation="fadeIn">
              <SectionHeading
                title="Proces realizacji"
                subtitle="Jak wygląda wdrożenie usługi krok po kroku"
                alignment="left"
                size="lg"
                gradient
                gradientFrom={primaryColor}
                gradientTo={secondaryColor}
                animation="slide"
              />

              <div className="mt-12 bg-gray-900/40 p-8 rounded-xl border border-gray-800/40 backdrop-blur-sm">
                <Suspense fallback={<ServiceSectionSkeleton />}>
                  <ServiceProcessSteps
                    serviceId={service.id}
                    primaryColor={primaryColor}
                  />
                </Suspense>
              </div>

              {/* Example Code Block (for technical services) */}
              {(service.id === "deployment" ||
                service.id === "infrastructure" ||
                service.id === "servers" ||
                service.id === "webapps") && (
                <div className="mt-12">
                  <Card3D
                    interactive={false}
                    shadow
                    bgColor="bg-gray-900/30"
                    borderColor={`border-${primaryColor}-500/10`}
                    className="p-6"
                  >
                    <h3 className="text-xl font-semibold mb-6">
                      <HighlightText
                        color={`bg-${primaryColor}-500/10`}
                        height="30%"
                        position="bottom"
                      >
                        Przykład implementacji
                      </HighlightText>
                    </h3>

                    <CodeBlock
                      code={getExampleCode().code}
                      language={getExampleCode().language}
                      fileName={getExampleCode().fileName}
                      showLineNumbers
                      theme="tech"
                      highlightLines={getExampleCode().highlightLines}
                      wrapLines
                      copyButton
                      rounded="rounded-lg"
                      maxHeight="400px"
                    />
                  </Card3D>
                </div>
              )}
            </AnimatedSection>
          </section>
        </NavHighlightObserver>

        <SectionDivider
          className="my-16"
          variant="tech"
          dotColor={`bg-${primaryColor}-500`}
        />

        {/* Benefits Section */}
        <NavHighlightObserver sectionId="benefits">
          <section className="mb-20">
            <AnimatedSection animation="fadeIn">
              <SectionHeading
                title="Korzyści dla biznesu"
                subtitle="Jakie wartości zyskuje Twoja firma"
                alignment="left"
                size="lg"
                gradient
                gradientFrom={primaryColor}
                gradientTo={secondaryColor}
                animation="slide"
              />

              <div className="mt-12">
                <Card3D
                  interactive={false}
                  shadow
                  bgColor="bg-gray-900/40"
                  borderColor={`border-${primaryColor}-500/20`}
                  className="p-8 rounded-xl overflow-hidden"
                >
                  <Suspense fallback={<ServiceSectionSkeleton />}>
                    <ErrorBoundary>
                      <ServiceBenefitsChart
                        serviceId={service.id}
                        primaryColor={primaryColor}
                        secondaryColor={secondaryColor}
                      />
                    </ErrorBoundary>
                  </Suspense>
                </Card3D>
              </div>
            </AnimatedSection>
          </section>
        </NavHighlightObserver>

        <SectionDivider
          className="my-16"
          variant="tech"
          dotColor={`bg-${primaryColor}-500`}
        />

        {/* Technology Section */}
        <NavHighlightObserver sectionId="technology">
          <section className="mb-20">
            <AnimatedSection animation="fadeIn">
              <SectionHeading
                title="Technologie"
                subtitle="Narzędzia i platformy wykorzystywane w usłudze"
                alignment="left"
                size="lg"
                gradient
                gradientFrom={primaryColor}
                gradientTo={secondaryColor}
                animation="slide"
              />

              <div className="mt-12">
                <Card3D
                  interactive={false}
                  glowEffect
                  glowColor={`rgba(${
                    primaryColor === "indigo"
                      ? "99, 102, 241"
                      : primaryColor === "emerald"
                      ? "16, 185, 129"
                      : primaryColor === "blue"
                      ? "59, 130, 246"
                      : primaryColor === "purple"
                      ? "139, 92, 246"
                      : primaryColor === "sky"
                      ? "14, 165, 233"
                      : primaryColor === "amber"
                      ? "245, 158, 11"
                      : primaryColor === "pink"
                      ? "236, 72, 153"
                      : "99, 102, 241"
                  }, 0.3)`}
                  shadow
                  bgColor="bg-gray-900/40"
                  borderColor={`border-${primaryColor}-500/10`}
                  className="p-8 rounded-xl"
                >
                  <Suspense fallback={<ServiceSectionSkeleton />}>
                    <ServiceTechStack
                      technologies={service.tags}
                      primaryColor={primaryColor}
                    />
                  </Suspense>
                </Card3D>
              </div>
            </AnimatedSection>
          </section>
        </NavHighlightObserver>

        <SectionDivider
          className="my-16"
          variant="tech"
          dotColor={`bg-${primaryColor}-500`}
        />

        {/* Comparison Section */}
        <NavHighlightObserver sectionId="comparison">
          <section className="mb-24">
            <AnimatedSection animation="fadeIn">
              <SectionHeading
                title="Porównanie rozwiązań"
                subtitle="Dlaczego warto wybrać moje usługi"
                alignment="left"
                size="lg"
                gradient
                gradientFrom={primaryColor}
                gradientTo={secondaryColor}
                animation="slide"
              />

              <div className="mt-12">
                <Card3D
                  interactive={false}
                  shadow
                  bgColor="bg-gray-900/40"
                  borderColor={`border-${primaryColor}-500/10`}
                  className="p-6 sm:p-8 rounded-xl"
                >
                  <Suspense fallback={<ServiceSectionSkeleton />}>
                    <ServiceComparisonTable
                      serviceId={service.id}
                      primaryColor={primaryColor}
                    />
                  </Suspense>
                </Card3D>
              </div>
            </AnimatedSection>
          </section>
        </NavHighlightObserver>

        {/* CTA Section */}
        <section className="mb-24">
          <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-2xl p-1 shadow-xl">
            <div className="bg-gradient-to-br from-gray-900/70 to-black/90 rounded-xl backdrop-blur-sm p-8 sm:p-12">
              <Suspense
                fallback={
                  <div className="h-40 w-full bg-gray-800/20 animate-pulse rounded-lg" />
                }
              >
                <ServiceCTA
                  serviceName={service.title}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                />
              </Suspense>
            </div>
          </div>
        </section>

        {/* Related Services with a more elegant presentation */}
        {relatedServices.length > 0 && (
          <section className="mb-16">
            <AnimatedSection animation="fadeIn">
              <SectionHeading
                title="Podobne usługi"
                subtitle="Inne rozwiązania, które mogą Cię zainteresować"
                alignment="left"
                size="lg"
                gradient
                gradientFrom={primaryColor}
                gradientTo={secondaryColor}
                animation="slide"
              />

              <div className="grid md:grid-cols-3 gap-6 mt-12">
                {relatedServices.map((relService) => (
                  <motion.div
                    key={relService.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Link
                      href={`/uslugi/${relService.id}`}
                      className="block h-full"
                      aria-label={`Przejdź do usługi: ${relService.title}`}
                    >
                      <TiltCard
                        className="h-full"
                        tiltAmount={5}
                        glareOpacity={0.1}
                        borderGlow={false}
                        backgroundEffect="gradient"
                      >
                        <div className="p-6 h-full">
                          <div className="flex items-center mb-4">
                            <div
                              className={`w-10 h-10 rounded-full bg-gradient-to-br ${relService.color} flex items-center justify-center mr-3`}
                              aria-hidden="true"
                            >
                              <Suspense
                                fallback={
                                  <div className="w-5 h-5 bg-gray-800/50 rounded-full animate-pulse" />
                                }
                              >
                                <ServiceIcon
                                  serviceId={relService.id}
                                  size={5}
                                  color="indigo"
                                />
                              </Suspense>
                            </div>
                            <h3 className="text-lg font-semibold">
                              {relService.title}
                            </h3>
                          </div>
                          <p className="text-gray-400 text-sm">
                            {relService.description}
                          </p>
                        </div>
                      </TiltCard>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </section>
        )}
      </div>
    </div>
  );
}
