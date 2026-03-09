import { GetProductsUseCase } from './getProducts.use-case';
import type { ProductRepository } from '../../repositories/product.repository';
import type { ProductEntity } from '../../entities';

// ── Fixtures ──────────────────────────────────────────────────────────────────

const mockProducts: ProductEntity[] = [
  {
    id: 1,
    title: 'Fjallraven Backpack',
    price: 109.95,
    description: 'Your perfect pack for everyday use.',
    category: "men's clothing",
    imageUrl: 'https://fakestoreapi.com/img/81fAn1X5ziL._AC_SX679_.jpg',
    rating: 3.9,
    ratingCount: 120,
  },
  {
    id: 2,
    title: 'Mens Casual Shirt',
    price: 22.3,
    description: 'Slim-fitting style.',
    category: "men's clothing",
    imageUrl: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    rating: 4.1,
    ratingCount: 259,
  },
];

// ── Mock factory ──────────────────────────────────────────────────────────────

function makeMockRepository(): jest.Mocked<ProductRepository> {
  return {
    getProducts:    jest.fn(),
    getProductById: jest.fn(),
  };
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('GetProductsUseCase', () => {
  let repository: jest.Mocked<ProductRepository>;
  let useCase: GetProductsUseCase;

  beforeEach(() => {
    repository = makeMockRepository();
    useCase    = new GetProductsUseCase(repository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns the products provided by the repository', async () => {
    repository.getProducts.mockResolvedValue(mockProducts);

    const result = await useCase.execute();

    expect(result).toEqual(mockProducts);
  });

  it('delegates to the repository exactly once', async () => {
    repository.getProducts.mockResolvedValue(mockProducts);

    await useCase.execute();

    expect(repository.getProducts).toHaveBeenCalledTimes(1);
  });

  it('returns an empty array when the catalogue is empty', async () => {
    repository.getProducts.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result).toHaveLength(0);
  });

  it('propagates repository errors to the caller', async () => {
    const networkError = new Error('Network unavailable');
    repository.getProducts.mockRejectedValue(networkError);

    await expect(useCase.execute()).rejects.toThrow('Network unavailable');
  });
});
