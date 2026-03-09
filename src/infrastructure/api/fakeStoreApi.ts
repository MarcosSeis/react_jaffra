/**
 * Infrastructure — FakeStore API client
 *
 * Handles all HTTP communication with https://fakestoreapi.com.
 * Returns raw ApiProduct types — callers are responsible for mapping
 * to domain entities via a mapper.
 */

import type { ApiProduct } from "./types";

const BASE_URL = "https://fakestoreapi.com";

async function get<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(
      `[FakeStore] GET ${endpoint} failed — ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<T>;
}

export const fakeStoreApi = {
  /**
   * Fetch the full product catalogue.
   * GET /products
   */
  fetchProducts(): Promise<ApiProduct[]> {
    return get<ApiProduct[]>("/products");
  },

  /**
   * Fetch a single product by its numeric id.
   * GET /products/:id
   */
  fetchProductById(id: number): Promise<ApiProduct> {
    return get<ApiProduct>(`/products/${id}`);
  },
};
