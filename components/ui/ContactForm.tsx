"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "sent";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const data = new FormData(e.currentTarget);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
        }),
      });
    } finally {
      setStatus("sent");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col gap-4 py-10">
        <div className="w-10 h-10 rounded-full bg-ink flex items-center justify-center mb-2">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 9l4 4 6-7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="text-h3 text-ink">Message sent</h2>
        <p className="text-[15px] text-muted leading-relaxed max-w-[340px]">
          We'll get back to you at the email you provided within 1 business day.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-[13px] text-muted underline underline-offset-2 hover:text-ink transition-colors self-start mt-2 cursor-pointer"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
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
        disabled={status === "loading"}
        className="rounded-full bg-ink text-bg px-8 py-4 text-[14px] font-medium hover:bg-ink/80 transition-colors self-start disabled:opacity-60 cursor-pointer flex items-center gap-2"
      >
        {status === "loading" ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2"/>
              <path d="M14 8a6 6 0 00-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Sending…
          </>
        ) : (
          "Send message"
        )}
      </button>
    </form>
  );
}
