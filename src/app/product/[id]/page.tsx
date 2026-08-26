import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Price } from "@/components/ui/Price";
import { AddToCart } from "@/components/store/AddToCart";
import { getProduct } from "@/lib/kinguin";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  const inStock = product.qty > 0 || product.isPreorder;

  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-4 text-sm text-muted">
          <Link href="/store" className="hover:text-cobalt">
            Store
          </Link>{" "}
          / <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="cc-outline-plate overflow-hidden rounded-card bg-band">
              {product.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={product.cover} alt={product.name} className="max-h-[420px] w-full object-cover" />
              ) : (
                <div className="grid h-64 place-items-center text-muted">No image</div>
              )}
            </div>

            {product.screenshots.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {product.screenshots.map((s) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={s} src={s} alt="" className="cc-outline aspect-video w-full rounded-lg object-cover" loading="lazy" />
                ))}
              </div>
            )}

            {product.description && (
              <section className="mt-8">
                <h2 className="font-display text-2xl">About this game</h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ink/90">
                  {product.description.slice(0, 1800)}
                  {product.description.length > 1800 ? "…" : ""}
                </p>
              </section>
            )}

            {product.activationDetails && (
              <section className="mt-6">
                <h2 className="font-display text-xl">How to activate</h2>
                <p className="mt-2 whitespace-pre-line text-sm text-muted">{product.activationDetails.slice(0, 600)}</p>
              </section>
            )}
          </div>

          {/* Buy box */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="cc-outline-plate rounded-card bg-card p-5">
              <h1 className="font-heading text-xl leading-tight">{product.name}</h1>
              <div className="mt-2 flex flex-wrap gap-2 text-[0.7rem]">
                <span className="cc-tag rounded bg-band px-2 py-0.5">{product.platform}</span>
                <span className="cc-tag rounded bg-band px-2 py-0.5">{product.region}</span>
                {product.metacriticScore && (
                  <span className="cc-tag rounded bg-leaf px-2 py-0.5 text-ink">Metacritic {product.metacriticScore}</span>
                )}
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <Price amountEur={product.priceEur} className="font-display text-3xl text-ink" />
                <span className="text-xs text-muted">incl. VAT</span>
              </div>

              <p className={`mt-1 text-sm ${inStock ? "text-leaf" : "text-red"}`}>
                {product.isPreorder ? "Available for pre-order" : inStock ? "In stock — instant delivery" : "Out of stock"}
              </p>

              <div className="mt-4">
                {inStock ? (
                  <AddToCart
                    item={{
                      productId: product.productId,
                      kinguinId: product.kinguinId,
                      name: product.name,
                      priceEur: product.priceEur,
                      cover: product.cover,
                      platform: product.platform,
                    }}
                  />
                ) : (
                  <p className="text-sm text-muted">This title is currently unavailable.</p>
                )}
              </div>

              <ul className="mt-5 space-y-2 border-t border-line pt-4 text-sm text-muted">
                <li>⚡ Instant email delivery</li>
                <li>🔒 Secure checkout — Visa, Mastercard, PCI DSS</li>
                <li>✅ Official distributor key</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
