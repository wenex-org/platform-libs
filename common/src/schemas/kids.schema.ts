import { Prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export class SubSchema<T> {
  @Prop({ type: String, required: false, index: true })
  ref?: string;

  @Prop({ type: String, required: true, index: true })
  uid: string;

  @Prop({ type: [String], required: false, index: true })
  shares?: string[];

  @Prop({ type: [String], required: false, index: true })
  groups?: string[];

  @Prop({ type: String, required: false, index: true })
  version?: string;

  @Prop({ type: Types.Subdocument, required: false, index: true })
  attrs?: { [x: string]: boolean | number | string };

  @Prop({ type: [String], required: false, index: true })
  tags?: string[];

  constructor(data?: Partial<SubSchema<T>>) {
    if (data) Object.assign(this, data);
  }
}

export type BaseSubDocument = BaseSubSchema & Document;
export class BaseSubSchema extends SubSchema<BaseSubSchema> {}
