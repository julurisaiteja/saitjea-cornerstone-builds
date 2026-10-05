import Link from "next/link";
import { brand, products } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { Newsletter } from "@/components/Newsletter";
import { BlueprintHero } from "@/components/BlueprintHero";
import { JourneyStepperHome } from "@/components/JourneyStepperHome";
import { MilestoneReviews } from "@/components/MilestoneReviews";
import { Scene3D } from "@/components/Scene3D";

export default function HomePage() {
  const packages = products.filter((p) =>
    ["Remodels", "Custom Homes", "ADUs"].includes(p.category)
  ).slice(0, 4);

  return (
    <>
      <BlueprintHero />

      <section className="border-b border-[#00d2ff]/25 blueprint-bg">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:px-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#00d2ff]">Site massing twin</p>
            <h2 className="font-display text-4xl uppercase">Building → floor → unit</h2>
            <p className="mt-3 text-sm text-[#9bc9d6]">
              Spatial site experience for construction — orbit the stack and click a floor. This is a building journey, not a product turntable.
            </p>
            <Link href="/journey" className="btn-primary mt-6 inline-flex">Open unit journey</Link>
          </div>
          <Scene3D minHeight={380} floorCount={4} selectedFloor={2} overlayHint="DRAG TO ORBIT · CLICK FLOOR · BUILDING JOURNEY" />
        </div>
      </section>

      <div className="overflow-hidden border-b border-[#00d2ff]/25 bg-[#061820] py-2.5">
        <div className="marquee-track font-mono text-[11px] uppercase tracking-[0.22em] text-[#00d2ff]/80">
          {[...brand.marquee, ...brand.marquee].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
          <div className="grid grid-cols-2 gap-6 stagger-children md:grid-cols-4">
            {brand.stats.map(([n, l]) => (
              <div key={l} className="border border-dashed border-[#00d2ff]/40 p-4">
                <p className="font-display text-3xl uppercase md:text-4xl">{n}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[#9bc9d6]">{l}</p>
              </div>
            ))}
          </div>
      </section>

      <JourneyStepperHome />
      <MilestoneReviews />

      <section className="border-t border-[#00d2ff]/25 py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#00d2ff]">Finish packages</p>
              <h2 className="font-display text-4xl uppercase">Browse scopes</h2>
            </div>
            <Link href="/shop" className="text-sm font-semibold text-[#00d2ff] hover:underline">Full catalog</Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {packages.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
