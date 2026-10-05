"use client";
import { useState } from "react";
import { brand } from "@/lib/data";

export function OfferBanner() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="relative z-50 bg-brand-steel text-brand-amber">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 text-xs md:text-sm">
        <p>
          <span className="font-semibold">{brand.offer.label}</span>
          {" · "}
          <span className="opacity-90">Code <strong className="tracking-wide">{brand.offer.code}</strong></span>
          {" · "}
          <span className="opacity-80">{brand.offer.ends}</span>
        </p>
        <button type="button" aria-label="Dismiss" className="opacity-80 hover:opacity-100 underline" onClick={() => setOpen(false)}>Close</button>
      </div>
    </div>
  );
}
