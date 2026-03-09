/**
 * Domain Entity — Cart
 *
 * Represents the shopping cart aggregate.
 * Owns a collection of CartItems and derives computed totals.
 */

import type { CartItemEntity } from './cart-item.entity';

export interface CartEntity {
  id: string;
  items: CartItemEntity[];
  total: number;
  itemCount: number;
}
