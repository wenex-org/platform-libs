import { Prop } from '@typegoose/typegoose';

export class Schema<T> {
  @Prop({ type: String, required: true, index: true })
  owner: string; // uid or cid of whom created this doc

  @Prop({ type: [String], required: true, index: true })
  clients: string[]; // _id of clients

  @Prop({ type: [String], required: false, index: true })
  zones?: string[];

  @Prop({ type: [String], required: false, index: true })
  shares?: string[];

  @Prop({ type: Date, required: true, index: true, default: () => new Date() })
  created_at: Date;

  @Prop({ type: String, required: true, index: true })
  created_by: string; // who created this doc (client _id or user _id)

  @Prop({ type: String, required: true, index: true })
  created_in: string; // which app or client _id created this doc

  @Prop({ type: Date, required: false, index: true, sparse: true })
  updated_at?: Date;

  @Prop({ type: String, required: false, index: true, sparse: true })
  updated_by?: string;

  @Prop({ type: String, required: false, index: true, sparse: true })
  updated_in?: string;

  @Prop({ type: Date, required: false })
  deleted_at?: Date;

  @Prop({ type: String, required: false })
  deleted_by?: string;

  @Prop({ type: String, required: false })
  deleted_in?: string;

  @Prop({ type: Date, required: false })
  restored_at?: Date;

  @Prop({ type: String, required: false })
  restored_by?: string;

  @Prop({ type: String, required: false })
  restored_in?: string;

  @Prop({ type: String, required: false })
  version?: string;

  @Prop({ type: [String], required: false, index: true })
  tags?: string[];

  constructor(data?: Partial<T>) {
    if (data) Object.assign(this, data);
  }
}

export type BaseDocument = BaseSchema & Document;
export class BaseSchema extends Schema<BaseSchema> {}
