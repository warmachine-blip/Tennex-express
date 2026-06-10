"use client";

import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  slug: string;
  category: string;
  variantId?: string;
  variantLabel?: string;
  quantity: number;
}

type Action =
  | { type: "ADD"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE"; productId: string; variantId?: string }
  | { type: "SET_QTY"; productId: string; variantId?: string; qty: number }
  | { type: "CLEAR" };

function itemKey(productId: string, variantId?: string) {
  return variantId ? `${productId}:${variantId}` : productId;
}

function reducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case "ADD": {
      const k = itemKey(action.payload.productId, action.payload.variantId);
      const exists = state.some((i) => itemKey(i.productId, i.variantId) === k);
      if (exists) {
        return state.map((i) =>
          itemKey(i.productId, i.variantId) === k
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case "REMOVE":
      return state.filter(
        (i) => itemKey(i.productId, i.variantId) !== itemKey(action.productId, action.variantId)
      );
    case "SET_QTY":
      if (action.qty <= 0) {
        return state.filter(
          (i) => itemKey(i.productId, i.variantId) !== itemKey(action.productId, action.variantId)
        );
      }
      return state.map((i) =>
        itemKey(i.productId, i.variantId) === itemKey(action.productId, action.variantId)
          ? { ...i, quantity: action.qty }
          : i
      );
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  add: (item: Omit<CartItem, "quantity">) => void;
  remove: (productId: string, variantId?: string) => void;
  setQty: (productId: string, variantId: string | undefined, qty: number) => void;
  clear: () => void;
  total: number;
  count: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "tennex-cart";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, [], loadCart);
  const [isOpen, setIsOpen] = useReducer((_: boolean, v: boolean) => v, false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const add = (item: Omit<CartItem, "quantity">) => {
    dispatch({ type: "ADD", payload: item });
    setIsOpen(true);
  };
  const remove = (productId: string, variantId?: string) =>
    dispatch({ type: "REMOVE", productId, variantId });
  const setQty = (productId: string, variantId: string | undefined, qty: number) =>
    dispatch({ type: "SET_QTY", productId, variantId, qty });
  const clear = () => dispatch({ type: "CLEAR" });

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items, add, remove, setQty, clear,
        total, count,
        isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
