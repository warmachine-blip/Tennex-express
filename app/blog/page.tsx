import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SlashLabel } from "@/components/ui/SlashLabel";

export const metadata: Metadata = {
  title: "Blog — Tennex Express",
  description: "Guides, tips, and advice for beginner and intermediate tennis players.",
};

const POSTS = [
  {
    slug: "racquet-sizing-guide",
    title: "How to choose the right racquet grip size",
    excerpt: "A practical measurement guide for adults and kids — no guesswork.",
    category: "Gear guides",
    date: "2026-05-20",
  },
  {
    slug: "how-to-restring",
    title: "How to restring your own racquet",
    excerpt: "A beginner-friendly walkthrough of the cross-stringing method.",
    category: "DIY",
    date: "2026-05-10",
  },
  {
    slug: "tennis-beginner-guide",
    title: "The complete beginner's guide to tennis equipment",
    excerpt: "Everything a new player needs — and nothing they don't.",
    category: "Beginner",
    date: "2026-04-28",
  },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="py-16 border-b border-hairline">
            <SlashLabel number="001" title="blog" className="mb-4 block" />
            <h1 className="text-h1 text-ink">Guides and tips</h1>
          </div>

          <div className="divide-y divide-hairline">
            {POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col md:flex-row md:items-center gap-4 py-8 hover:opacity-80 transition-opacity"
              >
                <div className="flex-1">
                  <p className="text-[12px] font-medium text-muted tracking-[0.06em] uppercase mb-2">
                    {post.category}
                  </p>
                  <h2 className="text-h3 text-ink mb-2">{post.title}</h2>
                  <p className="text-[14px] text-muted">{post.excerpt}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[13px] text-muted">{post.date}</span>
                  <span className="text-ink opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
