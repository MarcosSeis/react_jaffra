import type { CartEntity } from '@domain/entities';
import type { CartRepository } from '@domain/repositories';
import type { ProductRepository } from '@domain/repositories';
import {
  GetCartUseCase,
  AddToCartUseCase,
  RemoveFromCartUseCase,
  UpdateCartItemQuantityUseCase,
  ClearCartUseCase,
  GetProductByIdUseCase,
} from '@domain/use-cases';
import { CartRepositoryImpl, ProductRepositoryImpl } from '@infrastructure/repositories';

// ── Service ───────────────────────────────────────────────────────────────────

export class CartService {
  private readonly getCartUseCase:                 GetCartUseCase;
  private readonly addToCartUseCase:               AddToCartUseCase;
  private readonly removeFromCartUseCase:          RemoveFromCartUseCase;
  private readonly updateCartItemQuantityUseCase:  UpdateCartItemQuantityUseCase;
  private readonly clearCartUseCase:               ClearCartUseCase;
  private readonly getProductByIdUseCase:          GetProductByIdUseCase;

  constructor(cartRepository: CartRepository, productRepository: ProductRepository) {
    this.getCartUseCase                = new GetCartUseCase(cartRepository);
    this.addToCartUseCase              = new AddToCartUseCase(cartRepository);
    this.removeFromCartUseCase         = new RemoveFromCartUseCase(cartRepository);
    this.updateCartItemQuantityUseCase = new UpdateCartItemQuantityUseCase(cartRepository);
    this.clearCartUseCase              = new ClearCartUseCase(cartRepository);
    this.getProductByIdUseCase         = new GetProductByIdUseCase(productRepository);
  }

  getCart(): Promise<CartEntity> {
    return this.getCartUseCase.execute();
  }

  /**
   * Resolves the product entity first, then delegates to the use case.
   * If quantity > 1 the cart item is updated to the requested quantity
   * in a second step (AddToCartUseCase always adds a single unit).
   */
  async addToCart(productId: number, quantity: number): Promise<CartEntity> {
    const product = await this.getProductByIdUseCase.execute(productId);
    const cart    = await this.addToCartUseCase.execute(product);

    if (quantity > 1) {
      return this.updateCartItemQuantityUseCase.execute(productId, quantity);
    }

    return cart;
  }

  removeFromCart(productId: number): Promise<CartEntity> {
    return this.removeFromCartUseCase.execute(productId);
  }

  updateQuantity(productId: number, quantity: number): Promise<CartEntity> {
    return this.updateCartItemQuantityUseCase.execute(productId, quantity);
  }

  clearCart(): Promise<CartEntity> {
    return this.clearCartUseCase.execute();
  }
}

// ── Factory ───────────────────────────────────────────────────────────────────

export function createCartService(): CartService {
  return new CartService(new CartRepositoryImpl(), new ProductRepositoryImpl());
}
