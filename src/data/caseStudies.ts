// data/caseStudies.ts
import { CaseStudy } from "@/types/infrastructure";

export const caseStudies: CaseStudy[] = [
  {
    id: "ecommerce",
    company: "OnlineShop",
    industry: "E-commerce",
    challenge:
      "Problemy z wydajnością i wysokie koszty w okresach szczytowego ruchu",
    solution:
      "Wdrożenie skalowalnej architektury chmurowej z auto-skalowaniem i mikroserwisami",
    results: [
      "Zwiększenie przepustowości o 500% w Black Friday",
      "Redukcja kosztów infrastruktury o 42%",
      "Skrócenie czasu ładowania strony o 65%",
      "Zwiększenie konwersji o 28%",
    ],
    testimonial: {
      quote:
        "Nowa architektura pozwoliła nam bez stresu obsłużyć ruch 5x większy niż poprzednio, przy niższych kosztach. To zmieniło nasze podejście do obsługi szczytów sprzedażowych.",
      author: "Marek Nowak",
      position: "CTO, OnlineShop",
    },
  },
  {
    id: "fintech",
    company: "SecureFinance",
    industry: "Fintech",
    challenge:
      "Potrzeba wysokiego bezpieczeństwa przy jednoczesnej elastyczności wprowadzania nowych funkcji",
    solution:
      "Zbudowanie architektury mikroserwisowej z zaawansowaną warstwą bezpieczeństwa i CI/CD",
    results: [
      "Brak incydentów bezpieczeństwa od 24 miesięcy",
      "Skrócenie czasu wdrożenia nowych funkcji o 70%",
      "Zwiększenie niezawodności systemu do 99.99%",
      "Redukcja kosztów utrzymania o 35%",
    ],
    testimonial: {
      quote:
        "Dzięki nowej architekturze możemy szybko reagować na zmiany rynkowe, zachowując najwyższe standardy bezpieczeństwa wymagane w branży finansowej.",
      author: "Anna Kowalska",
      position: "Head of IT Security, SecureFinance",
    },
  },
  {
    id: "manufacturing",
    company: "SmartFactory",
    industry: "Produkcja",
    challenge:
      "Przestarzałe systemy IT ograniczające możliwości optymalizacji procesów produkcyjnych",
    solution:
      "Kompleksowa modernizacja infrastruktury z wykorzystaniem IoT i przetwarzania w czasie rzeczywistym",
    results: [
      "Zwiększenie efektywności produkcji o 23%",
      "Redukcja przestojów o 47%",
      "Optymalizacja zapasów obniżająca koszty o 18%",
      "Pełna widoczność procesów w czasie rzeczywistym",
    ],
    testimonial: {
      quote:
        "Przejście na nowoczesną architekturę pozwoliło nam zautomatyzować decyzje operacyjne i znacząco zwiększyć efektywność. Wyniki przekroczyły nasze oczekiwania.",
      author: "Jan Wiśniewski",
      position: "COO, SmartFactory",
    },
  },
];
