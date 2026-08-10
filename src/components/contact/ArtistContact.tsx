import Image from "next/image";
import type { ContactArtist } from "@/data/contact";
import type { ContactDictionary } from "@/data/i18n";

export default function ArtistContact({
  artist,
  dict,
}: {
  artist: ContactArtist;
  dict: ContactDictionary;
}) {
  const displayName = dict.artistNames[artist.id] ?? artist.name;

  return (
    <div className="flex flex-col items-center text-center">
      <div className="contact-portrait-frame relative w-full max-w-[210px] overflow-hidden md:max-w-[250px]">
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={artist.image.src}
            alt={artist.image.alt}
            fill
            sizes="(min-width: 768px) 250px, 210px"
            style={{ objectPosition: artist.image.objectPosition }}
            className={`contact-portrait-image object-cover ${
              artist.warmTone ? "contact-portrait-image-warm" : ""
            }`}
          />
          <div className="contact-portrait-mask" aria-hidden="true" />
        </div>
      </div>

      <h3 className="mt-[var(--space-2xs)] text-lg font-semibold uppercase tracking-[0.04em] text-[#F4F3F0] md:text-xl">
        {displayName}
      </h3>

      <div className="mt-[var(--space-2xs)] flex flex-col items-center gap-[var(--space-3xs)]">
        <a href={`mailto:${artist.email}`} className="contact-link">
          {dict.emailPrefix}
          {artist.email}
        </a>
        <a
          href={artist.website.href}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link"
        >
          {dict.websitePrefix}
          {artist.website.label}
        </a>
      </div>
    </div>
  );
}
