import Image from "next/image";
import { Fragment } from "react";
import type { HeroDictionary } from "@/data/i18n";

export default function Hero({ dict }: { dict: HeroDictionary }) {
  return (
    <div className="hero-in relative flex h-screen w-full flex-col overflow-hidden bg-black md:flex-row">
      <div className="relative z-10 flex w-full flex-1 flex-col justify-between px-[var(--space-lg)] pt-[6.5rem] pb-[var(--space-lg)] md:w-[42%] md:px-[var(--space-xl)] md:pt-[7.5rem] md:pb-[var(--space-2xl)]">
        <div className="flex flex-1 flex-col justify-center">
          <h1 className="hero-headline-in text-[clamp(2.5rem,4vw+1.25rem,4.5rem)] font-semibold uppercase leading-[1.05] tracking-tight text-[#F4F3F0]">
            {dict.headline.map((line, index) => (
              <Fragment key={index}>
                {index > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </h1>
          <p className="hero-subtitle-in mt-[var(--space-md)] max-w-[26ch] text-[1.75rem] leading-[1.35] tracking-normal text-[#A99783] md:text-[2rem]">
            {dict.subtitle.map((line, index) => (
              <Fragment key={index}>
                {index > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </p>
        </div>

        <div className="flex justify-start pb-[var(--space-sm)] md:pb-0">
          <span className="hero-arrow-in flex flex-col items-center gap-[var(--space-2xs)] text-[#A99783]">
            <svg
              width="18"
              height="26"
              viewBox="0 0 18 26"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 1L9 25L17 1"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>

      <div className="relative h-[55vh] w-full md:h-full md:w-[58%]">
        <div className="hero-portrait-in absolute inset-0">
          <Image
            src="/images/unbound-duo-hero.jpeg"
            alt="Unbound Piano Duo"
            fill
            priority
            sizes="(min-width: 768px) 58vw, 100vw"
            style={{ objectPosition: "38% 50%" }}
            className="object-cover"
          />
          <div className="hero-portrait-mask" />
        </div>
      </div>
    </div>
  );
}
