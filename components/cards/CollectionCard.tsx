import Link from "next/link";
import Image from "next/image";

interface CollectionCardProps {
  name: string;
  category: string;
  year?: string;
  image: string;
  href: string;
  className?: string;
}

export function CollectionCard({
  name,
  category,
  year = "2026",
  image,
  href,
  className = "",
}: CollectionCardProps) {
  return (
    <Link
      href={href}
      className={`group relative bg-surface border border-hairline rounded-[16px] overflow-hidden flex flex-col ${className}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-400 group-hover:scale-[1.03]"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex items-end justify-between">
        <div>
          <p className="text-[11px] font-medium text-muted tracking-[0.06em] uppercase mb-1">
            {category}
          </p>
          <h3 className="text-h3 text-ink">{name}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-muted">{year}</span>
          <span className="text-ink opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
