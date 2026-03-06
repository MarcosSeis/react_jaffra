/**
 * Domain Layer — Entities
 *
 * Pure business objects. They hold state and enforce invariants.
 * No framework dependency. No I/O. The center of Clean Architecture.
 *
 * Usage:
 *   import { ProductEntity, CartItemEntity } from '@/domain/entities';
 */

/** Minimal base for any identifiable domain object */
export interface Entity {
  id: string | number;
}

/** Adds audit timestamps to any entity */
export interface AuditableEntity extends Entity {
  createdAt: Date;
  updatedAt: Date;
}

// ── Business entities ────────────────────────────────────────────────────────
export type { ProductEntity } from './product.entity';
export type { CartItemEntity } from './cart-item.entity';
