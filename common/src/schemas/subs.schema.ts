import { Prop } from '@typegoose/typegoose';

export class SubSchema<T> {
  @Prop({ type: String, required: true, index: true })
  uid: string;

  constructor(data?: Partial<SubSchema<T>>) {
    if (data) Object.assign(this, data);
  }
}

export type BaseSubDocument = BaseSubSchema & Document;
export class BaseSubSchema extends SubSchema<BaseSubSchema> {}
