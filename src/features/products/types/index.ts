/**
 * Feature: Products — Types
 */

import type { AuditableEntity } from '@/domain/entities';
import type { ID } from '@/shared/types';

export interface Product extends AuditableEntity {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  categoryId: ID;
}

export interface ProductFilters {
  categoryId?: ID;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  categoryId: ID;
}

export type UpdateProductInput = Partial<CreateProductInput>;
