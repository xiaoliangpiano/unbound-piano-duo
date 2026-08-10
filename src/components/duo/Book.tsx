"use client";

import { useEffect, useState } from "react";
import ClosedBook from "./ClosedBook";
import OpenBook from "./OpenBook";
import type { DuoSpread } from "@/data/duo";
import type { ClosedBookDictionary, OpenBookDictionary } from "@/data/i18n";

const CLOSE_TRANSITION_MS = 450;

export default function Book({
  spreads,
  closedBook,
  openBook,
}: {
  spreads: DuoSpread[];
  closedBook: ClosedBookDictionary;
  openBook: OpenBookDictionary;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsVisible(true));
    });

    return () => {
      document.body.style.overflow = "";
      cancelAnimationFrame(raf1);
    };
  }, [isOpen]);

  function handleClose() {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setIsVisible(false);
    if (reduced) {
      setIsOpen(false);
    } else {
      window.setTimeout(() => setIsOpen(false), CLOSE_TRANSITION_MS);
    }
  }

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <>
      <ClosedBook onOpen={() => setIsOpen(true)} dict={closedBook} />

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={openBook.dialogLabel}
          className={`duo-book-overlay fixed inset-0 z-[var(--z-modal)] flex flex-col items-center justify-center bg-[#0c0b0a] ${
            isVisible ? "duo-book-overlay-in" : ""
          }`}
        >
          <OpenBook onClose={handleClose} spreads={spreads} dict={openBook} />
        </div>
      )}
    </>
  );
}
