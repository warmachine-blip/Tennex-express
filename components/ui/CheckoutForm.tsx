"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

const SHIPPING_THRESHOLD = 75;
const STANDARD_SHIPPING = 4.99;
const EXPRESS_SHIPPING = 9.99;
const TAX_RATE = 0.08;

const PROMOS: Record<string, { type: "percent" | "fixed"; value: number }> = {
  "TENNEX10": { type: "percent", value: 0.1 },
  "RALLY5":   { type: "fixed",   value: 5 },
};

type Fields = {
  email: string; firstName: string; lastName: string;
  address: string; apt: string; city: string; state: string; zip: string;
  cardNumber: string; expiry: string; cvc: string; nameOnCard: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

function validateField(key: keyof Fields, fields: Fields): string | undefined {
  const v = fields[key];
  switch (key) {
    case "email":
      if (!v) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email";
      break;
    case "firstName": case "lastName": case "address":
    case "city": case "nameOnCard":
      if (!v) return "Required";
      break;
    case "state":
      if (!v) return "Required";
      if (v.length !== 2) return "Use 2-letter abbreviation";
      break;
    case "zip":
      if (!v) return "Required";
      if (!/^\d{5}$/.test(v)) return "5-digit ZIP required";
      break;
    case "cardNumber":
      if (!v) return "Required";
      if (v.replace(/\s/g, "").length !== 16) return "Enter a 16-digit card number";
      break;
    case "expiry": {
      if (!v) return "Required";
      const m = v.match(/^(\d{2})\s*\/\s*(\d{2})$/);
      if (!m) return "Use MM / YY";
      const month = parseInt(m[1]);
      const year = 2000 + parseInt(m[2]);
      const now = new Date();
      if (month < 1 || month > 12) return "Invalid month";
      if (year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1))
        return "Card expired";
      break;
    }
    case "cvc":
      if (!v) return "Required";
      if (v.length < 3) return "3 or 4 digits";
      break;
  }
}

function formatCard(v: string) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
}

