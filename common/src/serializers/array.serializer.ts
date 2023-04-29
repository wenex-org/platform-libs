import { Exclude, Expose } from 'class-transformer';

import { Serializer } from './base.serializer';

@Exclude()
export class ArraySerializer<T> {
  @Expose()
  items: Serializer<T>[];

  static build<T>(items: T[]): ArraySerializer<T> {
    return new ArraySerializer<T>({
      items: items.map((i) => new Serializer<T>(i)),
    });
  }

  constructor(data?: Partial<ArraySerializer<T>>) {
    if (data) Object.assign(this, data);
  }
}
