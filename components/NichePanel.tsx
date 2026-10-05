"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { brand, products, formatPrice } from "@/lib/data";

export function NichePanel() {
  const kind = brand.nicheKind;
  if (kind === "furniture") return <FurnitureViewer />;
  if (kind === "jewelry") return <JewelryCraft />;
  if (kind === "books") return <BookFlip />;
  if (kind === "beauty") return <ShadeRoutine />;
  if (kind === "wine") return <WineAging />;
  if (kind === "construction") return <BuildJourneyTeaser />;
  if (kind === "sneakers") return <SneakerHeat />;
  if (kind === "csa") return <CsaTeaser />;
  if (kind === "sports") return <SportsFit />;
  if (kind === "pharmacy") return <SymptomGuide />;
  return null;
}

function FurnitureViewer() {
  const [yaw, setYaw] = useState(24);
  const [room, setRoom] = useState("Living");
  const piece = products[0];
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl md:text-4xl">Room viewer</h2>
          <p className="mt-2 text-brand-muted">3D-ish preview — drag the orbit, pick a room mood.</p>
        </div>
        <Link href="/viewer" className="text-sm font-semibold text-brand-primary hover:underline">Open full viewer →</Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-sm border border-brand-border bg-brand-surface">
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `url(${brand.heroImage})`, backgroundSize: "cover" }} />
          <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "900px" }}>
            <div className="h-40 w-56 border border-brand-primary/40 bg-brand-primary/20 shadow-2xl backdrop-blur-sm transition"
              style={{ transform: `rotateY(${yaw}deg) rotateX(12deg)` }} />
          </div>
          <p className="absolute bottom-3 left-3 text-xs text-brand-muted">{room} · {piece.name}</p>
        </div>
        <div className="flex flex-col justify-center gap-4">
          <label className="text-sm">Orbit <input type="range" min={-40} max={40} value={yaw} onChange={(e) => setYaw(+e.target.value)} className="mt-2 w-full" /></label>
          <div className="flex flex-wrap gap-2">
            {["Living", "Bedroom", "Studio"].map((r) => (
              <button key={r} type="button" onClick={() => setRoom(r)} className={`btn-ghost !py-2 !px-3 text-xs ${room===r ? "!border-brand-primary" : ""}`}>{r}</button>
            ))}
          </div>
          <p className="text-sm text-brand-muted">Materials & dimensions live on each PDP. White-glove available at checkout.</p>
        </div>
      </div>
    </section>
  );
}

function JewelryCraft() {
  const [metal, setMetal] = useState("Yellow gold");
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <h2 className="font-display text-3xl md:text-4xl">Craft & wear</h2>
      <p className="mt-2 max-w-xl text-brand-muted">From bench to wrist — filter by metal, then try pieces on a soft mannequin glow.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-brand-hero">
          <div className="hero-film" aria-hidden>
        <img className="hero-film-img" src={brand.heroImage} alt="" />
      </div>
            <div className="absolute inset-x-0 bottom-0 p-4">
            <p className="font-display text-2xl text-white">Wearing {metal}</p>
          </div>
        </div>
        <div>
          <div className="flex flex-wrap gap-2">
            {["Yellow gold", "Rose gold", "White"].map((m) => (
              <button key={m} type="button" onClick={() => setMetal(m)} className={`btn-ghost !py-2 text-xs ${metal===m ? "!border-brand-primary" : ""}`}>{m}</button>
            ))}
          </div>
          <ul className="mt-6 space-y-3 text-sm">
            {products.filter((p) => p.category === "Rings" || p.category === "Necklaces").slice(0, 4).map((p) => (
              <li key={p.id} className="flex justify-between border-b border-brand-border py-2">
                <Link href={`/product/${p.id}`} className="hover:underline">{p.name}</Link>
                <span>{formatPrice(p.price)}</span>
              </li>
            ))}
          </ul>
          <Link href="/try-on" className="btn-primary mt-6 inline-flex">Open try-on lounge</Link>
        </div>
      </div>
    </section>
  );
}

