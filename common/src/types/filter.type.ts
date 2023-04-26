import type { Filter, RawFilter } from '../interfaces';

export type OneFilter<T = any> = Omit<Filter<T>, 'pagination'>;

export type CountFilter<T = any> = Omit<Filter<T>, 'pagination' | 'projection'>;

export type RawOneFilter = Omit<RawFilter, 'pagination'>;

export type RawCountFilter = Omit<RawFilter, 'pagination' | 'projection'>;
