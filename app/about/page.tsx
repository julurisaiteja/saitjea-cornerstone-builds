import { brand } from "@/lib/data";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <h1 className="font-display text-4xl md:text-5xl">About {brand.name}</h1>
      <p className="mt-6 text-lg leading-relaxed text-brand-muted">{brand.description}</p>
      <p className="mt-4 text-sm text-brand-muted">{brand.loyalty}</p>
      <ul className="mt-8 space-y-2 text-sm">
        {brand.stores.map((s) => <li key={s}>{s}</li>)}
      </ul>
    </div>
  );
}
