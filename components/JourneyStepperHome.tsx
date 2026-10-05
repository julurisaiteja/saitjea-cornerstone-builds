"use client";

import { useState } from "react";
import Link from "next/link";
import { brand, products, formatPrice } from "@/lib/data";

const BUILDINGS = [
  { name: "Harbor Lofts", blurb: "Waterfront mid-rise", floors: 5 },
  { name: "Cedar Court", blurb: "Townhome cluster", floors: 3 },
  { name: "Ridge Line", blurb: "Hillside views", floors: 4 },
];

const STEPS = ["Building", "Floor", "Unit"] as const;

export function JourneyStepperHome() {
  const [step, setStep] = useState(0);
  const [building, setBuilding] = useState(BUILDINGS[0].name);
  const [floor, setFloor] = useState(2);
  const [unitIdx, setUnitIdx] = useState(0);
  const b = BUILDINGS.find((x) => x.name === building) || BUILDINGS[0];
  const unit = products[unitIdx];
  const specs = unit?.specs as Record<string, string> | undefined;

  return (
    <section className="border-y border-brand-concrete bg-brand-bg py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-muted">Primary UX</p>
            <h2 className="font-display text-4xl uppercase text-brand-steel md:text-5xl">Building → Floor → Unit</h2>
          </div>
          <Link href="/journey" className="text-sm font-semibold text-brand-amber hover:underline">
            Open full journey
          </Link>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => setStep(i)}
              className={`flex items-center gap-4 border-2 p-4 text-left transition ${
                step === i
                  ? "border-brand-amber bg-brand-surface"
                  : "border-dashed border-brand-concrete bg-transparent hover:border-brand-steel/40"
              }`}
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center font-display text-2xl ${
                  step === i ? "bg-brand-steel text-brand-amber" : "bg-brand-concrete/50 text-brand-muted"
                }`}
              >
                {i + 1}
              </span>
              <span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-muted">Step {i + 1}</span>
                <span className="mt-1 block font-display text-2xl uppercase text-brand-steel">{label}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative min-h-[300px] overflow-hidden border-2 border-brand-steel bg-brand-steel">
            <div className="hero-film" aria-hidden>
        <img className="hero-film-img" src={brand.heroImage} alt="" />
      </div>
                <div className="absolute inset-0 border-4 border-brand-amber/30 m-4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 bg-brand-steel/90 px-4 py-3 font-mono text-xs text-white">
              WALKTHROUGH · {building} · FL {floor} · {unit?.name}
            </div>
          </div>

          <div className="border border-dashed border-brand-concrete bg-brand-surface p-6">
            {step === 0 &&
              BUILDINGS.map((x) => (
                <button
                  key={x.name}
                  type="button"
                  onClick={() => {
                    setBuilding(x.name);
                    setStep(1);
                  }}
                  className={`mb-3 block w-full border p-4 text-left last:mb-0 ${
                    building === x.name ? "border-brand-amber" : "border-brand-concrete"
                  }`}
                >
                  <p className="font-display text-2xl uppercase text-brand-steel">{x.name}</p>
                  <p className="text-sm text-brand-muted">{x.blurb}</p>
                </button>
              ))}
            {step === 1 && (
              <>
                <p className="font-mono text-xs text-brand-muted">{b.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {Array.from({ length: b.floors }, (_, i) => i + 1).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => {
                        setFloor(f);
                        setStep(2);
                      }}
                      className={`border px-4 py-2 font-mono text-sm ${
                        floor === f ? "border-brand-amber bg-brand-amber/10" : "border-brand-concrete"
                      }`}
                    >
                      FL {f}
                    </button>
                  ))}
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className="max-h-48 space-y-2 overflow-y-auto">
                  {products.slice(0, 6).map((p, i) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setUnitIdx(i)}
                      className={`flex w-full justify-between border-b border-dashed border-brand-concrete py-2 text-left text-sm ${
                        unitIdx === i ? "text-brand-amber" : ""
                      }`}
                    >
                      <span>
                        {p.specs.Beds} bd · {p.specs.Baths} ba · {p.specs.SqFt} sf · {p.specs.Finish}
                      </span>
                      <span>{formatPrice(p.price)}</span>
                    </button>
                  ))}
                </div>
                {specs && (
                  <dl className="mt-4 grid grid-cols-2 gap-2 font-mono text-[11px]">
                    {Object.entries(specs).map(([k, v]) => (
                      <div key={k} className="border border-dashed border-brand-concrete px-2 py-1">
                        <dt className="text-brand-muted">{k}</dt>
                        <dd className="font-semibold text-brand-steel">{v}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={`/product/${unit.id}`} className="btn-ghost text-xs">
                    Unit detail
                  </Link>
                  <Link href="/quote" className="btn-primary !bg-brand-amber !text-brand-steel">
                    Request quote
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
