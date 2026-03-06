/**
 * Infrastructure Layer — Data Mappers
 *
 * Transform raw API/DB responses into domain entities and vice versa.
 * Keeps domain objects free from serialization concerns.
 */

export interface IMapper<TRaw, TDomain> {
  toDomain(raw: TRaw): TDomain;
  toRaw(domain: TDomain): TRaw;
}
