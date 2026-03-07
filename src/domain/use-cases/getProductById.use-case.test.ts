import { GetProductByIdUseCase } from './getProductById.use-case';
import type { ProductRepository } from '../repositories/product.repository';
import type { ProductEntity } from '../entities';

// ── Fixtures ──────────────────────────────────────────────────────────────────

const aProduct: ProductEntity = {
  id: 4,
  title: 'Mens Casual Slim Fit',
  price: 15.99,
  description: 'The color could be slightly different',
  category: "men's clothing",
  imageUrl: 'https://fakestoreapi.com/img/slim.jpg',
  rating: 2.1,
  ratingCount: 430,
};

// ── Mock factory ──────────────────────────────────────────────────────────────

function makeMockProductRepo(): jest.Mocked<ProductRepository> {
  return {
    getProducts:    jest.fn(),
    getProductById: jest.fn(),
  };
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('GetProductByIdUseCase', () => {
  let repository: jest.Mocked<ProductRepository>;
  let useCase: GetProductByIdUseCase;

  beforeEach(() => {
    repository = makeMockProductRepo();
    useCase    = new GetProductByIdUseCase(repository);
  });

  afterEach(() => jest.clearAllMocks());

  // ── Success ─────────────────────────────────────────────────────────────────

  it('returns the product when the repository finds it', async () => {
    repository.getProductById.mockResolvedValue(aProduct);

    const result = await useCase.execute(4);

    expect(result).toEqual(aProduct);
  });

  it('calls repository.getProductById with the correct id', async () => {
    repository.getProductById.mockResolvedValue(aProduct);

    await useCase.execute(4);

    expect(repository.getProductById).toHaveBeenCalledWith(4);
    expect(repository.getProductById).toHaveBeenCalledTimes(1);
  });

  // ── Guard: invalid id ────────────────────────────────────────────────────────

  it('throws when id is 0', async () => {
    await expect(useCase.execute(0)).rejects.toThrow('Invalid product id: 0');
  });

  it('throws when id is negative', async () => {
    await expect(useCase.execute(-3)).rejects.toThrow('Invalid product id: -3');
  });

  it('throws when id is a non-integer (float)', async () => {
    await expect(useCase.execute(1.9)).rejects.toThrow('Invalid product id: 1.9');
  });

  it('does NOT call the repository when the id is invalid', async () => {
    await useCase.execute(0).catch(() => null);

    expect(repository.getProductById).not.toHaveBeenCalled();
  });

  // ── Not found ────────────────────────────────────────────────────────────────

  it('throws when the repository returns null (product not found)', async () => {
    repository.getProductById.mockResolvedValue(null);

    await expect(useCase.execute(999)).rejects.toThrow('Product with id 999 not found');
  });

  // ── Error propagation ────────────────────────────────────────────────────────

  it('propagates repository errors to the caller', async () => {
    repository.getProductById.mockRejectedValue(new Error('Database timeout'));

    await expect(useCase.execute(1)).rejects.toThrow('Database timeout');
  });
});
