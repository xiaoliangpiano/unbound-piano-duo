import Image from "next/image";

export default function CenterBridgeImage({
  src,
  aspect,
  objectPosition = "50% 50%",
  className = "",
}: {
  src: string;
  aspect: number;
  objectPosition?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(min-width: 768px) 420px, 300px"
        style={{ objectPosition }}
        className="duo-bridge-image object-cover"
        priority
      />
      <div className="duo-bridge-image-mask" aria-hidden="true" />
    </div>
  );
}
