/**
 * Domain Layer — Use Case Interfaces
 *
 * Each use case represents a single business operation.
 * They are framework-agnostic and only depend on domain entities.
 */

export interface UseCase<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>;
}

export interface UseCaseNoInput<TOutput> {
  execute(): Promise<TOutput>;
}