function BookFlip() {
  const [flipped, setFlipped] = useState(false);
  const book = products.find((p) => p.category === "Fiction") || products[0];
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <h2 className="font-display text-3xl md:text-4xl">Flip preview</h2>
      <p className="mt-2 text-brand-muted">Turn a page — sample the voice before it hits your shelf.</p>
      <div className="mt-10 flex flex-col items-center gap-6 md:flex-row md:justify-center">
        <button type="button" onClick={() => setFlipped((v) => !v)} className="relative h-64 w-48" style={{ perspective: "1000px" }}>
          <div className="absolute inset-0 rounded-sm border border-brand-border bg-brand-surface p-4 shadow-xl transition duration-700"
            style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(-160deg)" : "rotateY(0deg)" }}>
            <p className="font-display text-xl">{book.name}</p>
            <p className="mt-2 text-xs text-brand-muted">{book.category}</p>
            <p className="mt-6 text-sm leading-relaxed text-brand-muted">{String(book.sample || book.description)}</p>
          </div>
        </button>
        <div className="max-w-sm text-sm text-brand-muted">
          <p>Tap the book to flip. Full previews on product pages for Fiction, Essays, and Kids.</p>
          <Link href="/flip" className="btn-primary mt-4 inline-flex">Browse flip shelf</Link>
        </div>
      </div>
    </section>
  );
}

function ShadeRoutine() {
  const [depth, setDepth] = useState("Light");
  const [tone, setTone] = useState("Warm");
  const match = useMemo(() => {
    const idx = (depth === "Fair" ? 0 : depth === "Light" ? 1 : depth === "Medium" ? 2 : 3);
    return products.find((p) => p.category === "Makeup") || products[1];
  }, [depth, tone]);
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <h2 className="font-display text-3xl md:text-4xl">Shade & routines</h2>
      <p className="mt-2 text-brand-muted">Find your Soft Focus match, then build an AM/PM ritual.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="card-soft rounded-sm p-6">
          <p className="text-xs uppercase tracking-wider text-brand-muted">Depth</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {["Fair", "Light", "Medium", "Deep"].map((d) => (
              <button key={d} type="button" onClick={() => setDepth(d)} className={`btn-ghost !py-2 text-xs ${depth===d ? "!border-brand-primary" : ""}`}>{d}</button>
            ))}
          </div>
          <p className="mt-4 text-xs uppercase tracking-wider text-brand-muted">Undertone</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {["Cool", "Neutral", "Warm"].map((t) => (
              <button key={t} type="button" onClick={() => setTone(t)} className={`btn-ghost !py-2 text-xs ${tone===t ? "!border-brand-primary" : ""}`}>{t}</button>
            ))}
          </div>
          <p className="mt-6 text-sm">Match: <strong>{match.name}</strong> · {depth} {tone}</p>
          <Link href="/shade" className="btn-primary mt-4 inline-flex">Full shade finder</Link>
        </div>
        <div className="card-soft rounded-sm p-6">
          <p className="font-display text-2xl">Suggested AM</p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-brand-muted">
            <li>Rose Mist</li>
            <li>Dew Serum</li>
            <li>{match.name}</li>
          </ol>
          <p className="mt-6 text-xs text-brand-muted">Ingredient lists and routines on every PDP.</p>
        </div>
      </div>
    </section>
  );
}

