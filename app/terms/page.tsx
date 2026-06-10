import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SlashLabel } from "@/components/ui/SlashLabel";

export const metadata: Metadata = {
  title: "Terms of service — Tennex Express",
  description: "Terms governing purchases and use of the Tennex Express website.",
};

const SECTIONS = [
  {
    number: "001",
    title: "acceptance",
    body: [
      "By using tennexexpress.com or placing an order you agree to these terms. If you do not agree, do not use the site.",
    ],
  },
  {
    number: "002",
    title: "orders & pricing",
    body: [
      "All prices are in USD and include applicable taxes at checkout. We reserve the right to correct pricing errors — if a product was listed at an incorrect price we will contact you before processing the order.",
      "An order confirmation email does not constitute acceptance of your order. We reserve the right to cancel orders for any reason, including pricing errors or suspected fraud, with a full refund.",
    ],
  },
  {
    number: "003",
    title: "products",
    body: [
      "All products sold on Tennex Express are sold under the Tennex Express brand and are not affiliated with Wilson, Babolat, Head, or any other third-party brand unless explicitly stated.",
      "Product images, descriptions, and specifications are provided in good faith. Minor variations in color and finish between the product image and the physical product may occur.",
    ],
  },
  {
    number: "004",
    title: "shipping & delivery",
    body: [
      "Delivery times are estimates, not guarantees. We are not liable for carrier delays outside our control.",
      "Risk of loss and title for products pass to you upon delivery to the carrier.",
    ],
  },
  {
    number: "005",
    title: "returns",
    body: [
      "Our return policy is described on the Returns page. The terms of that policy are incorporated into these terms by reference.",
    ],
  },
  {
    number: "006",
    title: "intellectual property",
    body: [
      "The Tennex Express name, logo, and all site content are the property of Tennex Express. You may not reproduce, distribute, or create derivative works without our written permission.",
    ],
  },
  {
    number: "007",
    title: "limitation of liability",
    body: [
      "To the maximum extent permitted by law, Tennex Express is not liable for any indirect, incidental, special, or consequential damages arising from your use of the site or products.",
      "Our total liability for any claim arising from a purchase is limited to the amount you paid for the relevant order.",
    ],
  },
  {
    number: "008",
    title: "governing law",
    body: [
      "These terms are governed by the laws of the State of Delaware. Any dispute shall be resolved in the courts of Delaware.",
    ],
  },
  {
    number: "009",
    title: "changes",
    body: [
      "We may update these terms from time to time. The date of the most recent revision appears at the bottom of this page. Continued use of the site after a change constitutes acceptance.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <div className="max-w-[780px] mx-auto px-6">
          <div className="py-16 border-b border-hairline">
            <SlashLabel number="001" title="legal" className="mb-4 block" />
            <h1 className="text-h1 text-ink mb-4">Terms of service</h1>
            <p className="text-[14px] text-muted">Last updated: May 1, 2026</p>
          </div>

          <div className="py-12 flex flex-col gap-12">
            {SECTIONS.map((section) => (
              <div key={section.number}>
                <SlashLabel number={section.number} title={section.title} className="mb-4 block" />
                <div className="flex flex-col gap-4">
                  {section.body.map((para, i) => (
                    <p key={i} className="text-[15px] text-muted leading-relaxed">{para}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
