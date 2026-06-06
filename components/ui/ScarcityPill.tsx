interface ScarcityPillProps {
  text?: string;
  className?: string;
}

export function ScarcityPill({
  text = "Free overgrip on every order this month",
  className = "",
}: ScarcityPillProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-2 ${className}`}
    >
      <span className="h-2 w-2 rounded-full bg-accent flex-shrink-0" />
      <span className="text-[13px] font-medium text-ink">{text}</span>
    </div>
  );
}
