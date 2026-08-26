import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { newToken } from "@/lib/auth";
import { sendMail, resetEmail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = String(body?.email ?? "").toLowerCase().trim();

  // Always respond ok to avoid leaking which emails exist.
  const user = email ? await prisma.user.findUnique({ where: { email } }) : null;
  if (user) {
    const token = newToken();
    await prisma.passwordResetToken.create({
      data: { userId: user.id, token, expiresAt: new Date(Date.now() + 1000 * 60 * 60) },
    });
    const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const url = `${base}/reset-password?token=${token}`;
    try {
      await sendMail({ to: email, subject: "Reset your Cartridge Club password", html: resetEmail(url) });
    } catch (e) {
      console.error("[forgot-password] email failed:", e);
    }
  }

  return NextResponse.json({ ok: true });
}
