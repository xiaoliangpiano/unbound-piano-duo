"use client";

import { useEffect, useRef, useState } from "react";
import { duoSpreads } from "@/data/duo";
import Page from "./Page";
import Spread01Visual from "./Spread01Visual";
import CenterBridgeImage from "./CenterBridgeImage";
import Spread06Voices from "./Spread06Voices";

interface TurnState {
  dir: 1 | -1;
  from: number;
  to: number;
  angle: number;
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// Subtle, spread-specific vertical variation so left pages don't all
// center identically — bookends the reading experience.
function leftPageJustify(index: number): "center" | "start" {
  return index === 0 || index === 3 || index === 5 ? "start" : "center";
}

// Spread 04 anchors its right page toward the bottom so the center
// bridge image has room to sit in the middle of the spread. Spread 06
// anchors to the top, leaving open space below for the voice lines.
function rightPageJustify(index: number): "center" | "end" | "start" {
  return index === 3 ? "end" : index === 5 ? "start" : "center";
}

// Spread 04 also shifts its right-page text toward the outer edge of
// the page, away from the gutter, to balance the centered bridge image.
function rightContentAlign(index: number): "start" | "end" {
  return index === 3 ? "end" : "start";
}

export default function OpenBook({ onClose }: { onClose: () => void }) {
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [turn, setTurn] = useState<TurnState | null>(null);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 768px)").matches
      : false
  );
  const touchStartX = useRef<number | null>(null);

  const total = duoSpreads.length;
  const canPrev = spreadIndex > 0 && !turn;
  const canNext = spreadIndex < total - 1 && !turn;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  function goNext() {
    if (turn || spreadIndex >= total - 1) return;
    const to = spreadIndex + 1;
    if (!isDesktop || prefersReducedMotion()) {
      setSpreadIndex(to);
      return;
    }
    setTurn({ dir: 1, from: spreadIndex, to, angle: 0 });
  }

  function goPrev() {
    if (turn || spreadIndex <= 0) return;
    const to = spreadIndex - 1;
    if (!isDesktop || prefersReducedMotion()) {
      setSpreadIndex(to);
      return;
    }
    setTurn({ dir: -1, from: spreadIndex, to, angle: 0 });
  }

  useEffect(() => {
    if (!turn || turn.angle !== 0) return;
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTurn((current) =>
          current ? { ...current, angle: current.dir === 1 ? -180 : 180 } : current
        );
      });
    });
    return () => cancelAnimationFrame(raf1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn?.from, turn?.to]);

  function handleTurnEnd() {
    if (!turn) return;
    setSpreadIndex(turn.to);
    setTurn(null);
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spreadIndex, turn, isDesktop]);

  function handleTouchStart(event: React.TouchEvent) {
    touchStartX.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) goNext();
    else goPrev();
  }

  const current = duoSpreads[spreadIndex];

  let leftSpread = current;
  let rightSpread = current;
  let leftIndex = spreadIndex;
  let rightIndex = spreadIndex;
  if (turn) {
    if (turn.dir === 1) {
      leftSpread = duoSpreads[turn.from];
      rightSpread = duoSpreads[turn.to];
      leftIndex = turn.from;
      rightIndex = turn.to;
    } else {
      leftSpread = duoSpreads[turn.to];
      rightSpread = duoSpreads[turn.from];
      leftIndex = turn.to;
      rightIndex = turn.from;
    }
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-[var(--space-lg)] px-[var(--space-lg)] py-[var(--space-lg)]">
      {/* Desktop — two-page spread with real page-turn */}
      <div
        className="relative hidden w-full max-w-[1000px] justify-center [perspective:2400px] md:flex"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="duo-open-book relative flex aspect-[16/10] w-full">
          <div className="duo-open-edge duo-open-edge-left" aria-hidden="true" />
          <div className="duo-open-edge duo-open-edge-right" aria-hidden="true" />

          <button
            type="button"
            aria-label="Previous page"
            disabled={!canPrev}
            onClick={goPrev}
            className="duo-open-page relative w-1/2 rounded-l-sm disabled:cursor-default"
          >
            <Page
              number={leftSpread.number}
              title={leftSpread.title}
              blocks={leftSpread.left}
              showHeading
              justify={leftPageJustify(leftIndex)}
              headingRevealClass={
                leftIndex === 4
                  ? "duo-s05-heading"
                  : leftIndex === 5
                    ? "duo-s06-heading"
                    : undefined
              }
              background={leftIndex === 0 ? <Spread01Visual /> : undefined}
            />
          </button>

          <div className="duo-open-spine" aria-hidden="true" />

          <button
            type="button"
            aria-label="Next page"
            disabled={!canNext}
            onClick={goNext}
            className="duo-open-page relative w-1/2 rounded-r-sm disabled:cursor-default"
          >
            <Page
              blocks={rightSpread.right}
              justify={rightPageJustify(rightIndex)}
              contentAlign={rightContentAlign(rightIndex)}
            />
          </button>

          {!turn && current.centerImage && (
            <div className="pointer-events-none absolute inset-x-[31%] top-[20%] z-[6]">
              <CenterBridgeImage
                src={current.centerImage.src}
                aspect={current.centerImage.aspect}
                objectPosition={current.centerImage.objectPosition}
                className="w-full"
              />
            </div>
          )}

          {!turn && spreadIndex === 5 && <Spread06Voices />}

          {turn && (
            <div
              className={`duo-flip-page absolute inset-y-0 ${
                turn.dir === 1 ? "left-1/2 w-1/2 origin-left" : "left-0 w-1/2 origin-right"
              }`}
              style={{ transform: `rotateY(${turn.angle}deg)` }}
              onTransitionEnd={(event) => {
                if (event.propertyName === "transform") handleTurnEnd();
              }}
            >
              <div className="duo-flip-face duo-flip-face-front">
                <Page
                  number={turn.dir === -1 ? duoSpreads[turn.from].number : undefined}
                  title={turn.dir === -1 ? duoSpreads[turn.from].title : undefined}
                  blocks={
                    turn.dir === 1
                      ? duoSpreads[turn.from].right
                      : duoSpreads[turn.from].left
                  }
                  showHeading={turn.dir === -1}
                  justify={
                    turn.dir === -1
                      ? leftPageJustify(turn.from)
                      : rightPageJustify(turn.from)
                  }
                  contentAlign={
                    turn.dir === 1 ? rightContentAlign(turn.from) : "start"
                  }
                />
              </div>
              <div className="duo-flip-face duo-flip-face-back">
                <Page
                  number={turn.dir === 1 ? duoSpreads[turn.to].number : undefined}
                  title={turn.dir === 1 ? duoSpreads[turn.to].title : undefined}
                  blocks={
                    turn.dir === 1
                      ? duoSpreads[turn.to].left
                      : duoSpreads[turn.to].right
                  }
                  showHeading={turn.dir === 1}
                  justify={
                    turn.dir === 1
                      ? leftPageJustify(turn.to)
                      : rightPageJustify(turn.to)
                  }
                  contentAlign={
                    turn.dir === -1 ? rightContentAlign(turn.to) : "start"
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile — single stacked spread with simplified transition */}
      <div
        className="relative flex w-full max-w-[480px] flex-1 flex-col overflow-hidden md:hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          key={spreadIndex}
          className="duo-mobile-page flex flex-1 flex-col overflow-y-auto"
        >
          <div className="shrink-0">
            <Page
              number={current.number}
              title={current.title}
              blocks={current.left}
              showHeading
              justify={leftPageJustify(spreadIndex)}
              headingRevealClass={
                spreadIndex === 4
                  ? "duo-s05-heading"
                  : spreadIndex === 5
                    ? "duo-s06-heading"
                    : undefined
              }
              background={spreadIndex === 0 ? <Spread01Visual /> : undefined}
            />
          </div>
          {current.centerImage ? (
            <div className="shrink-0 py-[var(--space-md)]">
              <CenterBridgeImage
                src={current.centerImage.src}
                aspect={current.centerImage.aspect}
                objectPosition={current.centerImage.objectPosition}
                className="w-full"
              />
            </div>
          ) : spreadIndex === 5 ? (
            <div className="shrink-0 py-[var(--space-sm)]">
              <Spread06Voices variant="mobile" />
            </div>
          ) : (
            <div className="duo-mobile-divider" aria-hidden="true" />
          )}
          <div className="shrink-0">
            <Page
              blocks={current.right}
              justify={rightPageJustify(spreadIndex)}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-[var(--space-lg)]">
        <button
          type="button"
          aria-label="Previous page"
          disabled={!canPrev}
          onClick={goPrev}
          className="duo-open-nav-arrow"
        >
          ←
        </button>
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#6B6862]">
          {String(spreadIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <button
          type="button"
          aria-label="Next page"
          disabled={!canNext}
          onClick={goNext}
          className="duo-open-nav-arrow"
        >
          →
        </button>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="text-xs font-medium uppercase tracking-[0.24em] text-[#A99783] transition-colors duration-[var(--duration-slow)] hover:text-[#F4F3F0]"
      >
        Close Book
      </button>
    </div>
  );
}
