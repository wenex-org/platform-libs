import { ModelOptions, Prop, Severity } from '@typegoose/typegoose';
import { Types } from 'mongoose';

@ModelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Schema<T> {
  @Prop({ type: String, required: true, index: true })
  owner: string;

  @Prop({ type: [String], required: false, index: true })
  shares?: string[];

  @Prop({ type: [String], required: true, index: true })
  clients: string[];

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

  @Prop({ type: [String], required: false, index: true })
  tags?: string[];

  @Prop({ type: Types.Subdocument, required: false, index: true })
  attrs?: { [x: string]: boolean | number | string };

  constructor(data?: Partial<Schema<T>>) {
    if (data) Object.assign(this, data);
  }
}

export type BaseDocument = BaseSchema & Document;
export class BaseSchema extends Schema<BaseSchema> {}
