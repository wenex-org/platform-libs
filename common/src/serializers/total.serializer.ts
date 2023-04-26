import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TotalSerializer {
  @Expose()
  count: number;

  static build(data: { count: number }): TotalSerializer {
    return new TotalSerializer(data);
  }

  constructor(data?: Partial<TotalSerializer>) {
    if (data) Object.assign(this, data);
  }
}
