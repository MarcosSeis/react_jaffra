import type { CartEntity, ProductEntity } from '../entities';

/**
 * Contract for cart persistence.
 * Implementations decide the storage strategy (memory, localStorage, remote API, etc.).
 * The Domain only knows this interface.
 */
export interface CartRepository {
  getCart(): Promise<CartEntity>;
  addItem(product: ProductEntity, quantity: number): Promise<CartEntity>;
  removeItem(productId: number): Promise<CartEntity>;
  updateQuantity(productId: number, quantity: number): Promise<CartEntity>;
  clearCart(): Promise<CartEntity>;
}
