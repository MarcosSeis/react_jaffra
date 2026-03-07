import type { CartEntity } from '../../entities';
import type { CartRepository } from '../../repositories/cart.repository';

export class GetCartUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(): Promise<CartEntity> {
    return this.cartRepository.getCart();
  }
}
