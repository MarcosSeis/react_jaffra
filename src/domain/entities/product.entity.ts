/**
 * Domain Entity — Product
 *
 * Core business object. Represents a product in the catalogue.
 * No framework dependency, no I/O.
 */

export interface ProductEntity {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}
