type Style = "leading" | "trailing";

interface SubNumberLabelProps {
  number: string;  // "01", "02" or "001", "002"
  label?: string;  // for "001 / Racquets" style — omit for bare "/01"
  style?: Style;   // "leading" = "/01", "trailing" = "001 /"
  className?: string;
}

export function SubNumberLabel({
  number,
  label,
  style = "leading",
  className = "",
}: SubNumberLabelProps) {
  const base = "text-slash-label text-muted tracking-[0.06em]";

  if (label) {
    // "001 / Racquets" card-top style
    return (
      <span className={`${base} ${className}`}>
        {number} / {label}
      </span>
    );
  }

  // bare "/01" process card prefix
  return (
    <span className={`text-big-number text-muted ${className}`}>
      {style === "leading" ? `/${number}` : `${number} /`}
    </span>
  );
}