function WineAging() {
  const bottle = products[0];
  const aging = Number(bottle.aging || 60);
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <h2 className="font-display text-3xl md:text-4xl">Aging & tasting</h2>
      <p className="mt-2 text-brand-muted">See the curve — then taste the notes and pairings.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="card-soft rounded-sm p-6">
          <p className="text-sm font-semibold">{bottle.name}</p>
          <p className="text-xs text-brand-muted">{String((bottle.specs as any)?.Region)} · {String((bottle.specs as any)?.Vintage)}</p>
          <div className="mt-6 h-3 overflow-hidden rounded-full bg-brand-border">
            <div className="h-full bg-brand-primary transition-all" style={{ width: `${aging}%` }} />
          </div>
          <p className="mt-2 text-xs text-brand-muted">Drink window progress (illustrative) · peak notes ahead</p>
          <p className="mt-4 text-sm">Tasting: <strong>{String(bottle.tasting)}</strong> · Pairs with {String((bottle.specs as any)?.Pairing)}</p>
          <Link href="/tasting" className="btn-primary mt-6 inline-flex">Open tasting desk</Link>
        </div>
        <div className="relative min-h-[240px] overflow-hidden rounded-sm">
          <div className="hero-film" aria-hidden>
        <img className="hero-film-img" src={brand.heroImage} alt="" />
      </div>
          </div>
      </div>
    </section>
  );
}

function BuildJourneyTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <h2 className="font-display text-3xl md:text-4xl">Building → floor → unit</h2>
      <p className="mt-2 max-w-xl text-brand-muted">Walk the project visually before you request a quote.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {["1. Choose building", "2. Pick floor", "3. Lock unit + finish"].map((step, i) => (
          <div key={step} className="card-soft rounded-sm p-6 animate-rise" style={{ animationDelay: `${i * 0.1}s` }}>
            <p className="font-display text-2xl">{step}</p>
            <p className="mt-2 text-sm text-brand-muted">{["Harbor Lofts, Cedar Court, Ridge Line", "Levels 1–5 with view tags", "Beds, baths, Signature finishes"][i]}</p>
          </div>
        ))}
      </div>
      <Link href="/journey" className="btn-primary mt-8 inline-flex">Start unit journey</Link>
    </section>
  );
}

function SneakerHeat() {
  const hot = [...products].sort((a, b) => Number(b.heat || 0) - Number(a.heat || 0)).slice(0, 4);
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <h2 className="font-display text-3xl md:text-4xl">Heat meter</h2>
      <p className="mt-2 text-brand-muted">What's moving in the vault this week.</p>
      <div className="mt-8 space-y-3">
        {hot.map((p) => (
          <Link key={p.id} href={`/product/${p.id}`} className="flex items-center gap-4 border-b border-brand-border py-3 hover:bg-brand-surface/50">
            <div className="h-2 flex-1 rounded-full bg-brand-border">
              <div className="h-full rounded-full bg-brand-accent" style={{ width: `${p.heat}%` }} />
            </div>
            <span className="w-40 text-sm font-semibold">{p.name}</span>
            <span className="text-xs text-brand-muted">{p.heat}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function CsaTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <h2 className="font-display text-3xl md:text-4xl">Build this week's box</h2>
      <p className="mt-2 text-brand-muted">Swap two items, pick pickup site, skip anytime before Thursday.</p>
      <Link href="/box" className="btn-primary mt-6 inline-flex">Open box builder</Link>
    </section>
  );
}

function SportsFit() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <h2 className="font-display text-3xl md:text-4xl">Session fit</h2>
      <p className="mt-2 text-brand-muted">Tell us your sport — we'll route you to the right kit.</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {brand.categories.map((c) => (
          <Link key={c} href={`/shop?cat=${encodeURIComponent(c)}`} className="btn-ghost !py-2 text-xs">{c}</Link>
        ))}
      </div>
    </section>
  );
}

function SymptomGuide() {
  const tags = ["Cold", "Allergy", "Pain", "First aid"];
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <h2 className="font-display text-3xl md:text-4xl">Symptom helper</h2>
      <p className="mt-2 text-brand-muted">Educational product routing — not a diagnosis.</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map((t) => (
          <Link key={t} href={`/shop?q=${encodeURIComponent(t)}`} className="btn-ghost !py-2 text-xs">{t}</Link>
        ))}
      </div>
    </section>
  );
}
