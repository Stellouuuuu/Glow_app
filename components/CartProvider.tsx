"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/types";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  photo_url: string | null;
  stock: number;
  qty: number;
  selected: boolean;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  add: (product: Product) => void;
  setQty: (id: string, qty: number) => void;
  toggle: (id: string) => void;
  toggleAll: (selected: boolean) => void;
  remove: (ids: string[]) => void;
};

const noop = () => {};
const CartContext = createContext<CartContextValue>({
  items: [],
  count: 0,
  add: noop,
  setQty: noop,
  toggle: noop,
  toggleAll: noop,
  remove: noop,
});

export const useCart = () => useContext(CartContext);

const STORAGE_KEY = "glow-cart";

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Le panier est gardé dans le navigateur pour survivre aux changements de page et aux rechargements.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, loaded]);

  const add = useCallback((p: Product) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === p.id);
      if (found) {
        return prev.map((i) => (i.id === p.id ? { ...i, stock: p.stock, qty: Math.min(i.qty + 1, Math.max(p.stock, 1)) } : i));
      }
      return [
        ...prev,
        { id: p.id, slug: p.slug, name: p.name, price: p.price, photo_url: p.photo_url, stock: p.stock, qty: 1, selected: true },
      ];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, Math.min(qty, Math.max(i.stock, 1))) } : i))
    );
  }, []);

  const toggle = useCallback((id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, selected: !i.selected } : i)));
  }, []);

  const toggleAll = useCallback((selected: boolean) => {
    setItems((prev) => prev.map((i) => ({ ...i, selected })));
  }, []);

  const remove = useCallback((ids: string[]) => {
    setItems((prev) => prev.filter((i) => !ids.includes(i.id)));
  }, []);

  const value = useMemo(
    () => ({ items, count: items.reduce((n, i) => n + i.qty, 0), add, setQty, toggle, toggleAll, remove }),
    [items, add, setQty, toggle, toggleAll, remove]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
