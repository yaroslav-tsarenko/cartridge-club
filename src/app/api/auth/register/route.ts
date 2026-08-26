import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, newToken } from "@/lib/auth";
import { createSession } from "@/lib/session";
import { isCountryAllowed } from "@/lib/countries";
import { sendMail, welcomeEmail } from "@/lib/mail";

const REQUIRED = [
  "email",
  "password",
  "firstName",
  "lastName",
  "phone",
  "dateOfBirth",
  "street",
  "city",
  "country",
  "postalCode",
] as const;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  for (const f of REQUIRED) {
    if (!body[f] || String(body[f]).trim() === "") {
      return NextResponse.json({ error: `Missing field: ${f}` }, { status: 400 });
    }
  }

  const email = String(body.email).toLowerCase().trim();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }
  if (String(body.password).length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }
  if (!isCountryAllowed(String(body.country))) {
    return NextResponse.json({ error: "We cannot ship to the selected country" }, { status: 400 });
  }
  if (!body.acceptedTerms) {
    return NextResponse.json({ error: "You must accept the terms and conditions" }, { status: 400 });
  }

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
  }

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: await hashPassword(String(body.password)),
      firstName: String(body.firstName).trim(),
      lastName: String(body.lastName).trim(),
      phone: String(body.phone).trim(),
      dateOfBirth: String(body.dateOfBirth).trim(),
      street: String(body.street).trim(),
      city: String(body.city).trim(),
      country: String(body.country).trim(),
      postalCode: String(body.postalCode).trim(),
    },
  });

  // Email verification token + welcome email (non-blocking on failure).
  const token = newToken();
  await prisma.emailVerificationToken.create({
    data: { userId: user.id, token, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) },
  });
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const verifyUrl = `${base}/verify-email?token=${token}`;
  try {
    await sendMail({
      to: email,
      subject: "Welcome to Cartridge Club — confirm your email",
      html: welcomeEmail(user.firstName, verifyUrl),
    });
  } catch (e) {
    console.error("[register] welcome email failed:", e);
  }

  await createSession({ userId: user.id, email: user.email });
  return NextResponse.json({ ok: true });
}
