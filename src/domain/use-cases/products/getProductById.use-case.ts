import type { ProductEntity } from '../../entities';
import type { ProductRepository } from '../../repositories/product.repository';

export class GetProductByIdUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: number): Promise<ProductEntity> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error(`Invalid product id: ${id}`);
    }

    const product = await this.productRepository.getProductById(id);

    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    return product;
  }
}
