// data/faqs.ts
import { FAQItem } from "@/types/infrastructure";

export const faqs: FAQItem[] = [
  {
    question: "Ile czasu zajmuje wdrożenie takiej architektury?",
    answer:
      "Czas wdrożenia zależy od złożoności projektu, ale typowo trwa od 2 do 6 miesięcy. Stosujemy podejście iteracyjne, dostarczając wartość biznesową już po pierwszych tygodniach współpracy.",
  },
  {
    question: "Czy muszę przebudować całą infrastrukturę naraz?",
    answer:
      "Nie, oferujemy podejście stopniowe, które umożliwia migrację w etapach. Możemy zacząć od najbardziej krytycznych elementów i stopniowo modernizować pozostałe części systemu.",
  },
  {
    question: "Jakie są koszty takiego rozwiązania?",
    answer:
      "Koszty zależą od skali projektu i wybranych technologii, jednak nasze rozwiązania są projektowane z myślą o optymalizacji kosztów. Typowo klienci widzą zwrot z inwestycji w ciągu 6-12 miesięcy dzięki redukcji kosztów operacyjnych.",
  },
  {
    question: "Czy mój zespół będzie w stanie zarządzać taką architekturą?",
    answer:
      "Tak, zapewniamy kompleksowe szkolenia i dokumentację dla Twojego zespołu. Oferujemy również usługi wsparcia i utrzymania, które możesz dostosować do swoich potrzeb.",
  },
  {
    question:
      "Czy to rozwiązanie jest bezpieczne dla krytycznych danych biznesowych?",
    answer:
      "Bezpieczeństwo jest priorytetem w naszych rozwiązaniach. Stosujemy najlepsze praktyki branżowe, szyfrowanie, wielopoziomowe zabezpieczenia i regularnie audytujemy bezpieczeństwo infrastruktury.",
  },
];
