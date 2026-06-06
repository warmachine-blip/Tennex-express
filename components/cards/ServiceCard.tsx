import Image from "next/image";
import Link from "next/link";

interface ServiceCardProps {
  number: string;      // "001", "002", "003"
  category: string;    // "Racquets"
  headline: string;
  paragraph: string;
  included: string[];
  image: string;
  href: string;
  className?: string;
}

export function ServiceCard({
  number,
  category,
  headline,
  paragraph,
  included,
  image,
  href,
  className = "",
}: ServiceCardProps) {
  return (
    <div
      className={`bg-surface border border-hairline rounded-[16px] overflow-hidden flex flex-col ${className}`}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={image}
          alt={headline}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-7 flex flex-col gap-4 flex-1">
        <p className="text-slash-label text-muted tracking-[0.06em]">
          {number} / {category}
        </p>

        <div>
          <h3 className="text-h3 text-ink mb-2">{headline}</h3>
          <p className="text-[14px] text-muted leading-relaxed">{paragraph}</p>
        </div>

        <div className="mt-auto">
          <p className="text-[12px] font-medium text-muted tracking-[0.04em] uppercase mb-2">
            What's included
          </p>
          <ul className="flex flex-col gap-1">
            {included.map((item) => (
              <li key={item} className="flex items-center gap-2 text-[13px] text-ink">
                <span className="h-1 w-1 rounded-full bg-muted flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <Link
          href={href}
          className="text-[13px] font-medium text-ink underline underline-offset-4 hover:text-muted transition-colors mt-2"
        >
          Shop {category.toLowerCase()} →
        </Link>
      </div>
    </div>
  );
}
