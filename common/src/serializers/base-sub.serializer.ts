import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SubSerializer<T> {
  @Expose()
  id: string;

  @Expose()
  ref?: string;

  @Expose()
  owner: string;

  @Expose()
  shares?: string[];

  @Expose()
  clients: string[];

  @Expose()
  groups?: string[];

  @Expose()
  created_at: Date;

  @Expose()
  created_by: string;

  @Expose()
  created_in: string;

  @Expose()
  updated_at?: Date;

  @Expose()
  updated_by?: string;

  @Expose()
  updated_in?: string;

  @Expose()
  deleted_at?: Date;

  @Expose()
  deleted_by?: string;

  @Expose()
  deleted_in?: string;

  @Expose()
  restored_at?: Date;

  @Expose()
  restored_by?: string;

  @Expose()
  restored_in?: string;

  @Expose()
  version?: string;

  @Expose()
  attrs?: { [x: string]: boolean | number | string };

  @Expose()
  tags?: string[];

  constructor(data?: Partial<T>) {
    if (data) Object.assign(this, data);
  }
}

export class BaseSubSerializer extends SubSerializer<BaseSubSerializer> {}
