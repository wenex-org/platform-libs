import type { RawCountFilter, RawOneFilter } from '@app/common/types';
import type { Observable } from 'rxjs';

import type { Items, RawUpdate } from '../base.interface';
import type { RawFilter } from '../filter.interface';
import type { Total } from '../total.interface';

export interface BaseService<T> {
  count: (filter: RawCountFilter) => Observable<Total>;
  create: <E extends T>(createEntity: E) => Observable<T>;
  findOne: (filter: RawOneFilter) => Observable<T>;
  findMany: (filter: RawFilter) => Observable<Items<T>>;
  findById: (filter: RawOneFilter) => Observable<T>;
  deleteById: (filter: RawOneFilter) => Observable<T>;
  restoreById: (filter: RawOneFilter) => Observable<T>;
  destroyById: (filter: RawOneFilter) => Observable<T>;
  updateById: <E extends T>(update: RawUpdate<E>) => Observable<T>;
  updateBulk: <E extends T>(update: RawUpdate<E[]>) => Observable<Total>;
}
