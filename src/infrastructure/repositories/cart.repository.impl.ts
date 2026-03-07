import type { CartEntity, CartItemEntity, ProductEntity } from '../../domain/entities';
import type { CartRepository } from '../../domain/repositories/cart.repository';

// ── Storage key ───────────────────────────────────────────────────────────────

const STORAGE_KEY = 'cart-storage';

// ── Helpers ───────────────────────────────────────────────────────────────────

function buildCart(items: CartItemEntity[]): CartEntity {
  const total     = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  return { id: 'cart-1', items, total, itemCount };
}

function loadCart(): CartEntity {
  if (typeof window === 'undefined') return buildCart([]);
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return buildCart([]);
    const parsed: CartEntity = JSON.parse(raw);
    // Recalculate totals to ensure consistency
    return buildCart(parsed.items ?? []);
  } catch {
    return buildCart([]);
  }
}

function saveCart(cart: CartEntity): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

// ── In-memory singleton (hydrated from localStorage) ─────────────────────────

let cartState: CartEntity = loadCart();

// ── Implementation ────────────────────────────────────────────────────────────

export class CartRepositoryImpl implements CartRepository {
  async getCart(): Promise<CartEntity> {
    return { ...cartState, items: [...cartState.items] };
  }

  async addItem(product: ProductEntity, quantity: number): Promise<CartEntity> {
    const existing = cartState.items.find((i) => i.product.id === product.id);

    const items: CartItemEntity[] = existing
      ? cartState.items.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i,
        )
      : [...cartState.items, { id: `item-${product.id}`, product, quantity }];

    cartState = buildCart(items);
    saveCart(cartState);
    return { ...cartState };
  }

  async removeItem(productId: number): Promise<CartEntity> {
    const items = cartState.items.filter((i) => i.product.id !== productId);
    cartState = buildCart(items);
    saveCart(cartState);
    return { ...cartState };
  }

  async updateQuantity(productId: number, quantity: number): Promise<CartEntity> {
    const items = cartState.items.map((i) =>
      i.product.id === productId ? { ...i, quantity } : i,
    );
    cartState = buildCart(items);
    saveCart(cartState);
    return { ...cartState };
  }

  async clearCart(): Promise<CartEntity> {
    cartState = buildCart([]);
    saveCart(cartState);
    return { ...cartState };
  }
}
