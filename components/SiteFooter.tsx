import Link from "next/link";
import { brand } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-brand-border bg-brand-surface/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div className="md:col-span-2">
          <p className="font-display text-2xl">{brand.name}</p>
          <p className="mt-2 max-w-md text-sm text-brand-muted">{brand.description}</p>
          <p className="mt-4 text-xs text-brand-muted">{brand.loyalty}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Explore</p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link href="/shop">Shop</Link>
            <Link href="/about">About</Link>
            <Link href="/wishlist">Wishlist</Link>
            {brand.isBooking ? <Link href="/quote">Request quote</Link> : <Link href="/checkout">Checkout</Link>}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Visit</p>
          <ul className="mt-3 space-y-2 text-sm text-brand-muted">
            {brand.stores.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-border/70 py-4 text-center text-xs text-brand-muted">
        Demo storefront · Mock checkout · English
      </div>
    </footer>
  );
}
