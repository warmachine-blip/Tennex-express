import { Resend } from "resend";
import { NextRequest } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFY_EMAIL = "alexeiborbot@gmail.com";

const subjectLabels: Record<string, string> = {
  order: "Order question",
  return: "Return or exchange",
  sizing: "Sizing help",
  other: "Something else",
};

function buildHtml(name: string, email: string, subject: string, message: string) {
  const subjectLabel = subjectLabels[subject] ?? subject;
  const safeMessage = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>New contact message — Tennex Express</title>
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
        <tr><td style="background:#0f172a;border-radius:20px 20px 0 0;padding:40px 48px 36px;">
          <p style="margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:0.1em;color:#64748b;text-transform:uppercase;">New message</p>
          <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;line-height:1.2;">Contact form submission</h1>
        </td></tr>

        <!-- Details card -->
        <tr><td style="background:#ffffff;padding:36px 48px;">

          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;">
                <span style="font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.06em;">From</span><br>
                <span style="font-size:15px;color:#111827;">${name}</span>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;">
                <span style="font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.06em;">Email</span><br>
                <a href="mailto:${email}" style="font-size:15px;color:#2563eb;text-decoration:none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;">
                <span style="font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.06em;">Subject</span><br>
                <span style="font-size:15px;color:#111827;">${subjectLabel}</span>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 0 0;">
                <span style="font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.06em;">Message</span><br>
                <p style="margin:8px 0 0;font-size:15px;color:#374151;line-height:1.7;">${safeMessage}</p>
              </td>
            </tr>
          </table>

          <!-- Reply CTA -->
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:32px;">
            <tr><td>
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subjectLabel)} — Tennex Express"
                 style="display:inline-block;background:#111827;color:#ffffff;font-size:14px;font-weight:600;padding:14px 32px;border-radius:999px;text-decoration:none;">
                Reply to ${name} &rarr;
              </a>
            </td></tr>
          </table>

        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 0;text-align:center;">
          <p style="margin:0;font-size:12px;color:#9ca3af;">Tennex Express &mdash; store contact notification</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, subject, message } = body as Record<string, string>;

    if (!email || !String(email).includes("@")) {
      return Response.json({ error: "Invalid email" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Tennex Express <onboarding@resend.dev>",
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: `[Contact] ${subjectLabels[subject] ?? subject} — from ${name}`,
      html: buildHtml(name, email, subject, message),
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("lead email failed:", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}
