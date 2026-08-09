"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import Book from "./Book";

export default function TheDuo() {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>(0.3);

  return (
    <div
      ref={ref}
      className={`relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0c0b0a] px-[var(--space-lg)] py-[clamp(2rem,6vh,3.5rem)] md:px-[var(--space-xl)] ${
        isRevealed ? "duo-landing-in" : ""
      }`}
    >
      <div className="mx-auto flex w-full max-w-[var(--container-content)] flex-col items-center text-center">
        <span className="duo-landing-label text-sm font-medium uppercase tracking-[0.24em] text-[#A99783]">
          The Duo
        </span>

        <p className="mt-[var(--space-md)] flex max-w-[36ch] flex-col items-center text-[clamp(1.3rem,2.2vw+0.85rem,2.2rem)] font-semibold leading-[1.3] text-[#F4F3F0]">
          <span className="duo-slogan-line duo-slogan-line-1">
            Connected, but not confined.
          </span>
          <span className="duo-slogan-line duo-slogan-line-2">
            Together, but still free.
          </span>
        </p>

        <div className="mt-[clamp(2rem,6vh,4rem)]">
          <Book />
        </div>
      </div>
    </div>
  );
}
