# DevOps & IT Architecture Portfolio

A modern, interactive portfolio showcasing DevOps and IT Architecture expertise, built with Next.js, Tailwind CSS, Framer Motion, and Three.js.

![Portfolio Preview](preview.png)

## 🌟 Features

- **Responsive Design**: Fully responsive and optimized for all devices from mobile to desktop
- **Interactive Elements**: Advanced animations and interactive components
- **Rich 3D Visualizations**: Interactive 3D visualizations for infrastructure and architecture
- **Dynamic Sections**: Animated sections for skills, timeline, projects, and services
- **Modern UI**: Contemporary design with micro-interactions and clean aesthetics
- **Performance Optimized**: Lazy-loading, code-splitting, and optimized assets for fast loading
- **Accessibility-Friendly**: ARIA-compliant and keyboard accessible
- **SEO-Ready**: Optimized meta tags and structured data for better discovery

## 🛠️ Technologies Used

- **Frontend Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **3D Visualization**: [Three.js](https://threejs.org/) / [@react-three/fiber](https://github.com/pmndrs/react-three-fiber)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Type Checking**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/devops-portfolio.git
   cd devops-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
.
├── components/                # All React components
│   ├── EnhancedUI.tsx         # Base UI components
│   ├── diagrams/              # Architecture diagrams
│   ├── home/                  # Home page components
│   │   ├── EnhancedHero.tsx    
│   │   ├── LoadingScreen.tsx   
│   ├── infra/                 # Infrastructure visualizations
│   ├── projects/              # Project showcase components
│   ├── services/              # Service cards components
│   ├── skills/                # Skills diagram components
│   ├── stats/                 # Statistics components
│   ├── timeline/              # Timeline components
│   └── contact/               # Contact form components
├── public/                    # Static assets (images, etc.)
├── app/                       # Next.js pages & routes
├── styles/                    # Global styles
├── lib/                       # Utility functions
├── types/                     # TypeScript type definitions
├── tailwind.config.js         # Tailwind CSS configuration
└── README.md                  # Project documentation
```

## 🧩 Components Overview

### Enhanced UI Base Components

The `EnhancedUI.tsx` file contains fundamental UI components used throughout the site:

- `EnhancedCursor`: Custom cursor that follows mouse position
- `SmoothScroll`: Smooth scrolling manager for a better UX
- `AnimatedSection`: Wrapper for sections with scroll-based animations
- `GradientText`: Text with animated gradient effects
- `TiltCard`: Card component with 3D tilt effect
- `ScrollProgress`: Progress indicator for page scrolling
- `RevealText`: Text that reveals as you scroll
- `AnimatedCounter`: Animated number counters for statistics
- `EnhancedButton`: Button with hover and click effects
- `ParallaxFloat`: Elements with parallax effect
- `SectionDivider`: Enhanced section divider
- `FloatingNav`: Floating navigation menu

### Key Interactive Components

- **EnhancedHero**: 3D interactive hero section
- **ArchitectureDiagram**: Interactive architecture visualization
- **ServiceCards**: Interactive service offerings
- **SkillsDiagram**: Interactive visualization of skills
- **StatisticsSection**: Animated metrics
- **EnhancedTimeline**: Timeline with flip effect
- **ProjectGallery**: Project showcase with detailed views
- **ContactForm**: Multi-step form with animations
- **LoadingScreen**: Initial loading animation

## 🎨 Customization

### Updating Content

Most content can be updated by modifying the data arrays in the component files:

- Services: Update the `serviceCategories` array in `ServiceCards.tsx`
- Skills: Update the `skills` array in `SkillsDiagram.tsx`
- Projects: Update the `projects` array in `ProjectGallery.tsx`
- Timeline: Update the `timelineEvents` array in `InteractiveTimeline.tsx`
- Statistics: Update the `statisticsData` array in `StatisticsSection.tsx`

### Styling

The project uses Tailwind CSS for styling. You can customize the look and feel by:

1. Modifying the `tailwind.config.js` file to change colors, fonts, etc.
2. Adding custom CSS in the `styles/` directory

### Adding New Sections

To add a new section:

1. Create a new component in the appropriate directory
2. Import and add it to the page component in `app/page.tsx`
3. Add the section to the `navItems` array in the enhanced page component

## 📱 Responsive Design

The portfolio is fully responsive with different layouts for:

- Mobile devices (< 640px)
- Tablets (640px - 1024px)
- Desktops (> 1024px)

Component behaviors, layouts, and animations are optimized for each screen size.

## ⚡ Performance Considerations

- **Dynamic Imports**: Heavy components are loaded with `dynamic` import
- **Lazy Loading**: Components outside viewport are not initially rendered
- **Reduced Animations**: Simpler animations on mobile and low-performance devices
- **Image Optimization**: Images are optimized and properly sized
- **Suspense & Loading States**: Fallback UI during component loading

## 🔍 SEO

The portfolio includes:

- Proper meta tags in the `app/layout.tsx` file
- Structured data for search engines
- Semantic HTML for better accessibility
- Page-specific metadata in each page component

## 🌐 Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

### Deployment Options

#### Vercel (Recommended)

The easiest way to deploy your Next.js app:

1. Push to a GitHub repository
2. Import the project in Vercel
3. Deploy

#### Other Options

- Netlify
- AWS Amplify
- Traditional hosting with Node.js

## 📈 Analytics Integration

To add analytics:

1. Create an account with your preferred analytics provider (e.g., Google Analytics, Plausible)
2. Add the tracking code to the `app/layout.tsx` file

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

If you have any questions or feedback, please reach out at [your.email@example.com](mailto:your.email@example.com).

---

Thank you for checking out my DevOps & IT Architecture Portfolio! I hope you find it useful and inspiring for your own projects.

# Landing Page Skeleton Structure

This document describes the structure and components of the landing page implementation with focus on Next.js 15 features like Partial Prerendering.

## Overview

The landing page is structured with the following key components:

1. **Static Sections** (Prerendered):
   - Hero Section
   - About Me Section
   - Services Section

2. **Dynamic Sections** (Loaded with Suspense and PPR):
   - Infrastructure Concept
   - Projects Section (with async data fetching)
   - Tech Stack Section
   - Testimonials Section (with async data fetching)
   - CTA (Call to Action) Section

## Files and Their Purpose

### 1. `page-skeleton.tsx`
A visual skeleton representation of the landing page with placeholder components showing the overall structure and layout. This is useful for visualizing the page structure before implementation.

### 2. `loading-states.tsx`
Contains loading state components for each section that are displayed while the actual content is loading. These components are used as fallbacks in Suspense boundaries.

### 3. `example-page-structure.tsx`
A practical example showing how to implement the landing page with proper Suspense boundaries and server components. Shows the structure with both static and dynamic sections.

## Implementation Details

### Smooth Scrolling
The page uses a `SmoothScroll` component to provide a smooth scrolling experience through the different sections.

### Partial Prerendering (PPR)
Next.js 15's PPR feature is used to:
- Statically render critical sections (Hero, About, Services)
- Dynamically load other sections on demand with Suspense
- Enable server components to fetch data asynchronously

### Data Fetching
The page demonstrates two approaches for data fetching:
- Server Components with async data fetching (Projects, Testimonials)
- Static content rendering

### SEO Optimization
The page includes:
- Proper metadata using `constructMetadata`
- Schema.org structured data using `generateHomeSchema`

## Usage

To implement the actual landing page:

1. Use the provided skeleton as a reference for the overall structure
2. Replace loading states with actual content components
3. Implement data fetching logic for dynamic sections
4. Customize styling and content according to design requirements

The structure can be extended with additional sections as needed while maintaining the performance benefits of Partial Prerendering.

## Zarządzanie projektami za pomocą MDX

Aplikacja używa plików MDX do zarządzania danymi projektów. To pozwala na łatwe dodawanie, edycję i usuwanie projektów bez konieczności modyfikacji kodu aplikacji.

### Struktura plików projektów

Pliki MDX z projektami znajdują się w katalogu `src/content/projects/`. Każdy projekt powinien mieć własny plik MDX (np. `projekt-nazwa.mdx`).

### Format pliku MDX projektu

Każdy plik MDX musi zawierać metadane w formacie YAML na początku (frontmatter) oraz opcjonalny fragment kodu poniżej.

Przykład:

```mdx
---
id: "nazwa-projektu"
title: "Tytuł projektu"
shortDesc: "Krótki opis projektu"
description: "Pełny opis projektu"
challenge: "Opis wyzwania"
solution: "Opis rozwiązania"
client: "Nazwa klienta"
timeline: "Czas trwania projektu"
role: "Rola w projekcie"
technologies:
  - "Technologia 1"
  - "Technologia 2"
features:
  - "Funkcjonalność 1"
  - "Funkcjonalność 2"
outcomes:
  - "Rezultat 1"
  - "Rezultat 2"
image: "/ścieżka/do/głównego/obrazu.jpg"
images:
  - "/ścieżka/do/obrazu1.jpg"
  - "/ścieżka/do/obrazu2.jpg"
color: "from-blue-500 to-indigo-600"
---

```jsx
// Tutaj możesz umieścić przykładowy kod związany z projektem
// Wszystko co znajduje się między ``` będzie interpretowane jako kod
// i automatycznie wyświetlone na stronie projektu

function MojKomponent() {
  return <div>Przykładowy kod</div>;
}
```

### Dodawanie nowego projektu

1. Utwórz nowy plik MDX w katalogu `src/content/projects/`
2. Dodaj wszystkie wymagane metadane w sekcji frontmatter
3. Opcjonalnie dodaj fragment kodu pod sekcją frontmatter
4. Zapisz plik z rozszerzeniem .mdx

Projekt automatycznie pojawi się na liście projektów i będzie dostępny pod adresem `/projekty/{id}`.

### Edycja projektu

Aby zmodyfikować istniejący projekt, wystarczy edytować odpowiedni plik MDX w katalogu `src/content/projects/`.

### Pola metadanych projektu

| Pole | Typ | Opis |
| ---- | --- | ---- |
| id | string | Unikalny identyfikator projektu (używany w URL) |
| title | string | Tytuł projektu |
| shortDesc | string | Krótki opis projektu |
| description | string | Pełny opis projektu |
| challenge | string | Opis wyzwania w projekcie |
| solution | string | Opis rozwiązania wdrożonego w projekcie |
| client | string | Nazwa klienta |
| timeline | string | Czas trwania projektu |
| role | string | Twoja rola w projekcie |
| technologies | string[] | Lista technologii użytych w projekcie |
| features | string[] | Lista funkcjonalności projektu |
| outcomes | string[] | Lista rezultatów projektu |
| image | string | Ścieżka do głównego obrazu projektu |
| images | string[] | Lista ścieżek do galerii obrazów projektu |
| color | string | Gradient tła (format Tailwind CSS) |