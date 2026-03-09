/**
 * Feature: Products — Types
 *
 * Product is a type alias for the domain entity so there is a single
 * source of truth. Feature-specific input/filter types live here.
 */

export type { ProductEntity as Product } from '@/domain/entities';

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}
