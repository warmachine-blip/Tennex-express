import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SlashLabel } from "@/components/ui/SlashLabel";
import { StatRow } from "@/components/ui/StatRow";
import { ProcessCard } from "@/components/cards/ProcessCard";

export const metadata: Metadata = {
  title: "About — Tennex Express",
  description:
    "We sell affordable own-label tennis gear sourced from vetted manufacturers. No brand tax, real prices.",
};

const STATS = [
  { value: "1,200+", numeric: 1200, label: "Players served" },
  { value: "20+", label: "SKUs in stock" },
  { value: "99%", numeric: 99, label: "On-time shipping" },
  { value: "60%", numeric: 60, label: "Avg savings vs MSRP" },
];

const HOW = [
  {
    number: "01",
    headline: "Source",
    description:
      "We identify factories through Alibaba trade assurance, run reference checks, and order paid samples before committing to a SKU.",
  },
  {
    number: "02",
    headline: "Vet",
    description:
      "Each product goes through an independent QC inspection at the factory and a second check on arrival at our US warehouse.",
  },
  {
    number: "03",
    headline: "Ship",
    description:
      "All inventory is held in our US warehouse. Orders placed before 3 PM ET ship the same business day. Most arrive in 2 days.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <div className="max-w-[1280px] mx-auto px-6 py-16 border-b border-hairline">
          <SlashLabel number="001" title="about us" className="mb-6 block" />
          <h1 className="text-h1 text-ink max-w-[640px] mb-6">
            Tennis gear at prices the sport should always have had
          </h1>
          <p className="text-[16px] text-muted leading-relaxed max-w-[560px]">
            Tennex Express is an independent US tennis store. We buy direct from the same factories
            that supply the major brands, cut out the middleman, and sell under our own label. The
            gear is the same. The price is not.
          </p>
        </div>

        {/* Stats */}
        <StatRow stats={STATS} />

        {/* How it works */}
        <div className="max-w-[1280px] mx-auto px-6 py-20">
          <SlashLabel number="002" title="how it works" className="mb-6 block" />
          <h2 className="text-h2 text-ink max-w-[500px] mb-12">
            Factory to your door
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {HOW.map((step) => (
              <ProcessCard key={step.number} {...step} />
            ))}
          </div>
        </div>

        {/* Mission */}
        <div className="max-w-[1280px] mx-auto px-6 py-20 border-t border-hairline">
          <SlashLabel number="003" title="our stance" className="mb-6 block" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <h2 className="text-h2 text-ink">
              We don't sell branded racquets. Here's why.
            </h2>
            <div className="flex flex-col gap-4 text-[15px] text-muted leading-relaxed">
              <p>
                Wilson, Babolat, and Head are great brands. We're not competing with them — we're
                not them. Selling counterfeit branded gear is illegal and would get us shut down
                immediately by payment processors and customs.
              </p>
              <p>
                Everything we sell is own-label — designed and specified by us, manufactured by
                factories that also supply name brands, and sold honestly as Tennex products. That's
                the only model that works long-term.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
