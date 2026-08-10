"use client";

import type { ClosedBookDictionary } from "@/data/i18n";

export default function ClosedBook({
  onOpen,
  dict,
}: {
  onOpen: () => void;
  dict: ClosedBookDictionary;
}) {
  return (
    <button
      type="button"
      aria-label={dict.openAriaLabel}
      onClick={onOpen}
      className="group relative flex flex-col items-center gap-[var(--space-md)] focus:outline-none"
    >
      <div className="flex justify-center [perspective:1600px]">
        <div className="duo-landing-book flex flex-col items-center">
          <div className="duo-book-tilt relative aspect-[3/4] w-[var(--book-w)]">
            <div className="duo-book-pages absolute inset-0 rounded-sm" aria-hidden="true" />
            <div className="duo-book-cover absolute inset-0 flex flex-col items-center justify-center gap-[var(--space-2xs)] rounded-sm">
              <span className="text-xl font-semibold uppercase tracking-[0.15em] text-[#F4F3F0] md:text-2xl">
                {dict.title}
              </span>
              <span className="text-xs uppercase tracking-[0.3em] text-[#A99783]">
                {dict.subtitle}
              </span>
            </div>
          </div>
          <div className="duo-book-shadow" aria-hidden="true" />
        </div>
      </div>

      <span className="duo-landing-control flex items-center gap-[var(--space-2xs)] text-sm font-medium uppercase tracking-[0.24em] text-[#A99783] transition-colors duration-[var(--duration-slow)] group-hover:text-[#F4F3F0]">
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" aria-hidden="true">
          <path
            d="M10 3.2C8.2 2 5.5 1.3 1 1V13.5C5.5 13.8 8.2 14.5 10 15.7"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 3.2C11.8 2 14.5 1.3 19 1V13.5C14.5 13.8 11.8 14.5 10 15.7"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {dict.openLabel}
      </span>
    </button>
  );
}
