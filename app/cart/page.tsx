"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/data";

export default function CartPage() {
  const { items, setQty, remove, subtotal } = useCart();
  if (!items.length) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h1 className="font-display text-4xl">Your cart is empty</h1>
        <Link href="/shop" className="btn-primary mt-6 inline-flex">Continue shopping</Link>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <h1 className="font-display text-4xl">Cart</h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id + (item.variant || "")} className="flex gap-4 border-b border-brand-border pb-4">
              <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-sm bg-brand-surface">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-display text-lg">{item.name}</p>
                {item.variant && <p className="text-xs text-brand-muted">{item.variant}</p>}
                <p className="text-sm font-semibold">{formatPrice(item.price)}</p>
                <div className="mt-2 flex items-center gap-2">
                  <input type="number" min={1} className="input !w-20 !py-1" value={item.qty} onChange={(e) => setQty(item.id, Number(e.target.value) || 1)} />
                  <button type="button" className="text-xs text-brand-muted hover:text-brand-fg" onClick={() => remove(item.id)}>Remove</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <aside className="card-soft h-fit rounded-sm p-6">
          <p className="text-sm text-brand-muted">Subtotal</p>
          <p className="font-display text-3xl">{formatPrice(subtotal)}</p>
          <Link href="/checkout" className="btn-primary mt-6 flex w-full">Checkout</Link>
        </aside>
      </div>
    </div>
  );
}
