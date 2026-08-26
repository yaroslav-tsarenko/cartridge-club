import "server-only";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_SECURE === "true", // false → STARTTLS on 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM = process.env.SMTP_FROM ?? process.env.SMTP_USER;
const SITE = process.env.NEXT_PUBLIC_SITE_NAME ?? "Cartridge Club";

export async function sendMail(opts: {
  to: string;
  subject: string;
  html: string;
  text?: string;
  attachments?: { filename: string; content: Buffer; contentType?: string }[];
}) {
  return transporter.sendMail({
    from: FROM,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
    attachments: opts.attachments,
  });
}

export function verifyTransport() {
  return transporter.verify();
}

// ── Shared layout ────────────────────────────────────────
function layout(title: string, body: string): string {
  return `<!doctype html><html><body style="margin:0;background:#f4efe6;font-family:Arial,Helvetica,sans-serif;color:#1e2433">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px">
    <table width="560" cellpadding="0" cellspacing="0" style="background:#fffdf8;border:2px solid #1e2433;border-radius:14px;overflow:hidden">
      <tr><td style="background:#1e2433;padding:18px 24px">
        <span style="color:#fff;font-size:20px;font-weight:800;letter-spacing:-.5px">CARTRIDGE<span style="color:#e5484d">·</span><span style="color:#2b5ce6">CLUB</span></span>
      </td></tr>
      <tr><td style="padding:28px 24px">
        <h1 style="margin:0 0 12px;font-size:20px">${title}</h1>
        ${body}
      </td></tr>
      <tr><td style="padding:18px 24px;border-top:1px solid #e6ddca;font-size:12px;color:#6b7280">
        ${SITE} — official game keys, instant email delivery.<br/>
        ALDERROCK LTD · Company No. 17381132 · Dept 6984, 196 High Road, Wood Green, London, N22 8HH, United Kingdom.
      </td></tr>
    </table>
  </td></tr></table></body></html>`;
}

const btn = (href: string, label: string) =>
  `<a href="${href}" style="display:inline-block;background:#2b5ce6;color:#fff;text-decoration:none;padding:12px 22px;border-radius:10px;font-weight:700">${label}</a>`;

// ── Templates ────────────────────────────────────────────
export function welcomeEmail(name: string, verifyUrl: string) {
  return layout(
    `Welcome to the club, ${name}!`,
    `<p style="font-size:15px;line-height:1.6">Your account is ready. Confirm your email to unlock instant key delivery and member deals.</p>
     <p style="margin:22px 0">${btn(verifyUrl, "Confirm my email")}</p>
     <p style="font-size:13px;color:#6b7280">If the button doesn't work, paste this link:<br/>${verifyUrl}</p>`
  );
}

export function resetEmail(resetUrl: string) {
  return layout(
    "Reset your password",
    `<p style="font-size:15px;line-height:1.6">We received a request to reset your password. This link expires in 1 hour.</p>
     <p style="margin:22px 0">${btn(resetUrl, "Choose a new password")}</p>
     <p style="font-size:13px;color:#6b7280">Didn't ask for this? You can safely ignore this email.<br/>${resetUrl}</p>`
  );
}

export function orderEmail(opts: {
  orderId: string;
  name: string;
  lines: { name: string; qty: number; keys: string[] }[];
  total: string;
}) {
  const rows = opts.lines
    .map(
      (l) => `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #e6ddca">
          <strong>${l.name}</strong> × ${l.qty}
          ${l.keys
            .map(
              (k) =>
                `<div style="margin-top:6px;font-family:monospace;background:#f4efe6;border:1px solid #e6ddca;border-radius:6px;padding:8px">${k}</div>`
            )
            .join("")}
        </td></tr>`
    )
    .join("");
  return layout(
    `Order ${opts.orderId} confirmed`,
    `<p style="font-size:15px;line-height:1.6">Thanks, ${opts.name}! Your game keys are below and your PDF invoice is attached.</p>
     <table width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0">${rows}</table>
     <p style="font-size:16px"><strong>Total paid: ${opts.total}</strong></p>
     <p style="font-size:13px;color:#6b7280">Activation help is on your account dashboard under each order.</p>`
  );
}
