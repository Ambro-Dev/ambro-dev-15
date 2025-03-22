"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Optimize imports with better loading states and chunking logic
const SectionHeading = dynamic(
  () =>
    import("@/components/ambro-ui/section-heading").then(
      (mod) => mod.SectionHeading
    ),
  {
    ssr: true,
    loading: () => (
      <div className="h-12 bg-gray-800/20 w-64 rounded animate-pulse" />
    ),
  }
);

const RevealText = dynamic(
  () =>
    import("@/components/ambro-ui/reveal-text").then((mod) => mod.RevealText),
  {
    ssr: true,
  }
);

const AnimatedSection = dynamic(
  () =>
    import("@/components/ambro-ui/animated-section").then(
      (mod) => mod.AnimatedSection
    ),
  {
    ssr: true,
  }
);

const EnhancedButton = dynamic(
  () =>
    import("@/components/ambro-ui/enhanced-button").then(
      (mod) => mod.EnhancedButton
    ),
  {
    ssr: true,
  }
);

const AnimatedGradientBorder = dynamic(
  () =>
    import("@/components/ambro-ui/animated-gradient-border").then(
      (mod) => mod.AnimatedGradientBorder
    ),
  {
    ssr: true,
  }
);

// Formularz kontaktowy z walidacją
const FormularzKontaktowy = () => {
  const [formState, setFormState] = useState({
    imie: "",
    email: "",
    temat: "",
    wiadomosc: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Walidacja formularza
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formState.imie.trim()) {
      newErrors.imie = "Imię jest wymagane";
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email jest wymagany";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "Podaj prawidłowy adres email";
    }

    if (!formState.temat) {
      newErrors.temat = "Wybierz temat wiadomości";
    }

    if (!formState.wiadomosc.trim()) {
      newErrors.wiadomosc = "Wiadomość jest wymagana";
    } else if (formState.wiadomosc.length < 10) {
      newErrors.wiadomosc = "Wiadomość powinna zawierać co najmniej 10 znaków";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    // Usuwanie błędu po wprowadzeniu zmian
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      // Symulacja wysyłania formularza (w rzeczywistym projekcie byłoby API)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Analityka konwersji
      if (typeof window !== "undefined" && "gtag" in window) {
        window.gtag("event", "form_submission", {
          event_category: "contact",
          event_label: formState.temat,
        });
      }

      // Resetowanie formularza po pomyślnym wysłaniu
      setSubmitted(true);
      setFormState({
        imie: "",
        email: "",
        temat: "",
        wiadomosc: "",
      });
    } catch {
      setError(
        "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.18)] h-full overflow-hidden transition-all duration-500 group-hover:translate-y-[-5px] group-hover:shadow-[0_20px_40px_rgba(80,40,200,0.1)]">
      <div className="p-6 md:p-8 relative h-full">
        {/* Dynamic gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/[0.07] to-purple-600/[0.03] opacity-50 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>

        {/* Light beam effect on hover */}
        <div className="absolute -inset-1/2 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent rotate-45 transform translate-x-[-120%] group-hover:translate-x-[120%] transition-all duration-1000 ease-in-out"></div>

        <div className="relative">
          <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
            Napisz do mnie
          </h3>

          {submitted ? (
            <div
              className="text-center py-10 space-y-4"
              role="alert"
              aria-live="assertive"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full mx-auto flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <title>Wiadomość wysłana</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-medium text-white">
                Wiadomość wysłana!
              </h4>
              <p className="text-gray-300 max-w-md mx-auto">
                Dziękuję za kontakt. Odpowiem na Twoją wiadomość najszybciej jak
                to możliwe.
              </p>
              <EnhancedButton
                variant="ghost"
                size="md"
                onClick={() => setSubmitted(false)}
                glowOnHover
                borderGradient
              >
                Wyślij kolejną wiadomość
              </EnhancedButton>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label
                    htmlFor="imie"
                    className="block text-sm font-medium text-gray-200 mb-1"
                  >
                    Imię i nazwisko <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="imie"
                    name="imie"
                    value={formState.imie}
                    onChange={handleChange}
                    aria-invalid={!!errors.imie}
                    aria-describedby={errors.imie ? "imie-error" : undefined}
                    className={`w-full px-4 py-3 bg-white/[0.03] backdrop-blur-sm border ${
                      errors.imie ? "border-red-500" : "border-white/[0.08]"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-white`}
                    placeholder="Twoje imię"
                    required
                  />
                  {errors.imie && (
                    <p id="imie-error" className="mt-1 text-sm text-red-400">
                      {errors.imie}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-200 mb-1"
                  >
                    Email <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`w-full px-4 py-3 bg-white/[0.03] backdrop-blur-sm border ${
                      errors.email ? "border-red-500" : "border-white/[0.08]"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-white`}
                    placeholder="twoj@email.com"
                    required
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="temat"
                  className="block text-sm font-medium text-gray-200 mb-1"
                >
                  Temat <span className="text-pink-500">*</span>
                </label>
                <select
                  id="temat"
                  name="temat"
                  value={formState.temat}
                  onChange={handleChange}
                  aria-invalid={!!errors.temat}
                  aria-describedby={errors.temat ? "temat-error" : undefined}
                  className={`w-full px-4 py-3 bg-white/[0.03] backdrop-blur-sm border ${
                    errors.temat ? "border-red-500" : "border-white/[0.08]"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none transition-all duration-200 text-white`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    backgroundSize: "1rem",
                  }}
                  required
                >
                  <option value="">Wybierz temat</option>
                  <option value="projekt-strony">
                    Projekt strony internetowej
                  </option>
                  <option value="aplikacja-web">Aplikacja webowa</option>
                  <option value="sklep-internetowy">Sklep internetowy</option>
                  <option value="hosting">Hosting i utrzymanie</option>
                  <option value="inne">Inne</option>
                </select>
                {errors.temat && (
                  <p id="temat-error" className="mt-1 text-sm text-red-400">
                    {errors.temat}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="wiadomosc"
                  className="block text-sm font-medium text-gray-200 mb-1"
                >
                  Wiadomość <span className="text-pink-500">*</span>
                </label>
                <textarea
                  id="wiadomosc"
                  name="wiadomosc"
                  rows={5}
                  value={formState.wiadomosc}
                  onChange={handleChange}
                  aria-invalid={!!errors.wiadomosc}
                  aria-describedby={
                    errors.wiadomosc ? "wiadomosc-error" : undefined
                  }
                  className={`w-full px-4 py-3 bg-white/[0.03] backdrop-blur-sm border ${
                    errors.wiadomosc ? "border-red-500" : "border-white/[0.08]"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all duration-200 text-white`}
                  placeholder="Opisz swój projekt lub zadaj pytanie..."
                  required
                ></textarea>
                {errors.wiadomosc && (
                  <p id="wiadomosc-error" className="mt-1 text-sm text-red-400">
                    {errors.wiadomosc}
                  </p>
                )}
              </div>

              {error && (
                <div
                  className="bg-red-500/20 border border-red-500 text-white px-4 py-3 rounded-lg"
                  role="alert"
                >
                  <p>{error}</p>
                </div>
              )}

              <div className="pt-2">
                <EnhancedButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={submitting}
                  loadingText="Wysyłanie..."
                  magneticEffect
                  glowOnHover
                  glowColor="rgba(99, 102, 241, 0.6)"
                  borderGradient
                  animatedBg
                  shadow="lg"
                  rippleEffect
                >
                  Wyślij wiadomość
                </EnhancedButton>
                <p className="text-xs text-gray-400 mt-3 text-center">
                  * Pola oznaczone gwiazdką są wymagane
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// FAQ z "lazy loading" i intersection observer
const FAQ = () => {
  const faqItems = [
    {
      pytanie: "Jaki jest typowy czas realizacji projektu?",
      odpowiedz:
        "Czas realizacji zależy od złożoności projektu. Małe projekty mogą trwać od 2 do 4 tygodni, podczas gdy większe, bardziej złożone projekty mogą wymagać 3-6 miesięcy. Na początku współpracy zawsze ustalam realistyczny harmonogram z uwzględnieniem Twoich potrzeb biznesowych.",
    },
    {
      pytanie: "Jakie technologie wykorzystujesz w projektach?",
      odpowiedz:
        "Pracuję z nowoczesnymi technologiami webowymi jak React, Next.js, TypeScript, Node.js, a także platformami chmury AWS, Azure i Google Cloud. Stosuję zawsze najlepsze narzędzia dostosowane do konkretnych wymagań projektu, aby zapewnić wysoką wydajność, bezpieczeństwo i skalowalność.",
    },
    {
      pytanie: "Czy zajmujesz się również hostingiem i utrzymaniem strony?",
      odpowiedz:
        "Tak, oferuję kompleksową obsługę, w tym hosting, utrzymanie, monitorowanie i wsparcie techniczne. Wszystkie moje rozwiązania są zoptymalizowane pod kątem wydajności, bezpieczeństwa i skalowalności, a wsparcie techniczne jest dostępne, aby zapewnić ciągłość działania.",
    },
    {
      pytanie: "Jak wygląda proces współpracy i komunikacji?",
      odpowiedz:
        "Proces współpracy obejmuje: (1) rozmowę wstępną o Twoich potrzebach, (2) przygotowanie propozycji i wyceny, (3) projektowanie i rozwój z regularnymi konsultacjami, (4) testy i wdrożenie, (5) wsparcie po uruchomieniu. Komunikacja odbywa się poprzez wybrane narzędzia, takie jak e-mail, telefon, Slack lub regularne spotkania online.",
    },
    {
      pytanie: "Co jeśli mam już istniejącą stronę/aplikację?",
      odpowiedz:
        "Mogę pomóc w modernizacji, rozbudowie lub przeprojektowaniu istniejących rozwiązań. Zacznę od analizy obecnego systemu, zidentyfikuję obszary wymagające poprawy i zaproponuję strategię rozwoju. Moje podejście pozwala na płynne przejście bez zakłóceń w działaniu.",
    },
  ];

  // Render the FAQ section
  return (
    <div className="mt-12 grid md:grid-cols-2 gap-6">
      {faqItems.map((item, index) => (
        <FAQItem key={index} item={item} index={index} />
      ))}
    </div>
  );
};

// Komponent mapy z interaktywnym tłem
const MapSection = () => {
  return (
    <section className="relative py-16 px-6 bg-gradient-to-b from-gray-900/80 to-black">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection animation="fadeIn">
          <SectionHeading
            title="Lokalizacja"
            subtitle="Znajdź mnie na mapie"
            alignment="center"
            size="lg"
            gradient
            animation="fade"
          />
        </AnimatedSection>

        <AnimatedSection animation="slideUp" delay={0.3} className="mt-12">
          <AnimatedGradientBorder
            borderWidth={1}
            borderColor="from-indigo-500 via-purple-500 to-pink-500"
            glowEffect
            glowIntensity={4}
            animated
            backgroundColor="bg-gray-900/20"
            rounded="rounded-xl"
          >
            <div className="w-full h-[400px] rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-black/40 pointer-events-none"></div>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d156388.3543039077!2d20.92111271091795!3d52.233033664297624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc669a869f01%3A0x72f0be2a88ead3fc!2sWarszawa!5e0!3m2!1spl!2spl!4v1684507839612!5m2!1spl!2spl"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa lokalizacji"
                className="grayscale contrast-125 brightness-75"
              ></iframe>
            </div>
          </AnimatedGradientBorder>
        </AnimatedSection>
      </div>
    </section>
  );
};

// Komponent danych kontaktowych z opóźnionym ładowaniem ikon
const ContactInfo = () => {
  const contactMethodsData = [
    {
      icon: "email",
      title: "Email",
      content: "kontakt@ambro.dev",
      link: "mailto:kontakt@ambro.dev",
    },
    {
      icon: "phone",
      title: "Telefon",
      content: "+48 123 456 789",
      link: "tel:+48123456789",
    },
    {
      icon: "location",
      title: "Lokalizacja",
      content: "Warszawa, Polska",
      link: "https://goo.gl/maps/1X1X1X1X1X1X1X1X1",
    },
    {
      icon: "availability",
      title: "Dostępność",
      content: "Pon-Pt, 9:00 - 17:00",
      link: null,
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/ambro-dev",
      icon: <i className="fab fa-github" aria-hidden="true"></i>,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/ambro-dev/",
      icon: <i className="fab fa-linkedin" aria-hidden="true"></i>,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/ambro_dev",
      icon: <i className="fab fa-twitter" aria-hidden="true"></i>,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/ambro.dev/",
      icon: <i className="fab fa-instagram" aria-hidden="true"></i>,
    },
  ];

  return (
    <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 rounded-2xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.18)] h-full transition-all duration-500">
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 mb-4">
            Kontakt bezpośredni
          </h3>
          <p className="text-gray-300">
            Odpowiadam na wiadomości w ciągu 24 godzin w dni robocze. Wybierz
            preferowaną metodę kontaktu.
          </p>
        </div>

        <div className="space-y-5">
          {contactMethodsData.map((method) => (
            <div
              key={method.icon}
              className="group backdrop-blur-md bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] rounded-xl overflow-hidden transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_8px_20px_rgba(99,102,241,0.18)]"
            >
              <div className="p-5 flex items-start gap-4 relative">
                {/* Custom gradient per item */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-500/10 opacity-20 group-hover:opacity-40 transition-opacity duration-300 rounded-xl"></div>

                {/* Enhanced icon container */}
                <div className="relative shrink-0 text-xl bg-white/[0.03] p-3 rounded-lg backdrop-blur-sm flex items-center justify-center w-12 h-12 border border-white/[0.06] shadow-inner group-hover:scale-110 transition-transform duration-300">
                  <span className="group-hover:animate-pulse">
                    {method.icon === "email" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                    {method.icon === "phone" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    )}
                    {method.icon === "location" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                    {method.icon === "availability" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                  </span>
                </div>

                <div className="relative">
                  <h4 className="font-semibold text-base mb-1.5 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-indigo-200 to-purple-200 transition-all duration-300">
                    {method.title}
                  </h4>
                  <p className="text-gray-300/90 text-sm leading-relaxed">
                    {method.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.08] pt-6">
          <h4 className="font-medium mb-4 text-gray-300">
            Znajdź mnie w sieci
          </h4>
          <div className="flex space-x-5">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                className="group w-10 h-10 bg-white/[0.03] rounded-lg flex items-center justify-center hover:bg-indigo-500/20 transition-all duration-300 hover:-translate-y-1"
                aria-label={social.name}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="sr-only">{social.name}</span>
                {social.name === "GitHub" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                  >
                    <path
                      fill="currentColor"
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    />
                  </svg>
                )}
                {social.name === "LinkedIn" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                  >
                    <path
                      fill="currentColor"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    />
                  </svg>
                )}
                {social.name === "Twitter" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                  >
                    <path
                      fill="currentColor"
                      d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                    />
                  </svg>
                )}
                {social.name === "Instagram" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                  >
                    <path
                      fill="currentColor"
                      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                    />
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Główny komponent strony
export default function ContactPageContent() {
  // Track mouse position for parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const { left, top, width, height } =
          sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main
      ref={sectionRef}
      className="min-h-screen  text-white relative overflow-hidden"
    >
      {/* Subtle grid background */}
      <div className="fixed inset-0 w-full h-full bg-grid-pattern opacity-3 pointer-events-none" />

      {/* Background Effects */}
      <div className="absolute inset-0  z-0">
        {/* Noise texture for added depth */}

        {/* Animated gradient orbs with parallax effect */}
        <div
          className="absolute -top-40 -left-40 w-[28rem] h-[28rem] bg-indigo-500/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${
              mousePosition.y * 20
            }px)`,
            transition: "transform 2s cubic-bezier(0.075, 0.82, 0.165, 1)",
          }}
        ></div>
        <div
          className="absolute top-1/3 -right-40 w-[38rem] h-[38rem] bg-purple-500/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * -30}px, ${
              mousePosition.y * 30
            }px)`,
            transition: "transform 2.5s cubic-bezier(0.075, 0.82, 0.165, 1)",
          }}
        ></div>
        <div
          className="absolute bottom-0 left-1/3 w-[32rem] h-[32rem] bg-pink-500/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 25}px, ${
              mousePosition.y * -25
            }px)`,
            transition: "transform 2.2s cubic-bezier(0.075, 0.82, 0.165, 1)",
          }}
        ></div>
      </div>

      {/* Header Section - Direct load */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fadeIn">
            <div className="text-center mb-16">
              <Link href="/">
                <EnhancedButton
                  variant="ghost"
                  size="sm"
                  className="mb-8"
                  glowOnHover
                  borderGradient
                >
                  ← Powrót do strony głównej
                </EnhancedButton>
              </Link>

              <SectionHeading
                title="Kontakt"
                subtitle="Rozpocznijmy współpracę nad Twoim projektem"
                alignment="center"
                size="xl"
                gradient
                animation="slide"
              />

              <div className="max-w-2xl mx-auto mt-6 text-gray-300">
                <RevealText delay={0.3}>
                  Masz pomysł na projekt lub pytanie? Jestem tutaj, aby pomóc.
                  Wypełnij formularz lub skorzystaj z preferowanej metody
                  kontaktu.
                </RevealText>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Info & Form - Preload critical sections */}
          <div className="grid md:grid-cols-5 gap-8">
            <AnimatedSection
              animation="slideLeft"
              delay={0.3}
              className="md:col-span-2"
            >
              <ContactInfo />
            </AnimatedSection>

            <AnimatedSection
              animation="slideRight"
              delay={0.4}
              className="md:col-span-3"
            >
              <FormularzKontaktowy />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ Section - Use loadable component */}
      <section className="py-24 px-6 bg-gradient-to-b from-black to-gray-900/80 backdrop-blur-sm content-visibility-auto">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fadeIn">
            <SectionHeading
              title="Często zadawane pytania"
              subtitle="Odpowiedzi na najczęściej zadawane pytania"
              alignment="center"
              size="lg"
              gradient
              animation="fade"
            />
          </AnimatedSection>

          <FAQ />
        </div>
      </section>

      {/* Map Section - Low priority, defer loading */}
      <MapSection />

      {/* CSS for grid pattern */}
      <style jsx global>{`
        .bg-grid-pattern {
          background-image: linear-gradient(
              rgba(99, 102, 241, 0.02) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(99, 102, 241, 0.02) 1px,
              transparent 1px
            );
          background-size: 50px 50px;
        }
      `}</style>
    </main>
  );
}

const FAQItem = ({
  item,
  index,
}: {
  item: { pytanie: string; odpowiedz: string };
  index: number;
}) => {
  // Move the useInView hook to the top level of this component
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div ref={ref}>
      {inView && (
        <AnimatedSection animation="slideUp" delay={0.1 * index}>
          <div className="group backdrop-blur-md bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] rounded-xl overflow-hidden transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_8px_20px_rgba(99,102,241,0.18)]">
            <button
              onClick={toggleOpen}
              className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-xl transition-all relative"
              aria-expanded={isOpen}
            >
              {/* Custom gradient per item */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-500/10 opacity-20 group-hover:opacity-40 transition-opacity duration-300 rounded-xl"></div>

              <div className="relative flex justify-between items-center">
                <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-indigo-200 to-purple-200 transition-all duration-300">
                  {item.pytanie}
                </h3>
                <span className="ml-4 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    } text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-indigo-200 to-purple-200`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </div>

              <motion.div
                initial={false}
                animate={{
                  height: isOpen ? "auto" : 0,
                  opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {isOpen && (
                  <p className="mt-4 text-gray-300/90 leading-relaxed">
                    {item.odpowiedz}
                  </p>
                )}
              </motion.div>
            </button>
          </div>
        </AnimatedSection>
      )}
    </div>
  );
};
