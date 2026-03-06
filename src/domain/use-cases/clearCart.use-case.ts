import type { CartEntity } from '../entities';
import type { CartRepository } from '../repositories/cart.repository';

export class ClearCartUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(): Promise<CartEntity> {
    return this.cartRepository.clearCart();
  }
}
