import Link from "next/link";
import { brand } from "@/lib/data";
import { HeroCinema } from "@/components/HeroCinema";

export function BlueprintHero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden blueprint-bg text-[#d7f7ff]">
      <HeroCinema video={brand.heroVideo} image={brand.heroImage} />
      <div className="relative mx-auto flex min-h-[90vh] max-w-6xl flex-col justify-center px-4 py-24 md:px-6">
        <div className="max-w-xl border border-[#00d2ff]/50 bg-[#061820]/75 p-8 animate-rise">
          <div className="flex items-start justify-between gap-4 border-b border-dashed border-[#00d2ff]/40 pb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[#00d2ff]">
            <span>Sheet A-001</span>
            <span>Rev 04</span>
            <span>Scale 1:100</span>
          </div>
          <p className="mt-6 font-display text-6xl uppercase leading-none tracking-tight md:text-8xl">{brand.name}</p>
          <p className="mt-3 text-lg text-[#d7f7ff]/85">{brand.tagline}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[#9bc9d6]">{brand.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/journey" className="btn-primary">Start building journey</Link>
            <Link href="/quote" className="btn-ghost">Request quote</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
