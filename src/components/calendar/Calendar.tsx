"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { calendar } from "@/data/calendar";
import {
  formatAbbreviatedDate,
  formatFullDate,
  getCityStateAbbreviated,
  getNextUpcomingPerformance,
  getYearRange,
  sortPerformancesByDate,
} from "@/lib/calendar";
import type { CalendarDictionary } from "@/data/i18n";

export default function Calendar({ dict }: { dict: CalendarDictionary }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const stops = sortPerformancesByDate(calendar);
  const nextStop = getNextUpcomingPerformance(stops) ?? stops[0];
  const activeStop = stops.find((stop) => stop.date === hoveredDate) ?? nextStop;
  const yearRange = getYearRange(stops);
  const isShowingNextStop = activeStop?.date === nextStop?.date;

  return (
    <div
      ref={sectionRef}
      className={`relative w-full overflow-hidden bg-[#0c0b0a] px-[var(--space-lg)] pt-[clamp(1.25rem,4vh,2.25rem)] pb-[clamp(1.875rem,5vh,3rem)] md:px-[var(--space-xl)] ${
        isInView ? "cal-in-view" : ""
      }`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black to-transparent" />

      <div className="relative mx-auto flex max-w-[var(--container-content)] flex-col">
        <div className="cal-title-in flex flex-col items-start justify-between gap-[var(--space-md)] md:flex-row md:items-end">
          <div>
            <h2 className="text-[clamp(2.25rem,3.5vw+1rem,3.75rem)] font-semibold uppercase leading-[1.05] tracking-tight text-[#F4F3F0]">
              {dict.title}
            </h2>
            <p className="mt-[var(--space-2xs)] text-sm font-medium uppercase tracking-[0.24em] text-[#A99783]">
              {dict.eyebrow}
            </p>
          </div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#6B6862]">
            {yearRange}
          </p>
        </div>

        {activeStop && (
          <div className="cal-next-in mt-[clamp(1rem,3vh,1.75rem)] md:grid md:grid-cols-12 md:items-center md:gap-[var(--space-2xl)]">
            <div className="max-w-[46ch] md:col-span-5">
              <span className="text-sm font-medium uppercase tracking-[0.24em] text-[#A99783]">
                {isShowingNextStop
                  ? dict.nextStopLabel
                  : formatAbbreviatedDate(activeStop.date)}
              </span>
              <h3 className="mt-[var(--space-2xs)] text-[clamp(1.75rem,2.5vw+1rem,2.75rem)] font-semibold leading-[1.1] text-[#F4F3F0]">
                {activeStop.venue}
              </h3>
              <p className="mt-[var(--space-2xs)] text-base leading-relaxed text-[#9C9892]">
                {formatFullDate(activeStop.date)} &middot; {activeStop.city}
                {activeStop.time !== "TBA" ? ` · ${activeStop.time}` : ""}
              </p>
            </div>

            <div className="relative mt-[var(--space-md)] aspect-[4/3] w-full overflow-hidden md:col-span-6 md:mt-0 md:aspect-[16/11]">
              {stops.map((stop) => (
                <Image
                  key={stop.date}
                  src={stop.image}
                  alt={stop.venue}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  priority={stop.date === nextStop?.date}
                  className={`object-cover transition-opacity duration-500 ease-[var(--ease-standard)] ${
                    stop.date === activeStop.date ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          </div>
        )}

        <div className="mt-[clamp(1.25rem,4vh,2.25rem)]">
          {/* Desktop / tablet — horizontal journey */}
          <div
            className="relative hidden md:block"
            onMouseLeave={() => setHoveredDate(null)}
          >
            <div className="cal-line absolute left-0 right-0 top-[7px] h-px origin-left bg-[#3A3630]" />
            <ol className="relative grid grid-cols-4 gap-[var(--space-md)]">
              {stops.map((stop, index) => {
                const isActive = stop.date === activeStop?.date;
                return (
                  <li
                    key={stop.date}
                    className="cal-marker flex flex-col items-start"
                    style={{ animationDelay: `${0.6 + index * 0.25}s` }}
                    onMouseEnter={() => setHoveredDate(stop.date)}
                  >
                    <span
                      className={`block h-[15px] w-[15px] rounded-full border transition-colors duration-[var(--duration-slow)] ${
                        isActive
                          ? "border-[#A99783] bg-[#A99783]"
                          : "border-[#57534c] bg-[#0c0b0a]"
                      }`}
                      aria-hidden="true"
                    />
                    <span
                      className={`mt-[var(--space-sm)] text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-[var(--duration-slow)] ${
                        isActive ? "text-[#A99783]" : "text-[#6B6862]"
                      }`}
                    >
                      {formatAbbreviatedDate(stop.date)}
                    </span>
                    <span
                      className={`mt-[var(--space-3xs)] text-sm transition-colors duration-[var(--duration-slow)] ${
                        isActive ? "text-[#F4F3F0]" : "text-[#9C9892]"
                      }`}
                    >
                      {getCityStateAbbreviated(stop.city)}
                    </span>
                    <span className="mt-[var(--space-3xs)] text-xs text-[#6B6862]">
                      {stop.venue}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Mobile — vertical journey */}
          <ol className="relative flex flex-col gap-[var(--space-lg)] md:hidden">
            <div className="cal-line-vertical absolute bottom-0 left-[7px] top-0 w-px origin-top bg-[#3A3630]" />
            {stops.map((stop, index) => {
              const isNext = stop.date === nextStop?.date;
              return (
                <li
                  key={stop.date}
                  className="cal-marker relative flex items-start gap-[var(--space-sm)] pl-[var(--space-lg)]"
                  style={{ animationDelay: `${0.6 + index * 0.25}s` }}
                >
                  <span
                    className={`absolute left-0 top-[4px] block h-[15px] w-[15px] rounded-full border ${
                      isNext
                        ? "border-[#A99783] bg-[#A99783]"
                        : "border-[#57534c] bg-[#0c0b0a]"
                    }`}
                    aria-hidden="true"
                  />
                  <div>
                    <span
                      className={`block text-[11px] font-medium uppercase tracking-[0.18em] ${
                        isNext ? "text-[#A99783]" : "text-[#6B6862]"
                      }`}
                    >
                      {formatAbbreviatedDate(stop.date)}
                    </span>
                    <span
                      className={`mt-[var(--space-3xs)] block text-sm ${
                        isNext ? "text-[#F4F3F0]" : "text-[#9C9892]"
                      }`}
                    >
                      {getCityStateAbbreviated(stop.city)} — {stop.venue}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
