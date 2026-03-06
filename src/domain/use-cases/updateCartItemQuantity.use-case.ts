import type { CartEntity } from '../entities';
import type { CartRepository } from '../repositories/cart.repository';

export class UpdateCartItemQuantityUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(productId: number, quantity: number): Promise<CartEntity> {
    if (!Number.isInteger(quantity) || quantity < 0) {
      throw new Error(`Quantity must be a non-negative integer, got: ${quantity}`);
    }

    // Business rule: quantity 0 is equivalent to removing the item
    if (quantity === 0) {
      return this.cartRepository.removeItem(productId);
    }

    return this.cartRepository.updateQuantity(productId, quantity);
  }
}
