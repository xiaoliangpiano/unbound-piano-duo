import Image from "next/image";

const PRELOAD_IMAGES = [
  {
    src: "/images/duo/recital-program-2025.png",
    sizes: "(min-width: 768px) 260px, 100px",
    aspect: 4 / 3,
  },
  {
    src: "/images/duo/after-recital-2025.jpg",
    sizes: "(min-width: 768px) 130px, 62px",
    aspect: 655 / 879,
  },
  {
    src: "/images/duo/coffee-matcha.jpg",
    sizes: "(min-width: 768px) 210px, 150px",
    aspect: 1536 / 1024,
  },
  {
    src: "/images/duo/four-hands-piano.jpg",
    sizes: "(min-width: 768px) 420px, 300px",
    aspect: 16 / 9,
  },
];

// Mounted once, invisibly, the moment the book opens — well before any page
// turn could reach these spreads. Requests the exact same Next.js
// image-optimizer URLs (matching `sizes`) that the real, visible instances
// will use later, so both the browser's decode cache and the optimizer's
// cache are already warm by the time a turn reveals them. Purely a
// preloading aid: it renders nothing visible and has no animation.
export default function DuoAssetPreloader() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: 1,
        height: 1,
        overflow: "hidden",
        opacity: 0,
        pointerEvents: "none",
      }}
    >
      {PRELOAD_IMAGES.map((img) => (
        <div
          key={img.src}
          style={{ position: "relative", width: 420, aspectRatio: img.aspect }}
        >
          <Image src={img.src} alt="" fill sizes={img.sizes} priority />
        </div>
      ))}
    </div>
  );
}
