"use client";

import { useState } from "react";
import Link from "next/link";
import { brand, products, formatPrice } from "@/lib/data";
import { BlueprintCallout } from "@/components/BlueprintCallout";
import { Scene3D } from "@/components/Scene3D";

const BUILDINGS = [
  { name: "Harbor Lofts", blurb: "Waterfront mid-rise · sky lobbies", floors: 5 },
  { name: "Cedar Court", blurb: "Townhome cluster · private pads", floors: 3 },
  { name: "Ridge Line", blurb: "Hillside views · larger footprints", floors: 4 },
];

const STEPS = ["Building", "Floor", "Unit"] as const;

export default function JourneyPage() {
  const [step, setStep] = useState(0);
  const [building, setBuilding] = useState(BUILDINGS[0].name);
  const [floor, setFloor] = useState(2);
  const [unitIdx, setUnitIdx] = useState(0);
  const b = BUILDINGS.find((x) => x.name === building) || BUILDINGS[0];
  const unit = products[unitIdx];
  const specs = unit.specs as Record<string, string>;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-brand-muted">Project walkthrough</p>
      <h1 className="font-display text-5xl uppercase text-brand-steel md:text-6xl">Unit journey</h1>
      <p className="mt-2 max-w-xl text-sm text-brand-muted">
        Large stepper — building, floor, then unit with beds, baths, sqft, and finish level.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {STEPS.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setStep(i)}
            className={`flex items-center gap-4 border-2 p-5 text-left ${
              step === i ? "border-brand-amber bg-brand-surface" : "border-dashed border-brand-concrete"
            }`}
          >
            <span className="font-display text-4xl text-brand-steel">{i + 1}</span>
            <span className="font-display text-2xl uppercase text-brand-steel">{label}</span>
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div>
          <Scene3D
            minHeight={400}
            floorCount={b.floors}
            selectedFloor={floor}
            onFloorSelect={(f) => {
              setFloor(f);
              setStep(1);
            }}
            overlayHint="DRAG TO ORBIT · CLICK FLOOR · 3D VIEW"
          />
          <div className="mt-2 border border-dashed border-brand-concrete bg-brand-surface px-4 py-3 font-mono text-xs text-brand-muted">
            MODEL · {building} · FL {floor} · {unit.name}
          </div>
        </div>

        <div>
          {step === 0 && (
            <div className="space-y-3">
              {BUILDINGS.map((x) => (
                <button
                  key={x.name}
                  type="button"
                  onClick={() => {
                    setBuilding(x.name);
                    setStep(1);
                  }}
                  className={`block w-full border-2 p-5 text-left ${
                    building === x.name ? "border-brand-amber" : "border-brand-concrete"
                  }`}
                >
                  <p className="font-display text-3xl uppercase text-brand-steel">{x.name}</p>
                  <p className="text-sm text-brand-muted">{x.blurb}</p>
                </button>
              ))}
            </div>
          )}
          {step === 1 && (
            <div>
              <p className="font-mono text-xs text-brand-muted">{b.blurb}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {Array.from({ length: b.floors }, (_, i) => i + 1).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => {
                      setFloor(f);
                      setStep(2);
                    }}
                    className={`border-2 px-5 py-3 font-display text-xl uppercase ${
                      floor === f ? "border-brand-amber bg-brand-amber/10" : "border-dashed border-brand-concrete"
                    }`}
                  >
                    Floor {f}
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-brand-muted">Unit picker</p>
              <div className="mt for-4 space-y-2">
                {products.slice(0, 8).map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setUnitIdx(i)}
                    className={`flex w-full flex-col gap-1 border-b border-dashed border-brand-concrete py-3 text-left sm:flex-row sm:items-center sm:justify-between ${
                      unitIdx === i ? "text-brand-amber" : ""
                    }`}
                  >
                    <span className="font-display text-lg uppercase text-brand-steel">{p.name}</span>
                    <span className="font-mono text-xs text-brand-muted">
                      {p.specs.Beds} bd · {p.specs.Baths} ba · {p.specs.SqFt} sf · {p.specs.Finish}
                    </span>
                    <span className="text-sm font-semibold">{formatPrice(p.price)}</span>
                  </button>
                ))}
              </div>
              <BlueprintCallout specs={specs} />
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={`/product/${unit.id}`} className="btn-ghost">
                  Deep unit detail
                </Link>
                <Link href="/quote" className="btn-primary !bg-brand-amber !text-brand-steel">
                  Request quote
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
