import Image from "next/image";
import type { PageBlock } from "@/data/duo";
import TypewriterText from "./TypewriterText";

function Block({ block }: { block: PageBlock }) {
  switch (block.type) {
    case "architectural":
      return (
        <div className="flex flex-col gap-[0.05em]">
          {block.lines.map((line) => (
            <span
              key={line}
              className="block text-[clamp(1.4rem,3.4vw,2.75rem)] font-semibold uppercase leading-[0.95] tracking-tight text-[#F4F3F0]"
            >
              {line}
            </span>
          ))}
        </div>
      );

    case "statement": {
      const sizeClass =
        block.scale === "moderate"
          ? "text-[clamp(1.3rem,2.6vw,2.75rem)]"
          : block.scale === "compact"
            ? "text-[clamp(1.2rem,2.2vw,2.1rem)]"
            : "text-[clamp(1.4rem,4.2vw,2.35rem)]";
      const weightClass = block.weight === "bold" ? "font-bold" : "font-semibold";
      return (
        <div className={`flex flex-col gap-[0.05em] ${block.revealClass ?? ""}`}>
          {block.lines.map((line, index) => (
            <span
              key={line}
              className={`block ${sizeClass} ${weightClass} uppercase leading-[1.15] tracking-tight text-[#F4F3F0] ${
                block.revealStagger
                  ? index === 0
                    ? "duo-s05-line-1"
                    : "duo-s05-line-2"
                  : ""
              }`}
            >
              {line}
            </span>
          ))}
        </div>
      );
    }

    case "paragraph":
      return (
        <p
          className={`${block.narrow ? "max-w-[26ch]" : "max-w-[38ch]"} text-[clamp(0.9rem,1.6vw,1.0625rem)] leading-relaxed text-[#9C9892] ${block.revealClass ?? ""}`}
        >
          {block.text}
        </p>
      );

    case "verse":
      return (
        <div className="flex flex-col gap-[0.4em]">
          {block.lines.map((line, index) => (
            <span
              key={line}
              className={`block max-w-[32ch] text-[clamp(1rem,1.8vw,1.1875rem)] leading-snug text-[#F4F3F0] duo-s06-verse-${index + 1}`}
            >
              {line}
            </span>
          ))}
        </div>
      );

    case "cue":
      return (
        <p className="max-w-[32ch] text-sm italic leading-relaxed text-[#A99783]">
          {block.text}
        </p>
      );

    case "keyword":
      return (
        <div>
          <p className="text-[clamp(1.6rem,3.2vw,2.875rem)] font-semibold uppercase leading-[0.95] tracking-tight text-[#F4F3F0]">
            {block.primary}
          </p>
          {block.workTitle && (
            <p className="mt-[var(--space-3xs)] text-[clamp(1.3rem,2vw,1.75rem)] italic text-[#A99783] md:mt-[var(--space-sm)]">
              {block.workTitle}
            </p>
          )}
          {block.movement && (
            <p className="mt-[var(--space-3xs)] max-w-[30ch] text-[clamp(1rem,1.2vw,1.125rem)] italic leading-relaxed text-[#6B6862] md:mt-[var(--space-2xs)]">
              {block.movement}
            </p>
          )}
        </div>
      );

    case "emphasis": {
      const sizeClass =
        block.scale === "compact"
          ? "text-[clamp(0.95rem,2vw,1.25rem)]"
          : "text-[clamp(1.05rem,2.2vw,1.375rem)]";
      const spacingClass = block.spacious ? "mt-[var(--space-lg)]" : "";
      const className =
        `max-w-[34ch] ${sizeClass} font-medium leading-snug ${spacingClass}`.trim();

      if (block.typewriter) {
        return <TypewriterText text={block.text} className={className} />;
      }
      return <p className={`${className} text-[#F4F3F0]`}>{block.text}</p>;
    }

    case "dominant": {
      const baseClasses =
        "text-[clamp(2.25rem,9vw,4.5rem)] font-semibold uppercase leading-[0.9]";
      const shiftStyle = block.shiftLeft
        ? ({ "--duo-dominant-shift": `-${block.shiftLeft}px` } as React.CSSProperties)
        : undefined;
      const shiftClass = block.shiftLeft ? "duo-dominant-shift" : "";

      if (block.emergeSlow) {
        return (
          <p
            className={`${baseClasses} duo-s05-dominant ${shiftClass}`}
            style={shiftStyle}
          >
            {block.text}
          </p>
        );
      }
      return (
        <p
          className={`${baseClasses} tracking-tight text-[#F4F3F0] ${shiftClass}`}
          style={shiftStyle}
        >
          {block.text}
        </p>
      );
    }

    case "slogan":
      return (
        <div className="duo-s06-slogan flex flex-col gap-[0.15em]">
          {block.lines.map((line) => (
            <span
              key={line}
              className="block text-[clamp(1.15rem,2.6vw,1.7rem)] font-medium leading-snug text-[#A99783]"
            >
              {line}
            </span>
          ))}
        </div>
      );

    case "archiveImage": {
      if (block.treatment === "document") {
        return (
          <div className="w-[22%] max-w-[190px] md:w-[66%]">
            <div
              className="duo-program-frame relative w-full overflow-hidden"
              style={{ aspectRatio: block.aspect }}
            >
              <Image
                src={block.src}
                alt="Recital program for the Doctoral Solo Recital of Xiao Liang, piano"
                fill
                sizes="(min-width: 768px) 260px, 100px"
                style={{ objectPosition: "22% 30%" }}
                className="duo-program-image object-cover"
              />
              <div className="duo-program-mask" aria-hidden="true" />
            </div>
          </div>
        );
      }

      if (block.treatment === "ambient") {
        return (
          <div className="w-[46%] max-w-[210px] md:w-[42%]">
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: block.aspect }}
            >
              <Image
                src={block.src}
                alt=""
                fill
                sizes="(min-width: 768px) 210px, 150px"
                className="duo-memory-image object-cover"
              />
              <div className="duo-memory-image-mask" aria-hidden="true" />
            </div>
          </div>
        );
      }

      return (
        <div className="flex flex-col items-end gap-[8px] self-end">
          <div className="w-[42px] md:w-[130px]">
            <div
              className="duo-photo-frame relative w-full"
              style={{ aspectRatio: block.aspect }}
            >
              <Image
                src={block.src}
                alt=""
                fill
                sizes="(min-width: 768px) 130px, 62px"
                className="object-cover"
              />
            </div>
          </div>
          {block.caption && (
            <div className="whitespace-nowrap text-right">
              {block.caption.map((line, index) => (
                <span
                  key={line}
                  className={`block text-[10px] font-medium uppercase tracking-[0.2em] ${
                    index === 0 ? "text-[#A99783]" : "mt-[2px] text-[#6B6862]"
                  }`}
                >
                  {line}
                </span>
              ))}
            </div>
          )}
        </div>
      );
    }

    default:
      return null;
  }
}

