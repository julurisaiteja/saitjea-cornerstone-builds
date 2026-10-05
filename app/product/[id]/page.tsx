"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { getProduct, formatPrice, relatedProducts, brand } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/ProductCard";
import { BlueprintCallout } from "@/components/BlueprintCallout";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = getProduct(id);
  const { add, toggleWish, wish } = useCart();
  const [variant, setVariant] = useState(product?.variants[0] || "");
  const [img, setImg] = useState(0);
  const [tab, setTab] = useState<"specs" | "faq" | "extra">("specs");
  if (!product) return <div className="mx-auto max-w-6xl px-4 py-20">Product not found. <Link href="/shop">Back to shop</Link></div>;
  const related = relatedProducts(product);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-sm bg-brand-surface">
            <Image src={product.images[img] || product.image} alt={product.name} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
          </div>
          <div className="mt-3 flex gap-2">
            {product.images.map((src, i) => (
              <button key={src + i} type="button" onClick={() => setImg(i)} className={`relative h-16 w-16 overflow-hidden rounded-sm border ${img===i ? "border-brand-primary" : "border-brand-border"}`}>
                <Image src={src} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-brand-muted">{product.category}</p>
          <h1 className="mt-1 font-display text-4xl uppercase md:text-5xl">{product.name}</h1>
          <p className="mt-2 font-mono text-xs text-brand-muted">
            {String(product.building)} · Unit {String(product.unit)} · FL {String(product.floor)}
          </p>
          <p className="mt-2 text-sm text-brand-muted">
            {product.rating.toFixed(1)} owner rating · {product.reviewCount} references
          </p>
          <p className="mt-4 text-2xl font-semibold">{formatPrice(product.price)}</p>
          <p className="mt-4 text-sm leading-relaxed text-brand-muted">{product.description}</p>
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Options</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button key={v} type="button" onClick={() => setVariant(v)} className={`btn-ghost !py-2 !px-3 text-xs ${variant===v ? "!border-brand-primary" : ""}`}>{v}</button>
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/quote" className="btn-primary !bg-brand-amber !text-brand-steel">
              Request quote
            </Link>
            <button type="button" className="btn-ghost" onClick={() => add(product, 1, variant)}>
              Add package to cart
            </button>
            <button type="button" className="btn-ghost" onClick={() => toggleWish(product.id)}>
              {wish.includes(product.id) ? "Saved" : "Save scope"}
            </button>
          </div>
          <p className="mt-4 text-xs text-brand-muted">
            {brand.checkoutNote} · Mention {brand.offer.code} for complimentary feasibility consult.
          </p>

          <BlueprintCallout specs={product.specs} />

          <div className="relative mt-8 min-h-[200px] overflow-hidden border-2 border-brand-steel">
            <div className="hero-film" aria-hidden>
        <img className="hero-film-img" src={brand.heroImage} alt="" />
      </div>
                <p className="absolute bottom-3 left-3 font-mono text-[10px] uppercase text-white">Walkthrough reel · unit detail</p>
          </div>

          <div className="mt-8">
            <div className="flex gap-4 border-b border-brand-border text-sm">
              {(["specs", "faq", "extra"] as const).map((t) => (
                <button key={t} type="button" onClick={() => setTab(t)} className={`pb-2 capitalize ${tab===t ? "border-b-2 border-brand-primary font-semibold" : "text-brand-muted"}`}>{t === "extra" ? "Details" : t}</button>
              ))}
            </div>
            <div className="mt-4 text-sm">
              {tab === "specs" && (
                <dl className="space-y-2">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 border-b border-brand-border/60 py-2">
                      <dt className="text-brand-muted">{k}</dt>
                      <dd className="font-medium text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {tab === "faq" && (
                <div className="space-y-4">
                  {product.faq.map(([q, a]) => (
                    <div key={q}><p className="font-semibold">{q}</p><p className="mt-1 text-brand-muted">{a}</p></div>
                  ))}
                </div>
              )}
              {tab === "extra" && (
                <p className="text-brand-muted">{brand.loyalty}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="font-display text-3xl">Related</h2>
        <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-3">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
