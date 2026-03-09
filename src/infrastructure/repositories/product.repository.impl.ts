/**
 * Infrastructure — ProductRepositoryImpl
 *
 * Concrete implementation of the domain's ProductRepository contract.
 * Fetches data from FakeStore API and maps raw responses to domain entities.
 *
 * Dependency direction:
 *   infrastructure → domain (implements interface, returns entities)
 *   infrastructure → infrastructure (uses fakeStoreApi + productMapper internally)
 */

import type { ProductEntity } from '@/domain/entities';
import type { ProductRepository } from '@/domain/repositories';
import { fakeStoreApi } from '../api/fakeStoreApi';
import { productMapper } from '../mappers/product.mapper';

export class ProductRepositoryImpl implements ProductRepository {
  async getProducts(): Promise<ProductEntity[]> {
    const apiProducts = await fakeStoreApi.fetchProducts();
    return apiProducts.map((p) => productMapper.toDomain(p));
  }

  async getProductById(id: number): Promise<ProductEntity | null> {
    try {
      const apiProduct = await fakeStoreApi.fetchProductById(id);
      return productMapper.toDomain(apiProduct);
    } catch (error) {
      // FakeStore responds with a non-ok status for missing products.
      // Return null to honor the domain contract (not found ≠ error).
      if (error instanceof Error && error.message.includes('404')) {
        return null;
      }
      throw error;
    }
  }
}
