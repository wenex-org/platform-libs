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

  @Prop({ type: Date, required: true, index: true })
  created_at: Date;

  @Prop({ type: String, required: true, index: true })
  created_by: string;

  @Prop({ type: String, required: true, index: true })
  created_in: string;

  @Prop({ type: Date, required: false, index: true })
  updated_at?: Date;

  @Prop({ type: String, required: false, index: true })
  updated_by?: string;

  @Prop({ type: String, required: false, index: true })
  updated_in?: string;

  @Prop({ type: Date, required: false, index: true })
  deleted_at?: Date;

  @Prop({ type: String, required: false, index: true })
  deleted_by?: string;

  @Prop({ type: String, required: false, index: true })
  deleted_in?: string;

  @Prop({ type: Date, required: false, index: true })
  restored_at?: Date;

  @Prop({ type: String, required: false, index: true })
  restored_by?: string;

  @Prop({ type: String, required: false, index: true })
  restored_in?: string;

  @Prop({ type: String, required: false, index: true })
  version?: string;

  @Prop({ type: Types.Subdocument, required: false, index: true })
  attrs?: { [x: string]: boolean | number | string };

  @Prop({ type: [String], required: false, index: true })
  tags?: string[];

  constructor(data?: Partial<T>) {
    if (data) Object.assign(this, data);
  }
}

export type BaseSubDocument = BaseSubSchema & Document;
export class BaseSubSchema extends SubSchema<BaseSubSchema> {}
