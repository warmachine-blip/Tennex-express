"use client";

interface BenefitCardProps {
  number: string;   // "01", "02"...
  headline: string;
  description: string;
  className?: string;
}

export function BenefitCard({ number, headline, description, className = "" }: BenefitCardProps) {
  return (
    <div
      className={`group bg-surface border border-hairline rounded-[16px] p-7 flex flex-col gap-4 cursor-default transition-all duration-200 hover:bg-ink hover:border-ink ${className}`}
    >
      <span className="text-slash-label text-muted group-hover:text-bg/60 tracking-[0.06em] transition-colors duration-200">
        /{number}
      </span>
      <div>
        <h3 className="text-h3 text-ink group-hover:text-bg transition-colors duration-200 mb-2">
          {headline}
        </h3>
        <p className="text-[13px] text-muted group-hover:text-bg/70 leading-relaxed transition-colors duration-200">
          {description}
        </p>
      </div>
    </div>
  );
}
