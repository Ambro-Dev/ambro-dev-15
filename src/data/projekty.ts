export interface Projekt {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  challenge: string;
  solution: string;
  technologies: string[];
  features: string[];
  image: string;
  images: string[];
  color: string;
  codeSnippet: string;
}

export const projekty: Projekt[] = [
  {
    id: "fintech-dashboard",
    title: "Panel FinTech",
    shortDesc:
      "Kompleksowy panel analityczny do finansów z wizualizacją danych w czasie rzeczywistym.",
    description:
      "Panel FinTech to zaawansowane narzędzie analityczne stworzone dla firmy z branży finansowej. Platforma zapewnia kompleksowy wgląd w dane finansowe w czasie rzeczywistym, niestandardowe raporty oraz funkcje analizy predykcyjnej. Dzięki intuicyjnemu interfejsowi użytkownicy mogą łatwo monitorować kluczowe wskaźniki, wykrywać trendy i podejmować decyzje oparte na danych.",
    challenge:
      "Głównym wyzwaniem było stworzenie wydajnego systemu przetwarzającego duże ilości danych w czasie rzeczywistym, zapewniając jednocześnie responsywny interfejs i zaawansowane możliwości wizualizacji danych.",
    solution:
      "Zaimplementowałem architekturę wykorzystującą WebSockets do przesyłania danych w czasie rzeczywistym, zoptymalizowane zapytania do bazy danych oraz zaawansowane algorytmy do analizy danych. Frontend zbudowałem w Next.js z TailwindCSS, wykorzystując D3.js do tworzenia interaktywnych wizualizacji.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "TailwindCSS",
      "Framer Motion",
      "D3.js",
      "WebSockets",
      "PostgreSQL",
    ],
    features: [
      "Dashboardy z niestandardowymi widżetami",
      "Analiza trendów z algorytmami predykcyjnymi",
      "Dane finansowe w czasie rzeczywistym",
      "Eksport raportów do PDF/Excel",
      "Zaawansowane filtry i wyszukiwanie",
      "Autoryzacja i zarządzanie uprawnieniami",
    ],
    image: "/api/placeholder/800/500",
    images: [
      "/api/placeholder/800/500",
      "/api/placeholder/800/500",
      "/api/placeholder/800/500",
    ],
    color: "from-blue-500 to-indigo-600",
    codeSnippet: `
// Przykładowy kod komponentu wizualizacji trendu
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export function TrendChart({ data, width, height }) {
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (!data || !svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    // Skale
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([0, innerWidth]);
    
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([innerHeight, 0]);
    
    // Linia trendu
    const line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.value))
      .curve(d3.curveMonotoneX);
    
    // Rysowanie
    const g = svg.append("g")
      .attr("transform", \`translate(\${margin.left},\${margin.top})\`);
    
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#4f46e5")
      .attr("stroke-width", 2)
      .attr("d", line);
    
    // Osie
    g.append("g")
      .attr("transform", \`translate(0,\${innerHeight})\`)
      .call(d3.axisBottom(x));
    
    g.append("g")
      .call(d3.axisLeft(y));
  }, [data, width, height]);
  
  return <svg ref={svgRef} width={width} height={height} />;
}`,
  },
  {
    id: "ecommerce-platform",
    title: "Platforma e-commerce",
    shortDesc:
      "W pełni funkcjonalne rozwiązanie e-commerce z zarządzaniem magazynem i płatnościami.",
    description:
      "Kompleksowa platforma e-commerce stworzona dla średniej wielkości sklepu internetowego, oferująca pełen zakres funkcji potrzebnych do prowadzenia nowoczesnego biznesu online. System integruje zaawansowane zarządzanie magazynem, przetwarzanie płatności online oraz analizę danych klientów, umożliwiając właścicielom sklepu podejmowanie decyzji opartych na danych.",
    challenge:
      "Wyzwaniem było stworzenie platformy, która będzie zarówno przyjazna dla użytkownika, jak i bardzo wydajna, zdolna do obsługi dużej liczby jednoczesnych zamówień, szczególnie w okresach zwiększonego ruchu (np. promocje, święta).",
    solution:
      "Zaimplementowałem architekturę mikroserwisową z wykorzystaniem Node.js i React, z niezależnymi modułami do obsługi katalogu produktów, koszyka, płatności i zarządzania zamówieniami. System wykorzystuje Redis do buforowania i MongoDB jako główną bazę danych, z zaimplementowanym systemem kolejkowania dla operacji intensywnie obciążających serwer.",
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Redis",
      "Stripe API",
      "Redux",
      "AWS",
      "Docker",
    ],
    features: [
      "Responsywny katalog produktów",
      "Zaawansowany koszyk zakupowy",
      "Integracja z bramkami płatności",
      "System zarządzania magazynem",
      "Panel administracyjny",
      "Analityka sprzedaży",
      "Personalizowane rekomendacje produktów",
    ],
    image: "/api/placeholder/800/500",
    images: [
      "/api/placeholder/800/500",
      "/api/placeholder/800/500",
      "/api/placeholder/800/500",
    ],
    color: "from-purple-500 to-indigo-600",
    codeSnippet: `
// Przykładowy kod obsługi koszyka zakupowego
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
  loading: false,
  error: null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => 
        total + (item.price * item.quantity), 0);
    },
    // inne akcje: removeFromCart, updateQuantity, clearCart...
  }
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;`,
  },
  {
    id: "health-app",
    title: "Aplikacja zdrowotna",
    shortDesc:
      "Aplikacja mobilna do śledzenia aktywności fizycznej i planowania posiłków.",
    description:
      "Innowacyjna aplikacja mobilna do kompleksowego zarządzania zdrowiem, obejmująca śledzenie aktywności fizycznej, planowanie posiłków i personalizowane rekomendacje treningowe. Aplikacja wykorzystuje uczenie maszynowe do dostosowania planów treningowych do indywidualnych potrzeb użytkowników i analizy ich postępów w czasie.",
    challenge:
      "Głównym wyzwaniem było stworzenie intuicyjnego interfejsu użytkownika dla złożonych funkcjonalności, a także implementacja algorytmów uczenia maszynowego do analizy danych użytkowników na urządzeniach mobilnych z ograniczoną mocą obliczeniową.",
    solution:
      "Zaprojektowałem aplikację w React Native, co zapewniło spójne doświadczenie na iOS i Android. Do przetwarzania danych wykorzystałem TensorFlow.js, zoptymalizowany pod kątem urządzeń mobilnych. Backend oparłem na Firebase dla łatwej synchronizacji i przechowywania danych, a GraphQL i Apollo Client zapewniają efektywną komunikację między klientem a serwerem.",
    technologies: [
      "React Native",
      "Firebase",
      "TensorFlow.js",
      "GraphQL",
      "Apollo",
      "Redux",
      "Jest",
    ],
    features: [
      "Śledzenie aktywności fizycznej",
      "Planowanie posiłków i dieta",
      "Personalizowane plany treningowe",
      "Analiza postępów w czasie",
      "Integracja z urządzeniami fitness",
      "Społeczność i wyzwania grupowe",
      "Porady zdrowotne oparte na AI",
    ],
    image: "/api/placeholder/800/500",
    images: [
      "/api/placeholder/800/500",
      "/api/placeholder/800/500",
      "/api/placeholder/800/500",
    ],
    color: "from-pink-500 to-purple-600",
    codeSnippet: `
// Hook do personalizowanych rekomendacji treningowych
import { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { loadLayersModel } from '@tensorflow/tfjs-react-native';
import { useUserData } from './useUserData';

export function useTrainingRecommendations() {
  const [model, setModel] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData, activityHistory } = useUserData();
  
  // Załaduj model przy inicjalizacji
  useEffect(() => {
    async function loadModel() {
      try {
        const loadedModel = await loadLayersModel('file://path/to/model.json');
        setModel(loadedModel);
      } catch (error) {
        console.error('Nie udało się załadować modelu:', error);
      }
    }
    
    loadModel();
  }, []);
  
  // Generuj rekomendacje, gdy model jest gotowy i mamy dane użytkownika
  useEffect(() => {
    if (!model || !userData || !activityHistory) return;
    
    async function predictRecommendations() {
      setLoading(true);
      
      try {
        // Przygotuj dane wejściowe dla modelu
        const userFeatures = tf.tensor2d([
          userData.age, 
          userData.weight, 
          userData.height, 
          userData.fitnessLevel,
          activityHistory.averageHeartRate,
          activityHistory.weeklyActivityMinutes
        ], [1, 6]);
        
        // Wykonaj predykcję
        const predictions = await model.predict(userFeatures);
        const predictionData = await predictions.data();
        
        // Mapuj predykcje na konkretne ćwiczenia i intensywność
        const recommendedWorkouts = mapPredictionsToWorkouts(predictionData);
        setRecommendations(recommendedWorkouts);
      } catch (error) {
        console.error('Błąd podczas generowania rekomendacji:', error);
      } finally {
        setLoading(false);
      }
    }
    
    predictRecommendations();
  }, [model, userData, activityHistory]);
  
  return { recommendations, loading };
}`,
  },
  {
    id: "smart-home",
    title: "System Smart Home",
    shortDesc:
      "Inteligentny system zarządzania domem z kontrolą głosową i analizą zużycia energii.",
    description:
      "Kompleksowy system smart home zaprojektowany dla deweloperów nieruchomości premium. Rozwiązanie integruje sterowanie oświetleniem, ogrzewaniem, zabezpieczeniami i multimediami w jednym intuicyjnym interfejsie, dostępnym zarówno z aplikacji mobilnej, jak i paneli dotykowych zainstalowanych w domu.",
    challenge:
      "Kluczowym wyzwaniem było stworzenie systemu, który mógłby integrować różnorodne urządzenia i protokoły IoT, zapewniając jednocześnie wysokie bezpieczeństwo, niezawodność oraz łatwość obsługi dla użytkowników końcowych.",
    solution:
      "Zaprojektowałem centralny hub oparty na Node.js z modułową architekturą, umożliwiającą łatwą integrację różnych protokołów (Z-Wave, Zigbee, WiFi). Frontend aplikacji został zbudowany w React Native dla urządzeń mobilnych i React.js dla paneli dotykowych, z wykorzystaniem WebSockets do komunikacji w czasie rzeczywistym.",
    technologies: [
      "React Native",
      "Node.js",
      "WebSockets",
      "MQTT",
      "Z-Wave API",
      "Zigbee",
      "TensorFlow",
      "AWS IoT",
    ],
    features: [
      "Sterowanie oświetleniem i ogrzewaniem",
      "System zabezpieczeń z kamerami",
      "Sterowanie głosowe",
      "Automatyzacja i sceny",
      "Analiza zużycia energii",
      "Powiadomienia i alerty",
      "Integracja z popularnymi asystentami głosowymi",
    ],
    image: "/api/placeholder/800/500",
    images: [
      "/api/placeholder/800/500",
      "/api/placeholder/800/500",
      "/api/placeholder/800/500",
    ],
    color: "from-green-500 to-blue-600",
    codeSnippet: `
// System automatyzacji domowej
import { DeviceManager } from './DeviceManager';
import { SceneController } from './SceneController';
import { EventEmitter } from 'events';

class HomeAutomation extends EventEmitter {
  private deviceManager: DeviceManager;
  private sceneController: SceneController;
  private automationRules: AutomationRule[] = [];
  
  constructor() {
    super();
    this.deviceManager = new DeviceManager();
    this.sceneController = new SceneController(this.deviceManager);
    
    // Nasłuchuj zdarzeń od urządzeń
    this.deviceManager.on('deviceStateChanged', this.evaluateAutomationRules.bind(this));
  }
  
  // Dodaj nową regułę automatyzacji
  public addAutomationRule(rule: AutomationRule): string {
    const ruleId = generateUniqueId();
    rule.id = ruleId;
    this.automationRules.push(rule);
    return ruleId;
  }
  
  // Oceniaj wszystkie reguły, gdy zmienia się stan urządzenia
  private evaluateAutomationRules(deviceId: string, state: DeviceState): void {
    this.automationRules.forEach(rule => {
      // Sprawdź, czy reguła powinna być wyzwolona
      if (this.shouldTriggerRule(rule, deviceId, state)) {
        this.executeRuleActions(rule);
      }
    });
  }
  
  // Sprawdź, czy warunki reguły są spełnione
  private shouldTriggerRule(rule: AutomationRule, deviceId: string, state: DeviceState): boolean {
    // Implementacja logiki oceniającej warunki reguły
    const triggerDevice = rule.trigger.deviceId === deviceId;
    const conditionsMet = rule.conditions.every(condition => {
      // Sprawdź każdy warunek (np. czas, wartości stanu, itp.)
      return this.evaluateCondition(condition);
    });
    
    return triggerDevice && conditionsMet;
  }
  
  // Wykonaj akcje zdefiniowane w regule
  private executeRuleActions(rule: AutomationRule): void {
    rule.actions.forEach(action => {
      if (action.type === 'device') {
        // Ustaw stan urządzenia
        this.deviceManager.setDeviceState(action.deviceId, action.state);
      } else if (action.type === 'scene') {
        // Aktywuj scenę
        this.sceneController.activateScene(action.sceneId);
      }
      // Inne typy akcji...
    });
    
    this.emit('ruleExecuted', rule.id);
  }
}

export default HomeAutomation;`,
  },
];
