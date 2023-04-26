import type { FilterQuery, ProjectionFields, SortOrder } from 'mongoose';

export interface RawFilter {
  query?: string;
  projection?: string;
  pagination?: string;
}

export interface Filter<T = any, K = T> {
  query?: Query<T>;
  projection?: Projection<T>;
  pagination?: Pagination<K>;
}

export type Query<T = any> = FilterQuery<T>;
export type Projection<T = any> = ProjectionFields<T>;

export interface Pagination<K = any> {
  skip: number;
  limit: number;
  sort: { [key in keyof K]: SortOrder | { $meta: 'textScore' } };
}
