interface ProcessCardProps {
  number: string;   // "01", "02", "03"
  headline: string;
  description: string;
  className?: string;
}

export function ProcessCard({
  number,
  headline,
  description,
  className = "",
}: ProcessCardProps) {
  return (
    <div
      className={`bg-surface border border-hairline rounded-[16px] p-8 flex flex-col gap-6 ${className}`}
    >
      <span className="text-big-number text-muted">/{number}</span>
      <div>
        <h3 className="text-h3 text-ink mb-2">{headline}</h3>
        <p className="text-[14px] text-muted leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
