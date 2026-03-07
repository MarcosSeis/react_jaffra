/**
 * Infrastructure — FakeStore API response types
 *
 * These types mirror the raw JSON returned by the FakeStore API.
 * They must NOT be used outside the infrastructure layer.
 * Use domain entities (ProductEntity) everywhere else.
 */

export interface ApiProductRating {
  rate: number;
  count: number;
}

export interface ApiProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ApiProductRating;
}
