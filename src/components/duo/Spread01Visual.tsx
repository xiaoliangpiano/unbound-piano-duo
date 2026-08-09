import Image from "next/image";

export default function Spread01Visual() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="duo-fsu-image-wrap absolute left-[-3%] right-[-6%] bottom-[2%] h-[60%] overflow-hidden">
        <Image
          src="/images/duo/fsu-night.jpg"
          alt=""
          fill
          sizes="600px"
          className="duo-fsu-image object-cover"
        />
        <div className="duo-fsu-image-mask" />
      </div>
    </div>
  );
}
