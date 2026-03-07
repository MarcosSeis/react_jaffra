import { ClearCartUseCase } from './clearCart.use-case';
import type { CartRepository } from '../../repositories/cart.repository';
import type { CartEntity, CartItemEntity, ProductEntity } from '../../entities';

// ── Fixtures ──────────────────────────────────────────────────────────────────

const aProduct: ProductEntity = {
  id: 5,
  title: 'John Hardy Gold Bracelet',
  price: 695.0,
  description: 'From our Legends Collection',
  category: 'jewelery',
  imageUrl: 'https://fakestoreapi.com/img/bracelet.jpg',
  rating: 4.6,
  ratingCount: 400,
};

const populatedCart: CartEntity = {
  id: 'cart-1',
  items: [{ id: 'item-5', product: aProduct, quantity: 1 }],
  total: aProduct.price,
  itemCount: 1,
};

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

describe('ClearCartUseCase', () => {
  let repository: jest.Mocked<CartRepository>;
  let useCase: ClearCartUseCase;

  beforeEach(() => {
    repository = makeMockCartRepo();
    useCase    = new ClearCartUseCase(repository);
  });

  afterEach(() => jest.clearAllMocks());

  it('returns an empty cart after clearing', async () => {
    repository.clearCart.mockResolvedValue(emptyCart);

    const result = await useCase.execute();

    expect(result.items).toHaveLength(0);
    expect(result.total).toBe(0);
    expect(result.itemCount).toBe(0);
  });

  it('calls repository.clearCart exactly once', async () => {
    repository.clearCart.mockResolvedValue(emptyCart);

    await useCase.execute();

    expect(repository.clearCart).toHaveBeenCalledTimes(1);
  });

  it('does not call any other repository method', async () => {
    repository.clearCart.mockResolvedValue(emptyCart);

    await useCase.execute();

    expect(repository.getCart).not.toHaveBeenCalled();
    expect(repository.addItem).not.toHaveBeenCalled();
    expect(repository.removeItem).not.toHaveBeenCalled();
    expect(repository.updateQuantity).not.toHaveBeenCalled();
  });

  it('propagates repository errors to the caller', async () => {
    repository.clearCart.mockRejectedValue(new Error('Permission denied'));

    await expect(useCase.execute()).rejects.toThrow('Permission denied');
  });
});
