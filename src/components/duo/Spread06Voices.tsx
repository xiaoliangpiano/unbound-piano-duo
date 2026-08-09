export default function Spread06Voices({
  variant = "desktop",
}: {
  variant?: "desktop" | "mobile";
}) {
  const wrapperClass =
    variant === "mobile"
      ? "pointer-events-none h-[56px] w-full"
      : "pointer-events-none absolute inset-x-[6%] bottom-[3%] z-[7] h-[10%] w-[88%]";

  return (
    <div className={wrapperClass} aria-hidden="true">
      <svg
        className="h-full w-full"
        viewBox="0 0 1000 70"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          className="duo-s06-voice duo-s06-voice-a"
          d="M 20 58 C 120 52, 220 18, 320 22 C 400 25, 460 33, 560 35 C 680 37, 820 12, 980 18"
        />
        <path
          className="duo-s06-voice duo-s06-voice-b"
          d="M 40 14 C 160 22, 260 45, 380 38 C 460 34, 520 30, 600 33 C 720 37, 840 55, 960 46"
        />
      </svg>
    </div>
  );
}
