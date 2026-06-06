import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SlashLabel } from "@/components/ui/SlashLabel";

interface Props {
  params: Promise<{ slug: string }>;
}

const POSTS: Record<
  string,
  { title: string; excerpt: string; category: string; date: string; body: string }
> = {
  "racquet-sizing-guide": {
    title: "How to choose the right racquet grip size",
    excerpt: "A practical measurement guide for adults and kids — no guesswork.",
    category: "Gear guides",
    date: "2026-05-20",
    body: `Grip size is the circumference of the handle. Measure from the bottom of your palm crease to the tip of your ring finger. Under 4 inches → 4 1/8. 4–4.25 inches → 4 1/4. 4.25–4.5 inches → 4 3/8.\n\nIf you're between sizes, go smaller. It's easier to add an overgrip to build up the handle than to sand it down.\n\nFor kids: use racquet length, not grip size. Ages 4–6 → 19 or 21 inch. Ages 6–8 → 23 inch. Ages 8–10 → 25 inch. Ages 10–12 → 26 inch.`,
  },
  "how-to-restring": {
    title: "How to restring your own racquet",
    excerpt: "A beginner-friendly walkthrough of the cross-stringing method.",
    category: "DIY",
    date: "2026-05-10",
    body: `You'll need a stringing machine (or a friend with one), a reel of string, and about 90 minutes the first time.\n\n/ 001 / Cut out the old string. Use scissors or a string cutter — cut every string before pulling them out. Cutting them under tension can warp the frame.\n\n/ 002 / Thread the mains. Start from the center of the frame and work outward. Knot the string twice at each anchor point.\n\n/ 003 / Thread the crosses. Cross strings go through the mains alternating over/under. Keep tension consistent.\n\n/ 004 / Tie off. Finish each end with a double-hitch knot inside the frame.`,
  },
  "tennis-beginner-guide": {
    title: "The complete beginner's guide to tennis equipment",
    excerpt: "Everything a new player needs — and nothing they don't.",
    category: "Beginner",
    date: "2026-04-28",
    body: `If you're just starting, you need one racquet, one can of balls, and comfortable shoes. That's it.\n\n/ 001 / Racquet. Get something pre-strung and light. An oversized head (110 sq in) gives you more forgiveness on off-center hits. Budget: $30–$50.\n\n/ 002 / Balls. Any pressurized ball works for recreational play. If you're drilling solo, pressureless balls last longer. A 3-pack gets you started; a 60-pack bucket is better for practice.\n\n/ 003 / Shoes. Tennis shoes have reinforced lateral support. Running shoes will wear down fast and don't protect your ankles on side-to-side movement.\n\n/ 004 / Overgrips. Your racquet comes with a grip, but overgrips ($3–$5 each) keep it tacky. Replace every 5–10 sessions.`,
  },
};

export async function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return {};
  return {
    title: `${post.title} — Tennex Express`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Tennex Express" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="pt-24 pb-20">
        <div className="max-w-[780px] mx-auto px-6">
          {/* Back */}
          <div className="py-6">
            <Link href="/blog" className="text-[13px] text-muted hover:text-ink transition-colors">
              ← Back to blog
            </Link>
          </div>

          {/* Header */}
          <div className="py-10 border-b border-hairline">
            <SlashLabel number="001" title={post.category.toLowerCase()} className="mb-4 block" />
            <h1 className="text-h1 text-ink mb-4">{post.title}</h1>
            <p className="text-[14px] text-muted">{post.date}</p>
          </div>

          {/* Body */}
          <div className="py-12 flex flex-col gap-6">
            {post.body.split("\n\n").map((para, i) => (
              <p key={i} className="text-[16px] text-ink leading-relaxed whitespace-pre-line">
                {para}
              </p>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
