// types.ts
import { LucideIcon } from "lucide-react";

export type ViewMode = "overview" | "layers" | "benefits" | "cases" | "faq";

export interface BusinessBenefit {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  value: number;
  stats: string;
  gradient: string;
}

export interface InfraLayer {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
  tools: string[];
  features: string[];
  businessValue: string;
  position: number;
}

export interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  logo?: string;
  challenge: string;
  solution: string;
  results: string[];
  testimonial: {
    quote: string;
    author: string;
    position: string;
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}
