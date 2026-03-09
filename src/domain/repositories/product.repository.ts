import type { ProductEntity } from '../entities';

/**
 * Contract for product data access.
 * The Infrastructure layer must provide a concrete implementation.
 * The Domain never depends on any concrete class.
 */
export interface ProductRepository {
  getProducts(): Promise<ProductEntity[]>;
  getProductById(id: number): Promise<ProductEntity | null>;
}
