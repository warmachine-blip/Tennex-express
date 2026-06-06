"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement)?.value;
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return <p className="text-[13px] text-success">You're in. We'll be in touch.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        name="email"
        required
        placeholder="your@email.com"
        className="flex-1 min-w-0 rounded-full border border-hairline bg-surface px-4 py-2 text-[13px] text-ink placeholder:text-muted focus:outline-none focus:border-ink transition-colors"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-ink text-bg px-4 py-2 text-[13px] font-medium hover:bg-ink-soft transition-colors disabled:opacity-60"
      >
        {status === "loading" ? "..." : "Subscribe"}
      </button>
    </form>
  );
}
