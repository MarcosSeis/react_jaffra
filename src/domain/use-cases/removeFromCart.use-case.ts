import type { CartEntity } from '../entities';
import type { CartRepository } from '../repositories/cart.repository';

export class RemoveFromCartUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(productId: number): Promise<CartEntity> {
    if (!Number.isInteger(productId) || productId <= 0) {
      throw new Error(`Invalid productId: ${productId}`);
    }

    return this.cartRepository.removeItem(productId);
  }
}
