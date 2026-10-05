"use client";

import { FormEvent, useState } from "react";
import { brand } from "@/lib/data";
import Link from "next/link";

export default function QuotePage() {
  const [done, setDone] = useState(false);
  const [code, setCode] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 900));
    setDone(true);
  }

  const consultApplied = code.toUpperCase() === brand.offer.code;

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-brand-muted">Quote logged</p>
        <h1 className="mt-2 font-display text-5xl uppercase text-brand-steel">Request received</h1>
        <p className="mt-4 text-brand-muted">
          Banded estimate in 2 business days.
          {consultApplied ? ` ${brand.offer.code} consult credit applied.` : ""}
        </p>
        <Link href="/journey" className="btn-primary mt-8 inline-flex !bg-brand-amber !text-brand-steel">
          Back to journey
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10 md:px-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-muted">Conversion path</p>
      <h1 className="font-display text-5xl uppercase text-brand-steel">Request a quote</h1>
      <p className="mt-2 text-sm text-brand-muted">Building, floor preference, finish level — primary conversion.</p>
      <form className="mt-8 space-y-3 border border-dashed border-brand-concrete bg-brand-surface p-6" onSubmit={onSubmit}>
        <input required className="input" name="name" placeholder="Full name" />
        <input required type="email" className="input" name="email" placeholder="Email" />
        <input className="input" name="building" placeholder="Building / lot" />
        <select className="input" name="finish" defaultValue="Elevated">
          <option>Essential</option>
          <option>Elevated</option>
          <option>Signature</option>
        </select>
        <textarea className="input min-h-[120px]" name="notes" placeholder="Timeline, must-haves, budget band" />
        <div>
          <input
            className="input"
            placeholder={`Offer code (${brand.offer.code})`}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          {consultApplied && (
            <p className="mt-2 text-xs text-brand-amber">Complimentary feasibility consult unlocked.</p>
          )}
        </div>
        <button className="btn-primary w-full !bg-brand-amber !text-brand-steel" type="submit">
          Submit quote request
        </button>
      </form>
    </div>
  );
}
