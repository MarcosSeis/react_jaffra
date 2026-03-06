/**
 * Feature: Checkout — Types
 */

import type { Entity } from '@/src/domain/entities';
import type { Cart } from '@/src/features/cart/types';

export type PaymentMethod = 'credit_card' | 'debit_card' | 'paypal';

export interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order extends Entity {
  cart: Cart;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: Date;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface PlaceOrderInput {
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
}
