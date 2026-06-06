import Link from "next/link";
import { BigTextCTA } from "@/components/ui/BigTextCTA";
import { NewsletterForm } from "./NewsletterForm";

const FOOTER_COLS = [
  {
    heading: "/Follow us",
    links: [
      { label: "Instagram", href: "https://instagram.com/tennexexpress", external: true },
      { label: "TikTok", href: "https://tiktok.com/@tennexexpress", external: true },
      { label: "YouTube", href: "https://youtube.com/@tennexexpress", external: true },
    ],
  },
  {
    heading: "/Navigation",
    links: [
      { label: "Shop all", href: "/shop" },
      { label: "Racquets", href: "/shop/racquets" },
      { label: "Strings", href: "/shop/strings" },
      { label: "Bags", href: "/shop/bags" },
      { label: "Junior", href: "/shop/junior" },
      { label: "About", href: "/about" },
    ],
  },
  {
    heading: "/Resources",
    links: [
      { label: "Sizing guide", href: "/blog/racquet-sizing-guide" },
      { label: "Stringing guide", href: "/blog/how-to-restring" },
      { label: "Beginner FAQ", href: "/blog/tennis-beginner-guide" },
      { label: "Blog", href: "/blog" },
      { label: "Shipping info", href: "/shipping" },
      { label: "Returns", href: "/returns" },
    ],
  },
  {
    heading: "/Contact",
    links: [
      { label: "Contact us", href: "/contact" },
      { label: "hello@tennexexpress.com", href: "mailto:hello@tennexexpress.com", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-bg">
      {/* Big text CTA */}
      <BigTextCTA />

      {/* Newsletter + columns */}
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Newsletter */}
          <div className="md:col-span-1">
            <p className="text-[13px] font-medium text-ink mb-1">Tennex Express</p>
            <p className="text-[13px] text-muted mb-4 leading-relaxed">
              Real tennis gear, real prices. Get deals and guides in your inbox.
            </p>
            <NewsletterForm />
          </div>

          {/* Nav columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <p className="text-slash-label text-muted tracking-[0.06em] mb-4">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-muted hover:text-ink transition-colors duration-150"
                      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-hairline flex flex-col sm:flex-row justify-between gap-2">
          <p className="text-[12px] text-muted">
            © {new Date().getFullYear()} Tennex Express. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-[12px] text-muted hover:text-ink transition-colors">Privacy</Link>
            <Link href="/terms" className="text-[12px] text-muted hover:text-ink transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
