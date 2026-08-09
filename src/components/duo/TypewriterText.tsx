"use client";

import { useEffect, useRef, useState } from "react";

export default function TypewriterText({
  text,
  startDelay = 700,
  className = "",
}: {
  text: string;
  startDelay?: number;
  className?: string;
}) {
  const [revealed, setRevealed] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const [cursorBlinking, setCursorBlinking] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      setRevealed(text.length);
      setShowCursor(false);
      return;
    }

    function schedule(fn: () => void, delay: number) {
      timers.current.push(window.setTimeout(fn, delay));
    }

    let elapsed = startDelay;
    schedule(() => setShowCursor(true), elapsed);

    for (let i = 1; i <= text.length; i += 1) {
      const char = text[i - 1];
      const charDelay = char === "," ? 260 : char === "." ? 200 : 42;
      elapsed += charDelay;
      schedule(() => setRevealed(i), elapsed);
    }

    schedule(() => setCursorBlinking(true), elapsed + 150);
    schedule(() => setShowCursor(false), elapsed + 150 + 2300);

    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
    };
  }, [text, startDelay]);

  return (
    <p className={className}>
      <span className="duo-typewriter-gold">{text.slice(0, revealed)}</span>
      {showCursor && (
        <span
          className={`duo-typewriter-cursor ${cursorBlinking ? "duo-typewriter-cursor-blink" : ""}`}
          aria-hidden="true"
        />
      )}
    </p>
  );
}
