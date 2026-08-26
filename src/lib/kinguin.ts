import "server-only";

const API = process.env.KINGUIN_API_URL!;
const KEY = process.env.KINGUIN_API_KEY!;

// Retail markup applied on top of the Kinguin wholesale price.
const MARKUP = 1.3;
const withMarkup = (wholesale: number) => Math.round(wholesale * MARKUP * 100) / 100;

// ── Normalised product shape used across the UI ─────────────
export type Product = {
  productId: string;
  kinguinId: number;
  name: string;
  description: string;
  developers: string[];
  publishers: string[];
  genres: string[];
  platform: string;
  releaseDate: string | null;
  releaseYear: number | null;
  qty: number;
  priceEur: number; // native EUR price from Kinguin
  isPreorder: boolean;
  metacriticScore: number | null;
  region: string;
  activationDetails: string;
  cover: string | null;
  screenshots: string[];
  cheapestOfferId: string[];
};

type RawProduct = {
  productId: string;
  kinguinId: number;
  name: string;
  description?: string;
  developers?: string[];
  publishers?: string[];
  genres?: string[];
  platform?: string;
  releaseDate?: string;
  qty?: number;
  price?: number;
  isPreorder?: boolean;
  metacriticScore?: number;
  regionalLimitations?: string;
  activationDetails?: string;
  images?: {
    cover?: { thumbnail?: string; url?: string };
    screenshots?: { url: string; thumbnail?: string }[];
  };
  cheapestOfferId?: string[];
};

// Kinguin cover thumbnails are served through a Magento resize cache
// (…/cache/<n>/<preset>/<hash>/file.jpg) that pins them to ~170px and looks
// blurry when scaled up. Stripping that segment returns the original file.
function hiRes(url?: string | null): string | null {
  if (!url) return null;
  return url.replace(/\/cache\/\d+\/[^/]+\/[a-f0-9]{32}\//, "/") || null;
}

function normalise(p: RawProduct): Product {
  const year = p.releaseDate ? Number(p.releaseDate.slice(0, 4)) : null;
  return {
    productId: p.productId,
    kinguinId: p.kinguinId,
    name: p.name,
    description: p.description ?? "",
    developers: p.developers ?? [],
    publishers: p.publishers ?? [],
    genres: p.genres ?? [],
    platform: p.platform ?? "PC",
    releaseDate: p.releaseDate ?? null,
    releaseYear: Number.isFinite(year) ? year : null,
    qty: p.qty ?? 0,
    priceEur: withMarkup(p.price ?? 0),
    isPreorder: Boolean(p.isPreorder),
    metacriticScore: p.metacriticScore ?? null,
    region: p.regionalLimitations || "REGION FREE",
    activationDetails: p.activationDetails ?? "",
    cover:
      hiRes(p.images?.cover?.url) ||
      p.images?.screenshots?.[0]?.url ||
      hiRes(p.images?.cover?.thumbnail) ||
      null,
    screenshots: (p.images?.screenshots ?? []).map((s) => s.url).filter(Boolean).slice(0, 6),
    cheapestOfferId: p.cheapestOfferId ?? [],
  };
}

async function esaFetch(path: string, revalidate = 600): Promise<unknown> {
  const res = await fetch(`${API}${path}`, {
    headers: { "X-Api-Key": KEY },
    next: { revalidate },
  });
  if (!res.ok) {
    throw new Error(`Kinguin ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

export type ProductQuery = {
  page?: number;
  limit?: number;
  name?: string;
  genre?: string;
  platform?: string;
  priceFrom?: number;
  priceTo?: number;
  // Kinguin ESA only supports sorting by these fields.
  sortBy?: "kinguinId" | "updatedAt";
  sortType?: "asc" | "desc";
};

export async function searchProducts(
  q: ProductQuery = {}
): Promise<{ products: Product[]; total: number }> {
  const params = new URLSearchParams();
  params.set("page", String(q.page ?? 1));
  params.set("limit", String(q.limit ?? 24));
  if (q.name) params.set("name", q.name);
  if (q.genre) params.set("genre", q.genre);
  if (q.platform) params.set("platform", q.platform);
  if (q.priceFrom != null) params.set("priceFrom", String(q.priceFrom));
  if (q.priceTo != null) params.set("priceTo", String(q.priceTo));
  if (q.sortBy) params.set("sortBy", q.sortBy);
  if (q.sortType) params.set("sortType", q.sortType);

  try {
    const data = (await esaFetch(`/v1/products?${params.toString()}`)) as {
      results: RawProduct[];
      item_count: number;
    };
    return {
      products: (data.results ?? []).map(normalise),
      total: data.item_count ?? 0,
    };
  } catch (err) {
    console.error("[kinguin] searchProducts failed:", err);
    return { products: [], total: 0 };
  }
}

// Detail lookup is by numeric kinguinId (used in product URLs).
export async function getProduct(kinguinId: number | string): Promise<Product | null> {
  try {
    const data = (await esaFetch(`/v1/products/${kinguinId}`)) as RawProduct;
    if (!data?.productId) return null;
    return normalise(data);
  } catch (err) {
    console.error("[kinguin] getProduct failed:", err);
    return null;
  }
}

// ── Ordering (used at checkout after balance is deducted) ───
export type OrderLine = { productId: string; qty: number; price: number };

export async function placeOrder(
  lines: OrderLine[],
  externalId: string
): Promise<{ orderId: string }> {
  const res = await fetch(`${API}/v2/order`, {
    method: "POST",
    headers: { "X-Api-Key": KEY, "Content-Type": "application/json" },
    body: JSON.stringify({
      products: lines.map((l) => ({
        productId: l.productId,
        qty: l.qty,
        price: l.price,
      })),
      orderExternalId: externalId,
    }),
  });
  if (!res.ok) {
    throw new Error(`Kinguin order ${res.status}: ${await res.text()}`);
  }
  const data = (await res.json()) as { orderId?: string; orderExternalId?: string };
  const orderId = data.orderId ?? data.orderExternalId;
  if (!orderId) throw new Error("Kinguin order: no orderId returned");
  return { orderId };
}

export type DeliveredKey = { name: string; type: string; serial: string };

export async function downloadKeys(orderId: string): Promise<DeliveredKey[]> {
  const res = await fetch(`${API}/v2/order/${orderId}/keys`, {
    headers: { "X-Api-Key": KEY },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Kinguin keys ${res.status}: ${await res.text()}`);
  }
  const data = (await res.json()) as { results?: DeliveredKey[] } | DeliveredKey[];
  return Array.isArray(data) ? data : data.results ?? [];
}

export async function getBalance(): Promise<number> {
  try {
    const data = (await esaFetch(`/v1/balance`, 60)) as { balance: number };
    return data.balance ?? 0;
  } catch {
    return 0;
  }
}
