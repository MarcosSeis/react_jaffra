import { RemoveFromCartUseCase } from './removeFromCart.use-case';
import type { CartRepository } from '../../repositories/cart.repository';
import type { CartEntity } from '../../entities';

// ── Fixtures ──────────────────────────────────────────────────────────────────

const emptyCart: CartEntity = { id: 'cart-1', items: [], total: 0, itemCount: 0 };

// ── Mock factory ──────────────────────────────────────────────────────────────

function makeMockCartRepo(): jest.Mocked<CartRepository> {
  return {
    getCart:        jest.fn(),
    addItem:        jest.fn(),
    removeItem:     jest.fn(),
    updateQuantity: jest.fn(),
    clearCart:      jest.fn(),
  };
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('RemoveFromCartUseCase', () => {
  let repository: jest.Mocked<CartRepository>;
  let useCase: RemoveFromCartUseCase;

  beforeEach(() => {
    repository = makeMockCartRepo();
    useCase    = new RemoveFromCartUseCase(repository);
  });

  afterEach(() => jest.clearAllMocks());

  // ── Success ─────────────────────────────────────────────────────────────────

  it('returns the updated cart after removal', async () => {
    repository.removeItem.mockResolvedValue(emptyCart);

    const result = await useCase.execute(1);

    expect(result).toEqual(emptyCart);
  });

  it('calls repository.removeItem with the correct productId', async () => {
    repository.removeItem.mockResolvedValue(emptyCart);

    await useCase.execute(42);

    expect(repository.removeItem).toHaveBeenCalledWith(42);
    expect(repository.removeItem).toHaveBeenCalledTimes(1);
  });

  // ── Guard: invalid productId ─────────────────────────────────────────────────

  it('throws when productId is 0', async () => {
    await expect(useCase.execute(0)).rejects.toThrow('Invalid productId: 0');
  });

  it('throws when productId is negative', async () => {
    await expect(useCase.execute(-5)).rejects.toThrow('Invalid productId: -5');
  });

  it('throws when productId is a non-integer (float)', async () => {
    await expect(useCase.execute(2.7)).rejects.toThrow('Invalid productId: 2.7');
  });

  it('does NOT call the repository when productId is invalid', async () => {
    await useCase.execute(0).catch(() => null);

    expect(repository.removeItem).not.toHaveBeenCalled();
  });

  // ── Error propagation ────────────────────────────────────────────────────────

  it('propagates repository errors to the caller', async () => {
    repository.removeItem.mockRejectedValue(new Error('Cart not found'));

    await expect(useCase.execute(1)).rejects.toThrow('Cart not found');
  });
});
