import { create } from "zustand";
import type { CartEntity } from "@/domain/entities";

type CartState = {
  cart: CartEntity | null;
  setCart: (cart: CartEntity) => void;
};

export const useCartStore = create<CartState>((set) => ({
  cart: null,
  setCart: (cart) => set({ cart }),
}));
