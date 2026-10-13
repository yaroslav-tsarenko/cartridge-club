import Link from "next/link";
import { requireAdmin } from "@/lib/admin";

export const metadata = { title: "Admin — Cartridge Club" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b-2 border-line bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="font-display text-xl">
              Cartridge Club <span className="text-cobalt">Admin</span>
            </Link>
            <span className="cc-tag rounded bg-band px-2 py-0.5 text-[0.6rem] text-muted">
              Back office
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/admin" className="text-muted hover:text-cobalt">
              Orders
            </Link>
            <Link href="/admin/customers" className="text-muted hover:text-cobalt">
              Customers
            </Link>
            <Link href="/" className="text-muted hover:text-cobalt">
              Storefront ↗
            </Link>
            <span className="text-muted">{admin.email}</span>
          </div>
        </div>
      </header>
      <main id="main" className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {children}
      </main>
    </div>
  );
}
