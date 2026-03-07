import type { CartEntity, CartItemEntity, ProductEntity } from '../../domain/entities';
import type { CartRepository } from '../../domain/repositories/cart.repository';

// ── In-memory singleton ───────────────────────────────────────────────────────
// Simple module-level state simulating a client-side cart session.
// Each CartRepositoryImpl instance shares this state, which is intentional
// for a single-user, single-session application.

let cartState: CartEntity = { id: 'cart-1', items: [], total: 0, itemCount: 0 };

function buildCart(items: CartItemEntity[]): CartEntity {
  const total     = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  return { id: cartState.id, items, total, itemCount };
}

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
    return { ...cartState };
  }

  async removeItem(productId: number): Promise<CartEntity> {
    const items = cartState.items.filter((i) => i.product.id !== productId);
    cartState = buildCart(items);
    return { ...cartState };
  }

  async updateQuantity(productId: number, quantity: number): Promise<CartEntity> {
    const items = cartState.items.map((i) =>
      i.product.id === productId ? { ...i, quantity } : i,
    );
    cartState = buildCart(items);
    return { ...cartState };
  }

  async clearCart(): Promise<CartEntity> {
    cartState = buildCart([]);
    return { ...cartState };
  }
}
