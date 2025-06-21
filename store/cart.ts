import { create } from "zustand";

type CartItem = { id: number; quantity: number };
type CartState = {
  items: CartItem[];
  phone: string;
  setPhone: (v: string) => void;
  addItem: (id: number) => void;
  removeItem: (id: number) => void;
  setQuantity: (id: number, qty: number) => void;
  reset: () => void;
};

export const useCart = create<CartState>((set) => ({
  items:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart") || "[]")
      : [],
  phone:
    typeof window !== "undefined" ? localStorage.getItem("phone") || "" : "",
  setPhone: (v) => {
    localStorage.setItem("phone", v);
    set({ phone: v });
  },
  addItem: (id) =>
    set((state) => {
      const found = state.items.find((i) => i.id === id);
      const items = found
        ? state.items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...state.items, { id, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(items));
      return { items };
    }),
  removeItem: (id) =>
    set((state) => {
      const items = state.items.filter((i) => i.id !== id);
      localStorage.setItem("cart", JSON.stringify(items));
      return { items };
    }),
  setQuantity: (id, qty) =>
    set((state) => {
      const items = state.items.map((i) =>
        i.id === id ? { ...i, quantity: qty } : i
      );
      localStorage.setItem("cart", JSON.stringify(items));
      return { items };
    }),
  reset: () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("phone");
    set({ items: [], phone: "" });
  },
}));
