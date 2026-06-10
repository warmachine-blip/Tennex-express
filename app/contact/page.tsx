import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/ui/ContactForm";
import { SlashLabel } from "@/components/ui/SlashLabel";

export const metadata: Metadata = {
  title: "Contact — Tennex Express",
  description: "Get in touch with the Tennex Express team.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <div className="max-w-[1280px] mx-auto px-6 py-16">
          <SlashLabel number="001" title="contact" className="mb-6 block" />
          <h1 className="text-h1 text-ink max-w-[480px] mb-3">
            Get in touch
          </h1>
          <p className="text-[16px] text-muted mb-12 max-w-[480px]">
            Orders, returns, sizing questions — we reply within 1 business day.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <ContactForm />

            {/* Info */}
            <div className="flex flex-col gap-8">
              <div>
                <SlashLabel number="002" title="email" className="mb-2 block" />
                <a
                  href="mailto:hello@tennexexpress.com"
                  className="text-[15px] text-ink hover:text-muted transition-colors underline underline-offset-4"
                >
                  hello@tennexexpress.com
                </a>
              </div>
              <div>
                <SlashLabel number="003" title="response time" className="mb-2 block" />
                <p className="text-[15px] text-muted">Within 1 business day, Mon–Fri</p>
              </div>
              <div>
                <SlashLabel number="004" title="returns" className="mb-2 block" />
                <p className="text-[15px] text-muted leading-relaxed">
                  30-day free returns on all orders. Email us for a prepaid label.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
