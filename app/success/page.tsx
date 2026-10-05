"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { brand } from "@/lib/data";

export default function SuccessPage() {
  const [order, setOrder] = useState("GV-······");
  useEffect(() => {
    setOrder("GV-" + Math.floor(100000 + Math.random() * 900000));
  }, []);
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="text-xs uppercase tracking-wider text-brand-muted">Order confirmed</p>
      <h1 className="mt-2 font-display text-4xl">Thank you</h1>
      <p className="mt-4 text-brand-muted">Demo order <strong>{order}</strong> for {brand.name}. {brand.checkoutNote}</p>
      <Link href="/shop" className="btn-primary mt-8 inline-flex">Keep browsing</Link>
    </div>
  );
}
