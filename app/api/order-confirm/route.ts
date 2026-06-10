import { Resend } from "resend";
import { NextRequest } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderItem {
  name: string;
  variantLabel?: string;
  quantity: number;
  price: number;
}

interface OrderPayload {
  email: string;
  firstName: string;
  orderNumber: string;
  items: OrderItem[];
  shippingMethod: "standard" | "express";
  subtotal: number;
  promoDiscount: number;
  shipping: number;
  tax: number;
  grandTotal: number;
}

function buildEmailHtml(order: OrderPayload): string {
  const deliveryDays = order.shippingMethod === "express" ? "1–2" : "2–5";
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + (order.shippingMethod === "express" ? 2 : 5));
  const formattedDate = deliveryDate.toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });

  const itemRows = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;">
          <span style="font-size:14px;color:#111827;font-weight:500;">${item.name}</span>
          ${item.variantLabel ? `<br><span style="font-size:12px;color:#6b7280;">${item.variantLabel}</span>` : ""}
        </td>
        <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;text-align:center;color:#6b7280;font-size:13px;">×${item.quantity}</td>
        <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;text-align:right;font-size:14px;color:#111827;">$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>`
    )
    .join("");

  const promoRow = order.promoDiscount > 0
    ? `<tr><td style="padding:4px 0;font-size:13px;color:#6b7280;">Discount</td><td></td><td style="padding:4px 0;text-align:right;font-size:13px;color:#16a34a;">−$${order.promoDiscount.toFixed(2)}</td></tr>`
    : "";

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;border:1px solid #e5e7eb;overflow:hidden;">

        <!-- Header -->
        <tr><td style="background:#111827;padding:32px 40px;text-align:center;">
          <p style="margin:0;font-size:13px;font-weight:600;letter-spacing:0.08em;color:#9ca3af;text-transform:uppercase;">Tennex Express</p>
          <h1 style="margin:12px 0 0;font-size:24px;font-weight:600;color:#ffffff;">Order confirmed</h1>
        </td></tr>

        <!-- Greeting -->
        <tr><td style="padding:32px 40px 0;">
          <p style="margin:0;font-size:15px;color:#374151;line-height:1.6;">
            Hi ${order.firstName}, thanks for your order! We&rsquo;re getting it ready and will send a tracking link once it ships.
          </p>
        </td></tr>

        <!-- Order number -->
        <tr><td style="padding:24px 40px 0;">
          <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:16px 20px;display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:500;letter-spacing:0.06em;color:#6b7280;text-transform:uppercase;">Order number</span>
            <span style="font-size:14px;font-weight:600;color:#111827;font-family:monospace;letter-spacing:0.05em;">${order.orderNumber}</span>
          </div>
        </td></tr>

        <!-- Items -->
        <tr><td style="padding:24px 40px 0;">
          <p style="margin:0 0 12px;font-size:12px;font-weight:500;letter-spacing:0.06em;color:#6b7280;text-transform:uppercase;">Your order</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            ${itemRows}
          </table>
        </td></tr>

        <!-- Totals -->
        <tr><td style="padding:20px 40px 0;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:4px 0;font-size:13px;color:#6b7280;">Subtotal</td><td></td><td style="padding:4px 0;text-align:right;font-size:13px;color:#6b7280;">$${order.subtotal.toFixed(2)}</td></tr>
            ${promoRow}
            <tr><td style="padding:4px 0;font-size:13px;color:#6b7280;">Shipping</td><td></td><td style="padding:4px 0;text-align:right;font-size:13px;color:#6b7280;">${order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}</td></tr>
            <tr><td style="padding:4px 0;font-size:13px;color:#6b7280;">Tax</td><td></td><td style="padding:4px 0;text-align:right;font-size:13px;color:#6b7280;">$${order.tax.toFixed(2)}</td></tr>
            <tr><td style="padding:12px 0 0;font-size:15px;font-weight:600;color:#111827;border-top:1px solid #e5e7eb;">Total</td><td></td><td style="padding:12px 0 0;text-align:right;font-size:15px;font-weight:600;color:#111827;border-top:1px solid #e5e7eb;">$${order.grandTotal.toFixed(2)}</td></tr>
          </table>
        </td></tr>

        <!-- Delivery estimate -->
        <tr><td style="padding:24px 40px;">
          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:16px 20px;">
            <p style="margin:0;font-size:13px;color:#166534;">
              <strong>Estimated delivery:</strong> ${deliveryDays} business days &mdash; by ${formattedDate}
            </p>
          </div>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:0 40px 32px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6;">
            Keep your order number handy if you need to contact support.<br>
            Questions? Reply to this email or visit <a href="https://tennexexpress.com/contact" style="color:#6b7280;">tennexexpress.com/contact</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const order = (await req.json()) as OrderPayload;

    await resend.emails.send({
      from: "Tennex Express <onboarding@resend.dev>",
      to: order.email,
      subject: `Order confirmed — ${order.orderNumber}`,
      html: buildEmailHtml(order),
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("order-confirm email failed:", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}
