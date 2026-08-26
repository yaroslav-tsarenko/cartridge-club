import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") ?? "";
  const record = token
    ? await prisma.emailVerificationToken.findUnique({ where: { token } })
    : null;

  const base = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;
  if (!record || record.expiresAt < new Date()) {
    return NextResponse.redirect(`${base}/verify-email?status=invalid`);
  }

  await prisma.user.update({ where: { id: record.userId }, data: { emailVerified: true } });
  await prisma.emailVerificationToken.deleteMany({ where: { userId: record.userId } });
  return NextResponse.redirect(`${base}/verify-email?status=ok`);
}
