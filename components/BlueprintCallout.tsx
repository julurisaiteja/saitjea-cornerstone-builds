export function BlueprintCallout({
  specs,
}: {
  specs: Record<string, string>;
}) {
  return (
    <dl className="mt-6 space-y-0 border-2 border-dashed border-brand-concrete bg-brand-bg/80 p-4 font-mono text-xs">
      <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-brand-muted">Spec sheet · callout A4</p>
      {Object.entries(specs).map(([k, v]) => (
        <div key={k} className="flex justify-between gap-4 border-t border-dashed border-brand-concrete py-2 first:border-t-0">
          <dt className="text-brand-muted">{k}</dt>
          <dd className="text-right font-semibold text-brand-steel">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
