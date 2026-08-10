"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { PerformancesDictionary } from "@/data/i18n";

export default function Performances({
  dict,
}: {
  dict: PerformancesDictionary;
}) {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>(0.3);

  return (
    <div
      ref={ref}
      className={`flex min-h-screen w-full flex-col items-center justify-center bg-[#08070a] px-[var(--space-lg)] text-center md:px-[var(--space-xl)] ${
        isRevealed ? "performances-in" : ""
      }`}
    >
      <span className="performances-label text-sm font-medium uppercase tracking-[0.24em] text-[#A99783]">
        {dict.eyebrow}
      </span>

      <h2 className="performances-statement mt-[var(--space-md)] text-[clamp(2.2rem,3.4vw+1.3rem,3.8rem)] font-semibold uppercase leading-[1.08] tracking-tight text-[#F4F3F0]">
        {dict.statement}
      </h2>

      <p className="performances-subtitle mt-[var(--space-md)] max-w-[34ch] text-sm text-[#8f8778] md:text-base">
        {dict.subtitle}
      </p>
    </div>
  );
}
