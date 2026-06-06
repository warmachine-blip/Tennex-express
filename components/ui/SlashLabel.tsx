interface SlashLabelProps {
  number: string;   // "001", "002", "003"
  title: string;    // lowercase title
  className?: string;
}

export function SlashLabel({ number, title, className = "" }: SlashLabelProps) {
  return (
    <span
      className={`text-slash-label text-muted tracking-[0.06em] lowercase ${className}`}
    >
      / {number} / {title}
    </span>
  );
}
