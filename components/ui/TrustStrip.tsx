import Image from "next/image";

const AVATARS = [
  { src: "https://picsum.photos/seed/avatar-1/48/48", alt: "Player" },
  { src: "https://picsum.photos/seed/avatar-2/48/48", alt: "Player" },
  { src: "https://picsum.photos/seed/avatar-3/48/48", alt: "Player" },
];

interface TrustStripProps {
  count?: string;
  className?: string;
}

export function TrustStrip({ count = "1,200+", className = "" }: TrustStripProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex -space-x-2">
        {AVATARS.map((a, i) => (
          <div
            key={i}
            className="h-8 w-8 rounded-full overflow-hidden border-2 border-bg flex-shrink-0"
          >
            <Image
              src={a.src}
              alt={a.alt}
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <span className="text-[13px] text-muted">
        Trusted by {count} players
      </span>
    </div>
  );
}
