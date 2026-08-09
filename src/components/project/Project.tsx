"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import FiveElementsRing from "./FiveElementsRing";

export default function Project() {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>(0.25);

  return (
    <div
      ref={ref}
      className={`relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-[#08070a] px-[var(--space-lg)] py-[clamp(3rem,8vh,5rem)] md:px-[var(--space-xl)] ${
        isRevealed ? "project-in" : ""
      }`}
    >
      <div className="mx-auto flex w-full max-w-[var(--container-content)] flex-1 flex-col items-center justify-center">
        <div className="flex w-full flex-col items-center text-center">
          <span className="project-label text-sm font-medium uppercase tracking-[0.28em] text-[#A99783]">
            Project 01
          </span>

          <h2 className="project-title mt-[var(--space-md)] text-[clamp(2.1rem,3.4vw+1.2rem,3.6rem)] font-semibold uppercase leading-[1.05] tracking-tight text-[#F4F3F0]">
            Five Elements
          </h2>

          <p className="project-subtitle mt-[var(--space-sm)] text-[1.05rem] italic tracking-wide text-[#A99783] md:text-[1.15rem]">
            A Journey for Four Hands
          </p>

          <p className="project-intro mt-[var(--space-xl)] max-w-[46ch] text-left text-[0.95rem] leading-[1.75] text-[#c9c3ba] md:text-[1rem]">
            Inspired by Wuxing (五行), the Chinese idea of five interacting
            phases, Five Elements transforms five musical works into
            interconnected worlds of sound, movement, color, and emotion.
            <br />
            <br />
            Moving from Metal through Water, Wood, Fire, and Earth, the
            program brings music connected with Korea, China, France,
            Argentina, and Germany into a continuously evolving journey for
            piano four hands.
          </p>

          <div className="project-invite mt-[var(--space-2xl)] flex items-center gap-[var(--space-sm)] text-xs font-medium uppercase tracking-[0.28em] text-[#A99783]">
            <span aria-hidden="true" className="h-px w-8 bg-[#A99783]/40" />
            Explore the Five Elements
            <span aria-hidden="true" className="h-px w-8 bg-[#A99783]/40" />
          </div>
        </div>

        <div className="project-ring-wrap mt-[clamp(2.5rem,7vh,4.5rem)] w-full">
          <FiveElementsRing />
        </div>
      </div>
    </div>
  );
}
