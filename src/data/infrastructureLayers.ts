// data/infrastructureLayers.ts
import { InfraLayer } from "@/types/infrastructure";
import {
  Cloud,
  Database,
  Server,
  Shield,
  Layers,
  GitBranch,
  Globe,
} from "lucide-react";

export const infrastructureLayers: InfraLayer[] = [
  {
    id: "client",
    name: "Warstwa interfejsu użytkownika",
    description: "Nowoczesne interfejsy użytkownika",
    icon: Globe,
    color: "pink",
    gradient: "from-pink-500 to-rose-500",
    tools: ["React", "Next.js", "TypeScript", "PWA", "React Native"],
    features: [
      "Responsywne interfejsy na wszystkie urządzenia",
      "Progresywne aplikacje z funkcjami offline",
      "Server-side rendering dla optymalnej wydajności",
      "Zaawansowane zarządzanie stanem aplikacji",
    ],
    businessValue:
      "Zwiększenie satysfakcji użytkowników i konwersji o 35% dzięki intuicyjnym i responsywnym interfejsom",
    position: 1,
  },
  {
    id: "api",
    name: "Warstwa API Gateway",
    description: "Zarządzanie dostępem do serwisów",
    icon: Server,
    color: "sky",
    gradient: "from-sky-500 to-blue-500",
    tools: ["Kong", "AWS API Gateway", "Nginx", "HAProxy", "Envoy"],
    features: [
      "Centralne zarządzanie ruchem sieciowym",
      "Throttling i ochrona przed przeciążeniem",
      "Walidacja zapytań i transformacja odpowiedzi",
      "Routing oparty o zawartość i nagłówki",
    ],
    businessValue:
      "Redukcja opóźnień API o 40% i zoptymalizowana komunikacja między systemami",
    position: 2,
  },
  {
    id: "auth",
    name: "Warstwa bezpieczeństwa",
    description: "Bezpieczeństwo i kontrola dostępu",
    icon: Shield,
    color: "amber",
    gradient: "from-amber-500 to-orange-500",
    tools: ["OAuth 2.0", "JWT", "Keycloak", "Vault", "Auth0"],
    features: [
      "Wielopoziomowe uwierzytelnianie użytkowników",
      "Role-based i attribute-based kontrola dostępu",
      "Monitoring zagrożeń w czasie rzeczywistym",
      "Bezpieczne zarządzanie danymi wrażliwymi",
    ],
    businessValue:
      "Minimalizacja ryzyka naruszenia danych i przeciętnie 70% mniej incydentów bezpieczeństwa",
    position: 3,
  },
  {
    id: "services",
    name: "Warstwa mikroserwisów",
    description: "Niezależne serwisy biznesowe",
    icon: Layers,
    color: "purple",
    gradient: "from-purple-500 to-violet-500",
    tools: ["Docker", "Kubernetes", "Spring Boot", "Node.js", "gRPC"],
    features: [
      "Modułowa architektura zorientowana na domeny",
      "Izolacja błędów i szybkie odzyskiwanie",
      "Skalowanie horyzontalne oparte o obciążenie",
      "Niezależność technologiczna między serwisami",
    ],
    businessValue:
      "Skrócenie czasu wprowadzania nowych funkcji o 60% i izolacja błędów zapobiegająca awariom",
    position: 4,
  },
  {
    id: "data",
    name: "Warstwa danych",
    description: "Zarządzanie danymi i pamięcią podręczną",
    icon: Database,
    color: "emerald",
    gradient: "from-emerald-500 to-teal-500",
    tools: ["PostgreSQL", "MongoDB", "Redis", "Kafka", "Elasticsearch"],
    features: [
      "Zoptymalizowane systemy baz danych SQL i NoSQL",
      "Rozproszone pamięci podręczne dla wydajności",
      "Asynchroniczna komunikacja przez kolejki wiadomości",
      "Analityka strumieniowa i zarządzanie zdarzeniami",
    ],
    businessValue:
      "Zwiększenie wydajności systemów o 55% i wsparcie analityki biznesowej w czasie rzeczywistym",
    position: 5,
  },
  {
    id: "infra",
    name: "Warstwa infrastruktury chmurowej",
    description: "Elastyczna infrastruktura chmurowa",
    icon: Cloud,
    color: "indigo",
    gradient: "from-indigo-500 to-blue-500",
    tools: ["AWS", "Terraform", "Ansible", "Azure", "Google Cloud"],
    features: [
      "Infrastructure as Code - zarządzanie deklaratywne",
      "Architektura multi-cloud z wysoką dostępnością",
      "Automatyczne skalowanie zasobów obliczeniowych",
      "Zaawansowana wirtualizacja i konteneryzacja",
    ],
    businessValue:
      "40% redukcja kosztów infrastruktury i przyspieszenie deploymentów z dni do minut",
    position: 6,
  },
  {
    id: "devops",
    name: "Warstwa DevOps & Automatyzacji",
    description: "Automatyzacja procesów IT",
    icon: GitBranch,
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
    tools: ["Jenkins", "GitHub Actions", "GitLab CI", "ArgoCD", "Prometheus"],
    features: [
      "Continuous Integration i Continuous Deployment",
      "Automatyczne testowanie i walidacja kodu",
      "Monitoring i alerting w czasie rzeczywistym",
      "GitOps i Infrastructure as Code",
    ],
    businessValue:
      "75% szybsze wprowadzanie zmian i redukcja błędów wdrożeniowych o 68%",
    position: 7,
  },
];
