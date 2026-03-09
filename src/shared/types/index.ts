/**
 * Shared — Common TypeScript types
 *
 * Used across all layers. No business logic here.
 */

export type ID = string | number;

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type ValueOf<T> = T[keyof T];

/** Standard single-item API response envelope */
export type ApiResponse<T> = {
  data: T;
  message?: string;
  status: number;
};

/** Standard paginated API response envelope */
export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};

/** Generic loading / error state for async operations */
export type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };
