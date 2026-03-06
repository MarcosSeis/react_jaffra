/**
 * Domain Entity — Product
 *
 * Core business object. Represents a product in the catalogue.
 * Aligned with the FakeStore API response shape.
 * No framework dependency, no I/O.
 *
 * API ref: GET https://fakestoreapi.com/products/:id
 * Raw fields: id, title, price, description, category, image, rating.rate, rating.count
 * The infrastructure mapper translates: image → imageUrl, rating.rate → rating, rating.count → ratingCount
 */

export interface ProductEntity {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  rating: number;
  ratingCount: number;
}