function Field({
  label, value, onChange, onBlur, error,
  type = "text", placeholder, inputMode, maxLength, half,
}: {
  label: string; value: string;
  onChange: (v: string) => void; onBlur?: () => void; error?: string;
  type?: string; placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  maxLength?: number; half?: boolean;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${half ? "" : "col-span-2"}`}>
      <span className="text-[12px] font-medium text-muted">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        inputMode={inputMode}
        maxLength={maxLength}
        className={`w-full border rounded-[10px] px-4 py-3 text-[14px] text-ink bg-bg outline-none transition-colors duration-150 placeholder:text-muted/40 ${
          error ? "border-red-400 focus:border-red-400" : "border-hairline focus:border-ink"
        }`}
      />
      {error && <span className="text-[11px] text-red-500 mt-0.5">{error}</span>}
    </label>
  );
}

export function CheckoutForm() {
  const { items, total, clear } = useCart();

  const [fields, setFields] = useState<Fields>({
    email: "", firstName: "", lastName: "", address: "", apt: "",
    city: "", state: "", zip: "",
    cardNumber: "", expiry: "", cvc: "", nameOnCard: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [confirmedEmail, setConfirmedEmail] = useState("");
  const [confirmedItems, setConfirmedItems] = useState<typeof items>([]);
  const [confirmedTotal, setConfirmedTotal] = useState(0);
  const [confirmedShipping, setConfirmedShipping] = useState<"standard" | "express">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "stripe">("card");
  const [orderNumber] = useState(
    () => `TNX-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
  );

  function set(key: keyof Fields) {
    return (v: string) => setFields((f) => ({ ...f, [key]: v }));
  }

  function touch(key: keyof Fields) {
    return () => {
      const err = validateField(key, fields);
      setErrors((e) => ({ ...e, [key]: err }));
    };
  }

  const promoDiscount = appliedPromo
    ? PROMOS[appliedPromo].type === "percent"
      ? total * PROMOS[appliedPromo].value
      : Math.min(total, PROMOS[appliedPromo].value)
    : 0;
  const discountedSubtotal = total - promoDiscount;
  const shipping = shippingMethod === "express"
    ? EXPRESS_SHIPPING
    : discountedSubtotal >= SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
  const tax = discountedSubtotal * TAX_RATE;
  const grandTotal = discountedSubtotal + shipping + tax;

  function applyPromo() {
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    if (PROMOS[code]) {
      setAppliedPromo(code);
      setPromoError("");
      setPromoInput("");
    } else {
      setPromoError("Invalid promo code");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const allKeys: (keyof Fields)[] = [
      "email", "firstName", "lastName", "address", "city", "state", "zip",
      ...(paymentMethod === "card"
        ? (["cardNumber", "nameOnCard", "expiry", "cvc"] as (keyof Fields)[])
        : []),
    ];
    const newErrors: Errors = {};
    for (const key of allKeys) {
      const err = validateField(key, fields);
      if (err) newErrors[key] = err;
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    setConfirmedEmail(fields.email);
    setConfirmedItems([...items]);
    setConfirmedTotal(grandTotal);
    setConfirmedShipping(shippingMethod);

    fetch("/api/order-confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: fields.email,
        firstName: fields.firstName,
        orderNumber,
        items: items.map((i) => ({
          name: i.name,
          variantLabel: i.variantLabel,
          quantity: i.quantity,
          price: i.price,
        })),
        shippingMethod,
        subtotal: total,
        promoDiscount,
        shipping,
        tax,
        grandTotal,
      }),
    }).finally(() => {
      clear();
      setConfirmed(true);
      setLoading(false);
    });
  }

  /* ── Empty cart ── */
  if (items.length === 0 && !confirmed) {
    return (
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col items-center gap-4 py-24 text-center">
        <p className="text-[15px] text-muted">Your cart is empty.</p>
        <Link
          href="/shop"
          className="text-[14px] font-medium text-ink underline underline-offset-2 hover:opacity-70 transition-opacity"
        >
          Browse products →
        </Link>
      </div>
    );
  }

  /* ── Confirmation ── */
  if (confirmed) {
    const deliveryDays = confirmedShipping === "express" ? "1–2" : "2–5";
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + (confirmedShipping === "express" ? 2 : 5));
    const formattedDate = deliveryDate.toLocaleDateString("en-US", {
      weekday: "long", month: "long", day: "numeric",
    });

    return (
      <div className="max-w-[520px] mx-auto px-6 py-16 flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-14 h-14 rounded-full bg-ink flex items-center justify-center flex-shrink-0">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M4 11L9 16L18 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h1 className="text-h2 text-ink">Order confirmed</h1>
            <p className="text-[13px] text-muted mt-1.5 leading-relaxed">
              A confirmation has been sent to{" "}
              <span className="text-ink font-medium">{confirmedEmail}</span>
            </p>
          </div>
        </div>

        {/* Receipt card */}
        <div className="border border-hairline rounded-[16px] overflow-hidden">
          {/* Order number bar */}
          <div className="bg-hairline/30 px-5 py-4 flex items-center justify-between border-b border-hairline">
            <span className="text-[11px] font-medium text-muted tracking-[0.06em] uppercase">Order number</span>
            <span className="text-[13px] font-medium text-ink font-mono tracking-wider">{orderNumber}</span>
          </div>

          {/* Items */}
          <ul className="divide-y divide-hairline">
            {confirmedItems.map((item) => (
              <li
                key={`${item.productId}:${item.variantId ?? ""}`}
                className="flex items-center gap-3 px-5 py-4"
              >
                <div className="relative w-12 h-12 rounded-[8px] border border-hairline overflow-hidden bg-bg flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill sizes="48px" className="object-contain p-1" />
                  <span className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-ink text-bg text-[9px] font-medium rounded-full flex items-center justify-center leading-none">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-ink leading-snug line-clamp-1">{item.name}</p>
                  {item.variantLabel && (
                    <p className="text-[11px] text-muted mt-0.5">{item.variantLabel}</p>
                  )}
                </div>
                <span className="text-[13px] text-muted flex-shrink-0">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          {/* Totals + delivery */}
          <div className="bg-hairline/30 px-5 py-4 flex flex-col gap-2 border-t border-hairline">
            <div className="flex justify-between text-[13px]">
              <span className="text-muted">Total charged</span>
              <span className="font-medium text-ink">${confirmedTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-muted">Estimated delivery</span>
              <span className="text-ink">{deliveryDays} business days · by {formattedDate}</span>
            </div>
          </div>
        </div>

        {/* Next steps */}
        <div className="text-center flex flex-col gap-5">
          <p className="text-[13px] text-muted leading-relaxed">
            Keep your order number handy if you need to contact support. We&apos;ll
            send a tracking link once your order leaves our warehouse.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center bg-ink text-bg text-[14px] font-medium px-8 py-3.5 rounded-full hover:bg-ink/90 transition-colors duration-150"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  /* ── Checkout form ── */
  return (
    <div className="max-w-[1280px] mx-auto px-6">
      <div className="py-10 border-b border-hairline mb-10">
        <Link
          href="/shop"
          className="text-[13px] text-muted hover:text-ink transition-colors duration-150"
        >
          ← Back to shop
        </Link>
        <h1 className="text-h1 text-ink mt-3">Checkout</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 pb-20"
      >
        {/* ── Left: form ── */}
        <div className="flex flex-col gap-10">

          {/* Contact */}
          <section>
            <h2 className="text-[11px] font-medium text-muted tracking-[0.08em] uppercase mb-5">
              Contact
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Email"
                type="email"
                value={fields.email}
                onChange={set("email")}
                onBlur={touch("email")}
                error={errors.email}
                placeholder="you@example.com"
              />
            </div>
          </section>

          {/* Shipping address */}
          <section>
            <h2 className="text-[11px] font-medium text-muted tracking-[0.08em] uppercase mb-5">
              Shipping address
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <Field label="First name" value={fields.firstName} onChange={set("firstName")} onBlur={touch("firstName")} error={errors.firstName} half />
              <Field label="Last name" value={fields.lastName} onChange={set("lastName")} onBlur={touch("lastName")} error={errors.lastName} half />
              <Field label="Address" value={fields.address} onChange={set("address")} onBlur={touch("address")} error={errors.address} placeholder="123 Main St" />
              <Field label="Apt, suite, etc. (optional)" value={fields.apt} onChange={set("apt")} />
              <Field label="City" value={fields.city} onChange={set("city")} onBlur={touch("city")} error={errors.city} half />
              <Field label="State" value={fields.state} onChange={set("state")} onBlur={touch("state")} error={errors.state} maxLength={2} placeholder="NY" half />
              <Field label="ZIP code" value={fields.zip} onChange={set("zip")} onBlur={touch("zip")} error={errors.zip} maxLength={5} inputMode="numeric" placeholder="10001" half />
            </div>
          </section>

          {/* Shipping method */}
          <section>
            <h2 className="text-[11px] font-medium text-muted tracking-[0.08em] uppercase mb-5">
              Shipping method
            </h2>
            <div className="flex flex-col gap-3">
              {[
                {
                  id: "standard" as const,
                  label: "Standard",
                  detail: discountedSubtotal >= SHIPPING_THRESHOLD
                    ? "Free · 2–5 business days"
                    : `$${STANDARD_SHIPPING.toFixed(2)} · 2–5 business days`,
                },
                {
                  id: "express" as const,
                  label: "Express",
                  detail: `$${EXPRESS_SHIPPING.toFixed(2)} · 1–2 business days`,
                },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center gap-4 p-4 border-2 rounded-[12px] cursor-pointer transition-colors duration-150 ${
                    shippingMethod === method.id
                      ? "border-ink bg-ink/[0.03]"
                      : "border-hairline hover:border-ink/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="shippingMethod"
                    value={method.id}
                    checked={shippingMethod === method.id}
                    onChange={() => setShippingMethod(method.id)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-150 ${
                    shippingMethod === method.id ? "border-ink" : "border-hairline"
                  }`}>
                    {shippingMethod === method.id && (
                      <div className="w-2 h-2 rounded-full bg-ink" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] font-medium text-ink">{method.label}</p>
                    <p className="text-[12px] text-muted">{method.detail}</p>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Payment */}
          <section>
            <h2 className="text-[11px] font-medium text-muted tracking-[0.08em] uppercase mb-5">
              Payment
            </h2>

            {/* Method tabs */}
            <div className="flex rounded-[12px] border border-hairline p-1 gap-1 mb-5 bg-hairline/20">
              {(["card", "paypal", "stripe"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setPaymentMethod(m)}
                  className={`flex-1 py-2 rounded-[8px] text-[13px] font-medium transition-colors duration-150 ${
                    paymentMethod === m
                      ? "bg-ink text-bg shadow-sm"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {m === "card" ? "Card" : m === "paypal" ? "PayPal" : "Stripe"}
                </button>
              ))}
            </div>

            {paymentMethod === "card" && (
              <>
                {/* Card brand logos */}
                <div className="flex gap-2 flex-wrap mb-4">
                  {/* Visa */}
                  <svg width="40" height="26" viewBox="0 0 40 26" aria-label="Visa">
                    <rect width="40" height="26" rx="4" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
                    <text x="20" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="800" fontStyle="italic" fill="#1A1F71" textAnchor="middle">VISA</text>
                  </svg>
                  {/* Mastercard */}
                  <svg width="40" height="26" viewBox="0 0 40 26" aria-label="Mastercard">
                    <rect width="40" height="26" rx="4" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
                    <circle cx="15" cy="13" r="7" fill="#EB001B"/>
                    <circle cx="25" cy="13" r="7" fill="#F79E1B"/>
                    <path d="M20 8.1 A7 7 0 0 0 20 17.9 A7 7 0 0 0 20 8.1 Z" fill="#FF5F00"/>
                  </svg>
                  {/* Amex */}
                  <svg width="40" height="26" viewBox="0 0 40 26" aria-label="American Express">
                    <rect width="40" height="26" rx="4" fill="#2E77BC"/>
                    <text x="20" y="17" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="white" textAnchor="middle" letterSpacing="0.5">AMEX</text>
                  </svg>
                  {/* Discover */}
                  <svg width="40" height="26" viewBox="0 0 40 26" aria-label="Discover">
                    <rect width="40" height="26" rx="4" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
                    <circle cx="28" cy="13" r="8" fill="#FF6600"/>
                    <text x="12" y="17" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="#231F20" textAnchor="middle">DISC</text>
                  </svg>
                  {/* JCB */}
                  <svg width="40" height="26" viewBox="0 0 40 26" aria-label="JCB">
                    <rect width="40" height="26" rx="4" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
                    <rect x="5" y="5" width="10" height="16" rx="3" fill="#003087"/>
                    <rect x="15" y="5" width="10" height="16" rx="3" fill="#CC0000"/>
                    <rect x="25" y="5" width="10" height="16" rx="3" fill="#008000"/>
                    <text x="10" y="16.5" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">J</text>
                    <text x="20" y="16.5" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">C</text>
                    <text x="30" y="16.5" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">B</text>
                  </svg>
                  {/* UnionPay */}
                  <svg width="40" height="26" viewBox="0 0 40 26" aria-label="UnionPay">
                    <rect width="40" height="26" rx="4" fill="#E21836"/>
                    <text x="20" y="16" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="white" textAnchor="middle">UP</text>
                  </svg>
                </div>

                {/* Card fields */}
                <div className="grid grid-cols-2 gap-3">
                  <Field
                    label="Card number"
                    value={fields.cardNumber}
                    onChange={(v) => set("cardNumber")(formatCard(v))}
                    onBlur={touch("cardNumber")}
                    error={errors.cardNumber}
                    placeholder="1234 5678 9012 3456"
                    inputMode="numeric"
                  />
                  <Field label="Name on card" value={fields.nameOnCard} onChange={set("nameOnCard")} onBlur={touch("nameOnCard")} error={errors.nameOnCard} half />
                  <Field
                    label="Expiry"
                    value={fields.expiry}
                    onChange={(v) => set("expiry")(formatExpiry(v))}
                    onBlur={touch("expiry")}
                    error={errors.expiry}
                    placeholder="MM / YY"
                    inputMode="numeric"
                    half
                  />
                  <Field
                    label="CVC"
                    value={fields.cvc}
                    onChange={(v) => set("cvc")(v.replace(/\D/g, "").slice(0, 4))}
                    onBlur={touch("cvc")}
                    error={errors.cvc}
                    placeholder="123"
                    inputMode="numeric"
                    half
                  />
                </div>
              </>
            )}

            {paymentMethod === "paypal" && (
              <div className="flex flex-col items-center gap-4 py-8 border border-hairline rounded-[12px] px-6 bg-[#003087]/[0.02]">
                <div className="flex items-center gap-0 select-none">
                  <span style={{color:"#003087",fontWeight:800,fontSize:26,fontStyle:"italic",fontFamily:"Arial,sans-serif",letterSpacing:"-0.5px"}}>Pay</span>
                  <span style={{color:"#009CDE",fontWeight:800,fontSize:26,fontStyle:"italic",fontFamily:"Arial,sans-serif",letterSpacing:"-0.5px"}}>Pal</span>
                </div>
                <p className="text-[13px] text-muted text-center leading-relaxed max-w-xs">
                  You&apos;ll be redirected to PayPal to complete your payment securely after reviewing your order.
                </p>
                <div className="flex items-center gap-2 text-[12px] text-muted">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  PayPal Buyer Protection included
                </div>
              </div>
            )}

            {paymentMethod === "stripe" && (
              <div className="flex flex-col items-center gap-4 py-8 border border-hairline rounded-[12px] px-6 bg-[#635BFF]/[0.02]">
                <div className="flex items-center gap-2 select-none">
                  <div style={{width:36,height:36,borderRadius:8,background:"#635BFF",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <span style={{color:"white",fontWeight:800,fontSize:20,fontFamily:"Arial,sans-serif"}}>S</span>
                  </div>
                  <span style={{color:"#635BFF",fontWeight:600,fontSize:22,fontFamily:"Arial,sans-serif",letterSpacing:"-0.3px"}}>stripe</span>
                </div>
                <p className="text-[13px] text-muted text-center leading-relaxed max-w-xs">
                  You&apos;ll be redirected to Stripe to complete your payment securely after reviewing your order.
                </p>
                <div className="flex items-center gap-2 text-[12px] text-muted">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  256-bit TLS encryption
                </div>
              </div>
            )}
          </section>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink text-bg text-[14px] font-medium py-4 rounded-full hover:bg-ink/90 transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Placing order…
              </>
            ) : `Pay $${grandTotal.toFixed(2)}`}
          </button>

          <p className="text-[11px] text-muted text-center -mt-6">
            This is a demo store. No real payment is processed.
          </p>
        </div>

        {/* ── Right: order summary ── */}
        <aside className="h-fit lg:sticky lg:top-24 border border-hairline rounded-[16px] bg-hairline/20 p-6">
          <h2 className="text-[11px] font-medium text-muted tracking-[0.08em] uppercase mb-5">
            Order summary
          </h2>

          <ul className="flex flex-col divide-y divide-hairline mb-5">
            {items.map((item) => (
              <li
                key={`${item.productId}:${item.variantId ?? ""}`}
                className="flex items-start gap-3 py-4"
              >
                <div className="relative flex-shrink-0 w-[56px] h-[56px] rounded-[8px] overflow-hidden bg-bg border border-hairline">
                  <Image src={item.image} alt={item.name} fill sizes="56px" className="object-contain p-1" />
                  <span className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] bg-ink text-bg text-[10px] font-medium rounded-full flex items-center justify-center leading-none">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-ink leading-snug line-clamp-2">{item.name}</p>
                  {item.variantLabel && (
                    <p className="text-[11px] text-muted mt-0.5">{item.variantLabel}</p>
                  )}
                </div>
                <span className="text-[13px] font-medium text-ink flex-shrink-0">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          {/* Promo code */}
          <div className="mb-5 pb-5 border-b border-hairline">
            {appliedPromo ? (
              <div className="flex items-center justify-between">
                <p className="text-[12px] text-green-600 font-medium">
                  "{appliedPromo}" applied
                </p>
                <button
                  type="button"
                  onClick={() => setAppliedPromo(null)}
                  className="text-[11px] text-muted hover:text-ink transition-colors duration-150 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ) : (
              <>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => { setPromoInput(e.target.value.toUpperCase()); setPromoError(""); }}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); applyPromo(); } }}
                    placeholder="Promo code"
                    className="flex-1 border border-hairline rounded-[10px] px-3 py-2.5 text-[13px] text-ink bg-bg outline-none focus:border-ink transition-colors duration-150 placeholder:text-muted/40"
                  />
                  <button
                    type="button"
                    onClick={applyPromo}
                    className="px-4 py-2.5 border border-hairline rounded-[10px] text-[13px] font-medium text-ink hover:bg-hairline transition-colors duration-150 cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-[11px] text-red-500 mt-1.5">{promoError}</p>
                )}
              </>
            )}
          </div>

          {/* Totals */}
          <div className="flex flex-col gap-2 text-[13px]">
            <div className="flex justify-between text-muted">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            {promoDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>−${promoDiscount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-muted">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-ink text-[15px] pt-3 border-t border-hairline mt-1">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {shipping > 0 && shippingMethod === "standard" && (
            <p className="text-[11px] text-muted mt-4 leading-relaxed">
              Add ${(SHIPPING_THRESHOLD - discountedSubtotal).toFixed(2)} more for free shipping.
            </p>
          )}
        </aside>
      </form>
    </div>
  );
}
