import { SectionDivider } from "@/components/ambro-ui/section-divider";

export function ProjectFooter() {
  return (
    <footer className="py-12 px-6 bg-black/50 backdrop-blur-md border-t border-gray-800/50">
      <div className="max-w-6xl mx-auto">
        <SectionDivider
          variant="tech"
          lineColor="from-transparent via-gray-800 to-transparent"
          dotColor="bg-indigo-500"
        />

        <div className="pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} DevOS. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
} 