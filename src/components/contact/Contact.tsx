"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CONTACT_ARTISTS } from "@/data/contact";
import ArtistContact from "./ArtistContact";

export default function Contact() {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>(0.25);

  return (
    <div
      ref={ref}
      className={`relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#08070a] px-[var(--space-lg)] py-[clamp(0.75rem,2vh,1.5rem)] md:px-[var(--space-xl)] ${
        isRevealed ? "contact-in" : ""
      }`}
    >
      <div className="mx-auto flex w-full max-w-[var(--container-content)] flex-col items-center text-center">
        <span className="contact-label text-sm font-medium uppercase tracking-[0.24em] text-[#A99783]">
          Contact
        </span>

        <h2 className="contact-statement mt-[var(--space-3xs)] text-[clamp(1.6rem,0.83vw+1.75rem,2.75rem)] font-semibold uppercase leading-[1.1] tracking-tight text-[#F4F3F0]">
          Let&rsquo;s Create
          <br />
          Something Together.
        </h2>

        <p className="contact-subtitle mt-[var(--space-2xs)] max-w-[38ch] text-base leading-relaxed text-[#A99783] md:text-lg">
          For performances, collaborations, presentations, and project inquiries.
        </p>
      </div>

      <div className="contact-artists mx-auto mt-[clamp(0.75rem,1.5vh,1.25rem)] grid w-full max-w-[760px] grid-cols-1 gap-x-[clamp(2rem,6vw,3.5rem)] gap-y-[clamp(2.25rem,7vh,3.25rem)] md:grid-cols-2">
        {CONTACT_ARTISTS.map((artist) => (
          <ArtistContact key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
}
