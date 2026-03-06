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

export { GetProductsUseCase }        from './getProducts.use-case';
export { GetProductByIdUseCase }     from './getProductById.use-case';

// ── Cart use cases ───────────────────────────────────────────────────────────

export { GetCartUseCase }                from './getCart.use-case';
export { AddToCartUseCase }              from './addToCart.use-case';
export { RemoveFromCartUseCase }         from './removeFromCart.use-case';
export { UpdateCartItemQuantityUseCase } from './updateCartItemQuantity.use-case';
export { ClearCartUseCase }              from './clearCart.use-case';
