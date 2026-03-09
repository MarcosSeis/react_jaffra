/**
 * Domain Layer — Use Cases
 *
 * Each use case represents a single business operation.
 * They are framework-agnostic and depend only on domain entities and repository interfaces.
 *
 * Usage:
 *   import { GetProductsUseCase, AddToCartUseCase } from '@/domain/use-cases';
 */

// ── Base contracts ───────────────────────────────────────────────────────────

export interface UseCase<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>;
}

export interface UseCaseNoInput<TOutput> {
  execute(): Promise<TOutput>;
}

// ── Product use cases ────────────────────────────────────────────────────────

export { GetProductsUseCase }        from './products/getProducts.use-case';
export { GetProductByIdUseCase }     from './products/getProductById.use-case';

// ── Cart use cases ───────────────────────────────────────────────────────────

export { GetCartUseCase }                from './cart/getCart.use-case';
export { AddToCartUseCase }              from './cart/addToCart.use-case';
export { RemoveFromCartUseCase }         from './cart/removeFromCart.use-case';
export { UpdateCartItemQuantityUseCase } from './cart/updateCartItemQuantity.use-case';
export { ClearCartUseCase }              from './cart/clearCart.use-case';
