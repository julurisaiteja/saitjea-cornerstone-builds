"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "./data";

export type CartItem = Product & { qty: number; variant?: string };

type CartCtx = {
  items: CartItem[];
  wish: string[];
  add: (p: Product, qty?: number, variant?: string) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  toggleWish: (id: string) => void;
  count: number;
  subtotal: number;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "cart-cornerstone-builds-v3";
const WKEY = "wish-cornerstone-builds-v3";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wish, setWish] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
      const w = localStorage.getItem(WKEY);
      if (w) setWish(JSON.parse(w));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, ready]);
  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(WKEY, JSON.stringify(wish));
  }, [wish, ready]);

  const api = useMemo<CartCtx>(() => {
    const add = (p: Product, qty = 1, variant?: string) => {
      setItems((prev) => {
        const i = prev.findIndex((x) => x.id === p.id && x.variant === variant);
        if (i >= 0) {
          const next = [...prev];
          next[i] = { ...next[i], qty: next[i].qty + qty };
          return next;
        }
        return [...prev, { ...p, qty, variant }];
      });
    };
    return {
      items,
      wish,
      add,
      remove: (id) => setItems((prev) => prev.filter((x) => x.id !== id)),
      setQty: (id, qty) =>
        setItems((prev) =>
          prev
            .map((x) => (x.id === id ? { ...x, qty } : x))
            .filter((x) => x.qty > 0)
        ),
      clear: () => setItems([]),
      toggleWish: (id) =>
        setWish((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
      count: items.reduce((n, x) => n + x.qty, 0),
      subtotal: items.reduce((n, x) => n + x.price * x.qty, 0),
    };
  }, [items, wish]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("CartProvider missing");
  return v;
}
