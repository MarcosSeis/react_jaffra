/**
 * Domain Entity — CartItem
 *
 * Represents a single line in the shopping cart.
 * References the product by value (snapshot) to preserve
 * price at the time of adding to cart.
 */

import type { ProductEntity } from './product.entity';

export interface CartItemEntity {
  id: string;
  product: ProductEntity;
  quantity: number;
}
