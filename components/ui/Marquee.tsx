"use client";

interface MarqueeProps {
  items: string[];
  speed?: number; // seconds for one full loop
  className?: string;
}

export function Marquee({ items, speed = 40, className = "" }: MarqueeProps) {
  const repeated = [...items, ...items]; // duplicate for seamless loop

  return (
    <div
      className={`relative overflow-hidden border-y border-hairline py-4 ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div
        className="flex gap-0 w-max marquee-track"
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.animationPlayState = "running";
        }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center text-[13px] font-medium text-muted tracking-[0.06em] uppercase px-6">
            {item}
            <span className="ml-6 text-hairline">·</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
