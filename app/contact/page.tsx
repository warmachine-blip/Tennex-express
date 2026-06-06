import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
            {/* Form */}
            <form
              action="/api/lead"
              method="POST"
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-[13px] font-medium text-ink">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="rounded-2xl border border-hairline bg-surface px-5 py-3.5 text-[14px] text-ink placeholder:text-muted focus:outline-none focus:border-ink transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-[13px] font-medium text-ink">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="rounded-2xl border border-hairline bg-surface px-5 py-3.5 text-[14px] text-ink placeholder:text-muted focus:outline-none focus:border-ink transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-[13px] font-medium text-ink">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="rounded-2xl border border-hairline bg-surface px-5 py-3.5 text-[14px] text-ink focus:outline-none focus:border-ink transition-colors appearance-none"
                >
                  <option value="order">Order question</option>
                  <option value="return">Return or exchange</option>
                  <option value="sizing">Sizing help</option>
                  <option value="other">Something else</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-[13px] font-medium text-ink">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us what you need..."
                  className="rounded-2xl border border-hairline bg-surface px-5 py-3.5 text-[14px] text-ink placeholder:text-muted focus:outline-none focus:border-ink transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="rounded-full bg-ink text-bg px-8 py-4 text-[14px] font-medium hover:bg-ink-soft transition-colors self-start"
              >
                Send message
              </button>
            </form>

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
