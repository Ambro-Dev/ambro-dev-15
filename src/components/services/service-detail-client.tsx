"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useScroll, useTransform } from "framer-motion";
import type { SerializableService } from "@/lib/service-utils";

// Import komponentów
import ServiceHero from "./service-detail/service-hero";
import ServiceNavigation from "./service-detail/service-navigation";
import NavHighlightObserver from "./service-detail/nav-highlight-observer";
import ServiceOverviewSection from "./service-detail/service-overview-section";
import ServiceProcessSection from "./service-detail/service-process-section";
import ServiceBenefitsSection from "./service-detail/service-benefits-section";
import ServiceTechnologySection from "./service-detail/service-technology-section";
import ServiceComparisonSection from "./service-detail/service-comparison-section";
import ServiceCTASection from "./service-detail/service-cta-section";
import RelatedServicesSection from "./service-detail/related-services-section";
import SectionDividerComponent from "./service-detail/section-divider";

// Define props for the client component
interface ServiceDetailClientProps {
  service: SerializableService;
  relatedServices: SerializableService[];
}

export default function ServiceDetailClient({
  service,
  relatedServices,
}: ServiceDetailClientProps) {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const headerScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Efekt analityczny
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

  // Utworzenie parametrów URL
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
      <div className="max-w-6xl mx-auto pt-24 pb-16 px-4 sm:px-6 relative z-10">
        {/* Hero Header with Refined Design */}
        <ServiceHero
          service={service}
          headerOpacity={headerOpacity}
          headerScale={headerScale}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />

        {/* Refined Navigation Bar */}
        <ServiceNavigation
          primaryColor={primaryColor}
          handleBack={handleBack}
        />

        {/* Main content sections */}
        <NavHighlightObserver sectionId="overview">
          <ServiceOverviewSection
            service={service}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            contactUrl={contactUrl}
          />
        </NavHighlightObserver>

        <SectionDividerComponent primaryColor={primaryColor} />

        {/* Process Section */}
        <NavHighlightObserver sectionId="process">
          <ServiceProcessSection
            serviceId={service.id}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            getExampleCode={getExampleCode}
          />
        </NavHighlightObserver>

        <SectionDividerComponent primaryColor={primaryColor} />

        {/* Benefits Section */}
        <NavHighlightObserver sectionId="benefits">
          <ServiceBenefitsSection
            serviceId={service.id}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        </NavHighlightObserver>

        <SectionDividerComponent primaryColor={primaryColor} />

        {/* Technology Section */}
        <NavHighlightObserver sectionId="technology">
          <ServiceTechnologySection
            technologies={service.tags}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        </NavHighlightObserver>

        <SectionDividerComponent primaryColor={primaryColor} />

        {/* Comparison Section */}
        <NavHighlightObserver sectionId="comparison">
          <ServiceComparisonSection
            serviceId={service.id}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        </NavHighlightObserver>

        {/* CTA Section */}
        <ServiceCTASection
          serviceName={service.title}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />

        {/* Related Services */}
        <RelatedServicesSection
          relatedServices={relatedServices}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      </div>
    </div>
  );
}
