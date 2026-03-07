/**
 * Infrastructure — Product Mapper
 *
 * Translates between the raw FakeStore API shape (ApiProduct)
 * and the clean domain entity (ProductEntity).
 *
 * Field translations:
 *   image        → imageUrl
 *   rating.rate  → rating
 *   rating.count → ratingCount
 */

import type { ProductEntity } from '@/domain/entities';
import type { IMapper } from './index';
import type { ApiProduct } from '../api/types';

export const productMapper: IMapper<ApiProduct, ProductEntity> = {
  toDomain(raw: ApiProduct): ProductEntity {
    return {
      id:          raw.id,
      title:       raw.title,
      price:       raw.price,
      description: raw.description,
      category:    raw.category,
      imageUrl:    raw.image,
      rating:      raw.rating.rate,
      ratingCount: raw.rating.count,
    };
  },

  toRaw(domain: ProductEntity): ApiProduct {
    return {
      id:          domain.id,
      title:       domain.title,
      price:       domain.price,
      description: domain.description,
      category:    domain.category,
      image:       domain.imageUrl,
      rating: {
        rate:  domain.rating,
        count: domain.ratingCount,
      },
    };
  },
};
