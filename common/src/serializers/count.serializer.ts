import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CountSerializer {
  @Expose()
  count: number;

  static build(count: number): CountSerializer {
    return new CountSerializer({ count });
  }

  constructor(data?: Partial<CountSerializer>) {
    if (data) Object.assign(this, data);
  }
}
