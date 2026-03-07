import type { ProductEntity } from '@domain/entities';
import type { ProductRepository } from '@domain/repositories';
import { GetProductsUseCase, GetProductByIdUseCase } from '@domain/use-cases';
import { ProductRepositoryImpl } from '@infrastructure/repositories';

// ── Service ───────────────────────────────────────────────────────────────────

export class ProductService {
  private readonly getProductsUseCase:   GetProductsUseCase;
  private readonly getProductByIdUseCase: GetProductByIdUseCase;

  constructor(repository: ProductRepository) {
    this.getProductsUseCase    = new GetProductsUseCase(repository);
    this.getProductByIdUseCase = new GetProductByIdUseCase(repository);
  }

  getProducts(): Promise<ProductEntity[]> {
    return this.getProductsUseCase.execute();
  }

  getProductById(id: number): Promise<ProductEntity> {
    return this.getProductByIdUseCase.execute(id);
  }
}

// ── Factory ───────────────────────────────────────────────────────────────────

export function createProductService(): ProductService {
  return new ProductService(new ProductRepositoryImpl());
}
