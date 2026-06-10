import { Resend } from "resend";
import { NextRequest } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>You're on the list — Tennex Express</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f3f4f0;padding:48px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:540px;">

        <!-- Logo bar -->
        <tr><td style="padding:0 0 24px;text-align:center;">
          <span style="font-size:13px;font-weight:700;letter-spacing:0.12em;color:#6b7280;text-transform:uppercase;">Tennex Express</span>
        </td></tr>

        <!-- Hero card -->
        <tr><td style="background:#0f172a;border-radius:20px 20px 0 0;padding:48px 48px 40px;text-align:center;">
          <!-- Tennis ball icon -->
          <div style="display:inline-block;width:56px;height:56px;background:#facc15;border-radius:50%;margin-bottom:24px;line-height:56px;font-size:28px;">&#9898;</div>
          <h1 style="margin:0 0 12px;font-size:32px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;line-height:1.2;">You&rsquo;re on<br>the list.</h1>
          <p style="margin:0;font-size:16px;color:#94a3b8;line-height:1.6;">Welcome to the Tennex Express inner circle.</p>
        </td></tr>

        <!-- Body card -->
        <tr><td style="background:#ffffff;padding:40px 48px;">

          <!-- What to expect -->
          <p style="margin:0 0 28px;font-size:15px;color:#374151;line-height:1.7;">
            You&rsquo;ll be the first to know about:
          </p>

          <!-- Perks list -->
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;">
                <table cellpadding="0" cellspacing="0" role="presentation"><tr>
                  <td style="width:32px;font-size:18px;vertical-align:top;padding-top:1px;">&#127921;</td>
                  <td style="font-size:14px;color:#374151;line-height:1.5;padding-left:4px;"><strong style="color:#111827;">New gear drops</strong> &mdash; racquets, strings, bags, and apparel before they sell out</td>
                </tr></table>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;">
                <table cellpadding="0" cellspacing="0" role="presentation"><tr>
                  <td style="width:32px;font-size:18px;vertical-align:top;padding-top:1px;">&#127381;</td>
                  <td style="font-size:14px;color:#374151;line-height:1.5;padding-left:4px;"><strong style="color:#111827;">Exclusive deals</strong> &mdash; subscriber-only promo codes and flash sales</td>
                </tr></table>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;">
                <table cellpadding="0" cellspacing="0" role="presentation"><tr>
                  <td style="width:32px;font-size:18px;vertical-align:top;padding-top:1px;">&#128218;</td>
                  <td style="font-size:14px;color:#374151;line-height:1.5;padding-left:4px;"><strong style="color:#111827;">Gear guides</strong> &mdash; practical tips on choosing racquets, stringing, and improving your game</td>
                </tr></table>
              </td>
            </tr>
          </table>

          <!-- CTA -->
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:36px;">
            <tr><td align="center">
              <a href="https://tennexexpress.com/shop"
                 style="display:inline-block;background:#111827;color:#ffffff;font-size:14px;font-weight:600;padding:16px 40px;border-radius:999px;text-decoration:none;letter-spacing:0.01em;">
                Browse the shop &rarr;
              </a>
            </td></tr>
          </table>

        </td></tr>

        <!-- Promo hint -->
        <tr><td style="background:#fefce8;border:1px solid #fde68a;border-radius:0 0 4px 4px;padding:20px 48px;text-align:center;">
          <p style="margin:0;font-size:13px;color:#92400e;line-height:1.5;">
            <strong>Tip:</strong> Use code <span style="font-family:monospace;font-weight:700;background:#fef3c7;padding:2px 6px;border-radius:4px;">TENNEX10</span> for 10% off your first order.
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:28px 0;text-align:center;">
          <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.8;">
            Tennex Express &mdash; Real tennis gear, real prices.<br>
            <a href="https://tennexexpress.com/contact" style="color:#9ca3af;">Unsubscribe</a>
            &nbsp;&middot;&nbsp;
            <a href="https://tennexexpress.com/contact" style="color:#9ca3af;">Contact us</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

export async function POST(req: NextRequest) {
  try {
    const { email } = (await req.json()) as { email: string };
    if (!email) return Response.json({ ok: false }, { status: 400 });

    await resend.emails.send({
      from: "Tennex Express <onboarding@resend.dev>",
      to: email,
      subject: "You're on the list — Tennex Express",
      html,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("newsletter email failed:", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}
