import type { Filter, RawFilter } from './filter.interface';

export interface Update<T, K = T> {
  update: T;
  filter: Filter<T, K>;
}

export interface RawUpdate<T = any> {
  update: T;
  filter: RawFilter;
}

export interface Items<T> {
  items: T[];
}

export interface Void<T> {
  result: T;
}

export interface Base {
  id?: string;
  owner: string;
  clients: string[];
  zones?: string[];
  shares?: string[];
  created_at: Date;
  created_by: string;
  created_in: string;
  updated_at?: Date;
  updated_by?: string;
  updated_in?: string;
  deleted_at?: Date;
  deleted_by?: string;
  deleted_in?: string;
  restored_at?: Date;
  restored_by?: string;
  restored_in?: string;
  version?: string;
  tags?: string[];
}
