"use client";

import Link from "next/link";
import { forwardRef } from "react";

type Variant = "primary" | "ghost" | "accent";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-ink text-bg hover:bg-ink-soft border border-ink active:scale-[0.98]",
  ghost:
    "bg-transparent text-ink border border-ink hover:bg-ink hover:text-bg active:scale-[0.98]",
  accent:
    "bg-accent text-ink border border-accent hover:bg-accent/90 active:scale-[0.98]",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 cursor-pointer select-none whitespace-nowrap";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", href, external, className = "", children, ...props }, ref) => {
    const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    if (href) {
      const linkProps = external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {};
      return (
        <Link href={href} className={classes} {...linkProps}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
