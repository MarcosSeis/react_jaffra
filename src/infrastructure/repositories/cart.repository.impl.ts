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

function saveCart(cart: CartEntity): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

// ── In-memory singleton ───────────────────────────────────────────────────────
// Starts empty so server render and client initial render always match.
// On the first client-side call (from useEffect), we hydrate from localStorage.

let cartState: CartEntity = buildCart([]);
let hydrated = false;

function ensureHydrated(): void {
  if (hydrated || typeof window === 'undefined') return;
  hydrated = true;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed: CartEntity = JSON.parse(raw);
    cartState = buildCart(parsed.items ?? []);
  } catch {
    // corrupted storage — keep the empty cart
  }
}

// ── Implementation ────────────────────────────────────────────────────────────

export class CartRepositoryImpl implements CartRepository {
  async getCart(): Promise<CartEntity> {
    ensureHydrated();
    return { ...cartState, items: [...cartState.items] };
  }

  async addItem(product: ProductEntity, quantity: number): Promise<CartEntity> {
    ensureHydrated();
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
    ensureHydrated();
    const items = cartState.items.filter((i) => i.product.id !== productId);
    cartState = buildCart(items);
    saveCart(cartState);
    return { ...cartState };
  }

  async updateQuantity(productId: number, quantity: number): Promise<CartEntity> {
    ensureHydrated();
    const items = cartState.items.map((i) =>
      i.product.id === productId ? { ...i, quantity } : i,
    );
    cartState = buildCart(items);
    saveCart(cartState);
    return { ...cartState };
  }

  async clearCart(): Promise<CartEntity> {
    ensureHydrated();
    cartState = buildCart([]);
    saveCart(cartState);
    return { ...cartState };
  }
}
