"use client";
import Link from "next/link";
import { brand } from "@/lib/data";
import { useCart } from "@/lib/cart";

export function SiteHeader() {
  const { count, wish } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-brand-border/80 bg-brand-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="font-display text-xl tracking-tight md:text-2xl">{brand.name}</Link>
        <nav className="flex flex-wrap items-center justify-end gap-3 text-sm text-brand-muted md:gap-5">
          <Link className="hover:text-brand-fg transition" href="/shop">Shop</Link>
          {brand.nicheKind === "furniture" && <Link className="hidden sm:inline hover:text-brand-fg transition" href="/viewer">Room viewer</Link>}
          {brand.nicheKind === "jewelry" && <Link className="hidden sm:inline hover:text-brand-fg transition" href="/try-on">Try-on</Link>}
          {brand.nicheKind === "books" && <Link className="hidden sm:inline hover:text-brand-fg transition" href="/flip">Flip preview</Link>}
          {brand.nicheKind === "beauty" && <Link className="hidden sm:inline hover:text-brand-fg transition" href="/shade">Shade finder</Link>}
          {brand.nicheKind === "wine" && <Link className="hidden sm:inline hover:text-brand-fg transition" href="/tasting">Tasting</Link>}
          {brand.nicheKind === "construction" && <Link className="hidden sm:inline hover:text-brand-fg transition" href="/journey">Unit journey</Link>}
          {brand.nicheKind === "csa" && <Link className="hidden sm:inline hover:text-brand-fg transition" href="/box">Box builder</Link>}
          {brand.isBooking && <Link className="hidden sm:inline hover:text-brand-fg transition" href="/quote">Quote</Link>}
          <Link className="hidden md:inline hover:text-brand-fg transition" href="/about">About</Link>
          <Link className="hover:text-brand-fg transition" href="/wishlist">Saved{wish.length ? ` (${wish.length})` : ""}</Link>
          {!brand.isBooking && <Link className="relative hover:text-brand-fg transition" href="/cart">Cart{count ? ` (${count})` : ""}</Link>}
        </nav>
      </div>
    </header>
  );
}
