"use client";
import { useState } from "react";
import { brand } from "@/lib/data";

type Msg = { role: "bot" | "user"; text: string };

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: `Hi — I'm the ${brand.name} assistant. Ask about products, sizing, offers, or ${brand.niche.toLowerCase()}.` },
  ]);
  const [input, setInput] = useState("");

  function ask(q: string) {
    if (!q.trim()) return;
    const hit = brand.ai.find(([a]) => q.toLowerCase().includes(a.toLowerCase().slice(0, 12))) 
      || brand.ai.find(([a]) => a.toLowerCase().split(" ").some((w) => w.length > 4 && q.toLowerCase().includes(w)));
    const answer = hit
      ? hit[1]
      : `Great question. Browse Shop for ${brand.categories.join(", ")}, use code ${brand.offer.code}, or try one of the suggested prompts below.`;
    setMsgs((m) => [...m, { role: "user", text: q }, { role: "bot", text: answer }]);
    setInput("");
  }

  return (
    <>
      <button type="button" onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 rounded-sm bg-brand-primary px-4 py-3 text-sm font-semibold shadow-lg animate-floaty"
        style={{ color: "#fff" }}>
        {open ? "Close chat" : "Ask AI"}
      </button>
      {open && (
        <div className="fixed bottom-20 right-5 z-50 flex h-[420px] w-[min(92vw,360px)] flex-col overflow-hidden rounded-sm border border-brand-border bg-brand-surface shadow-2xl">
          <div className="border-b border-brand-border px-4 py-3">
            <p className="font-display text-lg">{brand.name} Assistant</p>
            <p className="text-xs text-brand-muted">Canned niche help · demo</p>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3 text-sm">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "ml-8 rounded-sm bg-brand-primary/15 px-3 py-2" : "mr-6 rounded-sm bg-brand-bg px-3 py-2"}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1 border-t border-brand-border px-3 py-2">
            {brand.ai.slice(0, 3).map(([q]) => (
              <button key={q} type="button" className="rounded-sm border border-brand-border px-2 py-1 text-[10px] text-brand-muted hover:text-brand-fg" onClick={() => ask(q)}>
                {q.length > 36 ? q.slice(0, 34) + "…" : q}
              </button>
            ))}
          </div>
          <form className="flex gap-2 border-t border-brand-border p-3" onSubmit={(e) => { e.preventDefault(); ask(input); }}>
            <input className="input !py-2" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything…" />
            <button className="btn-primary !px-3 !py-2" type="submit">Send</button>
          </form>
        </div>
      )}
    </>
  );
}