export default function Page({
  number,
  title,
  blocks,
  showHeading = false,
  justify = "center",
  contentAlign = "start",
  headingRevealClass,
  background,
}: {
  number?: string;
  title?: string;
  blocks: PageBlock[];
  showHeading?: boolean;
  justify?: "center" | "start" | "end";
  contentAlign?: "start" | "end";
  headingRevealClass?: string;
  background?: React.ReactNode;
}) {
  const hasTitle = Boolean(title);
  const justifyClass =
    justify === "start"
      ? "justify-start"
      : justify === "end"
        ? "justify-end"
        : "justify-center";

  return (
    <div className="relative h-full w-full overflow-hidden">
      {background && <div className="absolute inset-0 z-0">{background}</div>}
      <div
        className={`relative z-10 flex h-full w-full flex-col px-[7%] py-[8%] text-left ${justifyClass}`}
      >
        {showHeading && (number || title) && (
          <div
            className={`${hasTitle ? "mb-[var(--space-lg)]" : "mb-[var(--space-xs)]"} ${
              headingRevealClass ?? ""
            }`}
          >
            {hasTitle ? (
              <div className="flex flex-wrap items-baseline gap-x-[var(--space-xs)] gap-y-[var(--space-3xs)]">
                {number && (
                  <span className="text-[1.125rem] font-medium uppercase tracking-[0.08em] text-[#A99783]">
                    {number}
                  </span>
                )}
                {title && (
                  <span className="text-[1.125rem] font-medium uppercase tracking-[0.06em] text-[#9C9892]">
                    {title}
                  </span>
                )}
              </div>
            ) : (
              number && (
                <span className="block text-xs font-medium uppercase tracking-[0.24em] text-[#A99783]">
                  {number}
                </span>
              )
            )}
          </div>
        )}
        <div
          className={`flex flex-col gap-[var(--space-lg)] ${
            contentAlign === "end" ? "items-end" : "items-start"
          }`}
        >
          {blocks.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </div>
      </div>
    </div>
  );
}
