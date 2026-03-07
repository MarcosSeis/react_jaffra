import { UpdateCartItemQuantityUseCase } from './updateCartItemQuantity.use-case';
import type { CartRepository } from '../repositories/cart.repository';
import type { CartEntity, CartItemEntity, ProductEntity } from '../entities';

// ── Fixtures ──────────────────────────────────────────────────────────────────

const aProduct: ProductEntity = {
  id: 3,
  title: 'Mens Cotton Jacket',
  price: 55.99,
  description: 'Great jacket',
  category: "men's clothing",
  imageUrl: 'https://fakestoreapi.com/img/jacket.jpg',
  rating: 4.7,
  ratingCount: 500,
};

const aCartItem: CartItemEntity = { id: 'item-3', product: aProduct, quantity: 1 };

const emptyCart: CartEntity   = { id: 'cart-1', items: [], total: 0, itemCount: 0 };
const updatedCart: CartEntity = {
  id: 'cart-1',
  items: [{ ...aCartItem, quantity: 3 }],
  total: aProduct.price * 3,
  itemCount: 3,
};

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

describe('UpdateCartItemQuantityUseCase', () => {
  let repository: jest.Mocked<CartRepository>;
  let useCase: UpdateCartItemQuantityUseCase;

  beforeEach(() => {
    repository = makeMockCartRepo();
    useCase    = new UpdateCartItemQuantityUseCase(repository);
  });

  afterEach(() => jest.clearAllMocks());

  // ── Success: normal update ───────────────────────────────────────────────────

  it('calls updateQuantity with the correct productId and quantity', async () => {
    repository.updateQuantity.mockResolvedValue(updatedCart);

    await useCase.execute(3, 3);

    expect(repository.updateQuantity).toHaveBeenCalledWith(3, 3);
    expect(repository.updateQuantity).toHaveBeenCalledTimes(1);
  });

  it('returns the updated cart from the repository', async () => {
    repository.updateQuantity.mockResolvedValue(updatedCart);

    const result = await useCase.execute(3, 3);

    expect(result).toEqual(updatedCart);
  });

  // ── Business rule: quantity === 0 removes the item ───────────────────────────

  it('calls removeItem instead of updateQuantity when quantity is 0', async () => {
    repository.removeItem.mockResolvedValue(emptyCart);

    await useCase.execute(3, 0);

    expect(repository.removeItem).toHaveBeenCalledWith(3);
    expect(repository.updateQuantity).not.toHaveBeenCalled();
  });

  it('returns the cart after removal when quantity is 0', async () => {
    repository.removeItem.mockResolvedValue(emptyCart);

    const result = await useCase.execute(3, 0);

    expect(result).toEqual(emptyCart);
  });

  // ── Guard: invalid quantity ──────────────────────────────────────────────────

  it('throws when quantity is negative', async () => {
    await expect(useCase.execute(3, -1))
      .rejects.toThrow('Quantity must be a non-negative integer, got: -1');
  });

  it('throws when quantity is a non-integer (float)', async () => {
    await expect(useCase.execute(3, 1.5))
      .rejects.toThrow('Quantity must be a non-negative integer, got: 1.5');
  });

  it('does NOT call the repository when quantity is invalid', async () => {
    await useCase.execute(3, -2).catch(() => null);

    expect(repository.updateQuantity).not.toHaveBeenCalled();
    expect(repository.removeItem).not.toHaveBeenCalled();
  });

  // ── Error propagation ────────────────────────────────────────────────────────

  it('propagates repository errors from updateQuantity', async () => {
    repository.updateQuantity.mockRejectedValue(new Error('Concurrent update conflict'));

    await expect(useCase.execute(3, 2)).rejects.toThrow('Concurrent update conflict');
  });

  it('propagates repository errors when quantity is 0 (removeItem path)', async () => {
    repository.removeItem.mockRejectedValue(new Error('Item not found'));

    await expect(useCase.execute(3, 0)).rejects.toThrow('Item not found');
  });
});
