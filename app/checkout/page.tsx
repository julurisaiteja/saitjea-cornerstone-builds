"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { brand, formatPrice } from "@/lib/data";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [code, setCode] = useState("");
  const discount = code.toUpperCase() === brand.offer.code ? Math.round(subtotal * 0.1) : 0;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    const fd = new FormData(e.currentTarget);
    const card = String(fd.get("card") || "").replace(/\s/g, "");
    if (card.length < 12) {
      setErr("Enter a demo card number (12+ digits).");
      return;
    }
    setBusy(true);
    await new Promise((r) => setTimeout(r, 1100));
    clear();
    router.push("/success");
  }

  if (!items.length) {
    return <div className="mx-auto max-w-xl px-4 py-20 text-center"><p>Cart is empty.</p></div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <h1 className="font-display text-4xl">Checkout</h1>
      <p className="mt-2 text-sm text-brand-muted">Stripe-style demo UI · no real charges · {brand.checkoutNote}</p>
      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="card-soft rounded-sm p-5 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Contact</p>
            <input name="email" required type="email" className="input" placeholder="Email" />
            <input name="name" required className="input" placeholder="Full name" />
          </div>
          <div className="card-soft rounded-sm p-5 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Shipping</p>
            <input name="address" required className="input" placeholder="Address" />
            <div className="grid grid-cols-2 gap-3">
              <input name="city" required className="input" placeholder="City" />
              <input name="zip" required className="input" placeholder="ZIP" />
            </div>
          </div>
          <div className="card-soft rounded-sm p-5 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Payment</p>
            <input name="card" required className="input" placeholder="Card number · 4242 4242 4242 4242" />
            <div className="grid grid-cols-2 gap-3">
              <input name="exp" required className="input" placeholder="MM/YY" />
              <input name="cvc" required className="input" placeholder="CVC" />
            </div>
          </div>
          {err && <p className="text-sm text-red-600">{err}</p>}
          <button className="btn-primary w-full" disabled={busy} type="submit">{busy ? "Processing…" : `Pay ${formatPrice(subtotal - discount)}`}</button>
        </form>
        <aside className="card-soft h-fit rounded-sm p-6">
          <ul className="space-y-2 text-sm">
            {items.map((i) => (
              <li key={i.id} className="flex justify-between gap-4">
                <span>{i.name} × {i.qty}</span>
                <span>{formatPrice(i.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-2">
            <input className="input" placeholder="Coupon" value={code} onChange={(e) => setCode(e.target.value)} />
          </div>
          {discount > 0 && <p className="mt-2 text-xs text-brand-primary">Applied {brand.offer.code}: −{formatPrice(discount)}</p>}
          <div className="mt-4 flex justify-between border-t border-brand-border pt-4 font-semibold">
            <span>Total</span>
            <span>{formatPrice(subtotal - discount)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
