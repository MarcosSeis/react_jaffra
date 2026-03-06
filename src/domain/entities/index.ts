/**
 * Domain Layer — Entities
 *
 * Pure business objects. They hold state and enforce invariants.
 * No framework dependency. No I/O. The center of Clean Architecture.
 */

export interface Entity {
  id: string | number;
}

export interface AuditableEntity extends Entity {
  createdAt: Date;
  updatedAt: Date;
}
