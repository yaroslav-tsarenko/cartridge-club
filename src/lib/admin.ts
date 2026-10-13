import "server-only";
import { redirect } from "next/navigation";
import { currentUser } from "./auth";

// Admin access is granted by email address through ADMIN_EMAILS
// (comma-separated). No admin flag is stored on the user record, so access can
// be revoked by changing the environment variable alone.
export function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return adminEmails().includes(email.toLowerCase());
}

/** Returns the signed-in admin, or redirects to login / home. */
export async function requireAdmin(next = "/admin") {
  const user = await currentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(next)}`);
  if (!isAdminEmail(user.email)) redirect("/");
  return user;
}
