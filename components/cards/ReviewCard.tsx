import Image from "next/image";

interface ReviewCardProps {
  rating: number;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  className?: string;
}

export function ReviewCard({
  rating,
  quote,
  author,
  role,
  avatar,
  className = "",
}: ReviewCardProps) {
  return (
    <div
      className={`bg-surface border border-hairline rounded-[16px] p-7 flex flex-col gap-6 min-w-[300px] flex-shrink-0 ${className}`}
    >
      {/* Rating */}
      <div className="flex items-center gap-2">
        <span className="text-[22px] font-medium text-ink">{rating.toFixed(1)}</span>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`text-[14px] ${i < Math.round(rating) ? "text-accent" : "text-hairline"}`}>
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Quote */}
      <p className="text-[15px] text-ink leading-relaxed flex-1">"{quote}"</p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-hairline">
        <div className="h-9 w-9 rounded-full overflow-hidden flex-shrink-0 bg-hairline">
          <Image src={avatar} alt={author} width={36} height={36} className="object-cover" />
        </div>
        <div>
          <p className="text-[13px] font-medium text-ink">{author}</p>
          <p className="text-[12px] text-muted">{role}</p>
        </div>
      </div>
    </div>
  );
}
