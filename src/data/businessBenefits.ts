// data/businessBenefits.ts
import { BusinessBenefit } from "@/types/infrastructure";
import {
  DollarSign,
  Zap,
  TrendingUp,
  Shield,
  BarChart,
  Clock,
} from "lucide-react";

export const businessBenefits: BusinessBenefit[] = [
  {
    id: "cost",
    title: "Redukcja kosztów",
    description: "Obniżenie kosztów infrastruktury i utrzymania systemów",
    icon: DollarSign,
    value: 40,
    stats: "Średnio 40% niższe koszty operacyjne w ciągu pierwszego roku",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "agility",
    title: "Zwiększona elastyczność",
    description: "Szybsze reagowanie na zmieniające się potrzeby biznesowe",
    icon: Zap,
    value: 80,
    stats: "Nawet 80% krótszy czas wprowadzania zmian",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: "scalability",
    title: "Nieograniczona skalowalność",
    description: "Łatwe skalowanie w górę lub w dół w zależności od obciążenia",
    icon: TrendingUp,
    value: 95,
    stats: "95% usprawnienie procesów skalowania zasobów",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    id: "security",
    title: "Wzmocnione bezpieczeństwo",
    description: "Kompleksowa ochrona danych i systemów",
    icon: Shield,
    value: 70,
    stats: "Redukcja incydentów bezpieczeństwa o ponad 70%",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: "insights",
    title: "Pełna widoczność",
    description: "Szczegółowy monitoring i analityka operacyjna",
    icon: BarChart,
    value: 85,
    stats: "85% większa widoczność procesów i metryk operacyjnych",
    gradient: "from-sky-500 to-blue-500",
  },
  {
    id: "time",
    title: "Oszczędność czasu",
    description: "Automatyzacja rutynowych zadań administracyjnych",
    icon: Clock,
    value: 75,
    stats: "Redukcja czasu administracji o 75% dzięki automatyzacji",
    gradient: "from-pink-500 to-rose-500",
  },
];
