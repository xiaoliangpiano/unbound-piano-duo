"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FIVE_ELEMENTS, type FiveElement } from "@/data/elements";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const AUTO_ROTATE_SPEED = 4; // degrees per second — calm, continuous orbit
const DRAG_SENSITIVITY = 0.28; // degrees per pixel of drag
const VELOCITY_FRICTION = 0.94; // per-frame-at-60fps momentum decay
const MAX_FLICK_VELOCITY = 260; // deg/s cap so a fast flick can't spin wildly
const CLICK_DISTANCE_THRESHOLD = 6; // px — below this a release counts as a click
const MIN_SETTLE_VELOCITY = 0.02; // deg/s — below this momentum is considered settled
const START_ANGLE = -90; // first element starts at the top of the orbit
const PANEL_MARGIN = 8; // px kept between a panel's outer edge and the stage edge

interface FiveElementsRingProps {
  onSelectElement?: (element: FiveElement) => void;
  /** Defaults to the English labels so existing callers are unaffected. */
  elements?: FiveElement[];
}

export default function FiveElementsRing({
  onSelectElement,
  elements = FIVE_ELEMENTS,
}: FiveElementsRingProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef(new Map<string, HTMLButtonElement>());
  const radiusRef = useRef({ x: 260, y: 160 });

  const rotationRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const pressedElementIdRef = useRef<string | null>(null);
  const hoveredIdRef = useRef<string | null>(null);

  const [activeElementId, setActiveElementId] = useState<string | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const angleStep = 360 / elements.length;

  const measure = useCallback(() => {
    const stage = stageRef.current;
    const panel = panelRefs.current.get(elements[0].id);
    if (!stage || !panel) return;
    const stageRect = stage.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    radiusRef.current = {
      x: Math.max((stageRect.width - panelRect.width) / 2 - PANEL_MARGIN, 0),
      y: Math.max((stageRect.height - panelRect.height) / 2 - PANEL_MARGIN, 0),
    };
  }, [elements]);

  useEffect(() => {
    measure();
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [measure]);

  // Every element orbits the (empty) center on a shared oval path — the
  // oval, rather than a circle, plus the depth cue below, reads as a ring
  // gently tilted toward the viewer without any 3D perspective math.
  const applyFrame = useCallback(() => {
    const { x: radiusX, y: radiusY } = radiusRef.current;

    elements.forEach((element, i) => {
      const panel = panelRefs.current.get(element.id);
      if (!panel) return;

      const angleDeg = START_ANGLE + i * angleStep + rotationRef.current;
      const rad = (angleDeg * Math.PI) / 180;
      const x = Math.cos(rad) * radiusX;
      const y = Math.sin(rad) * radiusY;

      // 0 at the top of the oval (farthest), 1 at the bottom (nearest).
      // Kept subtle on purpose — all five stay clearly visible and close
      // to equal size; this is a hint of depth, not a selected element.
      const depth = (Math.sin(rad) + 1) / 2;
      let scale = 0.94 + depth * 0.1;
      let brightness = 0.86 + depth * 0.18;
      const opacity = 0.88 + depth * 0.12;
      if (hoveredIdRef.current === element.id) {
        scale += 0.05;
        brightness += 0.08;
      }

      // Only ever translated, never rotated — the artwork/label stays
      // upright through the whole orbit instead of spinning with the ring.
      panel.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
      panel.style.opacity = String(opacity);
      panel.style.filter = `brightness(${brightness})`;
      panel.style.zIndex = String(Math.round(depth * 100));
    });
  }, [angleStep, elements]);

  useEffect(() => {
    // The loop always keeps running so a drag still repaints immediately
    // under reduced motion — only the *automatic* motion (continuous
    // auto-rotate, post-release momentum) is gated off below.
    let frameId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      if (!isDraggingRef.current) {
        if (
          !prefersReducedMotion &&
          Math.abs(velocityRef.current) > MIN_SETTLE_VELOCITY
        ) {
          rotationRef.current += velocityRef.current * dt;
          velocityRef.current *= Math.pow(VELOCITY_FRICTION, dt * 60);
        } else {
          velocityRef.current = 0;
          if (!prefersReducedMotion) {
            rotationRef.current += AUTO_ROTATE_SPEED * dt;
          }
        }
      }

      applyFrame();
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [prefersReducedMotion, applyFrame]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    velocityRef.current = 0;
    dragDistanceRef.current = 0;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    pointerIdRef.current = e.pointerId;
    pressedElementIdRef.current =
      (e.target as HTMLElement).closest("[data-element-id]")?.getAttribute(
        "data-element-id"
      ) ?? null;
    // Captured on the stage (not the pressed panel) so drag tracking keeps
    // working even once the ring rotates the panel out from under the
    // pointer. Note: this also redirects the native `click` event to the
    // stage, which is why selection is resolved manually below rather than
    // via the button's onClick for pointer-driven taps.
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Some browsers reject capture for a pointer they don't consider
      // active; dragging still works via the move/up listeners either way.
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || e.pointerId !== pointerIdRef.current) return;

    const now = performance.now();
    const dx = e.clientX - lastXRef.current;
    const dt = Math.max(now - lastTimeRef.current, 1);

    rotationRef.current += dx * DRAG_SENSITIVITY;
    velocityRef.current = (dx * DRAG_SENSITIVITY * 1000) / dt;
    dragDistanceRef.current += Math.abs(dx);

    lastXRef.current = e.clientX;
    lastTimeRef.current = now;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== e.pointerId) return;
    isDraggingRef.current = false;
    pointerIdRef.current = null;
    velocityRef.current = Math.max(
      Math.min(velocityRef.current, MAX_FLICK_VELOCITY),
      -MAX_FLICK_VELOCITY
    );

    // Pointer capture retargets the native `click` event to the stage, so
    // it never reaches the button — resolve tap-vs-drag here instead.
    if (
      dragDistanceRef.current <= CLICK_DISTANCE_THRESHOLD &&
      pressedElementIdRef.current
    ) {
      const element = elements.find(
        (candidate) => candidate.id === pressedElementIdRef.current
      );
      if (element) handleSelect(element);
    }
    pressedElementIdRef.current = null;
    dragDistanceRef.current = 0;
  };

  const handleSelect = (element: FiveElement) => {
    setActiveElementId(element.id);
    onSelectElement?.(element);
  };

  const handleKeyboardSelect = (
    e: React.MouseEvent<HTMLButtonElement>,
    element: FiveElement
  ) => {
    // Keyboard-activated buttons fire a click with detail === 0, and it
    // isn't subject to pointer-capture retargeting — pointer taps are
    // already handled in endDrag above, so ignore those here.
    if (e.detail !== 0) return;
    handleSelect(element);
  };

  return (
    <div
      ref={stageRef}
      className="project-ring-stage select-none"
      style={{ touchAction: "pan-y" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      role="group"
      aria-label="Five Elements — interactive orbital ring. Drag to rotate, or tab through each element."
    >
      {elements.map((element) => (
        <button
          key={element.id}
          type="button"
          data-element-id={element.id}
          ref={(node) => {
            if (node) panelRefs.current.set(element.id, node);
            else panelRefs.current.delete(element.id);
          }}
          className={`project-ring-panel element-tone-${element.id} ${
            activeElementId === element.id ? "is-active" : ""
          }`}
          onClick={(e) => handleKeyboardSelect(e, element)}
          onMouseEnter={(e) => {
            hoveredIdRef.current = element.id;
            e.currentTarget.classList.add("is-hovered");
          }}
          onMouseLeave={(e) => {
            hoveredIdRef.current = null;
            e.currentTarget.classList.remove("is-hovered");
          }}
          aria-label={`${element.label} — view world (coming soon)`}
        >
          <span className="project-ring-panel-label">{element.label}</span>
        </button>
      ))}
    </div>
  );
}
