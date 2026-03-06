/**
 * Feature: Cart — Types
 */

import type { Entity } from '@/domain/entities';
import type { Product } from '@/features/products/types';

export interface CartItem extends Entity {
  product: Product;
  quantity: number;
}

export interface Cart extends Entity {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface AddToCartInput {
  productId: Product['id'];
  quantity: number;
}

export interface UpdateCartItemInput {
  cartItemId: CartItem['id'];
  quantity: number;
}
