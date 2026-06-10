import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SlashLabel } from "@/components/ui/SlashLabel";

export const metadata: Metadata = {
  title: "Returns & exchanges — Tennex Express",
  description: "30-day free returns on all Tennex Express orders. Here's how it works.",
};

const STEPS = [
  {
    number: "01",
    headline: "Email us",
    description: "Send a note to hello@tennexexpress.com with your order number and reason. We'll reply within 1 business day with a prepaid UPS label.",
  },
  {
    number: "02",
    headline: "Pack and drop off",
    description: "Repack the item in its original packaging if you have it. Drop the parcel at any UPS location — no printer needed if you use the UPS mobile app.",
  },
  {
    number: "03",
    headline: "Get refunded",
    description: "Once we receive and inspect the item (usually 2–3 days after drop-off), your refund is issued to the original payment method within 5 business days.",
  },
];

const FAQS = [
  {
    q: "What's the return window?",
    a: "30 days from the delivery date. Items must be unused and in original condition.",
  },
  {
    q: "Are returns really free?",
    a: "Yes — we send a prepaid UPS return label at no cost to you. No catches.",
  },
  {
    q: "Can I exchange instead of returning?",
    a: "Yes. Tell us in your email what you'd like instead (different size, different product). We'll ship the exchange once we receive the return.",
  },
  {
    q: "What if my item arrived damaged?",
    a: "Email us a photo within 7 days of delivery. We'll ship a replacement immediately — you don't need to return the damaged item.",
  },
  {
    q: "Can I return string that's already been cut?",
    a: "No — cut string cannot be returned. If it arrived on a reel and you haven't cut it yet, it's eligible for return within 30 days.",
  },
  {
    q: "How long does the refund take to appear?",
    a: "We issue refunds within 5 business days of receiving your return. Card refunds can take an additional 3–5 days to appear on your statement depending on your bank.",
  },
];

export default function ReturnsPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <div className="max-w-[780px] mx-auto px-6">
          {/* Header */}
          <div className="py-16 border-b border-hairline">
            <SlashLabel number="001" title="returns" className="mb-4 block" />
            <h1 className="text-h1 text-ink mb-4">Returns & exchanges</h1>
            <p className="text-[16px] text-muted leading-relaxed">
              30-day free returns on everything. No restocking fees, no fine print.
            </p>
          </div>

          {/* Steps */}
          <div className="py-12 border-b border-hairline">
            <SlashLabel number="002" title="how it works" className="mb-8 block" />
            <div className="flex flex-col gap-5">
              {STEPS.map((step) => (
                <div key={step.number} className="flex gap-6 p-5 rounded-2xl border border-hairline">
                  <p className="text-[28px] font-medium text-hairline leading-none flex-shrink-0 select-none pt-1">
                    {step.number}
                  </p>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-[14px] font-medium text-ink">{step.headline}</p>
                    <p className="text-[14px] text-muted leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-11 px-7 rounded-full bg-ink text-bg text-[13px] font-medium hover:bg-ink/80 transition-colors"
              >
                Start a return →
              </Link>
            </div>
          </div>

          {/* FAQs */}
          <div className="py-12">
            <SlashLabel number="003" title="common questions" className="mb-8 block" />
            <div className="flex flex-col divide-y divide-hairline">
              {FAQS.map((item) => (
                <div key={item.q} className="py-6 flex flex-col gap-2">
                  <p className="text-[15px] font-medium text-ink">{item.q}</p>
                  <p className="text-[15px] text-muted leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
