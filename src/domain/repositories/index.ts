/**
 * Domain Layer — Repository Interfaces
 *
 * Contracts that the Infrastructure layer must implement.
 * The Domain only knows the interface, never the concrete class.
 */

export interface IRepository<T, TId = string | number> {
  findById(id: TId): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(entity: Omit<T, 'id'>): Promise<T>;
  update(id: TId, entity: Partial<T>): Promise<T>;
  delete(id: TId): Promise<void>;
}

export interface IPaginatedRepository<T, TId = string | number>
  extends IRepository<T, TId> {
  findPaginated(page: number, limit: number): Promise<{
    data: T[];
    total: number;
    page: number;
    limit: number;
  }>;
}
