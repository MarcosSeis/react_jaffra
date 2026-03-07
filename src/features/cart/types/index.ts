/**
 * Feature: Cart — Types
 *
 * Cart and CartItem are type aliases for the domain entities.
 * Mutation input types are feature-specific and live here.
 */

import type { ProductEntity } from '@/domain/entities';

export type { CartItemEntity as CartItem } from '@/domain/entities';
export type { CartEntity as Cart } from '@/domain/entities';

export interface AddToCartInput {
  productId: ProductEntity['id'];
  quantity: number;
}

export interface UpdateCartItemInput {
  cartItemId: string;
  quantity: number;
}
