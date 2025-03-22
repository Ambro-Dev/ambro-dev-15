// Dane doświadczenia zawodowego
export const doswiadczenie = [
  {
    id: 1,
    firma: "TechSolutions S.A.",
    stanowisko: "Senior Software Developer",
    okres: "2021 - obecnie",
    opis: "Tworzenie zaawansowanych aplikacji webowych i mobilnych dla klientów korporacyjnych. Prowadzenie zespołu programistów, planowanie architektury systemów oraz wdrażanie najnowszych technologii.",
    technologie: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "GraphQL",
      "AWS",
    ],
    osiagniecia: [
      "Zredukowałem czas ładowania kluczowej aplikacji klienta o 40%",
      "Wdrożyłem architekturę mikroserwisową, zwiększając skalowalność i niezawodność systemu",
      "Stworzyłem framework wewnętrzny przyspieszający rozwój nowych projektów o 25%",
    ],
  },
  {
    id: 2,
    firma: "Innowacje.pl",
    stanowisko: "Full Stack Developer",
    okres: "2018 - 2021",
    opis: "Pełna odpowiedzialność za rozwój i utrzymanie platformy e-commerce. Projektowanie i implementacja nowych funkcjonalności, optymalizacja wydajności oraz integracja z zewnętrznymi systemami.",
    technologie: [
      "JavaScript",
      "React",
      "Redux",
      "Node.js",
      "MongoDB",
      "Docker",
    ],
    osiagniecia: [
      "Przeprowadziłem kompleksową modernizację platformy, zwiększając konwersje o 35%",
      "Zaimplementowałem system rekomendacji produktów, co zwiększyło średnią wartość zamówienia o 20%",
      "Opracowałem strategię CI/CD, skracając czas wdrożenia nowych funkcji z dni do godzin",
    ],
  },
  {
    id: 3,
    firma: "Digital Craft",
    stanowisko: "Frontend Developer",
    okres: "2016 - 2018",
    opis: "Tworzenie responsywnych interfejsów użytkownika dla aplikacji webowych. Współpraca z zespołem projektantów UX/UI w celu dostarczania intuicyjnych i estetycznych rozwiązań.",
    technologie: ["JavaScript", "React", "CSS/SASS", "Webpack", "Agile/Scrum"],
    osiagniecia: [
      "Stworzyłem system komponentów UI wielokrotnego użytku, przyspieszając czas rozwoju o 30%",
      "Zoptymalizowałem wydajność aplikacji, zwiększając ocenę PageSpeed z 65 do 95",
      "Przeprowadziłem 15 warsztatów dla zespołu z zakresu najnowszych technologii frontendowych",
    ],
  },
];

// Dane projektów osobistych
export const projektyOsobiste = [
  {
    id: "devtools-extension",
    nazwa: "DevTools Extension",
    opis: "Rozszerzenie do przeglądarki ułatwiające codzienną pracę programisty. Narzędzie automatyzuje powtarzalne zadania, takie jak generowanie komponentów, formatowanie kodu czy testowanie API.",
    technologie: ["JavaScript", "Chrome API", "React", "Jest"],
    link: "https://github.com/devos/devtools-extension",
    image: "/api/placeholder/400/300",
    color: "from-indigo-500 to-blue-600",
  },
  {
    id: "nlp-analyzer",
    nazwa: "NLP Analyzer",
    opis: "Aplikacja do analizy tekstu wykorzystująca algorytmy przetwarzania języka naturalnego. Narzędzie pozwala na wykrywanie emocji, klasyfikację tekstu oraz ekstrakcję kluczowych informacji.",
    technologie: ["Python", "TensorFlow", "Flask", "React"],
    link: "https://github.com/devos/nlp-analyzer",
    image: "/api/placeholder/400/300",
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: "smart-garden",
    nazwa: "Smart Garden System",
    opis: "System IoT do inteligentnego zarządzania ogrodem, monitorujący wilgotność gleby, nasłonecznienie oraz automatycznie sterujący nawadnianiem. Projekt łączy hardware (Arduino) z aplikacją webową i mobilną.",
    technologie: ["Arduino", "ESP32", "MQTT", "React Native", "Node.js"],
    link: "https://github.com/devos/smart-garden",
    image: "/api/placeholder/400/300",
    color: "from-green-500 to-teal-600",
  },
];

// Dane edukacji
export const edukacja = [
  {
    id: 1,
    uczelnia: "Politechnika Warszawska",
    kierunek: "Informatyka, specjalizacja Inżynieria Oprogramowania",
    stopien: "Magister",
    okres: "2014 - 2016",
    opis: "Praca magisterska na temat optymalizacji aplikacji webowych z wykorzystaniem Progressive Web Apps",
  },
  {
    id: 2,
    uczelnia: "Politechnika Warszawska",
    kierunek: "Informatyka",
    stopien: "Inżynier",
    okres: "2010 - 2014",
    opis: "Praca inżynierska dotycząca projektowania systemów rozproszonych",
  },
];

// Dane certyfikatów
export const certyfikaty = [
  {
    id: 1,
    nazwa: "AWS Certified Solutions Architect",
    wydawca: "Amazon Web Services",
    rok: 2022,
  },
  {
    id: 2,
    nazwa: "Google Professional Cloud Developer",
    wydawca: "Google Cloud",
    rok: 2021,
  },
  {
    id: 3,
    nazwa: "Microsoft Certified: Azure Developer Associate",
    wydawca: "Microsoft",
    rok: 2020,
  },
  {
    id: 4,
    nazwa: "TensorFlow Developer Certificate",
    wydawca: "Google",
    rok: 2020,
  },
];

// Dane umiejętności
export const umiejetnosci = {
  technologie: [
    { nazwa: "JavaScript/TypeScript", poziom: 95 },
    { nazwa: "React/React Native", poziom: 90 },
    { nazwa: "Next.js", poziom: 85 },
    { nazwa: "Node.js", poziom: 80 },
    { nazwa: "GraphQL", poziom: 75 },
    { nazwa: "SQL/NoSQL", poziom: 85 },
    { nazwa: "AWS/Cloud", poziom: 80 },
    { nazwa: "Docker/Kubernetes", poziom: 75 },
  ],
  jezykiProgramowania: [
    { nazwa: "JavaScript", poziom: 95 },
    { nazwa: "TypeScript", poziom: 90 },
    { nazwa: "Python", poziom: 75 },
    { nazwa: "Java", poziom: 65 },
    { nazwa: "C#", poziom: 60 },
  ],
  miękkie: [
    "Zarządzanie projektami",
    "Komunikacja",
    "Rozwiązywanie problemów",
    "Praca zespołowa",
    "Zarządzanie czasem",
    "Kreatywne myślenie",
  ],
};

// Dane osobowe
export const daneOsobowe = {
  imie: "Jan Kowalski",
  stanowisko: "Full Stack Developer",
  lokalizacja: "Warszawa, Polska",
  email: "kontakt@devos.pl",
  telefon: "+48 123 456 789",
  doswiadczenieLata: "8+",
};
