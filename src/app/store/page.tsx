import Link from "next/link";
import { cookies } from "next/headers";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { StoreCard } from "@/components/store/StoreCard";
import { searchProducts, type ProductQuery } from "@/lib/kinguin";
import { CURRENCIES, DEFAULT_CURRENCY, type CurrencyCode } from "@/lib/currency";

export const metadata = { title: "Store — Cartridge Club" };

const GENRES = ["Action", "Adventure", "RPG", "Strategy", "Shooter", "Racing", "Sports", "Simulation", "Indie", "Puzzle"];
const PLATFORMS = ["Steam", "Ubisoft", "EA Play", "Epic Games", "GOG", "Rockstar", "Battle.net"];

export default async function StorePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);
  const preorderOnly = sp.preorder === "1";

  // Price filter labels reflect the currency chosen in the header (cookie).
  const cookieStore = await cookies();
  const cur = (cookieStore.get("cc_currency")?.value as CurrencyCode) || DEFAULT_CURRENCY;
  const c = CURRENCIES[cur] ?? CURRENCIES[DEFAULT_CURRENCY];
  const priceLabel = (eur: number) => `${c.symbol}${Math.round(eur * c.rate)}`;

  const query: ProductQuery = {
    page,
    // Pre-order buckets are filtered client-side, so fetch a wider slice.
    limit: preorderOnly ? 100 : 24,
    name: sp.q,
    genre: sp.genre,
    platform: sp.platform,
    priceFrom: sp.priceFrom ? Number(sp.priceFrom) : undefined,
    priceTo: sp.priceTo ? Number(sp.priceTo) : undefined,
    sortBy: (sp.sortBy as ProductQuery["sortBy"]) || undefined,
    sortType: (sp.sortType as ProductQuery["sortType"]) || undefined,
  };
  const raw = await searchProducts(query);
  const products = preorderOnly ? raw.products.filter((p) => p.isPreorder) : raw.products;
  const total = preorderOnly ? products.length : raw.total;
  const totalPages = preorderOnly ? 1 : Math.min(Math.ceil(total / 24) || 1, 200);

  const buildHref = (patch: Record<string, string | number | undefined>) => {
    const params = new URLSearchParams();
    const merged = { ...sp, ...patch };
    for (const [k, v] of Object.entries(merged)) if (v) params.set(k, String(v));
    return `/store?${params.toString()}`;
  };

  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl">The Store</h1>
            <p className="mt-1 text-sm text-muted">{total.toLocaleString()} official keys — instant email delivery.</p>
          </div>
          <form action="/store" className="cc-outline flex items-center gap-2 rounded-xl bg-card px-3 py-2">
            <span className="text-muted" aria-hidden>⌕</span>
            <input
              name="q"
              defaultValue={sp.q}
              placeholder="Search games…"
              className="w-48 bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </form>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[220px_1fr]">
          {/* Filters */}
          <aside className="space-y-6">
            <FilterGroup title="Genre">
              <FilterLink href={buildHref({ genre: undefined, page: undefined })} active={!sp.genre}>
                All genres
              </FilterLink>
              {GENRES.map((g) => (
                <FilterLink key={g} href={buildHref({ genre: g, page: undefined })} active={sp.genre === g}>
                  {g}
                </FilterLink>
              ))}
            </FilterGroup>
            <FilterGroup title="Platform">
              <FilterLink href={buildHref({ platform: undefined, page: undefined })} active={!sp.platform}>
                All platforms
              </FilterLink>
              {PLATFORMS.map((p) => (
                <FilterLink key={p} href={buildHref({ platform: p, page: undefined })} active={sp.platform === p}>
                  {p}
                </FilterLink>
              ))}
            </FilterGroup>
            <FilterGroup title="Price">
              <FilterLink href={buildHref({ priceTo: undefined, priceFrom: undefined, page: undefined })} active={!sp.priceTo && !sp.priceFrom}>
                Any price
              </FilterLink>
              <FilterLink href={buildHref({ priceTo: "5", priceFrom: undefined, page: undefined })} active={sp.priceTo === "5"}>
                Under {priceLabel(5)}
              </FilterLink>
              <FilterLink href={buildHref({ priceTo: "10", priceFrom: undefined, page: undefined })} active={sp.priceTo === "10"}>
                Under {priceLabel(10)}
              </FilterLink>
              <FilterLink href={buildHref({ priceTo: "25", priceFrom: undefined, page: undefined })} active={sp.priceTo === "25"}>
                Under {priceLabel(25)}
              </FilterLink>
            </FilterGroup>
            <FilterGroup title="Sort by">
              <FilterLink href={buildHref({ sortBy: undefined, sortType: undefined, page: undefined })} active={!sp.sortBy}>
                Relevance
              </FilterLink>
              <FilterLink href={buildHref({ sortBy: "updatedAt", sortType: "desc", page: undefined })} active={sp.sortBy === "updatedAt"}>
                Recently updated
              </FilterLink>
              <FilterLink href={buildHref({ sortBy: "kinguinId", sortType: "desc", page: undefined })} active={sp.sortBy === "kinguinId"}>
                Newest additions
              </FilterLink>
            </FilterGroup>
          </aside>

          {/* Grid */}
          <div>
            {products.length === 0 ? (
              <div className="cc-outline-plate rounded-card bg-card p-10 text-center text-muted">
                No products found. Try clearing filters.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                {products.map((p) => (
                  <StoreCard key={p.productId} product={p} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                {page > 1 && (
                  <Link href={buildHref({ page: page - 1 })} className="cc-outline rounded-lg bg-card px-4 py-2 text-sm hover:bg-band">
                    ← Prev
                  </Link>
                )}
                <span className="px-3 text-sm text-muted">
                  Page {page} of {totalPages}
                </span>
                {page < totalPages && (
                  <Link href={buildHref({ page: page + 1 })} className="cc-outline rounded-lg bg-card px-4 py-2 text-sm hover:bg-band">
                    Next →
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="cc-outline-plate rounded-card bg-card p-4">
      <p className="cc-tag mb-2 text-[0.65rem] text-muted">{title}</p>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

function FilterLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`rounded-lg px-2 py-1 text-sm ${active ? "bg-cobalt text-white" : "text-ink hover:bg-band"}`}
    >
      {children}
    </Link>
  );
}
