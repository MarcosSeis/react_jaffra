import type { ProductEntity } from '../entities';
import type { ProductRepository } from '../repositories/product.repository';

export class GetProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<ProductEntity[]> {
    return this.productRepository.getProducts();
  }
}
