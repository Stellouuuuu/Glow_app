"use client";

import { createContext, useContext, useState } from "react";

type CartContextValue = { count: number; add: () => void };

const CartContext = createContext<CartContextValue>({ count: 0, add: () => {} });

export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  return (
    <CartContext.Provider value={{ count, add: () => setCount((c) => c + 1) }}>
      {children}
    </CartContext.Provider>
  );
}
