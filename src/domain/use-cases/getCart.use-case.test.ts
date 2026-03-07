import { GetCartUseCase } from './getCart.use-case';
import type { CartRepository } from '../repositories/cart.repository';
import type { CartEntity, CartItemEntity, ProductEntity } from '../entities';

// ── Fixtures ──────────────────────────────────────────────────────────────────

const aProduct: ProductEntity = {
  id: 2,
  title: 'Mens Casual Shirt',
  price: 22.3,
  description: 'Slim-fitting style',
  category: "men's clothing",
  imageUrl: 'https://fakestoreapi.com/img/shirt.jpg',
  rating: 4.1,
  ratingCount: 259,
};

const aCartItem: CartItemEntity = { id: 'item-2', product: aProduct, quantity: 2 };

const emptyCart: CartEntity = { id: 'cart-1', items: [], total: 0, itemCount: 0 };

const cartWithItems: CartEntity = {
  id: 'cart-1',
  items: [aCartItem],
  total: aProduct.price * 2,
  itemCount: 2,
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

describe('GetCartUseCase', () => {
  let repository: jest.Mocked<CartRepository>;
  let useCase: GetCartUseCase;

  beforeEach(() => {
    repository = makeMockCartRepo();
    useCase    = new GetCartUseCase(repository);
  });

  afterEach(() => jest.clearAllMocks());

  it('returns the cart from the repository', async () => {
    repository.getCart.mockResolvedValue(cartWithItems);

    const result = await useCase.execute();

    expect(result).toEqual(cartWithItems);
  });

  it('calls repository.getCart exactly once', async () => {
    repository.getCart.mockResolvedValue(cartWithItems);

    await useCase.execute();

    expect(repository.getCart).toHaveBeenCalledTimes(1);
  });

  it('returns an empty cart when no items have been added', async () => {
    repository.getCart.mockResolvedValue(emptyCart);

    const result = await useCase.execute();

    expect(result.items).toHaveLength(0);
    expect(result.total).toBe(0);
    expect(result.itemCount).toBe(0);
  });

  it('propagates repository errors to the caller', async () => {
    repository.getCart.mockRejectedValue(new Error('Session expired'));

    await expect(useCase.execute()).rejects.toThrow('Session expired');
  });
});
