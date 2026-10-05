"use client";
import { useState } from "react";
import { brand } from "@/lib/data";

export function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <div className="card-soft rounded-sm px-6 py-10 md:flex md:items-center md:justify-between md:gap-8 md:px-10">
        <div>
          <h2 className="font-display text-3xl">Stay in the loop</h2>
          <p className="mt-2 max-w-md text-sm text-brand-muted">{brand.loyalty}</p>
        </div>
        {done ? (
          <p className="mt-6 text-sm font-semibold text-brand-primary md:mt-0">You're on the list — demo only.</p>
        ) : (
          <form className="mt-6 flex w-full max-w-md gap-2 md:mt-0" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
            <input required type="email" className="input" placeholder="you@email.com" />
            <button className="btn-primary shrink-0" type="submit">Join</button>
          </form>
        )}
      </div>
    </section>
  );
}
