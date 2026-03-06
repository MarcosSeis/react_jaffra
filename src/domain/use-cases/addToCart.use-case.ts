import type { CartEntity, ProductEntity } from '../entities';
import type { CartRepository } from '../repositories/cart.repository';

export class AddToCartUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(product: ProductEntity): Promise<CartEntity> {
    if (!Number.isInteger(product.id) || product.id <= 0) {
      throw new Error(`Cannot add product with invalid id: ${product.id}`);
    }

    if (product.price < 0) {
      throw new Error(`Cannot add product with negative price: ${product.price}`);
    }

    return this.cartRepository.addItem(product);
  }
}
