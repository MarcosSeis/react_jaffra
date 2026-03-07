import { AddToCartUseCase } from './addToCart.use-case';
import type { CartRepository } from '../../repositories/cart.repository';
import type { CartEntity, CartItemEntity, ProductEntity } from '../../entities';

// ── Fixtures ──────────────────────────────────────────────────────────────────

const aProduct: ProductEntity = {
  id: 1,
  title: 'Fjallraven Backpack',
  price: 109.95,
  description: 'Everyday backpack',
  category: "men's clothing",
  imageUrl: 'https://fakestoreapi.com/img/backpack.jpg',
  rating: 3.9,
  ratingCount: 120,
};

const aCartItem: CartItemEntity = { id: 'item-1', product: aProduct, quantity: 1 };

const emptyCart: CartEntity = { id: 'cart-1', items: [], total: 0, itemCount: 0 };

const cartWithItem: CartEntity = {
  id: 'cart-1',
  items: [aCartItem],
  total: aProduct.price,
  itemCount: 1,
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

describe('AddToCartUseCase', () => {
  let repository: jest.Mocked<CartRepository>;
  let useCase: AddToCartUseCase;

  beforeEach(() => {
    repository = makeMockCartRepo();
    useCase    = new AddToCartUseCase(repository);
  });

  afterEach(() => jest.clearAllMocks());

  // ── Success ─────────────────────────────────────────────────────────────────

  it('returns the updated cart after adding the product', async () => {
    repository.addItem.mockResolvedValue(cartWithItem);

    const result = await useCase.execute(aProduct);

    expect(result).toEqual(cartWithItem);
  });

  it('calls repository.addItem with the exact product', async () => {
    repository.addItem.mockResolvedValue(cartWithItem);

    await useCase.execute(aProduct);

    expect(repository.addItem).toHaveBeenCalledWith(aProduct);
    expect(repository.addItem).toHaveBeenCalledTimes(1);
  });

  it('allows a product with price 0 (free product)', async () => {
    const freeProduct: ProductEntity = { ...aProduct, price: 0 };
    const cartWithFree: CartEntity   = { ...emptyCart, items: [{ ...aCartItem, product: freeProduct }] };
    repository.addItem.mockResolvedValue(cartWithFree);

    await expect(useCase.execute(freeProduct)).resolves.toEqual(cartWithFree);
  });

  // ── Guard: invalid id ────────────────────────────────────────────────────────

  it('throws when product id is 0', async () => {
    const invalid = { ...aProduct, id: 0 };

    await expect(useCase.execute(invalid)).rejects.toThrow('invalid id: 0');
  });

  it('throws when product id is negative', async () => {
    const invalid = { ...aProduct, id: -1 };

    await expect(useCase.execute(invalid)).rejects.toThrow('invalid id: -1');
  });

  it('throws when product id is a non-integer (float)', async () => {
    const invalid = { ...aProduct, id: 1.5 };

    await expect(useCase.execute(invalid)).rejects.toThrow('invalid id: 1.5');
  });

  it('does NOT call the repository when the id is invalid', async () => {
    const invalid = { ...aProduct, id: 0 };

    await useCase.execute(invalid).catch(() => null);

    expect(repository.addItem).not.toHaveBeenCalled();
  });

  // ── Guard: negative price ────────────────────────────────────────────────────

  it('throws when product price is negative', async () => {
    const invalid = { ...aProduct, price: -10 };

    await expect(useCase.execute(invalid)).rejects.toThrow('negative price: -10');
  });

  it('does NOT call the repository when the price is negative', async () => {
    const invalid = { ...aProduct, price: -0.01 };

    await useCase.execute(invalid).catch(() => null);

    expect(repository.addItem).not.toHaveBeenCalled();
  });

  // ── Error propagation ────────────────────────────────────────────────────────

  it('propagates unexpected repository errors to the caller', async () => {
    repository.addItem.mockRejectedValue(new Error('Storage unavailable'));

    await expect(useCase.execute(aProduct)).rejects.toThrow('Storage unavailable');
  });
});
