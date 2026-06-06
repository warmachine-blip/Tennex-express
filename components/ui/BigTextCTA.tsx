import Link from "next/link";

interface BigTextCTAProps {
  text?: string;
  href?: string;
  className?: string;
}

export function BigTextCTA({
  text = "Shop tennis gear",
  href = "/shop",
  className = "",
}: BigTextCTAProps) {
  return (
    <div className={`py-20 border-y border-hairline overflow-hidden ${className}`}>
      <Link
        href={href}
        className="block text-center text-big-cta text-ink hover:text-muted transition-colors duration-300 whitespace-nowrap"
        aria-label={text}
      >
        — {text} —
      </Link>
    </div>
  );
}
