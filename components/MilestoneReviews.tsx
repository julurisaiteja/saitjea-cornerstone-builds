import { brand } from "@/lib/data";

const PHASES = ["Framing", "Quote", "Walkthrough"] as const;

const REVIEWS: [string, (typeof PHASES)[number], string][] = [
  ["The Nguyens", "Walkthrough", "Journey tool helped us pick a corner unit before we visited."],
  ["Dana S.", "Quote", "Quote request was detailed. No surprise allowances."],
  ["Rafael C.", "Framing", "Walkthrough video of framing weekly — felt in control."],
];

export function MilestoneReviews() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <h2 className="font-display text-4xl uppercase text-brand-steel">Owner milestones</h2>
      <p className="mt-2 text-sm text-brand-muted">Quotes tagged by project phase — not generic star blocks.</p>
      <div className="mt-10 space-y-4">
        {REVIEWS.map(([name, phase, text]) => (
          <blockquote
            key={name}
            className="grid gap-4 border-l-4 border-brand-amber bg-brand-surface p-6 md:grid-cols-[140px_1fr]"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-brand-muted">Phase</p>
              <p className="mt-1 font-display text-2xl uppercase text-brand-steel">{phase}</p>
            </div>
            <div>
              <p className="text-sm leading-relaxed text-brand-fg">&ldquo;{text}&rdquo;</p>
              <footer className="mt-3 font-mono text-xs text-brand-muted">— {name}</footer>
            </div>
          </blockquote>
        ))}
      </div>
      <p className="mt-8 font-mono text-xs text-brand-muted">{brand.loyalty}</p>
    </section>
  );
}
