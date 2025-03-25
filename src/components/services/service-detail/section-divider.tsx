"use client";

import { SectionDivider } from "@/components/ambro-ui/section-divider";

interface SectionDividerComponentProps {
  primaryColor: string;
}

export default function SectionDividerComponent({
  primaryColor,
}: SectionDividerComponentProps) {
  return (
    <SectionDivider
      className="my-16"
      variant="tech"
      dotColor={`bg-${primaryColor}-500`}
    />
  );
}
